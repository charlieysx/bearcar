import axios from 'axios'
import Qs from 'qs'
import store from 'STORE/index'
import {
  getAccessToken,
  removeAccessToken,
  cachedUserInfo
} from 'API/cacheService'

import {
  SET_LOGIN_MASK_STATUS
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
    return axios.post('user/login', Qs.stringify(params))
  },
  /**
  * 用户登录
  */
  register (params) {
    return axios.post('user/register', Qs.stringify(params))
  },
  /**
   * 获取按字母排序的城市
   */
  getCitySort () {
    return axios.get('common/get_city_sort')
  },
  /**
   * 获取热门的城市
   */
  getHotCity () {
    return axios.get('common/get_hot_city')
  },
  /**
   * 获取按字母排序的车品牌
   */
  getCarBrandSort () {
    return axios.get('car/get_brand_sort')
  },
  /**
   * 获取热门车品牌
   */
  getHotBrand (count) {
    return axios.get('car/get_hot_brand', {
      params: {
        count: count
      }
    })
  },
  /**
   * 获取热门车系列
   */
  getHotSeries (count) {
    return axios.get('car/get_hot_series', {
      params: {
        count: count
      }
    })
  },
  /**
   * 根据品牌id获取对应的车系列
   */
  getSeriesByBrandId (brandId) {
    return axios.get('car/get_series_by_brand_id', {
      params: {
        brandId: brandId
      }
    })
  },
  /**
   * 根据车系列id获取车型
   */
  getModelBySeriesId (seriesId) {
    return axios.get('car/get_model_by_series_id', {
      params: {
        seriesId: seriesId
      }
    })
  },
  /**
   * 获取省份
   */
  getProvince () {
    return axios.get('common/get_province')
  },
  /**
   * 根据省份id获取城市
   */
  getCity (provinceId) {
    return axios.get('common/get_city', {
      params: {
        provinceId: provinceId
      }
    })
  },
  /**
   * 根据城市id获取地区
   */
  getDistrict (cityId) {
    return axios.get('common/get_district', {
      params: {
        cityId: cityId
      }
    })
  },
  /**
   * 根据城市id获取地区及城市、省份
   */
  getInfoByCity (cityId) {
    return axios.get('common/get_info_by_city', {
      params: {
        cityId: cityId
      }
    })
  },
  /**
   * 卖车时获取相关信息
   */
  getSellInfo () {
    return axios.get('car/get_sell_info')
  },
  /**
   * 卖车时获取验车时间
   */
  getCheckTime () {
    return axios.get('car/get_check_time')
  },
  /**
   * 提交二手车信息
   */
  sellCar (params) {
    return axios.post('car/sell_car', Qs.stringify(params))
  }
}
