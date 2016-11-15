// 拼装vuex实例
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import * as getters from './getters'
import player from './modules/player.js'
import songlist from './modules/songlist.js'

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        player,
        songlist
    },
    strict: process.env.NODE_ENV !== 'production' //自动判断是否为发布环境，自动决定是否启用严格模式
})
