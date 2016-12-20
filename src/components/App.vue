<!-- 根组件 在此组装子组件 -->
<template>
    <div class="app">
        <Player class="c-player"></Player>
        <div class="container">
            <Panel class="c-panel"></Panel>
            <router-view class="router-view main"></router-view>
        </div>
        <router-view class="router-view modal" name="modal"></router-view>
        <Popup class="c-popup tips"></Popup>
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
        // 注入store
        store,
        mounted() {
            let lock = 0,
                _this = this;
            // 初始化数据
            this.$store.dispatch('init').then(() => {
                setTimeout(() => {
                    _this.$store.dispatch('showPopup', {msg: 'Welcome to SeeMusic', autodes: 1800});
                }, 1800)
            });

            // 音源错误处理
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

    .c-player {
        height: 100%;
    }

    .container {
        height: 100%;
    }

    .c-panel {
        height: 15%;
    }

    .router-view.main {
        position: relative;
        height: 85%;
    }

    .router-view.modal {
        position: fixed;
        top: 0;
        right:0;
        bottom:0;
        left: 0;
        background: #000;
        opacity:.3;
        z-index: 10000;
    }

    .c-popup {
        z-index: 9999;
        position: fixed;
        top: 46%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

    .c-popup.tips {
        padding: 20px 40px;
    }


</style>

