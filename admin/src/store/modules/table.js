import api from 'API/index'

const actions = {
  /**
   * 获取用户列表
   */
  getUserList (store, params) {
    return api.getUserList(params)
      .then((response) => {
        return Promise.resolve(response.data.data)
      })
      .catch(({response}) => {
        return Promise.reject(response)
      })
  },
  /**
   * 获取管理员列表
   */
  getAdminList (store, params) {
    return api.getAdminList(params)
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
