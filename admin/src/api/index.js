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
    return axios.post('sysa/login', Qs.stringify(params))
  },
  /**
   * 获取 与我相关的车 列表  type:{waiting, selling, ordering, under}
   */
  getMyCar (params) {
    return axios.get('sysa/mycar/list', {
      params: params
    })
  },
  /**
   * 下架 与我相关的车
   */
  underMyCar (params) {
    return axios.post('sysa/mycar/under', Qs.stringify(params))
  },
  /**
   * 预约检测二手车
   */
  orderCheckCar (carId) {
    return axios.post('sysa/mycar/ordercheck', Qs.stringify({ carId: carId }))
  },
  /**
   * 获取七牛上传图片token
   */
  getQiniuToken (bucket) {
    return axios.get('sysa/qiniu/token', {
      params: {
        bucket: bucket
      }
    })
  },
  /**
   * 发布资讯
   */
  publishNews (params) {
    return axios.post('sysa/news/publish', Qs.stringify(params))
  },
  /**
   * 获取资讯列表
   */
  getNewsList (params) {
    return axios.get('sysa/news/list', {
      params: params
    })
  },
  /**
   * 获取资讯
   */
  getNewsInfo (newsId) {
    return axios.get('sysa/news/detail', {
      params: {
        newsId: newsId
      }
    })
  },
  /**
   * 删除资讯
   */
  deleteNews (newsId) {
    return axios.post('sysa/news/delete', Qs.stringify({ newsId: newsId }))
  },
  /**
   * 获取检测完成步骤
   */
  getFillStep (carId) {
    return axios.get('sysa/fillcar/getfillstep', {
      params: {
        carId: carId
      }
    })
  },
  /**
   * 获取上牌年月列表
   */
  getFillYM () {
    return axios.get('sysa/fillcar/getym')
  },
  /**
   * 获取按字母排序的城市
   */
  getCitySort () {
    return axios.get('c/city/sort')
  },
  /**
   * 获取检测中的二手车的基本信息(客户填写的)
   */
  getFillCarInfo (carId) {
    return axios.get('sysa/fillcar/getfillcarinfo', {
      params: {
        carId: carId
      }
    })
  }
}
