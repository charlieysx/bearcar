import api from 'API/index'
import {
    GET_HOT_BRAND,
    GET_ALL_SORT_BRAND,
    GET_HOT_SERIES,
    GET_FILL_STEP
} from '../mutation-types'

const state = {
  allSortBrands: [],
  hotBrands: [],
  hotSeries: [],
  fillStep: '1'
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
  },
  fillStep (state) {
    return state.fillStep
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
  },
  [GET_FILL_STEP] (state, data) {
    state.fillStep = data
  }
}

const actions = {

  setFillStep (store, data) {
    store.commit(GET_FILL_STEP, data)
  },

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
   * 获取 我的车 列表  type:{waiting, selling, ordering, under}
   */
  getMyCar (store, params) {
    return api.getMyCar(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  underMyCar (store, params) {
    return api.underMyCar(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  orderCheckCar (store, carId) {
    return api.orderCheckCar(carId)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  getFillStep (store, carId) {
    return api.getFillStep(carId)
      .then((response) => {
        store.commit(GET_FILL_STEP, response.data.data.step)
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  getFillYM () {
    return api.getFillYM()
    .then((response) => {
      return Promise.resolve(response.data.data)
    })
    .catch(({response}) => {
      return Promise.reject(response)
    })
  },
  /**
   * 获取检测中的二手车的基本信息(客户填写的)
   */
  getFillCarInfo (store, carId) {
    return api.getFillCarInfo(carId)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 提交检测信息-第一步
   */
  fillCarFirst (store, params) {
    return api.fillCarFirst(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 提交检测信息-第二步
   */
  fillCarSecond (store, params) {
    return api.fillCarSecond(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 提交检测信息-第三步
   */
  fillCarThird (store, params) {
    return api.fillCarThird(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  getCarInfo (store, carId) {
    return api.getCarInfo(carId)
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
