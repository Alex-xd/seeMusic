// actions
import * as types from './mutation-types'
import API from 'api/API'

export default {
    // ajax初始化默认歌单
    init: ({ commit }) => {
        API.getDefaultSonglist()
            .then((rsp) => commit(types.INIT_SONGLIST, rsp.data))
            .then(() => commit(types.INIT_PLAYER))
            .catch((e) => console.error(e))
    },
    /**
     * 从歌单里选择一首歌并立即播放
     * @params newtrack    跳转到下标为'newtrack'的这首歌
     * @params isSelected  用于区分随机播放和点歌
     */
    selectTrack: ({
        commit,
        state,
        dispatch
    }, { newtrack, isSelected }) => {
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
    // 播放
    play: ({ commit, state, dispatch }) => {
        return new Promise((resolve, reject) => {
            let url = state.player.currentTrackInfo.urls['q' + state.quality]

            if (typeof url === 'undefined') {
                // 如果url不存在 说明这首歌没有对应音质的音源，降低音源品质后再次尝试
                if (state.quality == 0) {
                    alert('播放失败：未找到音乐url');
                    return;
                } else {
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
                    commit(types.UPDATE_URL, { urlType: state.quality, url: rsp.data });
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
            // FIXME:快速播放/暂停切换时定时器会叠加
            var timer = setInterval(function () {
                if (state.player.playing) {
                    // 更新进度条状态
                    commit(types.UPDATE_PROGRESS_BAR, audio.currentTime * 1000);
                    if (state.player.elapsed >= (state.player.currentTrackInfo.duration - 1000)) {
                        // 下一首
                        console.log("什么鬼")
                        clearInterval(timer);
                        dispatch('skipForward');
                    }
                } else {
                    console.log(11111)
                    clearInterval(timer);
                }
            }, 1000);
            audio.play();
        }

    },
    // 下一首
    skipForward: ({ commit, state, dispatch }) => {
        let newtrack = state.currentTrack + 1;
        newtrack = newtrack % state.tracks.length;
        dispatch('selectTrack', { newtrack: newtrack });
    },
    // 上一首
    skipBack: ({ commit, state, dispatch }) => {
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
}
