<template>
  <div id="image-preview-list">
      <el-carousel 
        indicator-position="none" 
        :autoplay="false" 
        height="390px" 
        class="gallery-top"
        ref="carousel"
        @change="change">
        <el-carousel-item class="slide-big" v-for="(item, index) in imageData" :key="index">
          <img :src="item" alt="" @click="clickBigImg(index)">
        </el-carousel-item>
      </el-carousel>
      <!-- swiper Thumbs -->
      <swiper 
        :options="swiperOptionThumbs" 
        class="gallery-thumbs" 
        ref="swiperThumbs" 
        v-if="loadImageSuccess">
        <swiper-slide class="slide-thumb" 
            v-for="(item, index) in imageData"
            :key="index">
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
  props: ['imageData'],
  data () {
    const self = this
    return {
      imageCurrentIndex: 0,
      loadImageSuccess: false,
      imgIndex: 0,
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
        },
        on: {
          slideChange () {
            self.imgIndex = this.realIndex
          }
        }
      },
      current: 0
    }
  },
  components: {
    imageViewer
  },
  watch: {
    imageData (data) {
      this.initConfig()
    },
    imgIndex (value) {
      if (this.current !== value) {
        this.current = value
        this.$refs['carousel'].setActiveItem(value)
      }
    }
  },
  methods: {
    clickBigImg (index) {
      this.$refs.imageViewer.$refs.modal.showModal()
      this.imageCurrentIndex = index
    },
    initConfig () {
      this.swiperOptionThumbs.loopedSlides = this.imageData.length
      if (this.imageData.length < 5) {
        this.swiperOptionThumbs.slidesPerView = this.imageData.length
      }
      this.loadImageSuccess = true
    },
    change (position) {
      if (this.current !== position) {
        this.current = position
        this.$refs.swiperThumbs.swiper.slideTo(position, 500, false)
      }
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
