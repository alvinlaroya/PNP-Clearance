import { SET_ALL_CASE, SET_CASE_BADGE, SET_RELATED_CASE, ADD_CASE, UPDATE_CASE } from '../../../mutation-types'

export default {
  [SET_ALL_CASE](state, data) {
    state.allCase = data
  },
  [SET_CASE_BADGE](state, data) {
    state.badge = data
  },
  [SET_RELATED_CASE](state, data) {
    state.relatedCase = data
  },
  [ADD_CASE](state, data) {
    state.allCase.unshift(JSON.parse(data))
  },
  [UPDATE_CASE](state, data) {
    console.log(data)
    /* objIndex = state.allCase.findIndex((obj) => obj.id == data.id);
    state.allCase[objIndex] = data */
  }
}