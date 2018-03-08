import api from 'API/index'

const actions = {
  /**
   * 获取banner列表
   */
  getBannerList (store, params) {
    return api.getBannerList(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 添加banner
   */
  addBanner (store, params) {
    return api.addBanner(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 下架banner
   */
  underBanner (store, id) {
    return api.underBanner(id)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 编辑banner
   */
  editBanner (store, params) {
    return api.editBanner(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  }
}

export default {
  actions
}
