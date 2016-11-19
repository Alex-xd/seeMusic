// 待解决的问题：
// 【已解决，给audio的autoplay属性绑定到playing上即可】1.点击播放按钮的时候按钮应立即改变成暂停样式，而不是等到开始播放的时候才变

import * as types from 'store/mutation-types'

const state = {
    currentTrack: 0,
    currentTrackInfo: {},
    elapsed: 0,
    playing: false,
    repeat: false,
    repeatOne: false,
    shuffle: true,
    volume: 68,
    muted: false,
    imgUrl: './src/assets/loadingImg.png'
}

// mutation 【专注处理此模块的数据，其他的什么都不干】
const mutations = {
    // 播放(读进度条)
    [types.PLAY](state) {
        state.elapsed += 10000;
    },
    // 播放
    [types.SET_PLAYING](state) {
        state.playing = true;
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

// actions 【专注此模块的函数，也可任意访问到其他模块state，触发任意mutation】
const actions = {
    // 播放
    play: ({ commit, state, dispatch }) => {
        if (state.playing) {
            return;
        }
        let timer = setInterval(() => {
            if (state.elapsed >= state.currentTrackInfo.duration) {
                timer = null;
                dispatch('skipForward');
            }
            commit(types.UPDATE_PROGRESS_BAR, audio.currentTime * 1000);
        }, 500);
        audio.play();
        commit(types.SET_PLAYING);
    },
    //暂停
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
    // 跳转到下标为'newtrack'的这首歌
    selectTrack: ({ commit, state, dispatch }, { newtrack, isSelected }) => {
        if (state.shuffle && !isSelected) {
            newtrack = Math.floor(Math.random() * (state.songlistLength - 1));
        }
        commit(types.SELECT_TRACK, newtrack);
        commit(types.INIT_PLAYER);
        dispatch('play');
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
