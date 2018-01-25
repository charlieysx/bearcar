import api from 'API/index'
import {
  SET_LOGIN_STATUS
} from '../mutation-types'

const state = {
  isLogin: false
}

const getters = {
  isLogin (state) {
    return state.isLogin
  }
}

const mutations = {
  [SET_LOGIN_STATUS] (state, data) {
    state.isLogin = data
  }
}

const actions = {
  /**
   * 用户登录
   * @param store
   * @param {String} userName 手机号码
   * @param {String} password 密码
   * @return {Promise}
   */
  login (store, params) {
    return api.login(params)
      .then((response) => {
        store.commit(SET_LOGIN_STATUS, true)
        return Promise.resolve(response.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
