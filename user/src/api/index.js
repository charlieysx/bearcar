import axios from 'axios'
import Qs from 'qs'

/* eslint-disable */
const API_ROOT = 'http://bearcarapi.codebear.cn/index.php'


/* eslint-enable */
axios.defaults.baseURL = API_ROOT
axios.defaults.headers.Accept = 'application/json'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers['isDebug'] = true
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
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
  }
}
