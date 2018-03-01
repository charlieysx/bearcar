<template>
  <div class="carimg-upload-wrap">
    <el-upload
      ref="upload"
      class="carimg-uploader"
      action="http://up-z2.qiniu.com"
      :data="token"
      :show-file-list="false"
      :auto-upload="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-change="onFileChange"
      :on-progress="onUploadProgress">
      <div class="img-wrap">
        <img :src="imageUrl" class="carimg" v-if="imageUrl">
        <div class="img-mask-default" v-else>
          <i class="iconfont icon-upload"></i>
          <div>{{ tip }}</div>
        </div>
        <div class="img-mask">
          <i class="iconfont icon-upload"></i>
          <div>{{ tip }}</div>
        </div>
      </div>
    </el-upload>
    <cropperBox 
      ref="cropperBox"
      :options="options"
      :uploadProgress="uploadProgress"
      @finishCropImage="finishCropImage">
    </cropperBox>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'

import cropperBox from './cropperBox'

export default {
  name: 'upCarCover',
  components: {
    cropperBox
  },
  props: {
    defaultImg: String,
    tip: String
  },
  data () {
    return {
      cropper: null,
      newFile: null,
      options: {
        aspectRatio: 1.5 / 1,
        preview: '#cropperRes',
        zoomOnWheel: false,
        minCropBoxWidth: 50
      },
      token: {},
      uploadProgress: 0
    }
  },
  computed: {
    imageUrl () {
      return this.defaultImg
    }
  },
  methods: {
    ...mapActions([
      'getQiniuToken'
    ]),
    onFileChange (file, fileList) {
      if (file.status === 'ready') {
        const fileType = [
          'image/jpeg',
          'image/png',
          'image/webp'
        ]
        const type = fileType.indexOf(file.raw.type)
        const size = file.raw.size / 1024 / 1024 <= 2
        if (type === -1) {
          this.$toast({
            message: '只限jpg、png、webp格式'
          })
          return false
        }
        if (!size) {
          this.$toast({
            message: '图片太大了~最多支持2MB'
          })
          return false
        }

        this.$refs.cropperBox.show()
        this.$refs.cropperBox.loadCropper(file.raw)
      }
    },
    finishCropImage (newFile) {
      this.newFile = newFile
      this.getQiniuToken('bearcar')
        .then((data) => {
          this.token = data
          this.$refs.upload.submit()
        })
    },
    handleAvatarSuccess (response, file) {
      this.$emit('uploadSuccess', response.imgUrl)
      this.$refs.cropperBox.close()
    },
    beforeAvatarUpload (file) {
      let uploadFile = new window.File([this.newFile], file.name, { type: this.newFile.type })
      uploadFile.uid = this.newFile.uid
      return Promise.resolve(uploadFile)
    },
    onUploadProgress (event, file, fileList) {
      this.uploadProgress = parseInt(event.percent) - 1
    }
  }
}
</script>
<style lang="stylus">
  @import '~STYLUS/color.styl'
  .carimg-upload-wrap
    width: 225px
    height: 150px
    border-radius: 5px
    .carimg
      width: 225px
      height: 150px
      border-radius: 5px
    .carimg-uploader .el-upload {
      cursor: pointer
      position: relative
      overflow: hidden
      width: 225px
      height: 150px
      border-radius: 5px
      border: 1px solid #dddddd
    }
    .img-wrap
      position: relative
      &:hover
        .img-mask
          opacity: 1
    .img-mask
      position: absolute
      left: 0
      top: 0
      width: 225px
      height: 150px
      z-index: 1
      background: rgba(0, 0, 0, 0.5)
      color: $color-white
      display: flex
      flex-direction: column
      justify-content: center
      opacity: 0
      transition: opacity .2s linear
      > i
        color: $color-white
        font-size: 16px
        height: 16px
        line-height: 16px
      > div
        height: 16px
        line-height: 16px
        font-size: 12px
    .img-mask-default
      position: absolute
      left: 0
      top: 0
      width: 225px
      height: 150px
      z-index: 1
      background: $color-white
      display: flex
      flex-direction: column
      justify-content: center
      transition: opacity .2s linear
      > i
        font-size: 16px
        height: 16px
        line-height: 16px
      > div
        height: 16px
        line-height: 16px
        font-size: 12px
</style>
