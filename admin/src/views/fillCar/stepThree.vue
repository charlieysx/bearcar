<template>
  <div id="step-three">
    <div class="info-wrap">
        <p class="info-title">上传封面图</p>
        <div class="info-content">
          <up-car-cover
            class="car-cover"
            :default-img="params.coverImgUrl" 
            @uploadSuccess="uploadCoverSuccess">
          </up-car-cover>
        </div>
    </div>
    <div class="info-wrap">
        <p class="info-title">上传车辆外观图</p>
        <div class="info-content">
          <div class="img-item"
            v-for="(url, index) in params.outImgUrl"
            :key="index">
            <img :src="url" alt="">
            <div class="img-mask">
              <i class="el-icon-delete" @click="deleteOutImg(index)"></i>
            </div>
          </div>
          <up-car-img @uploadSuccess="uploadOutImgSuccess" tip="添加车辆外观图"></up-car-img>
        </div>
    </div>
    <div class="info-wrap">
        <p class="info-title">上传中控内饰图</p>
        <div class="info-content">
          <div class="img-item"
            v-for="(url, index) in params.inImgUrl"
            :key="index">
            <img :src="url" alt="">
            <div class="img-mask">
              <i class="el-icon-delete" @click="deleteInImg(index)"></i>
            </div>
          </div>
          <up-car-img @uploadSuccess="uploadInImgSuccess" tip="添加中控内饰图"></up-car-img>
        </div>
    </div>
    <div class="info-wrap">
        <p class="info-title">上传发动机、底盘图</p>
        <div class="info-content">
          <div class="img-item"
            v-for="(url, index) in params.engineChassisImgUrl"
            :key="index">
            <img :src="url" alt="">
            <div class="img-mask">
              <i class="el-icon-delete" @click="deleteEngineChassisImg(index)"></i>
            </div>
          </div>
          <up-car-img @uploadSuccess="uploadEngineChassisImgSuccess" tip="添加发动机、底盘图"></up-car-img>
        </div>
    </div>
    <div class="info-btn">
      <el-button type="primary" :loading="submit" @click="submitForm">
        {{ submit ? '提交中...' : '提交'}}
      </el-button>
    </div>
  </div>
</template>

<script>

import {
  mapActions
} from 'vuex'
import upCarCover from 'COMMON/upload/upCarCover.vue'
import upCarImg from 'COMMON/upload/upCarImg.vue'

export default {
  name: 'stepThree',
  props: ['carId'],
  components: {
    upCarCover,
    upCarImg
  },
  data () {
    return {
      submit: false,
      params: {
        carId: '',
        coverImgUrl: '',
        outImgUrl: [],
        inImgUrl: [],
        engineChassisImgUrl: []
      }
    }
  },
  mounted () {
    this.params.carId = this.carId
  },
  methods: {
    ...mapActions([
      'fillCarThird'
    ]),
    uploadCoverSuccess (url) {
      this.params.coverImgUrl = url
    },
    uploadOutImgSuccess (url) {
      this.params.outImgUrl.push(url)
    },
    deleteOutImg (index) {
      this.params.outImgUrl.splice(index, 1)
    },
    uploadInImgSuccess (url) {
      this.params.inImgUrl.push(url)
    },
    deleteInImg (index) {
      this.params.inImgUrl.splice(index, 1)
    },
    uploadEngineChassisImgSuccess (url) {
      this.params.engineChassisImgUrl.push(url)
    },
    deleteEngineChassisImg (index) {
      this.params.engineChassisImgUrl.splice(index, 1)
    },
    submitForm () {
      if (this.params.coverImgUrl === '') {
        this.error('请上传封面图')
        return
      }
      if (this.params.outImgUrl.length === 0) {
        this.error('请上传车辆外观图')
        return
      }
      if (this.params.inImgUrl.length === 0) {
        this.error('请上传中控内饰图')
        return
      }
      if (this.params.engineChassisImgUrl.length === 0) {
        this.error('请上传发动机、底盘图')
        return
      }
      this.fillCarThird(this.params)
        .then((data) => {
          this.$toast({
            message: '提交全部信息完成，车辆已上架售卖'
          })
          this.$router.push({
            name: 'selling'
          })
        })
        .catch((err) => {
          this.$toast({
            message: err.data.msg
          })
        })
    },
    error (err) {
      this.$toast({
        message: err
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#step-three
  width: 100%
  .info-wrap
    .info-title
      text-align: center
      background: #545c64
      color: $color-white
      padding: 15px
      font-size: 18px
      font-weight: bold
    .info-content
      border: 1px solid #eeeeee
      padding: 10px
      padding-left: 14px
      padding-right: 0px
      display: flex
      display: -webkit-flex
      flex-direction: row
      flex-wrap: wrap
      .car-cover
        margin: 0 auto
        margin-bottom: 10px
      .img-item
        width: 225px
        height: 150px
        position: relative
        margin-right: 10px
        margin-bottom: 10px
        &:hover
          .img-mask
            opacity: 1
            cursor: pointer
        > img
          width: 225px
          height: 150px
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
          text-align: center
          opacity: 0
          transition: opacity .2s linear
          > i
            color: $color-white
            font-size: 24px
  .info-btn
    width: 100%
    text-align: center
    margin: 30px 0px
</style>