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

        set(state.player, 'songlistLength', state.songlist.tracks.length);
        state.player.elapsed = 0;
        state.player.playing = false;

        // 这里是个坑，如果不给audio/img的src填充一个值的话页面刚加载的时候用户体验很不好
        // 详细说就是如果src为空的话这个标签的属性中将不会包含src，等数据来的时候再添加一个
        // src并设置值，这就相当于从零加载。 如果给src先填充一个值（随便什么都可以），等真正
        // 的数据来的时候覆盖上一个src的值，这时浏览器不会马上显示新的内容，而是在后台下载，等
        // 到下载完成后瞬间替换旧内容，这样就不会有“填充src到下载完成”这个空白间隙了。
        state.player.imgUrl = state.player.currentTrackInfo.cover;

        document.getElementById('audio').volume = state.player.volume / 100;
    },

}
