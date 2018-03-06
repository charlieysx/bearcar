import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import common from './modules/common'
import car from './modules/car'
import news from './modules/news'
import table from './modules/table'

Vue.use(Vuex)

const modules = { user, common, car, news, table }

const store = new Vuex.Store({
  modules
})

export default store
