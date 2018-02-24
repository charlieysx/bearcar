import axios from 'axios'
import Qs from 'qs'
import store from 'STORE/index'
import {
  getAccessToken,
  removeAccessToken,
  cachedUserInfo
} from 'API/cacheService'

import {
  SET_LOGIN_STATUS,
  SET_LOGIN_MASK_STATUS,
  SHOW_TOKEN_ERROR
} from 'STORE/mutation-types'

/* eslint-disable */
const API_ROOT = 'http://bearcarapi.codebear.cn/index.php'


/* eslint-enable */
axios.defaults.baseURL = API_ROOT
axios.defaults.headers.Accept = 'application/json'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  if (getAccessToken()) {
    config.headers['accessToken'] = getAccessToken()
  }
  config.headers['isAdmin'] = true
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    // 清空登录信息;
    removeAccessToken()
    cachedUserInfo.delete()
    store.commit(SET_LOGIN_STATUS, false)
    // 弹出提示信息
    store.commit(SHOW_TOKEN_ERROR, true)
    // 弹出登录窗口
    store.commit(SET_LOGIN_MASK_STATUS, { show: true, view: 'login' })
  }
  return Promise.reject(error)
})

export default {
  /**
   * 用户登录
   */
  login (params) {
    return axios.post('admin/login', Qs.stringify(params))
  },
  /**
   * 获取 我的车 列表  type:{waiting, selling, ordering, under}
   */
  getMyCar (params) {
    return axios.get('admin/carlist/get_car', {
      params: params
    })
  },
  underMyCar (carId) {
    return axios.post('mycar/under', Qs.stringify({ carId: carId }))
  }
}
