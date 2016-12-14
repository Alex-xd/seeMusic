/**
 * 对歌曲相关API做一层封装，方便统一管理，
 */
import Vue from 'vue'
import axios from 'axios'
import API from './address.js'

export default {
    /**
     * 获取默认歌单
     * @return {promise}
     */
    getDefaultSonglist: () => axios.get(API.getDefaultSongList),

    /**
     * @params options 是一个对象 格式：{params: {s: keywords }}
     * @return {promise}
     */
    searchSongs: (options) => axios.get(API.getSongs, options),

    getUrlByDfsId: (options) => axios.get(API.getMp3Url, options),
}
