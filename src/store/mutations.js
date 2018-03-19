import * as types from './mutation-types'

const mutations = {
   [types.SET_SINGER](states,singer){
        states.singer = singer
   }
}

export default mutations

