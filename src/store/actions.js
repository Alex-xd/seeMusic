// 全局actions
import * as types from "./mutation-types";
import API from "api/API";
import utils from 'src/utils';
import router from 'src/router';

let timer;

export default {
    /**
     * 初始化默认歌单
     */
    init: ({commit, dispatch}) => {
        // FIXME: 由于获取推荐歌单的接口发生改变，导致无法获取url，遂不再显示我自己的推荐歌单了，默认搜索xxx
        // commit(types.CHANGE_LOADING_STATE);
        // return API.getDefaultSonglist()
        //     .then(({data}) => {
        //         commit(types.INIT_SONGLIST, data);
        //         commit(types.INIT_PLAYER);
        //         commit(types.CHANGE_LOADING_STATE);
        //     }).catch((e) => {
        //         dispatch('showPopup', {
        //             msg: 'Error:' + e.message,
        //             autodes: 2500,
        //             className: 'warn'
        //         });
        //         console.error(e.message)
        //     })
        commit(types.CHANGE_LOADING_STATE);
        API.searchSongs('Main Theme').then(({data}) => {
            commit(types.INIT_SONGLIST, data);
            commit(types.INIT_PLAYER);
            commit(types.CHANGE_LOADING_STATE);
        }).catch((e) => {
            commit(types.CHANGE_LOADING_STATE);
            console.error(e)
        })
    },
    /**
     * 播放
     */
    play: ({commit, state, dispatch}) => {
        return new Promise((resolve, reject) => {
            let url = state.player.currentTrackInfo.urls['q' + state.quality];

            if (url == '') {
                // 若url不存在 说明这首歌没有对应音质的音源，降低音源品质后再次尝试
                dispatch('showPopup', {
                    msg: 'Sorry..这首歌暂无' + utils.mapQuality[state.quality] + '品质音源，已自动切换音质',
                    autodes: 2500,
                    className: 'warn'
                });
                commit(types.CHANGE_QUALITY, state.quality > 0 ? state.quality - 1 : 0);
                dispatch('play');
                resolve();
            } else if (!/^http/.test(url)) {
                // 若所选音质url未解密，则向服务器请求url，解密在服务端
                // TODO:将解密迁移至客户端
                API.getUrlByDfsId(state.player.currentTrackInfo.urls['q' + state.quality])
                    .then(({data}) => {
                        commit(types.UPDATE_URL, {urlType: state.quality, url: data});
                        _play();
                        resolve();
                    })
                    .catch((e) => {
                        dispatch('showPopup', {
                            msg: 'Error:' + e.message,
                            autodes: 2500
                        });
                        console.error(e.message);
                        reject()
                    })
            } else {
                _play();
                resolve();
            }
        });

        function _play() {
            let _audio = document.getElementById('audio');  // 缓存audio dom

            commit(types.SET_PLAYING);
            // 走进度条
            timer && clearInterval(timer);
            timer = setInterval(function () {
                if (state.player.playing) {
                    // 更新进度条状态
                    commit(types.UPDATE_PROGRESS_BAR, _audio.currentTime * 1000);
                    if (state.player.elapsed >= (state.player.currentTrackInfo.duration - 1000)) {
                        // 下一首
                        clearInterval(timer);
                        dispatch('skipForward');
                    }
                } else {
                    clearInterval(timer);
                }
            }, 1000);
            if (_audio.currentSrc && _audio.networkState !== 3) {
                _audio.play();
            }
        }
    },
    /**
     * 下一首
     */
    skipForward: ({state, dispatch}) => {
        let newtrack = state.currentTrack + 1;
        newtrack = newtrack % state.tracks.length;
        dispatch('selectTrack', {newtrack: newtrack});
    },
    /**
     * 上一首
     */
    skipBack: ({state, dispatch}) => {
        let newtrack = state.currentTrack;

        // 如果播放一首歌超过2分钟，则重新播放这首歌，不切换
        if (state.player.elapsed > 120000) {
            dispatch('selectTrack', {
                newtrack: newtrack,
                isSelected: true
            });
        } else {
            dispatch('selectTrack', {
                newtrack: newtrack - 1
            });
        }
    },
    /**
     * 从歌单里选择一首歌并立即播放
     * @params newtrack    跳转到下标为'newtrack'的这首歌
     * @params isSelected  用于区分随机播放和点歌
     */
    selectTrack: ({commit, state, dispatch}, {newtrack, isSelected}) => {
        if (newtrack < 0) {
            newtrack = 0;
        }

        if (state.player.shuffle && !isSelected) {
            newtrack = Math.floor(Math.random() * (state.tracks.length - 1));
        }

        commit(types.SELECT_TRACK, newtrack);
        commit(types.INIT_PLAYER);

        dispatch('play');
        // 判断是否在评论板块下
        if (router.currentRoute.path === '/comments') {
            dispatch('getComments');
        }
    },
    /**
     * 显示弹窗
     * @param opt {object}
     *  opt#msg 消息内容
     *  opt#autodes 自动销毁时间,0表示不销毁
     *  opt#className 'normal'|'warn' 默认为normal（红色）
     */
    showPopup: ({commit}, opt) => {
        let optset = {
            msg: opt.msg || 'Welcome to SeeMusic',
            className: opt.className || 'normal'
        };

        if (opt.autodes) {
            setTimeout(() => {
                commit(types.POPUP, optset);
            }, opt.autodes);
        }
        commit(types.POPUP, optset);
    },
    /**
     * 获取正在播放歌曲的评论
     */
    getComments: ({commit, state, dispatch}) => {
        commit(types.CHANGE_LOADING_STATE);
        return API.getCommments(state.player.currentTrackInfo.commentThreadId)
            .then(({data:{hotComments:comments}}) => {
                // comments为一个对象数组
                commit(types.UPDATE_COMMENTS, comments);
                commit(types.CHANGE_LOADING_STATE);
            })
            .catch((e) => {
                dispatch('showPopup', {
                    msg: 'Error:' + e.message,
                    autodes: 2500,
                    className: 'warn'
                });
                commit(types.CHANGE_LOADING_STATE);
                router.push('/songlist');
            })
    },
    /**
     * 获取用户信息
     */
    getUserInfo: ({commit}) => {
        return API.getUserInfo()
            .then(({data}) => {
                commit(types.UPDATE_USER_INFO, data);
            }).catch((e) => {
                dispatch('showPopup', {
                    msg: 'Error:' + e.message,
                    autodes: 2500
                });
                console.error(e.message);
                router.push('/songlist');
            })
    },
    /**
     * 登录
     */
    login: ({commit, dispatch}, params) => {
        // 处理表单数据
        let _params = new URLSearchParams();

        _params.append('username', params.uname);
        _params.append('password', params.psw);
        API.login(_params).then(({data}) => {
            if (data === 1) {
                commit(types.LOGIN_SHOW_HIDE, 0);
                commit(types.CHANGE_LOGIN_STATE, 1);
                dispatch('getUserInfo');
            } else {
                dispatch('showPopup', {
                    msg: '账号或密码错误，请重新输入！',
                    autodes: 1500,
                    className: 'warn'
                })
            }
        });
    },
}
