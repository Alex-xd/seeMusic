// 歌单的store模块
import song from '../api/song.js'
import * as types from '../mutation-types.js'

// state
const state = {
    currentTrack: 0,
    currentTrackInfo: null,
    player: {
        elapsed: 0,
        playing: false,
        repeat: false,
        shuffle: true,
        volume: 68
    }
}

// 私有getters 只能取出当前模块或者根模块的state！
const getters = {
    player: (state) => state.player,
    currentTrackInfo: (state) => state.currentTrackInfo
}

// actions 
// 我认为私有action的使用应经过充分考虑，因为私有action要获取全
// 局state需要单独传入rootstate，这会让代码很难阅读。  
// 大部分情况在全局统一管理action会比较好，然后用action触发模
// 块内私有mutation即可
const actions = {
    // play: ({ commit, state, rootState }) => {
    //     let timer = setInterval(() => {
    //         if (state.player.elapsed >= rootState.songlist.tracks[state.currentTrack].duration)
    //     }, 1000)
    // }

    // 给state新添加了currentTrackInfo属性
    play: ({ commit, state }) => {
        if (state.player.playing) {
            return;
        }
        let timer = setInterval(() => {
            if (state.player.elapsed >= state.currentTrackInfo.duration) {
                state.player.elapsed = 0;

                commit(types.SKIP_FORWARD);
            }
            state.player.elapsed += .1;
        }, 100);
        state.player.playing = true;
        state.timer = timer;
    }
}

// mutations
const mutations = {
    [types.INIT_PLAYER](state) {
        state.currentTrackInfo = rootState.songlist.state.tracks[state.currentTrack];
        // let o = {};
        // ({
        //     cover: o.cover,
        //     title: o.title,
        //     album: o.album,
        //     artist: o.artist,
        //     duration: o.duration,
        //     mp3URL: o.mp3URL
        // } = {
        //     cover: currentTrack.album.picUrl,
        //     title: currentTrack.name,
        //     album: currentTrack.album.name,
        //     artist: currentTrack.artists[0].name,
        //     duration: currentTrack.duration,
        //     mp3URL: currentTrack.mp3Url
        // });
        // state.currentTrackInfo = o;
        console.log(state.currentTrackInfo)
    },
    [types.TOGGLE_REPEAT](state) {
        state.player.repeat = !state.player.repeat
    },
    [types.TOGGLE_SHUFFLE](state) {
        state.player.shuffle = !state.player.shuffle;
    },
    [types.PLAY](state) {
        if (state.player.playing) {
            return;
        }
        let timer = setInterval(() => {
            if (state.player.elapsed >= state.currentTrackInfo.duration) {
                state.player.elapsed = 0;

            }
        })
        state.player.playing = true;
    },
    [types.PAUSE](state) {
        if (!state.player.playing) {
            return;
        }
        state.player.playing = false
    },
    [types.SKIP_FORWARD](state) {
        state.player.elapsed++
    },
    [types.SKIP_BACK](state) {

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
