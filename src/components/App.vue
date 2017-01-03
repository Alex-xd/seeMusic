<!-- 根组件 在此组装子组件 -->
<template>
    <div class="app">
        <!--左侧播放器-->
        <Player class="c-player"></Player>
        <div class="container">
            <Panel class="c-panel"></Panel>
            <!--右侧歌单、评论区-->
            <router-view class="router-view"></router-view>
        </div>
        <!--登录弹窗-->
        <Login class="c-popup"></Login>

        <!--tips弹窗-->
        <Popup class="c-popup"></Popup>
    </div>
</template>
<script>
    import Vue from 'vue'
    import store from 'store/index'
    import Player from './Player'
    import Panel from './Panel'
    import Popup from './Popup'
    import Login from './Login'
    import * as types from 'store/mutation-types'
    import utils from 'src/utils';

    export default {
        name: 'app',
        components: {
            Player,
            Panel,
            Popup,
            Login
        },
        // 注入store
        store,
        mounted() {
            let lock = 0,
                _this = this;

            // 初始化数据
            this.$store.dispatch('init').then(function () {
                setTimeout(function () {
                    _this.$store.dispatch('showPopup', {msg: 'Welcome to SeeMusic', autodes: 1800});
                }, 1800)
            });

            // 音源错误处理
            audio.addEventListener('error', function () {
                // 第一次不执行
                if (!lock) {
                    lock = 1;
                } else {
                    _this.$store.commit(types.CHANGE_QUALITY, (_this.$store.state.quality + 1) % 4);
                    _this.$store.dispatch('play');
                }
            }, false);
        }
    }

</script>
<style lang="scss" rel="stylesheet/scss">
    // 移动端适配
    @media screen and (min-width: 451px) {
        .container {
            width: 60%;
        }
        .c-player {
            width: 40%;
        }
    }

    @media screen and (max-width: 450px) {
        .container {
            width: 100%;
        }
        .c-player {
            width: 100%;
        }
    }

    .app {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        background: url('../assets/bg.svg');
    }

    .router-view {
        position: relative;
        height: 85%;
    }

    .c-player {
        height: 100%;
    }

    .container {
        height: 100%;
    }

    .c-panel {
        height: 15%;
    }

    .c-popup {
        z-index: 9999;
        position: fixed;
        top: 46%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

</style>

