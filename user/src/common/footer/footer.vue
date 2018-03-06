<template>
  <div id="footer">
    <div class="footer-wrap">
      <div class="footer-logo"></div>
      <div class="footer-text">
        <router-link :to="{ name: 'about' }">关于我们</router-link>
        <router-link :to="{ name: 'contact' }">联系我们</router-link>
        <router-link :to="{ name: 'join' }">加入我们</router-link>
        <p class="footer-copyright">Copyright © 2018 bearcar.codebear.cn, All Rights Reserved  粤ICP备17139665号-1</p>
      </div>
      <div class="footer-tel">
        <div class="footer-tel-text">
          <p>服务热线：020-12345678</p>
          <p>(早9：30 — 晚6：00)</p>
        </div>
        <div class="footer-avatar">
          <img class="footer-avatar-img" src="~IMAGES/xiaodai.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'page-footer'
  }
</script>
<style lang="stylus" scoped>
  @import '~STYLUS/color.styl'
  #footer
    background: #053556
    .footer-wrap
      position: relative
      width: 1170px
      height: 110px
      margin: 0 auto
      padding: 30px 0
    .footer-logo
      position: absolute
      width: 165px
      height: 49px
      background: url('~IMAGES/bearcar_logo.png') no-repeat
      background-size: 165px
    .footer-text
      text-align: center
      a
        font-size: 14px
        padding: 0 30px
        color: $color-white
        cursor: pointer
        &:not(:first-child)
          border-left 1px solid $color-white
    .footer-copyright
      font-size: 12px
      margin-top: 20px
      color: $color-white
    .footer-tel
      position: absolute
      right: 0
      top: 50%
      transform: translateY(-50%)
    .footer-tel-text
      display: inline-block
      vertical-align: middle
      text-align: right
      font-size: 12px
      color: $color-white
      > p
        margin-bottom: 10px
        &:last-child
          margin-bottom: 0
    .footer-avatar
      display: inline-block
      vertical-align: middle
      margin-left: 10px
      width: 50px
      height: 50px
      border-radius: 50%
    .footer-avatar-img
      width: 50px
      height: 50px
      border-radius: 50%
    .attention-wrap
      position: relative
      &:hover
        .attention
          display: block
    .attention
      position: absolute
      bottom: 30px
      left: 50%
      padding: 20px
      background: $color-white
      transform: translateX(-50%)
      box-shadow: 1px 1px 10px 1px #d4efff
      z-index: 10
      font-size: 0
      display: none
      &:before
        position: absolute
        content: ' '
        left: 50%
        bottom: 0px
        width: 20px
        height: 10px
        background: $color-white
        transform: translateX(-50%)
        z-index: 9
      &:after
        position: absolute
        left: 50%
        bottom: -8px
        content: ' '
        width: 10px
        height: 10px
        box-shadow: 1px 1px 10px 1px #d4efff
        transform: rotate(45deg) translateX(-50%)
        background: $color-white
</style>
