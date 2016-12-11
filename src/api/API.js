/**
 * 对歌曲相关API做一层封装，方便统一管理，
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import API from './address.js'

Vue.use(VueResource);

export default {
    // 获取默认歌单 返回promise
    getDefaultSonglist() {
        return Vue.http.get(API.getDefaultSongList)
    },
    searchSongs(options) {
        return Vue.http.get(API.getSongs, options)
    }
}
