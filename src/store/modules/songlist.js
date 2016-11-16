// 歌单的store模块
import song from '../api/song.js'
import * as types from '../mutation-types.js'

// state
const state = {
    tracks: []
}

// 私有getters 只能取出当前或跟store的state！
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {
    [types.INIT_SONGLIST](state, data) {
        const tracks = data.result.tracks;
        tracks.forEach((elem, index, array) => {
            //解构对象数组
            let o = {};
            ({
                cover: o.cover,
                title: o.title,
                album: o.album,
                artist: o.artist,
                duration: o.duration,
                mp3URL: o.mp3URL
            } = {
                cover: elem.album.picUrl,
                title: elem.name,
                album: elem.album.name,
                artist: elem.artists[0].name,
                duration: elem.duration,
                mp3URL: elem.mp3Url
            });
            state.tracks.push(o);
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
