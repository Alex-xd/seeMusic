<template>
    <div class="songlist--container">
        <ol class="songlist">
            <li class="songlist__track" v-for="(track,index) in state.tracks" :class="{'songlist__track--active':state.currentTrack === index}" @click="playthis(index)">
                <img :src="track.cover" class="songlist__track__cover">
                <div class="songlist__track__info">
                    <h3 class="songlist__track__info__title">{{track.title}}</h3>
                    <span class="songlist__track__info__sub-title">
                        {{track.album}} - {{track.artists}}
                    </span>
                </div>
                <span class="songlist__track__time">
                {{track.duration | time}}
            </span>
            </li>
        </ol>
    </div>
</template>
<script>
import {
    mapMutations,
    mapActions,
    mapState
} from 'vuex'

export default {
    components: {
    },
    computed: {
        ...mapState({
            state: state => state,
            playerSt: state => state.player
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
<style lang="scss">
.songlist--container {
    height: 85%;
}

.songlist {
    background: #4a473c;
    color: #f2f2f2;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 3rem;
    &__track {
        display: flex;
        justify-content: space-between;
        padding: 2rem 0;
        cursor: pointer;
        margin: 0;
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


/* 滚动条样式 */

::-webkit-scrollbar {
    width: 15px;
}

::-webkit-scrollbar-track {
    display: none;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-button {
    background-color: #3f3d34;
}

</style>

