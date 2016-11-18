// mutations
import {set } from 'vue'
import * as types from './mutation-types'

export default {
    // 初始化默认歌单
    [types.INIT_SONGLIST](state, { result: { tracks: tracks } }) {
        tracks.forEach((elem) => {
            let o = {};
            ({
                album: { picUrl: o.cover },
                name: o.title,
                album: { name: o.album },
                artists: [{ name: o.artists }],
                duration: o.duration,
                mp3Url: o.mp3Url
            } = elem);
            state.songlist.tracks.push(o);
        })
    },
    // 初始化播放器
    [types.INIT_PLAYER](state) {
        // 拷贝当前播放歌曲信息到player模块state中
        state.player.currentTrackInfo = state.songlist.tracks[state.player.currentTrack];
        // 加载图片
        state.player.elapsed = 0;
        state.player.songReady = false;
        state.player.playing = false;
        state.player.imgUrl = state.player.currentTrackInfo.cover;

    },

}
