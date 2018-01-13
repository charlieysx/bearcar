<template>
<div>
  <div id="header">
  <!-- <el-card class="box-card"> -->
    <div>{{result}}</div>
    <el-button type="primary" @click="open">{{msg}}</el-button>
    <el-button type="primary" @click="submit">登录</el-button>
  <!-- </el-card> -->
  </div>
  <div>{{text}}</div>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  data () {
    return {
      msg: '啦啦',
      result: '空',
      text: '0'
    }
  },
  methods: {
    open () {
      // this.$message({
      //   message: '第一个页面，哈哈哈',
      //   type: 'success'
      // })
      for (var i = 0; i < 100; i += 1) {
        this.text += i + '\n'
      }
    },
    submit () {
      let loginFormParams = {
        userName: 'admin',
        password: '123456'
      }
      this.login(loginFormParams)
        .then((info) => {
          this.result = info
        })
        .catch((err) => {
          this.result = err
        })
    },
    ...mapActions([
      'login'
    ])
  }
}
</script>
<style lang="stylus" scoped>
  @import '~STYLUS/mixin.styl'
  @import '~STYLUS/color.styl'
  #header
    width: 100%
    position: fixed
    top: 0
    left: 0
    right: 0
    padding: 10px
    background: $color-white
    user-select: none
    z-index: 10
    box-shadow: 1px 1px 10px 1px rgba(15, 166, 255, .1)
</style>