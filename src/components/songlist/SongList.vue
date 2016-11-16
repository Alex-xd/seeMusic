<template>
    <ol class="songlist">
        <!-- :class="{songlist__track--active:player.currentTrack === $index}" -->
        <li class="songlist__track" v-for="track in tracks">
            <img :src="track.cover" class="songlist__track__cover">
            <div class="songlist__track__info">
                <h3 class="songlist__track_title">{{track.title}}</h3>
                <span class="songlist__track__sub-title">
                        {{track.album}} - {{track.artist}}
                    </span>
            </div>
            <span class="songlist__track__time">
                {{track.duration | time}}
            </span>
        </li>
    </ol>
</template>
<script>
//【删】
import {
    mapMutations,
    mapGetters,
    mapActions
} from 'vuex'

export default {
    computed: {
        tracks(){
            return this.$store.state.songlist.tracks
        }
    }
}

</script>
<style scoped lang="sass">
@media (min-width: 33em) {
    .songlist {
        width: 56%;
    }
}

.songlist {
    background: #4a473c;
    color: #f2f2f2;
    width: 100%;
    height: 520px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 3rem;
    &__track {
        display: flex;
        justify-content: space-between;
        padding: 2rem 0;
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
            &__title {
                font-size: 1.5rem;
                line-height: 1em;
                margin-top: .75rem;
            }
        }
        &--active {
            color: #f9774e;
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
    background-color: #7c2929;
}

</style>

