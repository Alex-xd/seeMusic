// actions
import * as types from './mutation-types'
import API from 'api/API'

export default {
    // ajax初始化默认歌单
    init: ({ commit }) => {
        API.getDefaultSonglist()
            .then((rsp) => commit(types.INIT_SONGLIST, rsp.data))
            .then(() => commit(types.INIT_PLAYER))
            .catch((e) => console.error(e))
    },
    /**
     * 从歌单里选择一首歌并立即播放
     * @params newtrack    跳转到下标为'newtrack'的这首歌
     * @params isSelected  用于区分随机播放和点歌
     */
    selectTrack: ({
        commit,
        state,
        dispatch
    }, { newtrack, isSelected }) => {
        if (newtrack < 0) {
            newtrack = 0;
        }

        if (state.player.shuffle && !isSelected) {
            newtrack = Math.floor(Math.random() * (state.tracks.length - 1));
        }

        commit(types.SELECT_TRACK, newtrack);
        commit(types.INIT_PLAYER);

        dispatch('play');
    },
    // 下一首
    skipForward: ({ commit, state, dispatch }) => {
        let newtrack = state.currentTrack + 1;
        newtrack = newtrack % state.tracks.length;
        dispatch('selectTrack', { newtrack: newtrack });
    },
    // 上一首
    skipBack: ({ commit, state, dispatch }) => {
        let newtrack = state.currentTrack;

        // 如果播放一首歌超过2分钟，则重新播放这首歌，不切换
        if (state.player.elapsed > 120000) {
            dispatch('selectTrack', {
                newtrack: newtrack,
                isSelected: true
            });
        } else {
            dispatch('selectTrack', {
                newtrack: newtrack - 1
            });
        }
    },
    // 搜歌
    searchSongs: ({ commit, state, dispatch }) => {
        if (state.panel.search.keywords === '') {
            // 如果搜索关键字为空，则显示默认歌单
            commit(types.GET_DEFAULT_SONGLIST);
            commit(types.INIT_PLAYER);
        } else {
            commit(types.UPDATE_SEARCH_STAT, 'Searching...');
            API.searchSongs({
                params: {
                    s: state.panel.search.keywords
                }
            }).then((rsp) => {
                commit(types.UPDATE_SONGLIST, rsp.data);
                if (!state.player.playing) {
                    commit(types.INIT_PLAYER);
                }
                commit(types.UPDATE_SEARCH_STAT, 'Search')
            }).catch((e) => {
                commit(types.UPDATE_SEARCH_STAT, 'Search')
                console.error(e)
            });
        }
    }
}
