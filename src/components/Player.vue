<template>
    <div>
        <div class="player">
            <div class="player--topbox" :class="{'shake-slow shake-constant':shaking}">
                <!-- 专辑封面 -->
                <div class="player__cover--wrapper">
                    <!--fork me on github-->
                    <a href="https://github.com/Alex-xd/seeMusic"><img style="z-index:200000;width: 30%;height:25%;position: absolute; top: 0; left: 0; border: 0;" src="~assets/forkMe.png" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"></a>
                    <img class="player__cover"
                         :src="playerSt.currentTrackInfo.cover"
                         :class="{'player__cover--rotating':playerSt.playing}">
                </div>
                <!-- 播放时间 -->
                <div class="player__timer">
                    <div class="player__timer__elapsed">
                        {{playerSt.elapsed | msecondToMinutes}}
                    </div>
                    <div class="player__timer__total">
                        {{playerSt.currentTrackInfo.duration | msecondToMinutes}}
                    </div>
                </div>
                <!-- 进度条 -->
                <div class="slider player__progress-bar">
                    <input type="range" v-model="elapsed" :max="playerSt.currentTrackInfo.duration">
                </div>
                <!-- 下载 -->
                <div class="player__download">
                    <a :href="playerSt.onloadmp3Url" :download="playerSt.currentTrackInfo.title + '.mp3'"
                       class="fa fa-download hover-1" title="download"></a>
                </div>
                <!-- 选择音质 -->
                <select href="javascript:;" class="player__quality hover-1" v-model="quality">
                    <option v-for="(option,index) in qualityOptions" v-if="playerSt.currentTrackInfo.urls['q'+index]"
                            :value="option.value">{{option.text}}
                    </option>
                </select>
            </div>
            <ul class="player__controls">
                <!-- 重复 -->
                <li class="control control--small"
                    :class="{'control--active':playerSt.repeat,'control--dimmed':!playerSt.repeat}"
                    @click="toggleRepeat">
                    <span class="fa fa-retweet fa-3x"></span>
                </li>
                <!-- 上一首 -->
                <li class="control" @click="skipBack">
                    <span class="fa fa-backward fa-3x"></span>
                </li>
                <!-- 播放 暂停 -->
                <li class="control">
                    <span class="fa fa-play-circle fa-4x" @click="play" v-if="!playerSt.playing"></span>
                    <span class="fa fa-pause-circle fa-4x" @click="pause" v-if="playerSt.playing"></span>
                </li>
                <!-- 下一首 -->
                <li class="control" @click="skipForward">
                    <span class="fa fa-forward fa-3x"></span>
                </li>
                <!-- 随机播放 -->
                <li class="control control--small" :class="{
                    'control--active' : playerSt.shuffle,
                    'control--dimmed' : !playerSt.shuffle
                }" @click="toggleShuffle">
                    <span class="fa fa-random fa-3x"></span>
                </li>
            </ul>
            <h1 class="player__title" v-text="playerSt.currentTrackInfo.title"></h1>
            <h2 class="player__sub-title">{{playerSt.currentTrackInfo.album}} -
                                          {{playerSt.currentTrackInfo.artists}}</h2>
            <!-- 音量调节 -->
            <div class="player__volume">
                <div class="player__volume__icon control" @click="mute">
                    <span class="fa fa-volume-up fa-2x" v-if="!playerSt.muted"></span>
                    <span class="fa fa-volume-off fa-2x" v-if="playerSt.muted"></span>
                </div>
                <div class="slider slider--volume player__volume__slider">
                    <input type="range" v-model="volume" max="100"/>
                </div>
            </div>
            <!-- audio标签 -->
            <audio :src="playerSt.onloadmp3Url" id="audio" preload="auto" :autoplay="playerSt.playing"
                   :loop="playerSt.repeat"></audio>
        </div>
    </div>
