// 全局getters  用于模块间state的通信
// 这里就相当于一个集散中心，可以任意取出任何模块的state

// 获取默认歌单
export const tracks = (state) => state.songlist.tracks


