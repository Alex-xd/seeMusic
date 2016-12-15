<!-- 搜索歌曲组件 -->
<template>
    <div class="search">
        <div class="search__input input input--yoko">
            <input class="input__field input__field--yoko" type="text" id="input-16" v-model.trim="keywords" @keyup.enter="searchSongs">
            <span class="input__label input__label--yoko" for="input-16" @click="searchSongs">
            <span class="input__label-content input__label-content--yoko" >{{searchSt.text}}</span>
            </span>
        </div>
    </div>
</template>
<script>
import {
    mapMutations,
    mapState,
    mapActions
} from 'vuex';
import 'css/textinput/input-text-effect.css';
import * as types from 'store/mutation-types';

export default {
    name: 'search',
    computed: {
        ...mapState({
            searchSt: state => state.panel.search,
            playerSt: state => state.player
        }),
        keywords: {
            get() {
                return this.$store.state.panel.search.keywords
            },
            set(value) {
                this.$store.commit(types.UPDATE_KEYWORDS, value);
            }
        }
    },
    methods: {
        // 搜歌
        searchSongs: function() {
            const commit = this.$store.commit;

            if (this.searchSt.keywords === '') {
                // 如果搜索关键字为空，则显示默认歌单
                commit(types.GET_DEFAULT_SONGLIST);
                commit(types.INIT_PLAYER);
            } else {
                commit(types.UPDATE_SEARCH_STAT, 'Searching...');
                API.searchSongs({
                    params: {
                        s: searchSt.keywords
                    }
                }).then((rsp) => {
                    commit(types.UPDATE_SONGLIST, rsp.data);
                    if (!this.playerSt.playing) {
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
}

</script>
<style lang="scss">
.search {
    &__input {
        top: 10px;
        position: relative;
        overflow: hidden;
        width: 100%;
    }
}

.input__label-content {
    transition: color .6s;
    font-style: italic;
    &:hover {
        color: #f9934e;
    }
}

</style>

