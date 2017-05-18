import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import actions from "./actions";
import player from "./modules/player";

Vue.use(Vuex);

// 全局状态
const state = {
    tracks: [], // 歌单
    currentTrack: 0, // 正在播放歌曲在歌单中的索引
    quality: 0, // 音乐品质 0~3 普通 较高 超高 无损
    loading: 0,
    comments: [],
    popup: {
        show: 0,
        msg: '',
        className: 'normal'
    },
    showLogin: 0,
    hasLogin: 0,
    user: {
        tracks: [],
        friends: []
    },
};

const getters = {};

//【处理全局或多个模块的状态】
const mutations = {
    // 初始化歌单状态
    [types.INIT_SONGLIST](state, data) {
        let tracks = data.result.tracks || data.result.songs || 0;

        state.tracks = [];
        if (tracks === 0) {
            state.tracks[0] = {
                title: '根据相关法律法规，搜索结果未予显示。(手动斜眼)'
            }
        } else {
            // TODO:此处需要性能优化  
            tracks.forEach((elem) => {
                let o = {
                    urls: {
                        q0: '',
                        q1: '',
                        q2: '',
                        q3: ''
                    }
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
                    commentThreadId: o.commentThreadId
                } = elem);

                o.urls.q0 = elem.mp3Url;
                if (elem.lMusic) {
                    o.urls.q1 = elem.lMusic.dfsId;
                }
                if (elem.mMusic) {
                    o.urls.q2 = elem.mMusic.dfsId;
                }
                if (elem.hMusic) {
                    o.urls.q3 = elem.hMusic.dfsId;
                }

                o.cover = _toHttps(o.cover);
                
                state.tracks.push(o);
            });
        }

        function _toHttps(str){
            let tmp = Array.from(str);
            tmp.splice(4, 0, 's');
            return tmp.join('')
        }
    },
    // 初始化播放器状态
    [types.INIT_PLAYER](state) {
        let playerSt = state.player;

        playerSt.currentTrackInfo = state.tracks[state.currentTrack];
        playerSt.elapsed = 0;
        playerSt.playing = false;
        playerSt.onloadmp3Url = '';
        audio.volume = playerSt.volume / 100;
        audio.currentTime = 0;
    },
    // 播放
    [types.SET_PLAYING](state) {
        state.player.playing = true;
        state.player.onloadmp3Url = state.player.currentTrackInfo.urls['q' + state.quality];
    },
    // 切歌
    [types.SELECT_TRACK](state, newtrack) {
        state.currentTrack = newtrack;
    },
    // 改变音质
    [types.CHANGE_QUALITY](state, payload) {
        state.quality = parseInt(payload);
    },
    // 弹窗
    [types.POPUP](state, opt){
        state.popup.msg = opt.msg;
        state.popup.className = opt.className;
        state.popup.show = !state.popup.show;
    },
    // 改变loading状态
    [types.CHANGE_LOADING_STATE](state){
        state.loading = !state.loading;
    },
    // 更新评论
    [types.UPDATE_COMMENTS](state, comments){
        state.comments = [];
        comments.forEach((elem) => {
            let o = {};
            ({
                content: o.content,
                likedCount: o.likedCount,
                time: o.time,
                user: {
                    nickname: o.nickname,
                    avatarUrl: o.avatarUrl
                }
            } = elem);
            state.comments.push(o);
        });
    },
    [types.LOGIN_SHOW_HIDE](state, payload){
        state.showLogin = payload;
    },
    [types.CHANGE_LOGIN_STATE](state, payload){
        state.hasLogin = payload;
    },
    [types.UPDATE_USER_INFO](state, payload){
        state.user.tracks = payload.list.slice();
        state.user.friends = payload.friends.slice();
    },
    // 初始化播放器状态
    [types.INIT_PLAYER_USER](state, payload) {
        let playerSt = state.player;

        playerSt.currentTrackInfo = payload;
        playerSt.elapsed = 0;
        playerSt.playing = false;
        playerSt.onloadmp3Url = '';
        audio.volume = playerSt.volume / 100;
        audio.currentTime = 0;
    },
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules: {
        player
    },
    strict: process.env.NODE_ENV !== 'production' //发布环境不使用严格模式
})

// FIXME:有些问题
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
