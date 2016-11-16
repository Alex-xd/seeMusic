//全局actions
import * as types from './mutation-types'
import song from './api/song.js'

export const initStore = ({ commit }) => {
    song.getDefaultSonglist()
        .then((rsp) => {
            rsp.json()
                .then((data) => {
                    commit(types.INIT_SONGLIST, data);
                })
        }).catch((e) => console.error(e))
}

// export const play = ({commit,state}) =>{
// 	let timer = setInterval(()=>{
// 		state
// 	},1000)
// }