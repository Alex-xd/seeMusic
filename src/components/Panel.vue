<!-- 顶栏控制面板 -->
<template>
<header class="pannel">
    <Search></Search>
</header>
</template>

<script>
// import {
//     mapMutations,
//     mapGetters,
//     mapActions
// } from 'vuex';
// import * as types from 'store/mutation-types';
import Search from './Search';

export default {
    components: {
        Search
    }
}
</script>

<style lang="scss">
.pannel {
    background: #3f3d34;
    height: 8rem;
    padding: 1rem 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
