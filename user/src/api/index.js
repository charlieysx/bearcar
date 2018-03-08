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
    return axios.post('u/login', Qs.stringify(params))
  },
  /**
  * 用户登录
  */
  register (params) {
    return axios.post('u/register', Qs.stringify(params))
  },
  /**
   * 获取按字母排序的城市
   */
  getCitySort () {
    return axios.get('c/city/sort')
  },
  /**
   * 获取热门的城市
   */
  getHotCity (count) {
    return axios.get('c/city/hot', {
      params: {
        count: count
      }
    })
  },
  /**
   * 获取按字母排序的车品牌
   */
  getCarBrandSort () {
    return axios.get('c/carinfo/brand/sort')
  },
  /**
   * 获取热门车品牌
   */
  getHotBrand (count) {
    return axios.get('c/carinfo/brand/hot', {
      params: {
        count: count
      }
    })
  },
  /**
   * 获取热门车系列
   */
  getHotSeries (count) {
    return axios.get('c/carinfo/series/hot', {
      params: {
        count: count
      }
    })
  },
  /**
   * 根据品牌id获取对应的车系列
   */
  getSeriesByBrandId (brandId) {
    return axios.get('c/carinfo/series', {
      params: {
        brandId: brandId
      }
    })
  },
  /**
   * 根据车系列id获取车型
   */
  getModelBySeriesId (seriesId) {
    return axios.get('c/carinfo/model', {
      params: {
        seriesId: seriesId
      }
    })
  },
  /**
   * 获取省份
   */
  getProvince () {
    return axios.get('c/city/province')
  },
  /**
   * 根据省份id获取城市
   */
  getCity (provinceId) {
    return axios.get('c/city', {
      params: {
        provinceId: provinceId
      }
    })
  },
  /**
   * 根据城市id获取地区
   */
  getDistrict (cityId) {
    return axios.get('c/city/district/by_city', {
      params: {
        cityId: cityId
      }
    })
  },
  /**
   * 根据城市id获取地区及城市、省份
   */
  getInfoByCity (cityId) {
    return axios.get('c/city/info', {
      params: {
        cityId: cityId
      }
    })
  },
  /**
   * 卖车时获取相关信息
   */
  getSellInfo () {
    return axios.get('u/sellcar/sellinfo')
  },
  /**
   * 卖车时获取验车时间
   */
  getCheckTime () {
    return axios.get('u/sellcar/checktime')
  },
  /**
   * 提交二手车信息
   */
  sellCar (params) {
    return axios.post('u/sellcar', Qs.stringify(params))
  },
  /**
   * 获取 我的车 列表  type:{waiting, selling, ordering, under}
   */
  getMyCar (params) {
    return axios.get('u/mycar/list', {
      params: params
    })
  },
  /**
   * 下架 我的车
   */
  underMyCar (carId) {
    return axios.post('u/mycar/under', Qs.stringify({ carId: carId }))
  },
  /**
   * 获取资讯列表
   */
  getNewsList (params) {
    return axios.get('u/news/list', {
      params: params
    })
  },
  /**
   * 获取热门资讯列表
   */
  getHotNewsList (count) {
    return axios.get('u/news/list/hot', {
      params: {
        count: count
      }
    })
  },
  /**
   * 获取资讯
   */
  getNewsInfo (newsId) {
    return axios.get('u/news/detail', {
      params: {
        newsId: newsId
      }
    })
  },
  /**
   * 获取二手车列表
   */
  getCarList (params) {
    return axios.post('c/car/list', Qs.stringify(params))
  },
  /**
   * 获取二手车信息
   */
  getCarInfo (carId) {
    return axios.get('c/car/getinfo', {
      params: {
        carId: carId
      }
    })
  },
  /**
   * 获取二手车总数量
   */
  getCarCount () {
    return axios.get('c/car/count')
  },
  /**
   * 获取猜你喜欢的车列表
   */
  getLikeList (params) {
    return axios.post('c/car/likelist', Qs.stringify(params))
  },
  orderCar (params) {
    return axios.post('u/car/ordercar', Qs.stringify(params))
  },
  getBanner () {
    return axios.get('c/banner')
  }
}
