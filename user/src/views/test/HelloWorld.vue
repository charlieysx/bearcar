<template>
<div>
  <div id="header">
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
    }
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  },
  methods: {
    submit () {
      let loginFormParams = {
        userName: '13000000000',
        password: '1234567'
      }
      this.login(loginFormParams)
        .then((info) => {
          this.$router.push({ name: 'home' })
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