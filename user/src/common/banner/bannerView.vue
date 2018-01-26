<template>
  <div id="banner-view"
    @mouseenter="inView" 
    @mouseleave="outView">
    <transition-group name="fade">
        <div class="banner" 
        v-for="(banner, index) in banners" 
        :key="index" 
        v-show="index === bannerPosition" 
        @click="clickBanner(banner)">
            <img :src="banner.imgUrl" alt="">
        </div>
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
        v-show="showArrow"
        @mouseenter="stop" 
        @mouseleave="start">
        <div class="arrow-left" @click="change(bannerPosition-1)">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="arrow-right" @click="change(bannerPosition+1)">
            <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['banners'],
  data () {
    return {
      bannerPosition: 0,
      timer: '',
      showArrow: false
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
      this.bannerPosition++
      if (this.bannerPosition > this.banners.length - 1) {
        this.bannerPosition = 0
      }
      this.bannerShow(this.banners[this.bannerPosition])
    },
    start () {
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
  .banner
    > img
      width: auto
      height: 416px
      left: 50%
      position: absolute
      transform: translateX(-50%)
  .points
    position: absolute
    z-index: 10
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
    z-index: 10
    color: $color-grey
    font-size: 28px
    .arrow-left
      display: inline-block
      display: flex
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
