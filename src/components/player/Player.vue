<template>
    <div class="player">
        <img :src="currentTrackInfo.cover" class="player__cover">
        <div class="player__timer">
            <div class="player__timer__elapsed">
                {{player.elapsed | time}}
            </div>
            <div class="player__timer__total">
                {{currentTrackInfo.duration | time}}
            </div>
        </div>
        <div class="slider player__progress-bar">
            <input type="range" :value="player.elapsed" :max="currentTrackInfo.duration">
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
        <SVGcomponent></SVGcomponent>
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
            'currentTrackInfo',
            'player'
        ])
    },
    methods: {
        ...mapMutations({
            toggleRepeat: types.TOGGLE_REPEAT,
            toggleShuffle: types.TOGGLE_SHUFFLE,
            pause: types.PAUSE,
            skipBack: types.SKIP_BACK,
            skipForward: types.SKIP_FORWARD
        }),
        ...mapActions(['play'])
    }
}

</script>
<style lang="sass" scoped>


</style>

