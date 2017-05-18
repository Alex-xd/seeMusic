<template>
    <div>
        <ol class="list animation-style-1" v-if="!loading">
            <ListItem v-for="(track,index) in state.user.tracks"
                      :title="track.title"
                      :subtitle="track.singer"
                      :number="track.time"
                      :key="index"
            ></ListItem>
        </ol>
        <Loading v-if="loading"></Loading>
    </div>
</template>

<script>
    import ListItem from './ListItem'
    import {mapState} from 'vuex'

    export default {
        name: 'user',
        components: {
            ListItem
        },
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapState({
                state: state => state
            })
        },
        mounted() {
            this.loading = true;
            this.$store.dispatch('getUserInfo').then(() => {
                this.loading = false;
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .list {
        color: #f2f2f2;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
</style>