// actions
import * as types from './mutation-types'
import API from 'api/API'

export default {
    // ajax初始化默认歌单
    init : ({commit}) => {
        API.getDefaultSonglist().then((rsp) => rsp.json().then((data) => commit(types.INIT_SONGLIST, data)).then(() => {
            commit(types.INIT_PLAYER);
        })).catch((e) => console.error(e))
    },
    // 搜歌
    searchSongs: ({ commit, state, dispatch }) => {
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
                })
                .then((rsp) =>
                    rsp.json()
                    .then((data) => {
                        commit(types.UPDATE_SONGLIST, data);
                        if (!rootState.player.playing) {
                            commit(types.INIT_PLAYER);
                        }
                        commit(types.UPDATE_SEARCH_STAT, 'Search')
                    })
                )
                .catch((e) => {
                    commit(types.UPDATE_SEARCH_STAT, 'Search')
                    console.error(e)
                });
        }
    }
}
