<style lang="sass">
.slider {
    line-height: 1em;
    overflow: hidden;
    padding: 6px 0;
}

.slider [type=range] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #f2f2f2;
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
    -webkit-transition: -webkit-transform .2s;
    transition: -webkit-transform .2s;
    transition: transform .2s;
    transition: transform .2s, -webkit-transform .2s;
    width: 6px;
}

.slider [type=range]::-webkit-slider-thumb:focus,
.slider [type=range]::-webkit-slider-thumb:active {
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
    transition: opacity .4s, color .4s;
    &--small {
        -webkit-transform: scale(0.4);
        transform: scale(0.4);
    }
    &--dimmed {
        opacity: .6;
    }
    &--outlined {
        border: 2px solid #f2f2f2;
        border-radius: 100%;
    }
    &--active {
        color: #f9774e;
    }
    &:active {
        color: #f9774e;
        transition: none;
    }
    &:hover,
    &:focus {
        opacity: .8;
    }
}

@media screen and (min-width:451px) {
    .player {
        width: 44%;
    }
}

@media screen and (max-width:450px) {
    .player {
        width: 100%;
    }
}

.player {
    background: #fff;
    text-align: center;
    &__title {
        font-size: 27.3px;
        font-size: 1.95rem;
        line-height: 1em;
        margin: 0 0 13.65px;
        margin: 0 0 0.975rem;
    }
    &__sub-title {
        font-size: 21px;
        font-size: 1.5rem;
        line-height: 1em;
        margin: 0 0 10.5px;
        margin: 0 0 0.75rem;
        color: #7f7c6b;
        font-weight: 400;
    }
    &__cover {
        display: block;
        max-width: 33em;
        z-index: 9999;
        border-radius: 50%;
        &--playing {
            animation: 16s linear 0s infinite normal both running rotate;
            @keyframes rotate {
                from {
                    transform: rotate(0);
                }
                to {
                    transform: rotate(360deg);
                }
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
        padding: 1rem;
    }
    &__progress-bar {
        margin-top: -1rem;
    }
    &__controls {
        display: flex;
        list-style: none;
        padding: 1rem 2rem;
        height: 111px;
        margin: 2rem 0;
    }
    &__volume {
        display: flex;
        padding: 2rem;
        &__slider {
            width: 100%;
        }
        &__icon {
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
        }
    }
}

.hide.hide {
    display: none;
}

</style>
<template>
    <div class="player">
        <div class="player__cover--wrapper">
            <img :src="player.imgUrl" class="player__cover" :class="{'player__cover--playing':player.playing}">
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
            <input type="range" :value="player.elapsed" :max="player.currentTrackInfo.duration">
        </div>
        <ul class="player__controls">
            <!-- 重复 -->
            <li class="control control--small" :class="{'control--active':player.repeat,'control--dimmed':!player.repeat}" @click="toggleRepeat">
                <svg class="icon" viewbox="0 0 100 100">
                    <use xlink:href="#repeat"></use>
                </svg>
            </li>
            <!-- 上一首 -->
            <li class="control" @click="skipBack">
                <svg class="icon" viewbox="0 0 100 100">
                    <use xlink:href="#skip-back"></use>
                </svg>
            </li>
            <!-- 播放 暂停 -->
            <li class="control control--outlined">
                <svg class="icon" viewbox="0 0 100 100" @click="play" v-if="!player.songReady">
                    <use xlink:href="#play"></use>
                </svg>
                <svg class="icon" viewbox="0 0 100 100" @click="pause" v-if="player.songReady">
                    <use xlink:href="#pause"></use>
                </svg>
            </li>
            <!-- 下一首 -->
            <li class="control" @click="skipForward">
                <svg class="icon" viewbox="0 0 100 100">
                    <use xlink:href="#skip-forward"></use>
                </svg>
            </li>
            <!-- 随机播放 -->
            <li class="control control--small" v-bind:class="{
                    'control--active' : player.shuffle,
                    'control--dimmed' : !player.shuffle
                }" @click="toggleShuffle">
                <svg class="icon" viewbox="0 0 100 100">
                    <use xlink:href="#shuffle"></use>
                </svg>
            </li>
        </ul>
        <h1 class="player__title" v-text="player.currentTrackInfo.title"></h1>
        <h2 class="player__sub-title">{{player.currentTrackInfo.album}} - {{player.currentTrackInfo.artist}}</h2>
        <!-- 音量调节 -->
        <div class="player__volume">
            <div class="player__volume__icon">
                <svg class="icon" viewbox="0 0 100 100">
                    <use xlink:href="#volume"></use>
                </svg>
            </div>
            <div class="slider slider--volume player__volume__slider">
                <input type="range" :value="player.volume" max="1" />
            </div>
        </div>
        <SVGcomponent></SVGcomponent>
        <audio :src="player.currentTrackInfo.mp3Url" id="audio" controls preload="auto"></audio>
    </div>
</template>
<script>
import {
    mapMutations,
    mapActions,
    mapGetters
} from 'vuex'
import SVGcomponent from './SVG.vue'
import * as types from '../../store/mutation-types.js'

export default {
    components: {
        SVGcomponent
    },
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
            'skipForward'
        ]),
    }
}

</script>

