// 歌单的store模块
import song from '../api/song.js'
import * as types from '../mutation-types.js'

// state
const state = {
    title: '',
    author: ''
}

// getters
const getters = {
    title: state => state.title,
    author: state => state.author
}

// actions
const actions = {

}

// mutations
const mutations = {
    [types.INIT_SONGLIST](state, data) {

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
