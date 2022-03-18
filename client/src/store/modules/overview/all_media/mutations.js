import { SET_ALL_MEDIA, SET_COUNT, SET_MEDIA_LOADING, SET_MEDIA_BADGE } from '../../../mutation-types'

export default {
  [SET_ALL_MEDIA](state, data) {
    state.allMedia = data
  },
  [SET_COUNT](state, data) {
    state.count = data
  },
  [SET_MEDIA_LOADING](state, data) {
    state.mediaLoading = data
  },
  [SET_MEDIA_BADGE](state, data) {
    console.log('badges', data)
    state.badges.customers = data.customers
    state.badges.competitors = data.competitors
    state.badges.products = data.products
  },
}