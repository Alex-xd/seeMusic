import './css/main.css'
import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './components/App.vue'
import { time } from './filters.js'
import VueRouter from 'vue-router'
import SongList from 'components/SongList'

Vue.use(VueRouter);
Vue.filter('time', time);

const routes = [
    { path: '/', component: SongList },
    { path: '/songlist', component: SongList }
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    router,
    ...App,
}).$mount('#app')
