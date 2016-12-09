<style lang="scss">
.pannel {
    background: #3f3d34;
    height: 8rem;
    padding: 1rem 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &__search {
        position: relative;
        overflow: hidden;
        width: 80%;
    }
    &__default-list-btn {
    	position: relative;
    	top: -13px;
    	left: -10px;
        color: #ad473c;
        cursor: pointer;
        font-size: 34px;
    }
}

</style>
<template>
    <header class="pannel">
        <span class="pannel__default-list-btn fa fa-music" @click="searchSongs"></span>
        <div class="pannel__search input input--yoko">
            <input class="input__field input__field--yoko" type="text" id="input-16" v-model.trim="keywords" @keyup.enter="searchSongs" autocomplete="true">
            <span class="input__label input__label--yoko" for="input-16" @click="searchSongs">
     			 <span class="input__label-content input__label-content--yoko" >{{songlist.search.text}}</span>
            </span>
        </div>
    </header>
</template>
<script>
import 'css/textinput/input-text-effect.css'
import * as types from 'store/mutation-types'
import {
    mapMutations,
    mapGetters,
    mapActions
} from 'vuex'

export default {
    computed: {
        ...mapGetters(['songlist']),
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
