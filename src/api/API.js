/**
 * 对歌曲相关API做一层封装，方便统一管理，
 */
import axios from 'axios'
import API from './address.js'

export default {
    /**
     * 获取默认歌单
     * @return {promise}
     */
    getDefaultSonglist: () => axios.get(API.getDefaultSonglist),

    /**
     * @params options {object} 格式：{params: {s: keywords }}
     * @return {promise}
     */
    searchSongs: (keywords) => axios.get(API.searchSongs, {params: {s: keywords}}),

    // 根据dfsid获取任意品质音源
    getUrlByDfsId: (dfsId) => axios.get(API.getUrlByDfsId, {params: {dfsId: dfsId}}),

    /**
     *  获取评论
     *  @params options {object} 格式：{params: {rid: commentThreadId }}
     */
    getCommments: (rid) => axios.get(API.getComments, {params: {rid: rid}}),

    // 添加歌曲到收藏夹
    addToCollections: () => axios.get(API.addToCollections),

    /**
     * 登录
     * @param params {object} 格式：{username:xxx, password:xxx}
     */
    login: (params) => axios.post(API.login, params),
}
