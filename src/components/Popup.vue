<template>
    <transition name="fade">
        <div class="popup" v-show="show" :class="className">
            {{msg}}
        </div>
    </transition>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'popup',
        computed: {
            ...mapState({
                className: state => state.popup.className,
                msg: state => state.popup.msg,
                show: state => state.popup.show
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .popup {
        font-size: 1.3rem;
        font-family: Helvetica, 'Microsoft YaHei', STXihei, sans-serif;
        color: #f2f2f2;
        padding: 20px 40px;
    }

    .normal {
        background: #b6423a;
    }

    .warn {
        background: #fc9452;
    }
</style>