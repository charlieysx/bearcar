<template>
  <div id="banner-view"
    @mouseenter="inView" 
    @mouseleave="outView">
    <transition-group name="fade">
        <li class="banner" 
          v-for="(banner, index) in banners" 
          :key="index" 
          v-show="index === bannerPosition" 
          @click="clickBanner(banner)"
          :style="{backgroundImage: 'url(' + banner.imgUrl + ')'}">
        </li>
    </transition-group>
    <div class="points"
      @mouseenter="stop" 
      @mouseleave="start">
      <span
        v-for="(banner, index) in banners" 
        :key="index" 
        :class="{ active: index === bannerPosition }"
        v-on:click="change(index)">
      </span>
    </div>
    <transition name="fade">
      <div class="arrow" 
        v-show="showArrow">
        <div class="arrow-left" 
          @click="change(bannerPosition - 1)"
          @mouseenter="stop" 
          @mouseleave="start">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="arrow-right" 
          @click="change(bannerPosition + 1)"
          @mouseenter="stop" 
          @mouseleave="start">
            <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['banners', 'pageVisibility'],
  data () {
    return {
      bannerPosition: 0,
      timer: '',
      showArrow: false
    }
  },
  watch: {
    pageVisibility (val) {
      if (val) {
        this.start()
      } else {
        this.stop()
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.start()
    })
  },
  methods: {
    clickBanner (banner) {
      this.$emit('banner-click', banner)
    },
    bannerShow (banner) {
      this.$emit('banner-show', banner)
    },
    autoPlay () {
      this.change(this.bannerPosition + 1)
    },
    start () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 3000)
    },
    stop () {
      clearInterval(this.timer)
      this.timer = null
    },
    change (position) {
      if (position < 0) {
        position = this.banners.length - 1
      }
      if (position > this.banners.length - 1) {
        position = 0
      }
      this.bannerPosition = position
      this.bannerShow(this.banners[this.bannerPosition])
    },
    inView () {
      this.showArrow = true
    },
    outView () {
      this.showArrow = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~STYLUS/color.styl"
#banner-view
  cursor: pointer
  height: 416px
  .banner
    width: 100%
    height: 416px
    position: absolute
    background-repeat: no-repeat
    background-position: top
    background-size: auto 100%
  .points
    position: absolute
    z-index: 0
    top: 390px
    width: 100%
    margin: 0 auto
    text-align: center
    font-size: 0
    > span
      display: inline-block
      border-radius: 50%
      width: 8px
      height: 8px
      margin: 0 8px
      background-color: #b2b2b2
      cursor: pointer
      &:hover,
      &.active
        background-color: $color-blue
  .fade-enter-active, 
  .fade-leave-active
    transition: opacity .5s
  .fade-enter, 
  .fade-leave-to
    opacity: 0
  .arrow
    width: 1170px
    margin: 0 auto
    height: 50px
    top: 150px
    position: relative
    color: $color-grey
    font-size: 28px
    .arrow-left
      display: inline-block
      display: flex
      display: -webkit-flex
      width: 50px
      height: 50px
      border-radius: 50%
      float: left
      text-align: center
      &:hover
        background: #00000030
        color: $color-white
      > i
        margin: auto
    .arrow-right
      display: inline-block
      display: flex
      display: -webkit-flex
      width: 50px
      height: 50px
      border-radius: 50%
      float: right
      text-align: center
      &:hover
        background: #00000030
        color: $color-white
      > i
        margin: auto
</style>
