<!-- 根组件 在此组装子组件 -->
<template>
    <div class="app">
        <Player></Player>
        <div class="container">
            <Panel></Panel>
            <router-view></router-view>
        </div>
        <Popup></Popup>
    </div>
</template>
<script>
    import Vue from 'vue'
    import store from 'store/index'
    import Player from './Player'
    import Panel from './Panel'
    import Popup from './Popup'
    import * as types from 'store/mutation-types'

    export default {
        name: 'app',
        components: {
            Player,
            Panel,
            Popup
        },
        methods: {},
        // 注入store
        store,
        mounted: function () {
            let lock = 0,
                _this = this;
            // 初始化数据
            this.$store.dispatch('init');
//            audio.addEventListener('canplaythrough', function () {
//                audio.play();
//            }, false);
            audio.addEventListener('error', function () {
                if (!lock) {
                    lock = 1;
                } else {
                    if (_this.$store.state.quality === 0) {
                        alert('播放失败：未找到音乐url');
                    } else {
                        _this.$store.commit(types.CHANGE_QUALITY, _this.$store.state.quality - 1);
                        _this.$store.dispatch('play');// TODO:做一个通用消息组件用来弹出消息
                    }
                }
            }, false);
        }
    }

</script>
<style lang="scss" rel="stylesheet/scss">
    .app {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    @media screen and (min-width: 451px) {
        .container {
            width: 60%;
        }
    }

    @media screen and (max-width: 450px) {
        .container {
            width: 100%;
        }
    }

    .container {
        height: 100%;
    }

</style>

