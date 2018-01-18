<template>
<div>
  <div id="header">
    <div>{{result}}</div>
    <div>{{isLogin}}</div>
    <el-button type="primary" @click="open">{{msg}}</el-button>
    <el-button type="primary" @click="submit">登录</el-button>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  data () {
    return {
      msg: '啦啦',
      result: '空',
      text: '0'
    }
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  },
  methods: {
    open () {
      this.$message({
        message: this.isLogin,
        type: 'success'
      })
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
    top: 0
    left: 0
    right: 0
    padding: 10px
    text-align: center
    user-select: none
</style>