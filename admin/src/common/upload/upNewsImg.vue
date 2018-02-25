<template>
  <div class="avatar-upload-wrap">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      action="http://up-z2.qiniu.com"
      :data="token"
      :show-file-list="false"
      :auto-upload="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-change="onFileChange">
      <div class="img-wrap">
        <img :src="imageUrl" class="avatar" v-if="imageUrl">
        <div class="img-mask-default" v-else>
          <i class="iconfont icon-upload"></i>
          <div>上传封面图</div>
        </div>
        <div class="img-mask">
          <i class="iconfont icon-upload"></i>
          <div>上传封面图</div>
        </div>
      </div>
    </el-upload>
    <cropperBox 
      ref="cropperBox"
      :options="options"
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
  name: 'upNewsImg',
  components: {
    cropperBox
  },
  props: {
    defaultImg: String
  },
  data () {
    return {
      cropper: null,
      newFile: null,
      options: {
        aspectRatio: 127 / 50,
        preview: '#cropperRes',
        zoomOnWheel: false,
        minCropBoxWidth: 50
      },
      token: {}
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
          'image/png'
        ]
        const type = fileType.indexOf(file.raw.type)
        const size = file.raw.size / 1024 / 1024 <= 2
        if (type === -1) {
          this.$toast({
            message: '只限jpg或png格式'
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
    }
  }
}
</script>
<style lang="stylus">
  @import '~STYLUS/color.styl'
  .avatar-upload-wrap
    width: 510px
    height: 200px
    border-radius: 5px
    .avatar-wrap
      position: relative
    .avatar
      width: 510px
      height: 200px
      border-radius: 5px
    .avatar-uploader .el-upload {
      cursor: pointer
      position: relative
      overflow: hidden
      width: 510px
      height: 200px
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
      width: 510px
      height: 200px
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
      width: 510px
      height: 200px
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
