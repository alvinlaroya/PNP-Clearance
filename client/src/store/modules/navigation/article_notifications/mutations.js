import { SET_CURRENT_NOTIFICATION, SET_LOADING_NOTIFICATION} from '../../../mutation-types'

export default {
  [SET_CURRENT_NOTIFICATION](state, data) {
    state.currentNotification = data
  },
  [SET_LOADING_NOTIFICATION](state, data) {
    state.loadingNotification = data
  },
  
}