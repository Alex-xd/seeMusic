// actions
// https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement
import * as types from "./mutation-types";
import API from "api/API";

let timer;

export default {
    // ajax初始化默认歌单
    init: ({commit, dispatch}) => {
        API.getDefaultSonglist()
            .then((rsp) => {
                commit(types.INIT_SONGLIST, rsp.data);
                commit(types.INIT_PLAYER);
                setTimeout(() => {
                    // 欢迎光临弹窗
                    dispatch('showPopup', {autodes: 1500});
                }, 1200)
            }).catch((e) => console.error(e))
    },
    // 播放
    play: ({commit, state, dispatch}) => {
        return new Promise((resolve, reject) => {
            let url = state.player.currentTrackInfo.urls['q' + state.quality];

            if (url == '') {
                // 如果url不存在 说明这首歌没有对应音质的音源，降低音源品质后再次尝试
                if (state.quality == 0) {
                    dispatch('showPopup', {msg: '播放失败：未找到音乐url', autodes: 2500});
                    reject();
                } else {
                    dispatch('showPopup', {msg: 'Sorry..这首歌暂无' + mapQuality[state.quality] + '音质音源', autodes: 2500});
                    commit(types.CHANGE_QUALITY, state.quality - 1);
                    dispatch('play');
                }
            } else if (!/^http/.test(url)) {
                // 如果所选音质url未解密，则向服务器请求url，解密在服务端
                // TODO:将解密迁移至客户端
                API.getUrlByDfsId({
                    params: {
                        dfsid: state.player.currentTrackInfo.urls['q' + state.quality]
                    }
                }).then((rsp) => {
                    commit(types.UPDATE_URL, {urlType: state.quality, url: rsp.data});
                    _play();
                    resolve();
                })
            } else {
                _play();
                resolve();
            }
        });

        function _play() {
            commit(types.SET_PLAYING);
            // 走进度条
            timer && clearInterval(timer);
            timer = setInterval(function () {
                if (state.player.playing) {
                    // 更新进度条状态
                    commit(types.UPDATE_PROGRESS_BAR, audio.currentTime * 1000);
                    if (state.player.elapsed >= (state.player.currentTrackInfo.duration - 1000)) {
                        // 下一首
                        clearInterval(timer);
                        dispatch('skipForward');
                    }
                } else {
                    clearInterval(timer);
                }
            }, 1000);
            if (audio.currentSrc && audio.networkState !== 3) {
                audio.play();
            }
        }
    },
    // 下一首
    skipForward: ({commit, state, dispatch}) => {
        let newtrack = state.currentTrack + 1;
        newtrack = newtrack % state.tracks.length;
        dispatch('selectTrack', {newtrack: newtrack});
    },
    // 上一首
    skipBack: ({commit, state, dispatch}) => {
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
    },
    /**
     * 显示弹窗
     *
     * @param opt {object} msg:消息内容,autodes:自动销毁时间,0表示不销毁
     */
    showPopup: ({commit, state}, opt) => {
        commit(types.POPUP, opt.msg || state.popup.msg);
        if (opt.autodes) {
            setTimeout(() => {
                commit(types.POPUP, '');
            }, opt.autodes);
        }
    }
}
