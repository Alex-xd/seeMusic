<!-- 顶栏控制面板 -->
<template>
    <header class="panel">
        <router-link to="/songlist" class="panel__songlist hover-1">
            <span class="fa fa-list"></span> 
            <span>SongList</span>
        </router-link>

        <router-link to="" class="panel__songlist hover-1">
            <span class="fa fa-user-circle"></span>
            <span>LogIn</span>
        </router-link>

        <Search></Search>
        
    </header>
</template>
<script>
import {
    mapMutations,
    mapGetters,
    mapActions
} from 'vuex';
import * as types from 'store/mutation-types';
import Search from './Search';

export default {
    components: {
        Search
    }
}

</script>
<style lang="scss">
.panel {
    background: #3f3d34;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &__songlist {
        font-size: 1.7rem;
        font-style: italic;
        font-family: fantasy, 'Microsoft YaHei', STXihei, sans-serif;
        font-weight: bold;
        color: #B6423A;
    }
}

</style>

