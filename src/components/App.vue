<!-- 根组件 在此组装子组件 -->
<template>
    <div class="app">
        <Player></Player>
        <div class="container">
            <Panel></Panel>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import store from 'store/index'
import Player from './Player'
import Panel from './Panel'

export default {
    name:'app',
    components: {
        Player,
        Panel
    },
    // 注入store
    store,
    mounted() {
        // 初始化数据
        this.$store.dispatch('init');
        audio.addEventListener("canplaythrough", function() {
            audio.play();
        }, false);
    }
}

</script>
<style style="scss">
.app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}

@media screen and (min-width:451px) {
    .container {
        width: 60%;
    }
}

@media screen and (max-width:450px) {
    .container {
        width: 100%;
    }
}

.container {
    height: 100%;
}

</style>

