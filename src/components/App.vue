<!-- 根组件 在此组装子组件 -->
<template>
<div class="music-player">
    <!--组装子组件-->
    <Player></Player>
    <SongList></SongList>
    <!-- <Panel></Panel> -->
</div>
</template>
<script>
import store from 'store/index'
import Player from './Player'
import SongList from './SongList'

export default {
    components: {
        Player,
        SongList,
        // Panel
    },
    // 根组件注入store
    store,
    mounted() {
        //初始化
        this.$store.dispatch('init');
        audio.addEventListener("canplaythrough", function() {
            audio.play();
        }, false);
    }
}

</script>
<style style="scss">
.music-player {
    height: 100%;
    color: #3f3d34;
    /*box-shadow: 0 0 1rem rgba(63, 61, 52, 0.6);*/
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    /*max-width: 74em;*/
    padding: 0;
    width: 100%;
}


/*@media (min-width:75em) {
    .music-player {
        margin: 2.5rem auto;
    }
}

@media (min-width:42em) {
    .music-player {
        margin: 2rem auto;
    }
}
*/
</style>
