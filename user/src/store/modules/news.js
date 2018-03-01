import api from 'API/index'

const actions = {
  /**
   * 获取资讯列表
   */
  getNewsList (store, params) {
    return api.getNewsList(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 获取热门资讯列表
   */
  getHotNewsList (store, count) {
    return api.getHotNewsList(count)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 获取资讯
   */
  getNewsInfo (store, newsId) {
    return api.getNewsInfo(newsId)
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
