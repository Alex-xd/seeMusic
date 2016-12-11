<!-- 搜索歌曲组件 -->
<template>
<div class="search">
    <span class="search__icon fa fa-music" @click="searchSongs"></span>
    <div class="search__input input input--yoko">
        <input class="input__field input__field--yoko" type="text" id="input-16" v-model.trim="keywords" @keyup.enter="searchSongs" autocomplete="true">
        <span class="input__label input__label--yoko" for="input-16" @click="searchSongs">
             <span class="input__label-content input__label-content--yoko" >{{songlistSt.search.text}}</span>
        </span>
    </div>
</div>
</template>

<script>
import {
    mapMutations,
    mapGetters,
    mapActions
} from 'vuex';
import 'css/textinput/input-text-effect.css';
import * as types from 'store/mutation-types';

export default {
    computed: {
        ...mapGetters(['songlistSt']),
        keywords: {
            get() {
                return this.$store.state.songlist.search.keywords
            },
            set(value) {
                this.$store.commit(types.UPDATE_KEYWORDS, value);
            }
        }
    },
    methods: {
        ...mapActions(['searchSongs'])
    }
}
</script>

<style lang="scss">
.search {
    &__input {
        position: relative;
        overflow: hidden;
        width: 80%;
    }
    &__icon {
        position: relative;
        top: -13px;
        left: -10px;
        color: #ad473c;
        cursor: pointer;
        font-size: 34px;
    }
}
</style>
