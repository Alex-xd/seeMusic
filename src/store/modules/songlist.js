import * as types from '../mutation-types.js'
import API from 'api/API'

const state = {
    tracks: [],
    tracksbak: [],
    search: {
        keywords: '',
        text: 'Search'
    }
}

const mutations = {
    [types.UPDATE_KEYWORDS](state, value) {
        state.search.keywords = value;
    },
    [types.UPDATE_SEARCH_STAT](state, text) {
        state.search.text = text
    },
    // 重新初始化默认歌单
    [types.UPDATE_SONGLIST](state, { result: { songs: songs, songCount: songCount } }) {
        state.tracks = [];
        if (songCount === 0) {
            state.tracks[0] = {
                title: '根据相关法律法规，搜索结果未予显示。'
            }
        } else {
            songs.forEach((elem) => {
                let o = {};
                ({
                    album: { picUrl: o.cover },
                    name: o.title,
                    album: { name: o.album },
                    artists: [{ name: o.artists }],
                    duration: o.duration,
                    mp3Url: o.mp3Url
                } = elem);
                state.tracks.push(o);
            })
        }
    },
    [types.GET_DEFAULT_SONGLIST](state) {
        state.tracks = state.tracksbak.slice();
    }
}
const actions = {
    
}

export default {
    state,
    mutations,
    actions
}
