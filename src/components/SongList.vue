<template>
    <div>
        <ol class="songlist animation-menu-1" v-if="!state.loading">
            <li class="songlist__track" v-for="(track,index) in state.tracks"
                :class="{'songlist__track--active':state.currentTrack === index}" @click="playthis(index)">
                <!--<img :src="track.cover" class="songlist__track__cover">-->
                <div class="songlist__track__info">
                    <h3 class="songlist__track__info__title">{{track.title}}</h3>
                    <span class="songlist__track__info__sub-title">
                        {{track.album}} - {{track.artists}}
                    </span>
                </div>
                <span class="songlist__track__time">
                {{track.duration | msecondToMinutes}}
            </span>
            </li>
        </ol>
        <Loading v-if="state.loading"></Loading>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'

    export default {
        name: 'songlist',
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
        &__track {
            margin-right: -1px;
            background: #4a473c;
            display: flex;
            justify-content: space-between;
            padding: 2rem 3rem;
            cursor: pointer;
            border-bottom: 1px solid #3f3d34;
            &__cover {
                width: 3rem;
                height: 3rem;
                max-width: 100%;
            }
            &__info {
                margin: 0 2rem;
                width: 100%;
            }
            &--active {
                color: #f9934e;
            }
        }
    }

</style>

