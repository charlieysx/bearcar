import api from 'API/index'
import {
  SET_SHOW_HEADER,
  GET_ALL_CITIES,
  GET_HOT_CITIES,
  SET_CURRENT_CITY,
  SET_PAGE_VISIBILITY,
  SET_HEADER_ACTIVE_TAB
} from '../mutation-types'

import {
  cachedCurrentCity
} from 'API/cacheService'

const state = {
  showHeader: true,
  allCities: [],
  hotCities: [],
  currentCity: cachedCurrentCity.load() || { cityId: '-1', cityName: '全国' },
  pageVisibility: false,
  headerActiveTab: 0
}

const getters = {
  showHeader (state) {
    return state.showHeader
  },
  currentCity (state) {
    return state.currentCity
  },
  allCities (state) {
    return state.allCities
  },
  hotCities (state) {
    return state.hotCities
  },
  pageVisibility (state) {
    return state.pageVisibility
  },
  headerActiveTab (state) {
    return state.headerActiveTab
  }
}

const mutations = {
  [SET_SHOW_HEADER] (state, data) {
    state.showHeader = data
  },
  [GET_ALL_CITIES] (state, data) {
    state.allCities = data
  },
  [GET_HOT_CITIES] (state, data) {
    state.hotCities = data
  },
  [SET_CURRENT_CITY] (state, data) {
    state.currentCity = data
    cachedCurrentCity.save(data)
  },
  [SET_PAGE_VISIBILITY] (state, data) {
    state.pageVisibility = data
  },
  [SET_HEADER_ACTIVE_TAB] (state, data) {
    state.headerActiveTab = data
  }
}

const actions = {
  /**
   * 获取按字母排序的城市
   * @param store
   * @return {Promise}
   */
  getCitySort (store) {
    return api.getCitySort()
      .then((response) => {
        store.commit(GET_ALL_CITIES, response.data.data.list)
        return Promise.resolve(response.data.data.list)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 获取热门城市
   * @param store
   * @return {Promise}
   */
  getHotCity (store) {
    return api.getHotCity()
      .then((response) => {
        store.commit(GET_HOT_CITIES, response.data.data.list)
        return Promise.resolve(response.data.data.list)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 获取省份
   * @param store
   * @return {Promise}
   */
  getProvince (store) {
    return api.getProvince()
      .then((response) => {
        return Promise.resolve(response.data.data.list)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 根据省份id获取城市
   * @param store
   * @return {Promise}
   */
  getCity (store, provinceId) {
    return api.getCity(provinceId)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 根据城市id获取地区
   * @param store
   * @return {Promise}
   */
  getDistrict (store, cityId) {
    return api.getDistrict(cityId)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 根据城市id获取地区
   * @param store
   * @return {Promise}
   */
  getInfoByCity (store, cityId) {
    return api.getInfoByCity(cityId)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  getQiniuToken (store, bucket) {
    return api.getQiniuToken(bucket)
      .then((response) => {
        return Promise.resolve(response.data.data)
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
