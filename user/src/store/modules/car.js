import api from 'API/index'
import {
    GET_HOT_BRAND,
    GET_ALL_SORT_BRAND,
    GET_HOT_SERIES
} from '../mutation-types'

const state = {
  allSortBrands: [],
  hotBrands: [],
  hotSeries: []
}

const getters = {
  allSortBrands (state) {
    return state.allSortBrands
  },
  hotBrands (state) {
    return state.hotBrands
  },
  hotSeries (state) {
    return state.hotSeries
  }
}

const mutations = {
  [GET_HOT_BRAND] (state, data) {
    state.hotBrands = data
  },
  [GET_ALL_SORT_BRAND] (state, data) {
    state.allSortBrands = data
  },
  [GET_HOT_SERIES] (state, data) {
    state.hotSeries = data
  }
}

const actions = {

  /**
   * 获取按字母排序的车品牌
   * @param store
   * @return {Promise}
   */
  getCarBrandSort (store) {
    return api.getCarBrandSort()
      .then((response) => {
        store.commit(GET_ALL_SORT_BRAND, response.data.data.list)
        return Promise.resolve(response.data.data.list)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 获取热门车品牌
   * @param store
   * @param count
   * @return {Promise}
   */
  getHotBrand (store, count) {
    return api.getHotBrand(count)
      .then((response) => {
        store.commit(GET_HOT_BRAND, response.data.data.list)
        return Promise.resolve(response.data.data.list)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 获取热门车系列
   * @param store
   * @param count
   * @return {Promise}
   */
  getHotSeries (store, count) {
    return api.getHotSeries(count)
      .then((response) => {
        store.commit(GET_HOT_SERIES, response.data.data.list)
        return Promise.resolve(response.data.data.list)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 根据品牌id获取对应的车系列
   * @param brandId
   * @return {Promise}
   */
  getSeriesByBrandId (store, brandId) {
    return api.getSeriesByBrandId(brandId)
      .then((response) => {
        return Promise.resolve(response.data.data.list)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 根据车系列id获取车型
   * @param seriesId
   * @return {Promise}
   */
  getModelBySeriesId (store, seriesId) {
    return api.getModelBySeriesId(seriesId)
      .then((response) => {
        return Promise.resolve(response.data.data.list)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 卖车时获取相关信息
   * @param seriesId
   * @return {Promise}
   */
  getSellInfo (store) {
    return api.getSellInfo()
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 卖车时获取验车时间
   * @param seriesId
   * @return {Promise}
   */
  getCheckTime (store) {
    return api.getCheckTime()
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
