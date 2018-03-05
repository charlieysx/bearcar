<template>
  <div id="car-image">
      <p>{{ data.title }}</p>
      <ul class="image">
        <li v-for="(image, index) in data.imgList" 
          :key="index"
          :class="[data.imgList.length > 8 ? (index < 4 ? 'big' : 'small') : 'small']"
          v-if="(data.imgList.length > 8 && index < 8) || (data.imgList.length > 4 && index < 4)"
          :style="{backgroundImage: 'url(' + image + ')'}"
          @click="clickImg(index)">
            <div class="last-img" v-if="(data.imgList.length > 8 && index === 7) || (data.imgList.length > 4 && data.imgList.length < 8 && index === 3)">
              <p>查看{{ data.imgList.length }}张</p>
              {{ data.title }}图
            </div>
        </li>
      </ul>
      <!-- 查看图片 -->
      <image-viewer :index.sync="imageCurrentIndex" ref="imageViewer" :images="data.imgList"></image-viewer>
  </div>
</template>

<script>
import imageViewer from 'COMMON/imageViewer/imageViewer'

export default {
  name: 'carImage',
  props: ['data'],
  data () {
    return {
      imageCurrentIndex: 0
    }
  },
  components: {
    imageViewer
  },
  methods: {
    clickImg (index) {
      this.$refs.imageViewer.$refs.modal.showModal()
      this.imageCurrentIndex = index
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#car-image
  width: 100%
  background: $color-white
  text-align: center
  > p
    width: 100%
    padding: 10px
    font-size: 16px
    margin-top: 15px
    color: #495056
  .image
    width: 100%
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: space-between
    flex-wrap: wrap
    .big
      width: 578px
      height: 386px
      margin-bottom: 15px
      background-size: 578px 386px
      cursor: pointer
    .small
      width: 281px
      height: 187px
      background-size: 280px 187px
      cursor: pointer
      margin-bottom: 10px
    .last-img
      width: 100%
      height: 100%
      background: #000000bb
      color: $color-white
      font-size: 16px
      line-height: 24px
      text-align: center
      padding: 70px 10px
      > p
        margin: 0 auto
        font-size: 20px

</style>
