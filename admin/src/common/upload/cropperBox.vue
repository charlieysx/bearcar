<template>
  <div class="cropper-wrap">
    <div class="cropper-alert-mask" :class="{ show: imgHasLoad }"></div>
    <div class="cropper-alert" :class="{ show: imgHasLoad }">
      <span class="layout-icon-wrap"><i class="iconfont icon-close" @click="imgHasLoad=false"></i></span>
      <div class="cropper">
        <div class="cropper-box">
          <img ref="uploadPreview" style="width:100px;height:auto;">
        </div>
        <div class="cropper-res-wrap">
          <div class="cropper-res" id="cropperRes">
            <img style="width:100px;height:100px;">
          </div>
        </div>
      </div>
      <div class="cropper-btns-wrap">
        <el-progress 
          :text-inside="true" 
          :stroke-width="30" 
          :percentage="uploadProgress">
        </el-progress>
        <button 
          type="button" 
          class="cropper-btn" 
          @click="finishCropImage" 
          :disabled="btnTips.disable"
          :class="{'btn-bg': uploading}">
          {{ btnTips.value }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'

export default {
  name: 'cropper-box',
  props: {
    options: {
      default: {
        aspectRatio: 1 / 1,
        preview: '#cropperRes',
        zoomOnWheel: false,
        minCropBoxWidth: 50
      }
    },
    uploadProgress: {
      default: 0
    }
  },
  data () {
    return {
      cropper: null,
      imgHasLoad: false,
      cropperHasInit: false,
      uploading: false,
      rawFile: null
    }
  },
  watch: {
    imgHasLoad (val) {
      if (!val) {
        this.uploading = false
      }
    }
  },
  computed: {
    btnTips () {
      if (this.uploading) {
        return {
          value: '正在上传，请稍等',
          disable: true
        }
      }
      return {
        value: '裁剪完成，立即上传',
        disable: false
      }
    }
  },
  methods: {
    show () {
      this.imgHasLoad = true
    },
    close () {
      this.imgHasLoad = false
    },
    loadCropper (rawFile) {
      this.rawFile = rawFile
      const URL = window.URL || window.webkitURL
      const blobURL = URL.createObjectURL(rawFile)
      var image = this.$refs.uploadPreview
      if (!this.cropper) this.cropper = new Cropper(image, this.options)
      this.cropper.reset().replace(blobURL)
    },
    finishCropImage () { // 完成裁剪，并输出裁剪结果，然后传到七牛
      this.uploading = true

      const croppedCanvas = this.cropper.getCroppedCanvas()
      const croppedDataUrl = croppedCanvas.toDataURL()
      const blob = this.dataURLtoBlob(croppedDataUrl)
      // let newFile = new window.File([blob], this.rawFile.name, { type: this.rawFile.type })
      // newFile.uid = this.rawFile.uid
      blob.uid = this.rawFile.uid
      this.$emit('finishCropImage', blob)
      // return Promise.resolve(blob)
    },
    // dataUrl 转 blob
    dataURLtoBlob (dataurl) {
      /* eslint-disable */
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
      /* eslint-enable */
    }
  }
}
</script>


<style lang="stylus">
  @import "~cropperjs/dist/cropper.min.css"
  @import "~STYLUS/color.styl"

  .cropper-alert-mask
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1000
    background: rgba($color-black, .1)
    visibility: hidden
    height: 0
    transition: all .3s ease

  .cropper-alert-mask.show
    visibility: visible
    height: 100%

  .cropper-alert
    opacity: 0
    transition: all .3s ease
    visibility: hidden
    transform: scale(2)
    padding: 30px
    position: fixed
    z-index: 1000
    top: 50px
    left: 50%
    margin-left: -300px
    background-color: $color-white
    -webkit-border-radius: 5px
    border-radius: 5px
    overflow: hidden
    &.show
      opacity: 1
      visibility: visible
      transform: scale(1)
    .layout-icon-wrap
      cursor: pointer
  .cropper
    position: relative
    width: 600px
    height: 460px
    padding: 60px 120px
    background-color: $color-bg-grey

    .cropper-box
      width: 340px
      height: 340px

    .cropper-res-wrap
      position: absolute
      top: 0
      right: 0
      width: 100px
      height: auto
      padding: 15px
      background-color: $color-bg-grey
      box-sizing: content-box

      .cropper-res
        width: 100px
        height: 100px
        overflow: hidden
        border: 1px solid $color-weak-grey
        background-color: $color-white
.cropper-btns-wrap
  position: relative
  margin-top: 20px
  .cropper-btn
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 30px
    background: $color-white
    border: 1px solid $color-weak-grey
    border-radius: 15px
    color: $color-mid-grey
    cursor: pointer
  .btn-bg
    background: #FF000000
</style>

