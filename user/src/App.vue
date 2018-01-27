<template>
  <div id="appindex">
    <page-header></page-header>
    <div class="viewWrap">
      <router-view></router-view>
    </div>
    <div class="nav-wrap">
      <float-nav></float-nav>
    </div>
    <transition name="fade">
      <auth-layout v-show="loginMaskShow"></auth-layout>
    </transition>
  </div>
</template>

<script>
import pageHeader from 'COMMON/header/header'
import floatNav from 'COMMON/floatNav/floatNav'
import authLayout from 'VIEWS/auth/layout'

import {
  mapGetters
} from 'vuex'

export default {
  name: 'app',
  components: {
    pageHeader,
    floatNav,
    authLayout
  },
  computed: {
    ...mapGetters([
      'loginMaskShow'
    ])
  }
}
</script>

 <style lang="stylus" src="STYLUS/main.styl"></style>

<style lang="stylus">
  #appindex
    .viewWrap
      background-color: #f5f5f7
      min-height: calc(110vh - 110px)
      min-width: 1170px
    .nav-wrap
      position: fixed
      right: 6px
      bottom: 120px
  .fade-enter-active, .fade-leave-active
    transition: opacity .3s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
