<template>
  <div id="appindex">
    <page-header></page-header>
    <div class="viewWrap">
      <router-view></router-view>
    </div>
    <page-footer></page-footer>
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
import pageFooter from 'COMMON/footer/footer'
import floatNav from 'COMMON/floatNav/floatNav'
import authLayout from 'VIEWS/auth/layout'

import {
  SET_PAGE_VISIBILITY
} from 'STORE/mutation-types'

import {
  mapGetters
} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      evtname: ''
    }
  },
  components: {
    pageHeader,
    pageFooter,
    floatNav,
    authLayout
  },
  computed: {
    ...mapGetters([
      'loginMaskShow'
    ])
  },
  mounted () {
    var visProp = this.getHiddenProp()
    this.evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange'
    document.addEventListener(this.evtname, this.visibilityChange, false)
  },
  beforeDestroy () {
    document.removeEventListener(this.evtname, this.visibilityChange, false)
  },
  methods: {
    getHiddenProp () {
      var prefixes = ['webkit', 'moz', 'ms', 'o']
      // if 'hidden' is natively supported just return it
      if ('hidden' in document) {
        return 'hidden'
      }
      // otherwise loop over all the known prefixes until we find one
      for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'Hidden') in document) {
          return prefixes[i] + 'Hidden'
        }
      }
      // otherwise it's not supported
      return null
    },
    getVisibilityState () {
      var prefixes = ['webkit', 'moz', 'ms', 'o']
      if ('visibilityState' in document) return 'visibilityState'
      for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document) {
          return prefixes[i] + 'VisibilityState'
        }
      }
      // otherwise it's not supported
      return null
    },
    visibilityChange () {
      switch (document[this.getVisibilityState()]) {
        case 'visible':
          this.$store.commit(SET_PAGE_VISIBILITY, true)
          break
        case 'hidden':
        default:
          this.$store.commit(SET_PAGE_VISIBILITY, false)
          break
      }
    }
  }
}
</script>

 <style lang="stylus" src="STYLUS/main.styl"></style>

<style lang="stylus">
  #appindex
    min-width: 1180px
    .viewWrap
      background-color: #f5f5f7
      min-height: calc(110vh - 110px)
      min-width: 1170px
    .nav-wrap
      position: fixed
      right: 6px
      bottom: 120px
      z-index: 20
  .fade-enter-active, .fade-leave-active
    transition: opacity .3s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
