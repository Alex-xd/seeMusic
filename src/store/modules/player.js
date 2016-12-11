import * as types from 'store/mutation-types'

const state = {
    currentTrack: 0,  // 正在播放歌曲索引
    currentTrackInfo: {},  // 正在播放歌曲信息
    elapsed: 0, // 已播放时间
    playing: false,
    repeat: false,
    repeatOne: false,
    shuffle: true,
    volume: 68,
    muted: false,
    imgUrl: 'http://o6x2vif88.bkt.clouddn.com/loadingImg.png', // 默认专辑图片
    onloadmp3Url: '' // 填进audio标签的url
}

// mutation 【专注处理此模块的数据，其他的什么都不干】
const mutations = {
    // 播放
    [types.SET_PLAYING](state) {
        state.playing = true;
        state.onloadmp3Url = state.currentTrackInfo.mp3Url;
    },
    // 暂停
    [types.SET_PAUSE](state) {
        state.playing = false;
    },
    // 切歌
    [types.SELECT_TRACK](state, newtrack) {
        state.currentTrack = newtrack;
        state.playing = false;
        state.elapsed = 0;
    },
    // 开启/关闭 重复播放
    [types.TOGGLE_REPEAT](state) {
        state.repeat = !state.repeat
    },
    // 开启/关闭 随机播放
    [types.TOGGLE_SHUFFLE](state) {
        state.shuffle = !state.shuffle;
    },
    // 静音
    [types.CHANGE_MUTE_STATE](state) {
        state.muted = !state.muted;
    },
    // 音量
    [types.UPDATE_VOLUME](state, volume) {
        state.volume = volume;
    },
    // 进度条
    [types.UPDATE_PROGRESS_BAR](state, currTime) {
        state.elapsed = currTime;
    }
}

// actions
const actions = {
    // 播放
    play: ({ commit, state, dispatch }) => {
        if (state.playing) {
            return;
        } else {
            commit(types.SET_PLAYING);

            // 走进度条
            let timer = setInterval(() => {
                if (state.elapsed >= (state.currentTrackInfo.duration - 100)) {
                    timer = null;
                    dispatch('skipForward');
                }
                // 更新进度条状态
                commit(types.UPDATE_PROGRESS_BAR, audio.currentTime * 1000);
            }, 1000);
            audio.play();
        }
    },
    /**
     * @params newtrack 跳转到下标为'newtrack'的这首歌
     * @params isSelected 用于区分随机播放和点歌
     */
    selectTrack: ({ commit, state, dispatch }, { newtrack, isSelected }) => {
        if (state.shuffle && !isSelected) {
            newtrack = Math.floor(Math.random() * (state.songlistLength - 1));
        }
        commit(types.SELECT_TRACK, newtrack);
        commit(types.INIT_PLAYER);

        dispatch('play');
    },
    // 暂停
    pause: ({ commit, state, dispatch }) => {
        if (!state.playing) {
            return;
        }
        audio.pause();
        commit(types.SET_PAUSE);
    },
    // 下一首
    skipForward: ({ commit, state, dispatch }) => {
        let newtrack = state.currentTrack + 1;
        newtrack = newtrack % state.songlistLength;
        dispatch('selectTrack', { newtrack: newtrack });
    },
    // 上一首
    skipBack: ({ commit, state, dispatch }) => {
        let newtrack = state.currentTrack;

        if (state.elapsed < 2000) {
            newtrack = newtrack - 1;
        }
        if (newtrack < 0) {
            newtrack = 0;
        }

        dispatch('selectTrack', { newtrack: newtrack });
    },
    // 静音
    mute: ({ commit, state, dispatch }) => {
        if (state.muted) {
            audio.muted = false;
            commit(types.CHANGE_MUTE_STATE);
        } else {
            audio.muted = true;
            commit(types.CHANGE_MUTE_STATE);
        }
    }
}


export default {
    state,
    mutations,
    actions
}
