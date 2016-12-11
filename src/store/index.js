// 拼装vuex实例
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import player from './modules/player'
import songlist from './modules/songlist'
Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    mutations,
    modules: {
        songlist,
        player
    },
    strict: process.env.NODE_ENV !== 'production' //发布环境不使用严格模式
})
