import * as types from 'store/mutation-types'

const state = {
    currentTrackInfo: {
        // 正在播放的歌曲的信息
        /**
         * cover,
         * album,
         * title,
         * artist,
         * duration,
         * mp3Url,
         * dfsId:{
         *     l,
         *     m,
         *     h
         * }
         */
    },
    elapsed: 0, // 已播放时间
    playing: false,
    repeat: false,
    repeatOne: false,
    shuffle: true,
    volume: 68,
    muted: false,
    imgUrl: 'http://zhangboyuan-10039837.cos.myqcloud.com/loadingImg.png', // 默认填充一张图片
    onloadmp3Url: '' // 填进audio标签的url
}

// mutation 【专注处理此模块的数据，其他的什么都不干】
const mutations = {
    // 播放
    [types.SET_PLAYING](state) {
        state.playing = true;
        state.onloadmp3Url = state.currentTrackInfo.mp3Url;
    },
    // 暂停
    [types.SET_PAUSE](state) {
        state.playing = false;
    },
    // 开启/关闭 重复播放
    [types.TOGGLE_REPEAT](state) {
        state.repeat = !state.repeat
    },
    // 开启/关闭 随机播放
    [types.TOGGLE_SHUFFLE](state) {
        state.shuffle = !state.shuffle;
    },
    // 静音
    [types.CHANGE_MUTE_STATE](state) {
        state.muted = !state.muted;
    },
    // 音量
    [types.UPDATE_VOLUME](state, volume) {
        state.volume = volume;
    },
    // 进度条
    [types.UPDATE_PROGRESS_BAR](state, currTime) {
        state.elapsed = currTime;
    }
}

// actions
const actions = {

}

export default {
    state,
    mutations,
    actions
}
