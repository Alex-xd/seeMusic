/**
 * 对歌曲相关API做一层封装，方便统一管理，
 */
import axios from 'axios'
import API from './address.js'
import buildOpt from 'root/build.option.js'

let baseURL = buildOpt.absoluteURL ? 'http://119.29.148.154/Server' : '/Server';

const request = axios.create({
    baseURL: baseURL
});

export default {
    // 获取默认歌单
    getDefaultSonglist: () => request.get(API.getDefaultSonglist),

    // 搜索歌曲
    searchSongs: (param) => request.get(API.searchSongs, {params: {s: param}}),

    // 根据dfsid获取任意品质音源
    getUrlByDfsId: (param) => request.get(API.getUrlByDfsId, {params: {dfsid: param}}),

    // 获取评论
    getCommments: (param) => request.get(API.getComments, {params: {rid: param}}),

    // 添加歌曲到收藏夹
    addToCollections: () => request.get(API.addToCollections),

    /**
     * 登录
     * @param params {object} 格式：{username:xxx, password:xxx}
     */
    login: (params) => request.post(API.login, params),

    // 获取用户歌
    getUserInfo: () => request.get(API.getUserInfo),

}
