<!-- 顶栏控制面板 -->
<template>
    <header class="panel">
        <div class="panel--left">
            <router-link to="/songlist" class="panel__item panel__item__songlist hover-1">
                <span class="fa fa-list"></span>
                <span>SongList</span>
            </router-link>
            <router-link to="" class="panel__item panel__item__songlist hover-1">
                <span class="fa fa-user-circle"></span>
                <span>LogIn</span>
            </router-link>
        </div>
        <div class="panel--right">
            <Search></Search>
        </div>
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
        name: 'panel',
        components: {
            Search
        }
    }

</script>
<style lang="scss" rel="stylesheet/scss">
    .panel {
        background: #3f3d34;
        height: 15%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &--left,
        &--right {
            padding: 0 30px;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        &__item {
            font-size: 1.5rem;
            font-style: italic;
            font-family: fantasy, 'Microsoft YaHei', STXihei, sans-serif;
            font-weight: 900;
            color: #b6423a;
            margin: 0 10px;
        }
    }

</style>

