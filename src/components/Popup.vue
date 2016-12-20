<template>
    <transition name="fade">
        <div class="popup" v-show="isShow">
            {{msg}}
        </div>
    </transition>
</template>

<script>
    export default{
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

<style lang="scss" rel="stylesheet/scss">
    // 进场
    .fade-enter-active {
        animation: fadeIn 400ms
    }

    // 离场
    .fade-leave-active {
        animation: fadeOut 400ms
    }

    .popup {
        z-index: 9999;
        position: fixed;
        top: 40%;
        left: 50%;
        color: #f2f2f2;
        background: #b6423a;
        padding: 20px 40px;
        transform: translate3d(-50%, -50%, 0);
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