// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import './ElementUI'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import validator from 'UTIL/validator'
import 'UTIL/filters'
import 'swiper/dist/css/swiper.css'
import VueScrollLock from 'vue-scroll-lock'

import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(validator)
Vue.use(VueAwesomeSwiper)
Vue.use(VueScrollLock)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
