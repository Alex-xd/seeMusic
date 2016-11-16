<template>
    <div class="player">
        <img :src="player.currentTrackInfo.cover" class="player__cover">
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
                <svg class="icon" viewbox="0 0 100 100" @click="play" v-if="!player.playing">
                    <use xlink:href="#play"></use>
                </svg>
                <svg class="icon" viewbox="0 0 100 100" @click="pause" v-if="player.playing">
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
        <div class="player__volume">
            <div class="player__volume__icon">
                <svg class="icon" viewbox="0 0 100 100">
                    <use xlink:href="#volume"></use>
                </svg>
            </div>
            <div class="slider slider--volume player__volume__slider">
                <input type="range" :value="player.volume" max="100" />
            </div>
        </div>
        <SVGcomponent></SVGcomponent>
        <!-- <audio :src="" class="audio"></audio> -->
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
        ...mapActions(['play', 'pause', 'skipBack', 'skipForward'])
    }
}

</script>
<style lang="sass" scoped>


</style>

