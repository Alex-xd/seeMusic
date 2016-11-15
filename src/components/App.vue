<!-- 根组件 在此组装子组件 -->
<template>
    <div class="music-player">
        <!--组装组件-->
        <Player></Player>
        <SongList></SongList>
        <!--<UserPanel></UserPanel>-->
    </div>
</template>
<script>
import Player from './player/Player.vue'
import SongList from './songlist/SongList.vue'
import store from '../store' 
import {mapActions} from 'vuex'

export default {
    components: {
        Player,
        SongList
    },
    store,// 根组件注入store
    methods:{
        ...mapActions(['initStore'])
    },
    mounted() { //初始化store数据
        this.initStore()
    }
}

</script>
<style scoped>
.music-player {
    color: #3f3d34;
    box-shadow: 0 0 1rem rgba(63, 61, 52, 0.6);
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 75em;
    padding: 0;
    width: 100%;
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
}
</style>

