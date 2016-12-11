// mutations
import {set} from 'vue'
import * as types from './mutation-types'

export default {
    // 初始化默认歌单
    [types.INIT_SONGLIST](state, {
        result: {
            tracks: tracks
        }
    }) {
        tracks.forEach((elem) => {
            let o = {};
            ({
                album: {
                    picUrl: o.cover
                },
                album: {
                    name: o.album
                },
                name: o.title,
                artists: [
                    {
                        name: o.artists
                    }
                ],
                duration: o.duration,
                mp3Url: o.mp3Url
            } = elem);
            state.songlist.tracks.push(o);
        });
        // 备份默认歌单
        state.songlist.tracksbak = state.songlist.tracks.slice();
    },
    // 初始化播放器
    [types.INIT_PLAYER](state) {
        let playerSt = state.player,
            songlistSt = state.songlist;

        // 拷贝当前播放歌曲信息到player模块state中
        playerSt.currentTrackInfo = songlistSt.tracks[playerSt.currentTrack];

        set(playerSt, 'songlistLength', songlistSt.tracks.length);

        playerSt.elapsed = 0;

        playerSt.playing = false;

        playerSt.imgUrl = playerSt.currentTrackInfo.cover;

        audio.volume = playerSt.volume / 100;
    }
}
