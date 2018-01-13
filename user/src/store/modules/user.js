import api from 'API/index'

const actions = {
  /**
   * 用户登录
   * @param store
   * @param {String} userName 手机号码
   * @param {String} password 密码
   * @return {Promise}
   */
  login (store, params) {
    return api.login(params)
      .then((response) => {
        return Promise.resolve(response.data)
      })
      .catch(({response}) => {
        return Promise.reject(response.data)
      })
  }
}

export default {
  actions
}
