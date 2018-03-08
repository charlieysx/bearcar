import api from 'API/index'

const actions = {
  /**
   * 获取统计数据
   */
  getStatistics (store) {
    return api.getStatistics()
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
