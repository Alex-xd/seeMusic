/**
 * 对歌曲相关API做一层封装，方便统一管理，
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
// import axios from 'axios'
import API from './address.js'

Vue.use(VueResource);

export default {
    // 获取默认歌单 返回promise
    getDefaultSonglist() {
        // return axios.get(API.getDefaultSongList)
        return Vue.http.get(API.getDefaultSongList)
    },
    /**
     * @params options 参数，是一个对象 格式：{params: {s: keywords }}
     */
    searchSongs(options) {
        // return axios.get(API.getSongs, options)
        return Vue.http.get(API.getSongs, options)
    }
}
