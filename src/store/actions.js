// actions
import * as types from './mutation-types'
import API from 'api/API'

export default {
    // ajax初始化默认歌单 
    initStore: ({ commit }) => {
        API.getDefaultSonglist()
            .then((rsp) =>
                rsp.json()
                .then((data) => {
                    commit(types.INIT_SONGLIST, data);
                })
                .then(() => commit(types.INIT_PLAYER))
            )
            .catch((e) => console.error(e))
    },

}
