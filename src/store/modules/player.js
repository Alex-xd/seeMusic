import * as types from '../mutation-types.js'

const state = {
    currentTrack: 0,
    currentTrackInfo: {},
    elapsed: 0,
    playing: false,
    repeat: false,
    shuffle: true,
    volume: 68,
    timer: null
}

const mutations = {
    // 播放(读进度条)
    [types.PLAY](state) {
        state.elapsed += 10000;
    },
    // 播放
    [types.SET_PLAYING](state, timer) {
        state.playing = true;
        state.timer = timer;
        console.log(typeof state.timer);
    },
    // 暂停
    [types.SET_PAUSE](state) {
        state.playing = false;
    },
    // 下一曲
    [types.SELECT_TRACK](state, newtrack) {
        state.currentTrack = newtrack;
        state.elapsed = 0;
    },
    // 开启/关闭 重复播放
    [types.TOGGLE_REPEAT](state) {
        state.repeat = !state.repeat
    },
    // 开启/关闭 随机播放
    [types.TOGGLE_SHUFFLE](state) {
        state.shuffle = !state.shuffle;
    }
}

const actions = {
    // 播放
    play: ({ commit, state, dispatch }) => {
        let timer = setInterval(() => {
            if (state.elapsed >= state.currentTrackInfo.duration) {
                dispatch('skipForward');
            }
            commit(types.PLAY); // elapsed += .1;
        }, 1000);

        // alert('playing');
        commit(types.SET_PLAYING, timer);
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
    //暂停
    pause: ({ commit, state, dispatch }) => {
        if (!state.playing) {
            return;
        }
        commit(types.SET_PAUSE);
    }
}

export default {
    state,
    mutations,
    actions
}
