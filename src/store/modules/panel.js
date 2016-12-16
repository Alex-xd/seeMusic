import * as types from '../mutation-types.js'
import API from 'api/API'

const state = {
    search: {
        keywords: '',
        text: 'Search'
    }
}

//【专注处理此模块的数据】
const mutations = {
    [types.UPDATE_KEYWORDS](state, value) {
        state.search.keywords = value;
    },
    [types.UPDATE_SEARCH_STAT](state, text) {
        state.search.text = text;
    },
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}
