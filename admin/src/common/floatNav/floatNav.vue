<template>
  <div id="float-nav">
    <el-tooltip class="item" effect="dark" content="回到顶部" placement="left">
      <div class="nav-top" @click="goTop"></div>
    </el-tooltip>
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
</style>
