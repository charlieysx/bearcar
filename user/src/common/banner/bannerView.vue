<template>
  <div id="banner-view"
    @mouseenter="inView" 
    @mouseleave="outView">
    <el-carousel 
        class="banner" 
        indicator-position="none" 
        arrow="never" 
        height="416px"
        @change="change"
        ref="carousel"
        :interval="4000"
        :autoplay="!showArrow">
        <el-carousel-item
            class="banner-div"
            v-for="(banner, index) in banners" 
            :key="index"
            @click="clickBanner(banner)"
            :style="{backgroundImage: 'url(' + banner.imgUrl + ')'}">
        </el-carousel-item>
      </el-carousel>
    <div class="points">
      <span
        v-for="(banner, index) in banners" 
        :key="index" 
        :class="{ active: index === bannerPosition }"
        v-on:click="myChange(index)">
      </span>
    </div>
    <transition name="fade">
      <div class="arrow" 
        v-show="showArrow">
        <div class="arrow-left" 
            @click="prev">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="arrow-right" 
            @click="next()">
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
      showArrow: false
    }
  },
  methods: {
    clickBanner (banner) {
      this.$emit('banner-click', banner)
    },
    bannerShow (banner) {
      this.$emit('banner-show', banner)
    },
    change (position) {
      this.bannerPosition = position
      this.bannerShow(this.banners[this.bannerPosition])
    },
    myChange (position) {
      this.$refs['carousel'].setActiveItem(position)
    },
    prev () {
      this.$refs['carousel'].prev()
    },
    next () {
      this.$refs['carousel'].next()
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
    z-index: 0
    position: absolute
    width: 100%
    height: 416px
    .banner-div
      background-repeat: no-repeat
      background-position: top
      background-size: auto 100%
  .points
    position: absolute
    z-index: 0
    top: 320px
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
    position: relative
    top: 150px
    color: $color-grey
    font-size: 28px
    z-index: 10
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
