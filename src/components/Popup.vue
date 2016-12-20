<template>
    <transition name="fade">
        <div class="popup" v-show="isShow">
            {{msg}}
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'popup',
        computed: {
            msg(){
                return this.$store.state.popup.msg
            },
            isShow(){
                return this.$store.state.popup.isShow
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .popup {
        font-size: 1.3rem;
        font-family: Helvetica, 'Microsoft YaHei', STXihei, sans-serif;
        color: #f2f2f2;
        background: #b6423a;
    }

    // 进场
    .fade-enter-active {
        animation: fadeIn 400ms
    }

    // 离场
    .fade-leave-active {
        animation: fadeOut 400ms
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: rotateX(-90deg) rotateY(-90deg) translate3d(-50%, 50px, 0);
        }
        100% {
            opacity: 1;
            transform: rotateX(0deg) rotateY(0deg) translate3d(-50%, -50%, 0);
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: rotateX(0deg) rotateY(0deg) translate3d(-50%, -50%, 0);
        }
        100% {
            opacity: 0;
            transform: rotateX(-90deg) rotateY(90deg) translate3d(-50%, 50px, 0);
        }
    }
</style>