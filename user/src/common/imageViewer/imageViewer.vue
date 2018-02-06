<template>
  <div id="image-viewer">
    <modal-layout ref="modal" width="1170">
      <div class="image">
        <div class="image-btn" @click="prev"><i class="el-icon-arrow-left"></i></div>
        <div class="image-wrap" :style="{backgroundImage: 'url(' + images[index].url + ')'}">
        </div>
        <div class="image-btn" @click="next"><i class="el-icon-arrow-right"></i></div>
      </div>
    </modal-layout>
  </div>
</template>
<script>
  import modalLayout from 'COMMON/modalLayout/modalLayout'
  export default {
    name: 'imageViewer',
    props: {
      images: {
        type: Array,
        default: []
      },
      index: Number,
      field: {
        type: String,
        default: ''
      }
    },
    components: {
      modalLayout
    },
    methods: {
      next () {
        let index = this.index
        if (this.index === this.images.length - 1) {
          this.$emit('update:index', 0)
        } else {
          this.$emit('update:index', index + 1)
        }
      },
      prev () {
        let index = this.index
        if (this.index === 0) {
          this.$emit('update:index', this.images.length - 1)
        } else {
          this.$emit('update:index', index - 1)
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~STYLUS/color.styl'
  .image
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    .image-btn
      flex: 0 0 50px
      text-align: center
      cursor: pointer
      background: #00000055
      margin: 10px
      i
        color: $color-white
        font-size: 60px
    .image-wrap
      height: 740px
      margin: 20px 0
      width: 100%
      padding: 10px 0
      text-align: center
      background-repeat: no-repeat
      background-size: contain
      background-position: center
</style>