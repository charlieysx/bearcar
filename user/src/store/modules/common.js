import api from 'API/index'
import {
  SET_SHOW_HEADER,
  GET_ALL_CITIES,
  GET_HOT_CITIES,
  SET_CURRENT_CITY
} from '../mutation-types'

import {
  cachedCurrentCity
} from 'API/cacheService'

const state = {
  showHeader: true,
  allCities: [],
  hotCities: [],
  currentCity: cachedCurrentCity.load() || { cityId: '-1', cityName: '全国' }
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
