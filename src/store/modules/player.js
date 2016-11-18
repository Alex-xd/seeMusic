import * as types from '../mutation-types.js'

const state = {
    currentTrack: 0,
    currentTrackInfo: {},
    elapsed: 0,
    songReady: false,
    playing: false,
    repeat: false,
    shuffle: false,
    volume: 0.68,
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
        state.songReady = false;
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
    [types.SET_SONG_READY](state) {
        state.songReady = true;
    }
}

// actions 【专注此模块的函数，也可任意访问到其他模块state，触发任意mutation】
const actions = {
    // 播放
    play: ({ commit, state, dispatch }) => {
        let timer = setInterval(() => {
            if (audio.readyState === 4) {
                audio.play();
                commit(types.SET_PLAYING);
                clearInterval(timer);
            } else console.log(audio.readyState)
        }, 100);
        commit(types.SET_SONG_READY);
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
    skipForward: ({ commit, state, rootState, dispatch }) => {
        let newtrack = state.currentTrack + 1;

        newtrack = newtrack % rootState.songlist.tracks.length;
        dispatch('selectTrack', newtrack);
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

        dispatch('selectTrack', newtrack);
    },
    // 跳转到下标为'newtrack'的这首歌
    selectTrack: ({ commit, state, dispatch }, newtrack) => {
        commit(types.SELECT_TRACK, newtrack);
        commit(types.INIT_PLAYER);
        dispatch('play');
    },
}


export default {
    state,
    mutations,
    actions
}
