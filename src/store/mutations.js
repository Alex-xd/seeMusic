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
        state.player.currentTrackInfo = state.songlist.tracks[state.player.currentTrack]
    },

}
