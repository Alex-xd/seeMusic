// 是否使用远程服务器url（用于构建electron时请设置为true）
let fullUrl = 0;

let host = fullUrl ? 'http://music.alexxd.com' : '';

export default {
    // 根据歌曲名或歌手名查找歌曲 s
    searchSongs: host + '/Server/Song',
    // 获取默认歌单  无参数
    getDefaultSonglist: host + '/Server/Recommend',
    // 根据歌曲id获取评论  
    getComments: host + '/Server/Comments',
    // 添加好友
    addFriend: host + '/Server/Add_friends',
    // 获取好友的收藏
    getFriendCollections: host + '/Server/Get_friend_list',
    // 添加歌曲到收藏夹
    addToCollections: host + '/Server/Addto_List',
    // 根据dfsid获取任意品质音源 dfsid
    getUrlByDfsId: host + '/Server/Encipher',
    // 登录
    login: host + 'Server/Login',


}
