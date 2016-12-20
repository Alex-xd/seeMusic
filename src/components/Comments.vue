<template>
    <div>
        <ol class="com-list animation-menu-2" v-if="!state.loading">
            <li class="com-list__track" v-for="(comment,index) in comments">
                <img :src="comment.avatarUrl" class="com-list__track__cover">
                <div class="com-list__track__info">
                    <p class="com-list__track__info__title"><span>{{comment.nickname}}:</span>&nbsp; {{comment.content}}
                    </p>
                    <span class="com-list__track__info__sub-title">
                        {{comment.time | getTime}}
                    </span>
                </div>
                <span class="com-list__track__liked-count">
                {{comment.likedCount}}人赞同
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
    import API from "api/API";
    import {CHANGE_LOADING_STATE} from "store/mutation-types";

    export default {
        name: 'comments',
        data() {
            return {
                comments: []
            }
        },
        computed: {
            ...mapState({
                state: state => state,
            })
        },//TODO:将评论改成异步组件
        mounted(){
            this.$store.commit(CHANGE_LOADING_STATE);
            API.getCommments(this.$store.state.player.currentTrackInfo.commentThreadId)
                .then(({data:{hotComments:comments}}) => {
                    comments.forEach((elem) => {
                        let o = {};
                        ({
                            content: o.content,
                            likedCount: o.likedCount,
                            time: o.time,
                            user: {
                                nickname: o.nickname,
                                avatarUrl: o.avatarUrl
                            }
                        } = elem);
                        this.comments.push(o);
                    });
                    this.$store.commit(CHANGE_LOADING_STATE);
                }).catch((e) => {
                this.$store.dispatch('showPopup', {
                    msg: 'Error:' + e.message,
                    autodes: 2500
                });
                console.error(e.message);
                this.$store.commit(CHANGE_LOADING_STATE);
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .com-list {
        color: #f2f2f2;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        font-weight: 400;
        font-size: 1.2rem;
        &__track {
            line-height: 1.5em;
            margin-right: -1px;
            background: #4a473c;
            display: flex;
            justify-content: space-between;
            padding: 2rem 2.5rem;
            border-bottom: 1px solid #3f3d34;
            &__cover {
                width: 3rem;
                height: 3rem;
                max-width: 100%;
                border-radius: 50%;
            }
            &__info {
                margin: 0 1rem;
                width: 100%;
                &__sub-title {
                    line-height: 2em;
                }
                &__title span {
                    color: #FC9452;
                    font-weight:bold;
                }
            }
            &__liked-count {
                font-size: 1rem;
                align-self: flex-end;
                font-weight: bold;
            }

        }
    }
</style>