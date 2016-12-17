<!-- 搜索歌曲组件 -->
<template>
    <div class="search">
        <div class="search__input input input--yoko">
            <input class="input__field input__field--yoko" type="text" id="input-16" v-model.trim="keywords" @keyup.enter="searchSongs">
            <span class="input__label input__label--yoko" for="input-16" @click="searchSongs">
            <span class="input__label-content input__label-content--yoko" >{{searchStateText}}</span>
            </span>
        </div>
    </div>
</template>
<script>
// import {
//     mapMutations,
//     mapState,
//     mapActions
// } from 'vuex';
import 'css/textinput/input-text-effect.css';
import * as types from 'store/mutation-types';
import API from 'api/API'

export default {
    name: 'search',
    data:function(){
        return {
            keywords:'',
            searchStateText:'Search'
        }
    },
    methods: {
        // 搜歌
        searchSongs: function() {
            const commit = this.$store.commit;

            if (this.keywords === '') {
                // 如果搜索关键字为空，则显示默认歌单
                this.$store.dispatch('init');
            } else {
                this.searchStateText='Searching...';
                API.searchSongs({
                    params: {
                        s: this.keywords
                    }
                }).then((rsp) => {
                    commit(types.INIT_SONGLIST, rsp.data);
                    if (!this.$store.state.player.playing) {
                        commit(types.INIT_PLAYER);
                    }
                    this.searchStateText='Search';
                }).catch((e) => {
                    this.searchStateText='Search';
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
    font-family: fantasy;
    &:hover {
        color: #f9934e;
    }
}

</style>

