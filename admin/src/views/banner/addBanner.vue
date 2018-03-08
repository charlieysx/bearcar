<template>
  <div id="add-banner">
    <modal-layout ref="modal" width="800">
      <div class="box"
        v-loading="loading">
        <p>{{ add ? '添加banner' : '编辑banner' }}</p>
        <el-form
          class="info-content"
          style="padding: 0 20px">
          <el-form-item>
            <el-input 
              v-model="params.title"
              placeholder="请输入banner名称">
              <template slot="prepend">名称</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input 
              v-model="params.link"
              placeholder="请输入banner跳转链接">
              <template slot="prepend">链接</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input 
              v-model="params.position"
              placeholder="请输入banner显示位置，最小为1，越小越前">
              <template slot="prepend">位置</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <up-banner
              :defaultImg="params.banner"
              @uploadSuccess="uploadImgSuccess"
              @startUpload="loading = true"
              tip="选择banner图片">
            </up-banner>
          </el-form-item>
        </el-form>
        <div class="next-step" @click="submit">确定</div>
      </div>
    </modal-layout>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'

import modalLayout from 'COMMON/modalLayout/modalLayout'
import upBanner from 'COMMON/upload/upBanner.vue'

export default {
  name: 'add-banner',
  props: ['add', 'banner'],
  components: {
    modalLayout,
    upBanner
  },
  data () {
    return {
      params: {
        title: '',
        link: '',
        banner: '',
        position: 1,
        id: ''
      },
      loading: false
    }
  },
  watch: {
    banner (value) {
      this.params.title = value.title
      this.params.link = value.link
      this.params.banner = value.banner
      this.params.position = value.position
      this.params.id = value.id
    }
  },
  methods: {
    ...mapActions([
      'addBanner',
      'editBanner'
    ]),
    submit () {
      if (this.add) {
        this.submitAdd()
      } else {
        this.submitEdit()
      }
    },
    uploadImgSuccess (url) {
      this.params.banner = url
      this.loading = false
    },
    submitAdd () {
      if (this.params.banner === '') {
        this.$toast({
          message: '请上传图片'
        })
        return
      }
      this.addBanner(this.params)
        .then((data) => {
          this.$toast({
            message: '添加成功'
          })
          window.location.reload()
        })
        .catch((err) => {
          this.$toast({
            message: err.data.msg
          })
        })
    },
    submitEdit () {
      if (this.params.banner === '') {
        this.$toast({
          message: '请上传图片'
        })
        return
      }
      this.editBanner(this.params)
        .then((data) => {
          this.$toast({
            message: '修改成功'
          })
          window.location.reload()
        })
        .catch((err) => {
          this.$toast({
            message: err.data.msg
          })
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
.box
  background: $color-white
  height: 620px
  padding: 2px
  > p
    color: #495056
    font-size: 22px
    width: 100%
    padding: 20px
    text-align: center
  .next-step
    position: absolute
    width: 400px
    padding: 15px
    cursor: pointer
    color: $color-white
    background: $color-blue
    text-align: center
    font-size: 20px
    font-weight: bold
    bottom: 20px
    left: 210px
    border-radius: 3px
</style>