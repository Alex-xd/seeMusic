export default {
    // 根据歌曲名或歌手名查找歌曲 s
    searchSongs: '/Server/Song',
    // 获取默认歌单  无参数
    getDefaultSonglist: '/Server/Recommend',
    // 根据歌曲id获取评论  
    getComments: '/Server/Comments',
    // 添加好友
    addFriend: '/Server/Add_friends',
    // 获取好友的收藏
    getFriendCollections: '/Server/Get_friend_list',
    // 添加歌曲到收藏夹
    addToCollections: '/Server/Addto_List',
    // 根据dfsid获取任意品质音源 dfsid
    getUrlByDfsId: '/Server/Encipher',
    // 登录
    login: 'Server/Login',
}
