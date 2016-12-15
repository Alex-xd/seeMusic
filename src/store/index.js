import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import actions from './actions'
import player from './modules/player'
import panel from './modules/panel'

Vue.use(Vuex);

const state = {
    tracks: [], // 歌单
    tracksbak: [], // 歌单副本
    currentTrack: 0, // 正在播放歌曲在歌单中的索引
    quality: 0, // 音乐品质 0~3 低 中 高 超高
}

const mutations = {
    // 初始化歌单状态
    [types.INIT_SONGLIST](state, {
        result: {
            tracks: tracks
        }
    }) {
        tracks.forEach((elem) => {
            let o = {
                dfsId: {}
            };
            ({
                album: {
                    picUrl: o.cover,
                    name: o.album
                },
                name: o.title,
                artists: [{
                    name: o.artists
                }],
                duration: o.duration,
                mp3Url: o.mp3Url,
            } = elem);
            if (elem.lMusic) {
                o.dfsId.l = elem.lMusic.dfsId;
            }
            if (elem.mMusic) {
                o.dfsId.m = elem.mMusic.dfsId;
            }
            if (elem.hMusic) {
                o.dfsId.h = elem.hMusic.dfsId;
            }

            state.tracks.push(o);
        });
            // 创建歌单副本
        state.tracksbak = state.tracks.slice();
    },
    // 初始化播放器状态
    [types.INIT_PLAYER](state) {
        let playerSt = state.player;

        // 拷贝当前播放歌曲信息到player模块state中
        playerSt.currentTrackInfo = state.tracks[state.currentTrack];
        playerSt.elapsed = 0;
        playerSt.playing = false;
        playerSt.onloadmp3Url = '';
        playerSt.imgUrl = playerSt.currentTrackInfo.cover;
        audio.volume = playerSt.volume / 100;
        audio.currentTime = 0;

        if (state.quality !== 0) {

        }
    },
    // 切歌
    [types.SELECT_TRACK](state, newtrack) {
        state.currentTrack = newtrack;
    },
    // 重置为默认歌单
    [types.GET_DEFAULT_SONGLIST](state) {
        state.tracks = state.tracksbak.slice();
    },
    // 根据搜索结果更新歌单
    [types.UPDATE_SONGLIST](state, {
        result: {
            songs: songs,
            songCount: songCount
        }
    }) {
        state.tracks = [];
        if (songCount === 0) {
            state.tracks[0] = {
                title: '根据相关法律法规，搜索结果未予显示。'
            }
        } else {
            songs.forEach((elem) => {
                let o = {};
                ({
                    album: {
                        picUrl: o.cover
                    },
                    name: o.title,
                    album: {
                        name: o.album
                    },
                    artists: [{
                        name: o.artists
                    }],
                    duration: o.duration,
                    mp3Url: o.mp3Url
                } = elem);
                state.tracks.push(o);
            })
        }
    },
    // 改变音质
    [types.CHANGE_QUALITY](state) {
        state.quality = (state.quality + 1) % 4;
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        player,
        panel
    },
    strict: process.env.NODE_ENV !== 'production' //发布环境不使用严格模式
})

// 开启热重载
// if (module.hot) {
//     // 使 actions 和 mutations 成为可热重载模块
//     module.hot.accept([
//         './actions',
//         './modules/panel',
//         './modules/player'
//     ], () => {
//         // 获取更新后的模块
//         // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
//         const newActions = require('./actions').default;
//         const newModulePanel = require('./modules/panel').default;
//         const newModulePlayer = require('./modules/player').default;
//         // const newMutations = require('./mutations').default
//         // const newModuleA = require('./modules/a').default
//         // 加载新模块
//         store.hotUpdate({
//             actions: newActions,
//             modules: {
//                 panel: newModulePanel,
//                 player: newModulePlayer
//             }
//             // mutations: newMutations,
//             // modules: {
//             //     a: newModuleA
//             // }
//         })
//     })
// }
