import {
  SET_SHOW_HEADER
} from '../mutation-types'

const state = {
  showHeader: true
}

const getters = {
  showHeader (state) {
    return state.showHeader
  }
}

const mutations = {
  [SET_SHOW_HEADER] (state, data) {
    state.showHeader = data
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions,
  getters
}
