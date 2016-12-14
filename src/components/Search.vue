<!-- 搜索歌曲组件 -->
<template>
    <div class="search">
        <div class="search__input input input--yoko">
            <input class="input__field input__field--yoko" type="text" id="input-16" v-model.trim="keywords" @keyup.enter="searchSongs">
            <span class="input__label input__label--yoko" for="input-16" @click="searchSongs">
            <span class="input__label-content input__label-content--yoko" >{{search.text}}</span>
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
    computed: {
        ...mapState({
            search: state => state.panel.search
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
        ...mapActions(['searchSongs'])
    }
}

</script>
<style lang="scss">
.search {
    &__input {
        top: 10px;
        position: relative;
        overflow: hidden;
        width: 80%;
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

