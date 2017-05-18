<template>
    <div>
        <ol class="songlist animation-style-1" v-if="!state.loading">
            <ListItem v-for="(track,index) in state.tracks"
                      :isActive="state.currentTrack === index"
                      :title="track.title"
                      :cover="track.cover"
                      :subtitle="track.album + ' - ' + track.artists"
                      :number="track.duration | msecondToMinutes"
                      @click.native="playthis(index)"
                      :key="index"
            ></ListItem>
        </ol>
        <Loading v-if="state.loading"></Loading>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import ListItem from './ListItem'

    export default {
        name: 'songlist',
        components:{
            ListItem
        },
        computed: {
            ...mapState({
                state: state => state
            })
        },
        methods: {
            playthis(index) {
                this.$store.dispatch('selectTrack', {
                    newtrack: index,
                    isSelected: true
                });
            }
        }
    }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .songlist {
        color: #f2f2f2;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

</style>

