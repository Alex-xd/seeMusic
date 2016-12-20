<!-- 顶栏控制面板 -->
<template>
    <div>
        <header class="panel">
            <div class="panel--left">
                <router-link to="/songlist" class="panel__item hover-1">
                    <span class="fa fa-list"></span>
                    <span>SongList</span>
                </router-link>
                <router-link to="/login" class="panel__item hover-1">
                    <span class="fa fa-user-circle"></span>
                    <span>LogIn</span>
                </router-link>
                <router-link to="/comments" class="panel__item hover-1">
                    <span class="fa fa-comments-o"></span>
                    <span>Comments</span>
                </router-link>
            </div>
            <div class="panel--right">
                <Search></Search>
            </div>
        </header>
    </div>
</template>
<script>
    import Search from './Search';

    export default {
        name: 'panel',
        components: {
            Search
        }
    }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .panel {
        height: 100%;
        background: #3f3d34;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &--left,
        &--right {
            padding: 0 30px;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        &__item {
            font-size: 1.5rem;
            font-style: italic;
            font-family: fantasy, 'Microsoft YaHei', STXihei, sans-serif;
            font-weight: 900;
            color: #b6423a;
            margin: 0 10px;
        }
    }

</style>

