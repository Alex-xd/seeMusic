/**
 * 对歌曲相关API做一层封装，方便统一管理，
 */
import axios from 'axios'
import API from './address.js'
import buildOpt from 'root/build.option.js'

let baseURL = buildOpt.absoluteURL ? 'http://119.29.148.154' : '';

const request = axios.create({
    baseURL: baseURL
});

export default {
    /**
     * 获取默认歌单
     * @return {promise}
     */
    getDefaultSonglist: () => request.get(API.getDefaultSonglist),

    /**
     * @params options {object} 格式：{params: {s: keywords }}
     * @return {promise}
     */
    searchSongs: (keywords) => request.get(API.searchSongs, {params: {s: keywords}}),

    // 根据dfsid获取任意品质音源
    getUrlByDfsId: (dfsid) => request.get(API.getUrlByDfsId, {params: {dfsid: dfsid}}),

    /**
     *  获取评论
     *  @params options {object} 格式：{params: {rid: commentThreadId }}
     */
    getCommments: (rid) => request.get(API.getComments, {params: {rid: rid}}),

    // 添加歌曲到收藏夹
    addToCollections: () => request.get(API.addToCollections),

    /**
     * 登录
     * @param params {object} 格式：{username:xxx, password:xxx}
     */
    login: (params) => request.post(API.login, params),
}
