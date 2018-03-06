<template>
  <div id="my-car">
    <div class="mycar-wrap">
      <div class="mycar-tab">
        <!-- tab -->
        <ul class="nav-inner">
          <router-link tag="li" :to="{ name: 'waiting' }" class="nav-item">待上架</router-link>
          <router-link tag="li" :to="{ name: 'checking' }" class="nav-item">待检测</router-link>
          <router-link tag="li" :to="{ name: 'selling' }" class="nav-item">售卖中</router-link>
          <router-link tag="li" :to="{ name: 'under' }" class="nav-item">已完成</router-link>
        </ul>
        <!-- tab 结束 -->
      </div>
      <div class="mycar-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

export default {
  name: 'myCar',
  data () {
    return {
      tabs: [
        {
          id: 0,
          name: '待上架'
        },
        {
          id: 1,
          name: '待检测'
        },
        {
          id: 2,
          name: '售卖中'
        },
        {
          id: 3,
          name: '已完成'
        }
      ]
    }
  },
  created () {
    this.$store.commit(SET_HEADER_ACTIVE_TAB, -1)
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#my-car
  width: 100%
  min-height: calc(110vh - 110px)
  background: $color-bg-blue
  padding-top: 60px
  .mycar-wrap
    width: 1000px
    min-height: calc(110vh - 110px)
    margin: 0 auto
    padding: 10px 30px 0
    background: $color-white
    .mycar-tab
      width: 100%
      .nav-inner
        height: 60px
        border-bottom: 1px solid $color-border
        .nav-item
          display: inline-block
          font-size: 16px
          color: $color-dark-grey
          height: @height
          margin-right: 60px
          line-height: @height
          cursor: pointer
        .router-link-active
          position: relative
          color: $color-blue
          &:after
            content: ''
            position: absolute
            bottom: 0
            right: 50%
            margin-right: -24px
            width: 48px
            height: 2px
            border-radius: 1px
            background: $color-blue
            background: -prefix-linear-zgradient(to right, #39cfff, $color-blue)
            background: linear-gradient(to right, #39cfff, $color-blue)
</style>
