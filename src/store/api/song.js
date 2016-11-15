/**
 * 对歌曲相关API做一层封装，方便统一管理，
 * 而且可以不用在其他地方重复引入api.js、vue和vue-resouce
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import API from './api.js'

Vue.use(VueResource);

export default {
    // 获取默认歌单 返回promise
    getDefaultSonglist() {
        return Vue.http.get(API.defauleSongList)
    }
}
