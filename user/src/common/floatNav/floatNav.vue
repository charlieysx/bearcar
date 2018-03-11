<template>
  <div id="float-nav">
    <el-tooltip class="item" effect="dark" content="回到顶部" placement="left">
      <div class="nav-top" @click="goTop"></div>
    </el-tooltip>

    <div class="nav-middle">
      <ul class="nav-middle-ul">
        <el-tooltip class="item" effect="dark" content="帮助中心" placement="left">
          <router-link tag="li" :to="{name: 'help'}" class="nav-middle-li help"></router-link>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="意见反馈" placement="left">
          <li @click="feedBack" class="nav-middle-li opinion"></li>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="联系客服" placement="left">
          <li @click="toChat" class="nav-middle-li service"></li>
        </el-tooltip>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'float-nav',
    methods: {
      goTop () {
        let timer = null
        let currentNum = document.body.scrollTop || document.documentElement.scrollTop
        let t = 0
        clearInterval(timer)
        timer = setInterval(() => {
          // 匀加速运动
          t++
          currentNum = currentNum - (2 * t)
          if (currentNum <= 0) {
            document.body.scrollTop = document.documentElement.scrollTop = 0
            clearInterval(timer)
          }
          document.body.scrollTop = document.documentElement.scrollTop = currentNum
        }, 16.7)
      },
      feedBack () {
        this.$emit('feedback')
      },
      toChat () {
        window.open('http://wpa.qq.com/msgrd?v=3&uin=249900679&site=qq&menu=yes')
      }
    }
  }
</script>
<style lang="stylus">
  @import '~STYLUS/color.styl'
  #float-nav
    width: 40px
    .nav-top, .nav-bottom
      box-shadow: 1px 1px 10px 1px #d4efff
      width: 40px
      height: 40px
      border-radius: 4px
      cursor: pointer
    .nav-top
      background: url('~IMAGES/ic_top.png') no-repeat
      background-size: 22px 22px
      background-position: 50% 50%
      background-color: $color-white
      margin-bottom: 20px
    .nav-middle-ul
      box-shadow: 1px 1px 10px 1px #d4efff
      background: $color-white
      border-radius: 4px
    .nav-middle-li
      height: 40px
      width: 40px
      border-bottom: 1px solid $color-border
      cursor: pointer
      &:last-child
        border: none
    .help
      background: url('~IMAGES/ic_help.png') no-repeat
      background-size: 16px 22px
      background-position: 50% 50%
    .opinion
      background: url('~IMAGES/ic_feedback.png') no-repeat
      background-size: 22px 22px
      background-position: 50% 50%
      > a
        display inline-block
        height: 40px
        width: 40px
    .qq
      background: url('~IMAGES/ic_qq.png') no-repeat
      background-size: 22px 22px
      background-position: 50% 50%
    .service
      background: url('~IMAGES/ic_service.png') no-repeat
      background-size: 22px 22px
      background-position: 50% 50%
</style>
