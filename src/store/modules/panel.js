import * as types from '../mutation-types.js'
import API from 'api/API'

const state = {
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
        state.search.text = text;
    },
}

const actions = {
    // 搜歌
    searchSongs : ({commit, state, dispatch}) => {
        if (state.search.keywords === '') {
            // 如果搜索关键字为空，则显示默认歌单
            commit(types.GET_DEFAULT_SONGLIST);
            commit(types.INIT_PLAYER);
        } else {
            commit(types.UPDATE_SEARCH_STAT, 'Searching...');
            API.searchSongs({
                params: {
                    s: state.search.keywords
                }
            }).then((rsp) => rsp.json().then((data) => {
                commit(types.UPDATE_SONGLIST, data);
                if (!rootState.player.playing) {
                    commit(types.INIT_PLAYER);
                }
                commit(types.UPDATE_SEARCH_STAT, 'Search')
            })).catch((e) => {
                commit(types.UPDATE_SEARCH_STAT, 'Search')
                console.error(e)
            });
        }
    }
}

export default {
    state,
    mutations,
    actions
}
