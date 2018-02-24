<template>
  <div id="header-main" v-show="showHeader">
    <div id="header-body">
      <div class="header-wrap" :style="style">
        <!-- logo -->
        <a class="header-logo" :href="homeLink"></a>
        <!-- logo 结束 -->
      </div>
    </div>
    <!-- 空白 占位用 -->
    <div id="header-space"></div>
    <!-- 空白 占位用 结束 -->
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import {
  SET_LOGIN_STATUS,
  SET_USER_INFO
} from 'STORE/mutation-types'

import { cachedUserInfo, removeAccessToken } from 'API/cacheService'

import clickoutside from 'UTIL/clickoutside.js'

export default {
  name: 'page-header',
  directives: {
    clickoutside
  },
  components: {
  },
  data () {
    return {
      homeLink: `${window.location.origin}/`,
      style: {
        left: '0px'
      }
    }
  },
  created () {
  },
  mounted () {
    window.addEventListener('scroll', this.fixTopBarScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.fixTopBarScroll)
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'showHeader',
      'userInfo'
    ])
  },
  watch: {
  },
  methods: {
    signOut () {
      removeAccessToken()
      cachedUserInfo.delete()
      this.$store.commit(SET_LOGIN_STATUS, false)
      this.$store.commit(SET_USER_INFO, {})
      this.toIndex()
    },
    toIndex () {
      this.$router.push({ name: 'home' })
    },
    fixTopBarScroll () {
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      this.style.left = `-${scrollLeft}px`
    },
    ...mapActions([
      'setLoginMaskStatus'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import '~STYLUS/mixin.styl'
  @import '~STYLUS/color.styl'
  #header-body
    width: 100%
    position: fixed
    top: 0
    left: 0
    right: 0
    background: $color-white
    user-select: none
    z-index: 20
    box-shadow: 1px 1px 10px 1px rgba(15, 166, 255, .1)
    .header-wrap
      position: relative
      height 70px
      margin: 0 auto
      padding: 0px 20px
      .header-logo
        display: inline-block
        margin: 23px 0
        margin-right: 20px
        height: 24px
        width: 112px
        background: url('~IMAGES/logo.png') no-repeat
        background-position: 50% 50%
        background-size: 112px 24px
        cursor: pointer
      .header-right-wrap
        float: right
        .header-user
          display: inline-block
          vertical-align: top
          height: 70px
          line-height: 70px
          color: $color-mid-grey
          font-size: 16px
          cursor: pointer
        .header-avatar
          display: inline-block
          position: relative
          &:hover
            .user-info
              display: block
          > img
            vertical-align: middle
            width: 38px
            height: 38px
            border-radius: 50%
          .user-info
            position: absolute
            top: 70px
            left: 50%
            width: 160px
            transform: translateX(-50%)
            background: $color-white
            box-shadow: 1px 1px 10px 1px #d4efff
            z-index: 10
            font-size: 16px
            cursor: default
            display: none
            &:before
              position: absolute
              content: ' '
              left: 50%
              top: 0px
              width: 20px
              height: 10px
              background: $color-bg-grey
              transform: translateX(-50%)
              z-index: 9
            &:after
              position: absolute
              left: 50%
              top: -5px
              content: ' '
              width: 10px
              height: 10px
              box-shadow: 1px 1px 10px 1px #d4efff
              transform: translateX(-50%) rotate(45deg)
              background: $color-white
            .info-out
              background: $color-bg-grey
              color: $color-light-grey
              font-size: 16px
              height: 50px
              line-height: 50px
              text-align: center
              cursor: pointer
            .info-content
              padding: 0 20px
              display: flex
              justify-content: flex-start
              align-items: center
              height: 50px
              cursor: pointer
            .info-content-text
              margin-left: 10px
              height: @height
              color: $color-dark-grey
              &:hover
                color: $color-blue
            .icon-page
              display: inline-block
              height: 20px
              width: 20px
              background: url('~IMAGES/icon_car.png') no-repeat
              background-size: cover
            .info-border
              border-bottom: 1px solid $color-border
  #header-space
    width: 100%
    height: 70px
</style>
