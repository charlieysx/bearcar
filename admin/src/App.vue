<template>
  <div id="appindex">
    <!-- left-nav -->
    <left-nav></left-nav>
    <!-- left-nav 结束 -->
    <!-- content -->
    <div class="viewWrap">
      <div class="viewContent">
        <router-view></router-view>
      </div>
    </div>
    <!-- content 结束 -->
    <!-- 返回顶部 -->
    <div class="nav-wrap">
      <float-nav></float-nav>
    </div>
    <!-- 返回顶部 结束 -->
    <!-- 登录注册 -->
    <transition name="fade">
      <auth-layout v-show="loginMaskShow"></auth-layout>
    </transition>
    <!-- 登录注册 结束 -->
  </div>
</template>

<script>
import leftNav from 'COMMON/leftNav/leftNav'
import floatNav from 'COMMON/floatNav/floatNav'
import authLayout from 'VIEWS/auth/layout'

import {
  SET_PAGE_VISIBILITY,
  SHOW_TOKEN_ERROR
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
    leftNav,
    floatNav,
    authLayout
  },
  computed: {
    ...mapGetters([
      'loginMaskShow',
      'tokenError'
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
  watch: {
    tokenError (value) {
      if (value) {
        this.$store.commit(SHOW_TOKEN_ERROR, false)
        this.message = this.$message({
          showClose: true,
          message: '账号过期，请重新登录',
          type: 'error'
        })
      }
    }
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
    display: flex
    display: -webkit-flex
    flex-direction: row
    background-color: #ffffff
    .viewWrap
      min-height: calc(110vh - 110px)
      min-width: 1170px
      width: 100%
      .viewContent
        min-height: calc(110vh - 110px)
        background: #ffffff
        min-width: 1170px
        margin: 0 auto
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
