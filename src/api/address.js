// 是否使用远程服务器url（用于构建electron时请设置为true）
let fullUrl = true;

let host = fullUrl ? 'http://119.29.148.154:8080' : '';

export default {
    // 根据歌曲名或歌手名查找歌区
    getSongs: host + '/Server/Song',
    // 获取默认歌单
    getDefaultSongList: host + '/Server/Recommend', 
    // 根据歌曲id获取评论
    getComments: host + '/Server/Comments',
    // 添加好友
    addFriend: host + '/Server/Add_friends',
    // 获取好友的收藏
    getFriendCollections: host + '/Server/Get_friend_list',
    // 添加歌曲到收藏夹
    addToCollections: host + '/Server/Addto_List',
}
