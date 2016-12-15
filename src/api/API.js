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
    getDefaultSonglist: () => axios.get(API.getDefaultSonglist),

    /**
     * @params options 是一个对象 格式：{params: {s: keywords }}
     * @return {promise}
     */
    searchSongs: (options) => axios.get(API.searchSongs, options),

    // 根据dfsid获取任意品质音源
    getUrlByDfsId: (options) => axios.get(API.getUrlByDfsId, options),

    // 获取评论
    getCommments: (options) => axios.get(API.getComments, options),

    // 添加歌曲到收藏夹
    addToCollections: () => axios.get(API.addToCollections),

    

}
