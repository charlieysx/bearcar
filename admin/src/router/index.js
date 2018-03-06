import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'STORE/index'

import home from './modules/home'
import car from './modules/car'
import news from './modules/news'
import carList from './modules/carList'
import table from './modules/table'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {
  getAccessToken
} from 'API/cacheService'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)

const routes = [
  ...home,
  ...car,
  ...news,
  ...carList,
  ...table
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!getAccessToken()) {
      console.log('...')
      store.commit('SET_LOGIN_MASK_STATUS', { show: true, view: 'login' })
      next()
    } else {
      NProgress.start()
      next()
    }
  } else {
    NProgress.start()
    next() // 确保一定要调用 next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
export default router
