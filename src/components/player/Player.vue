<style lang="scss">
.slider {
    line-height: 1em;
    overflow: visible;
    padding: 6px 0;
}

.slider [type=range] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #e5e2e2;
    height: 8px;
    position: relative;
    width: 100%;
}
.slider [type=range]:focus {
    outline: none;
}

.slider [type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: #3f3d34;
    border-radius: 99px;
    cursor: pointer;
    height: 20px;
    position: relative;
    -webkit-transition: -webkit-transform 0.2s;
    transition: -webkit-transform 0.2s;
    transition: transform 0.2s;
    transition: transform 0.2s, -webkit-transform 0.2s;
    width: 6px;
}
.slider [type=range]::-webkit-slider-thumb:active,
.slider [type=range]::-webkit-slider-thumb:focus {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
}
.slider [type=range]::-webkit-slider-thumb:after {
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

.slider--volume [type=range]::-webkit-slider-thumb {
    background-color: #fff;
    border: 3px solid #f9774e;
    width: 20px;
}
.slider--volume [type=range]::-webkit-slider-thumb:after {
    right: 14px;
}

.icon {
    fill: currentcolor;
    height: 100%;
    width: 100%;
}

.icon--inline {
    display: inline-block;
    height: 1em;
    width: 1em;
}

.control {
    cursor: pointer;
    margin: 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    transition: all 0.8s ease;
    justify-content: center;
    &--small {
        -webkit-transform: scale(0.4);
        transform: scale(0.4);
    }
    &--dimmed {
        opacity: 0.6;
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
@media screen and (min-width:451px) {
    .player {
        width: 40%;
    }
}
@media screen and (max-width:450px) {
    .player {
        width: 100%;
    }
}

.player {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    text-align: center;
    font-family: fantasy, Nunito, arial, sans-serif;
    &__title {
        font-size: 1.8rem;
        line-height: 1.8em;
        // margin: 0 0 0.975rem;
        margin-bottom: -1.2rem;
        padding: 0 1rem;
    }
    &__sub-title {
        font-size: 1.2rem;
        line-height: 1.2em;
        // margin: 0 0 0.75rem;
        padding: 0 1rem;
        color: #7f7c6b;
        font-weight: 400;
    }
    &__cover {
        display: block;
        max-width: 25em;
        width: 93%;
        z-index: 9999;
        margin: 0 auto;
        border-radius: 50%;
        transition: all 2s;
        animation: 60s linear 0s infinite normal both paused rotate;
        &--rotating {
            animation: 60s linear 0s infinite normal both running rotate;
        }
        @keyframes rotate {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        &--wrapper {
            background-color: #ddd8c8;
            padding: 1rem;
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
        // padding: 1rem 2rem;
        // margin: 0 0 1rem 0;
    }
    &__volume {
        display: flex;
        padding: 2rem 4rem 2rem 5rem;
        // padding: 0 4rem 2rem 5rem;
        &__slider {
            width: 100%;
        }
        &__icon {
            padding: 0;
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
        }
    }
}

.hide.hide {
    display: none;
}

.player__topbox {
    display: flex;
    flex-direction: column;
}
</style>
<template>
<div class="player">
    <div class="player__topbox">
        <div class="player__cover--wrapper">
            <img :src="player.imgUrl" class="player__cover" :class="{'player__cover--rotating':player.playing}">
        </div>
        <div class="player__timer">
            <div class="player__timer__elapsed">
                {{player.elapsed | time}}
            </div>
            <div class="player__timer__total">
                {{player.currentTrackInfo.duration | time}}
            </div>
        </div>
        <div class="slider player__progress-bar">
            <input type="range" :value="player.elapsed" @input="changeElapsed" :max="player.currentTrackInfo.duration">
        </div>
    </div>
    <ul class="player__controls">
        <!-- 重复 -->
        <li class="control control--small" :class="{'control--active':player.repeat,'control--dimmed':!player.repeat}" @click="toggleRepeat">
            <span class="fa fa-retweet fa-3x"></span>
        </li>
        <!-- 上一首 -->
        <li class="control" @click="skipBack">
            <span class="fa fa-backward fa-3x"></span>
        </li>
        <!-- 播放 暂停 -->
        <li class="control">
            <span class="fa fa-play-circle fa-4x" @click="play" v-if="!player.playing"></span>
            <span class="fa fa-pause-circle fa-4x" @click="pause" v-if="player.playing"></span>
        </li>
        <!-- 下一首 -->
        <li class="control" @click="skipForward">
            <span class="fa fa-forward fa-3x"></span>
        </li>
        <!-- 随机播放 -->
        <li class="control control--small" v-bind:class="{
                    'control--active' : player.shuffle,
                    'control--dimmed' : !player.shuffle
                }" @click="toggleShuffle">
            <span class="fa fa-random fa-3x"></span>
        </li>
    </ul>
    <h1 class="player__title" v-text="player.currentTrackInfo.title"></h1>
    <h2 class="player__sub-title">{{player.currentTrackInfo.album}} - {{player.currentTrackInfo.artists}}</h2>
    <!-- 音量调节 -->
    <div class="player__volume">
        <div class="player__volume__icon control" @click="mute">
            <span class="fa fa-volume-up fa-2x" v-if="!player.muted" style="position:relative;top:-3px;"></span>
            <span class="fa fa-volume-off fa-2x" v-if="player.muted" style="position:relative;top:-3px;"></span>
        </div>
        <div class="slider slider--volume player__volume__slider">
            <input type="range" :value="player.volume" @input="changeVolume" max="100" />
        </div>
    </div>
    <!-- audio标签 -->
    <audio :src="player.onloadmp3Url" id="audio" preload="auto" :autoplay="player.playing" :loop="player.repeat"></audio>
</div>
</template>
<script>
import {
    mapMutations,
    mapActions,
    mapGetters
} from 'vuex'
import * as types from 'store/mutation-types'

export default {
    computed: {
        ...mapGetters([
            'player'
        ])
    },
    methods: {
        ...mapMutations({
            toggleRepeat: types.TOGGLE_REPEAT,
            toggleShuffle: types.TOGGLE_SHUFFLE
        }),
        ...mapActions([
            'play',
            'pause',
            'skipBack',
            'skipForward',
            'mute'
        ]),
        changeVolume(e) {
            this.$store.commit(types.UPDATE_VOLUME, e.target.value);
            document.getElementById('audio').volume = e.target.value / 100;
        },
        changeElapsed(e) {
            this.$store.commit(types.UPDATE_PROGRESS_BAR, e.target.value);
            document.getElementById('audio').currentTime = e.target.value / 1000;
        }
    }
}
</script>
