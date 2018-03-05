<template>
  <div id="image-preview-list" v-if="loadImageSuccess">
      <div @mouseover="show" @mouseout="hide">
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
          <swiper-slide class="slide-big" 
              v-for="(item, index) in imageData"
              :key="index">
              <img :src="item" alt="" @click="clickBigImg(index)">
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev" v-show="showArrowButton">
              <i class="el-icon-arrow-left"></i>
          </div>
          <div class="swiper-button-next" slot="button-next" v-show="showArrowButton">
              <i class="el-icon-arrow-right"></i>
          </div>
        </swiper>
      </div>
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide class="slide-thumb" 
            v-for="(item, index) in imageData"
            :key="index * 1000">
            <img :src="item" alt="">
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="swiper-button-next" slot="button-next">
            <i class="el-icon-arrow-right"></i>
        </div>
      </swiper>
      <!-- 查看图片 -->
      <image-viewer :index.sync="imageCurrentIndex" ref="imageViewer" :images="imageData"></image-viewer>
  </div>
</template>

<script>
import imageViewer from 'COMMON/imageViewer/imageViewer'

export default {
  name: 'image-preview-list',
  props: ['imageData', 'isLoad'],
  data () {
    return {
      imageCurrentIndex: 0,
      loadImageSuccess: false,
      showArrowButton: false,
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 0, // looped slides should be the same
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 0,
        slidesPerView: 4.5,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 0, // looped slides should be the same
        slideToClickedSlide: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  watch: {
    isLoad (data) {
      if (data) {
        this.initConfig()
      }
    }
  },
  components: {
    imageViewer
  },
  methods: {
    show () {
      // this.showArrowButton = true
    },
    hide () {
      // this.showArrowButton = false
    },
    clickBigImg (index) {
      this.$refs.imageViewer.$refs.modal.showModal()
      this.imageCurrentIndex = index
    },
    initConfig () {
      this.swiperOptionTop.loopedSlides = this.swiperOptionThumbs.loopedSlides = this.imageData.length
      if (this.imageData.length < 5) {
        this.swiperOptionThumbs.slidesPerView = this.imageData.length
      }
      this.loadImageSuccess = true
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~STYLUS/color.styl"
#image-preview-list
  width: 585px
  height: 500px
  .gallery-top
    cursor: pointer
    .slide-big
      > img
        width: 585px
        height: 390px
    .swiper-button-prev
      height: 100%
      width: 50px
      top: 0px
      left: 0px
      background: #00000033
      margin-top: -3px
      text-align: center
      color: #ffffff99
      font-size: 48px
      display: flex
      display: -webkit-flex
      align-items: center
      &.hide
        background: #FF000000
        color: #FF000000
    .swiper-button-next
      height: 100%
      width: 50px
      top: 0px
      right: 0px
      background: #00000033
      margin-top: -3px
      text-align: center
      color: #ffffff99
      font-size: 48px
      display: flex
      display: -webkit-flex
      align-items: center
      &.hide
        background: #FF000000
        color: #FF000000
  .gallery-thumbs
    margin: 5px
    margin-top: 10px
    .slide-thumb
      cursor: pointer
      > img
        width: 120px
        height: 80px
        &:hover
          border: 2px solid $color-blue
    .swiper-button-prev
      height: 100%
      width: 36px
      background: #00000033
      top: 0px
      left: 0px
      margin-top: -3px
      text-align: center
      color: #ffffff99
      font-size: 42px
      display: flex
      display: -webkit-flex
      align-items: center
    .swiper-button-next
      height: 100%
      width: 36px
      top: 0px
      right: 0px
      background: #00000033
      margin-top: -3px
      text-align: center
      color: #ffffff99
      font-size: 42px
      display: flex
      display: -webkit-flex
      align-items: center
</style>