</template>
<script>
    import {
        mapMutations,
        mapActions,
        mapState
    } from 'vuex'
    import * as types from 'store/mutation-types'

    export default {
        name: 'player',
        data() {
            return {
                qualityOptions: [{
                    text: '普通 96kbps',
                    value: '0'
                }, {
                    text: '较高 128kbps',
                    value: '1'
                }, {
                    text: '超高 192kbps',
                    value: '2'
                }, {
                    text: '无损 320kbps',
                    value: '3'
                }],
                shaking: false,
            }
        },
        computed: {
            ...mapState({
                state: state => state,
                playerSt: state => state.player
            }),
            // 音质
            quality: {
                get: function () {
                    return this.$store.state.quality;
                },
                set: function (newQuality) {
                    this.changeQuality(newQuality);
                }
            },
            // 播放进度
            elapsed: {
                get: function () {
                    return this.$store.state.player.elapsed;
                },
                set: function (newValue) {
                    this.$store.commit(types.UPDATE_PROGRESS_BAR, newValue);
                    audio.currentTime = newValue / 1000;
                }
            },
            // 音量
            volume: {
                get: function () {
                    return this.$store.state.player.volume;
                },
                set: function (newValue) {
                    this.$store.commit(types.UPDATE_VOLUME, newValue);
                    audio.volume = newValue / 100;
                }
            }
        },
        methods: {
            ...mapMutations({
                toggleRepeat: types.TOGGLE_REPEAT,
                toggleShuffle: types.TOGGLE_SHUFFLE
            }),
            ...mapActions([
                'play',
                'selectTrack',
                'skipForward',
                'skipBack',
            ]),
            // 改变音质
            changeQuality: function (newQuality) {
                const _this = this;
                let elapsed = this.playerSt.elapsed;

                this.pause();
                this.$store.commit(types.CHANGE_QUALITY, newQuality);
                // 抖动图片
                this.shaking = true;
                this.$store.dispatch('play').then(function () {
                    audio.oncanplaythrough = () => {
                        _this.shaking = false; // 停止抖动
                    };
                    // 恢复播放进度
                    audio.currentTime = elapsed / 1000;
                });
            },
            // 暂停
            pause: function () {
                if (!this.playerSt.playing) {
                    return;
                }
                audio.pause();
                this.$store.commit(types.SET_PAUSE);
            },
            // 静音
            mute: function () {
                if (this.playerSt.muted) {
                    audio.muted = false;
                    this.$store.commit(types.CHANGE_MUTE_STATE);
                } else {
                    audio.muted = true;
                    this.$store.commit(types.CHANGE_MUTE_STATE);
                }
            },

        }
    }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    // 高度响应式
    @media all and (max-height: 451px) {
        .player__cover {
            &--wrapper {
                display: none;
            }
            max-width: 0;
        }
    }

    @media (min-height: 452px) and (max-height: 591px) {
        .player__cover {
            &--wrapper {
                display: block;
            }
            max-width: 15em;
        }
    }

    @media (min-height: 592px) and (max-height: 691px) {
        .player__cover {
            &--wrapper {
                display: block;
            }
            max-width: 25em;
        }
    }

    @media all and (min-height: 692px) {
        .player__cover {
            &--wrapper {
                display: block;
            }
            max-width: 32em;
        }
    }

    .player {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #fff;
        text-align: center;
        font-family: fantasy, Nunito, arial, sans-serif;
        &--topbox {
            z-index: 1000;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        &__title {
            font-size: 1.8rem;
            line-height: 1.8em;
            margin-bottom: -1.2rem;
            padding: 0 1rem;
        }
        &__sub-title {
            font-size: 1.2rem;
            line-height: 1.2em;
            padding: 0 1rem;
            color: #7f7c6b;
            font-weight: 400;
        }
        &__cover {
            transition: all .8s;
            z-index: 999;
            margin: 0 auto;
            border-radius: 50%;
            animation: rotate 60s linear 0s infinite normal both paused;
            &--wrapper {
                background-color: #ddd8c8;
                padding: 1rem;
            }
            &--rotating {
                animation: rotate 60s linear 0s infinite normal both running;
            }
            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
        &__timer {
            background: #c1bdb1;
            display: flex;
            justify-content: space-between;
            padding: 0.6rem;
        }
        &__progress-bar {
            margin-top: -1rem;
        }
        &__controls {
            display: flex;
            justify-content: space-around;
            list-style: none;
        }
        &__volume {
            display: flex;
            padding: 2rem 6rem 3rem 6rem;
            &__slider {
                width: 100%;
            }
            &__icon {
                position: relative;
                left: -18px;
                top: -3px;
                padding: 0;
                width: 2rem;
                height: 2rem;
            }
        }
        &__download {
            position: absolute;
            right: 5%;
            font-size: 20px;
            bottom: 44px;
            z-index: 9999;
        }
        &__quality {
            font-family: fantasy, 'Microsoft YaHei', STXihei, sans-serif;
            font-weight: 900;
            font-size: 1.2rem;
            position: absolute;
            left: 5%;
            bottom: 48px;
            cursor: pointer;
            border: none;
            background: #ddd8c8;
            padding: 3px 2px 0 3px;
            z-index: 9999;
            &:focus {
                outline: none;
            }
            // 隐藏箭头
            // IE10
            &::-ms-expand {
                display: none;
            }
            /* Chrome */
            -webkit-appearance: none;
            /* Firefox */
            -moz-appearance: none;
            text-indent: 0.01px;
            text-overflow: ' ';
        }
    }

    .hide {
        display: none;
    }

    .enabled {
        color: #f9934e;
    }

    .slider {
        line-height: 1em;
        overflow: visible;
        padding: 6px 0;
        & [type=range] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: #e5e2e2;
            height: 8px;
            position: relative;
            width: 100%;
        }
        & [type=range]:focus {
            outline: none;
        }
        & [type=range]::-webkit-slider-thumb {
            appearance: none;
            background-color: #3f3d34;
            border-radius: 99px;
            cursor: pointer;
            height: 20px;
            position: relative;
            transition: -webkit-transform 0.2s;
            transition: transform 0.2s;
            width: 6px;
        }
        & [type=range]::-webkit-slider-thumb:active,
        & [type=range]::-webkit-slider-thumb:focus {
            transform: scale(1.3);
        }
        & [type=range]::-webkit-slider-thumb:after {
            background: #f9774e;
            bottom: 0;
            content: '';
            display: block;
            height: 8px;
            margin-top: -4px;
            pointer-events: none;
            position: absolute;
            right: 6px;
            top: 50%;
            width: 999px;
        }
        &--volume {
            [type=range]::-webkit-slider-thumb {
                background-color: #fff;
                border: 3px solid #f9774e;
                width: 20px;
            }
            [type=range]::-webkit-slider-thumb:after {
                right: 14px;
            }
        }
    }

    .icon {
        fill: currentcolor;
        height: 100%;
        width: 100%;
        &--inline {
            display: inline-block;
            height: 1em;
            width: 1em;
        }
    }

    .control {
        cursor: pointer;
        margin: 0;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        transition: all 0.6s ease;
        justify-content: center;
        &--small {
            -webkit-transform: scale(0.4);
            transform: scale(0.4);
        }
        &--dimmed {
            opacity: 0.5;
        }
        &--active {
            color: #f9774e;
        }
        &:active {
            color: #f9774e;
            transition: none;
        }
        &:focus,
        &:hover {
            opacity: 0.8;
        }
    }

</style>

