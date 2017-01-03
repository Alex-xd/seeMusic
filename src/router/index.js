import Vue from 'vue'
import Router from 'vue-router'
import SongList from 'components/SongList'
import Comments from 'components/Comments'
import User from 'components/User'

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect:'/songlist'
    },
    {
        path: '/songlist',
        component: SongList
    },
    {
        path: '/comments',
        component: Comments
    },
    {
        path: '/user',
        component: User
    }
];

const router = new Router({
    routes
});

export default router

