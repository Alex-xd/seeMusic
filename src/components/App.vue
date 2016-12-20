<!-- 根组件 在此组装子组件 -->
<template>
    <div class="app">
        <Player class="component-player"></Player>
        <div class="container">
            <Panel class="component-panel"></Panel>
            <router-view class="component-router-view"></router-view>
        </div>
        <Popup class="component-popup"></Popup>
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
            this.$store.dispatch('init').then(() => {
                setTimeout(() => {
                    // 欢迎光临弹窗
                    _this.$store.dispatch('showPopup', {msg: '尽情享用吧^^', autodes: 1500});
                }, 1800)
            });
            audio.addEventListener('error', function () {
                if (!lock) {
                    lock = 1;
                } else {
                    if (_this.$store.state.quality === 0) {
                        _this.$store.dispatch('showPopup', {msg: '播放失败：音源不存在，换个品质试试！', autodes: 2500});
                    } else {
                        _this.$store.commit(types.CHANGE_QUALITY, _this.$store.state.quality - 1);
                        _this.$store.dispatch('play');
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
        background: url('../assets/bg.svg');
    }

    @media screen and (min-width: 451px) {
        .container {
            width: 60%;
        }
        .component-player {
            width: 40%;
        }
    }

    @media screen and (max-width: 450px) {
        .container {
            width: 100%;
        }
        .component-player {
            width: 100%;
        }
    }

    .component-player {
        height: 100%;
    }

    .container {
        height: 100%;
    }

    .component-panel {
        height: 15%;
    }

    .component-router-view {
        position: relative;
        height: 85%;
    }

    .component-popup {
        z-index: 9999;
        position: fixed;
        top: 46%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

</style>

