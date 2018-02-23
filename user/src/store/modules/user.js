import api from 'API/index'
import {
  SET_LOGIN_STATUS,
  SET_USER_INFO,
  SET_LOGIN_MASK_STATUS
} from '../mutation-types'

import {
  saveAccessToken,
  getAccessToken,
  cachedUserInfo
} from 'API/cacheService'

const state = {
  loginMaskShow: false,
  loginView: 'login',
  isLogin: getAccessToken() ? true : false, // eslint-disable-line
  userInfo: cachedUserInfo.load() || {}
}

const getters = {
  loginMaskShow (state) {
    return state.loginMaskShow
  },
  loginView (state) {
    return state.loginView
  },
  isLogin (state) {
    return state.isLogin
  },
  userInfo (state) {
    return state.userInfo
  }
}

const mutations = {
  [SET_LOGIN_MASK_STATUS] (state, data) {
    state.loginMaskShow = data.show
    state.loginView = data.view
  },
  [SET_LOGIN_STATUS] (state, data) {
    state.isLogin = data
  },
  [SET_USER_INFO] (state, data) {
    state.userInfo = data
  }
}

const actions = {

  setLoginMaskStatus (store, data) {
    store.commit(SET_LOGIN_MASK_STATUS, data)
  },
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
        saveAccessToken(response.data.data.token.accessToken, response.data.data.token.exp)
        cachedUserInfo.save(response.data.data)
        store.commit(SET_LOGIN_STATUS, true)
        store.commit(SET_USER_INFO, response.data.data)
        // 关闭登录mask
        store.commit(SET_LOGIN_MASK_STATUS, false)
        return Promise.resolve(response.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 用户注册
   * @param store
   * @param {String} userName 手机号码
   * @param {String} password 密码
   * @return {Promise}
   */
  register (store, params) {
    return api.register(params)
      .then((response) => {
        saveAccessToken(response.data.data.token.accessToken, response.data.data.token.exp)
        cachedUserInfo.save(response.data.data)
        store.commit(SET_LOGIN_STATUS, true)
        store.commit(SET_USER_INFO, response.data.data)
        // 关闭登录mask
        store.commit(SET_LOGIN_MASK_STATUS, false)
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
