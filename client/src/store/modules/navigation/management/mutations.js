import { SET_USERS, UPDATE_PERSONNEL } from '../../../mutation-types'

export default {
  [SET_USERS](state, data) {
    state.users = data
  },
  [UPDATE_PERSONNEL](state, data) {
    console.log(data)
  },

}