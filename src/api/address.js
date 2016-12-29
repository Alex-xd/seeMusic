export default {
    // 根据歌曲名或歌手名查找歌曲 s
    searchSongs: '/Song',
    // 获取默认歌单  无参数
    getDefaultSonglist: '/Recommend',
    // 根据歌曲id获取评论  
    getComments: '/Comments',
    // 根据dfsid获取任意品质音源 dfsid
    getUrlByDfsId: '/Encipher',
    // 登录
    login: '/Login',
    // 用户歌单
    getUserInfo:'/User_Info',
    // 添加好友
    addFriend: '/Add_friends',
    // 获取好友的收藏
    getFriendCollections: '/Get_friend_list',
    // 添加歌曲到收藏夹
    addToCollections: '/Addto_List'
}
