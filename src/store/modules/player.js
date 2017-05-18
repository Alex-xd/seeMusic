import * as types from "store/mutation-types";

const state = {
    currentTrackInfo: {
        // 正在播放的歌曲的信息
        /**
         * cover,
         * album,
         * title,
         * artist,
         * duration,
         * urls:{ 
         *     q0,  
         *     q1,
         *     q2,
         *     q3
         * }
         */
        cover: 'https://zhangboyuan-10039837.cossh.myqcloud.com/loadingImg.png',
        album: 'loading..',
        title: 'loading..',
        artist: 'loading..',
        duration: 0,
        commentThreadId: 0,
        // MP3 url, q0~q3代表不同品质
        // q0为url，q1~q3均是一个加密id，
        // 需向后台发送请求解密后才可得到真实url
        urls: {
            q0: '',
            q1: '',
            q2: '',
            q3: ''
        }
    },
    elapsed: 0, // 已播放时间
    playing: false,
    repeat: false,
    shuffle: true,
    volume: 68,
    muted: false,
    onloadmp3Url: '' // 填进audio标签的url
};

//【专注处理此模块的数据】
const mutations = {
    [types.SET_PAUSE](state){
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
    },
    // 更新url
    [types.UPDATE_URL](state, {urlType, url}) {
        state.currentTrackInfo.urls['q' + urlType] = url;
    }
};



export default {
    state,
    mutations
}