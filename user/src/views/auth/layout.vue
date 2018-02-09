<template>
<scroll-lock>
  <div id="auth-layout">
    <span class="close-icon-wrap" @click="closeLoginMask()"><i class="el-icon-close"></i></span>
    <div class="layout-wrap">
      <div class="layout-inner">
        <transition name="component-fade" mode="out-in">
          <component ref="viewComponents" :is="loginView" @changeView="change"></component>
        </transition>
      </div>
    </div>
  </div>
</scroll-lock>
</template>
<script>
  import login from 'VIEWS/auth/login'
  import register from 'VIEWS/auth/register'
  import resetPsw from 'VIEWS/auth/resetPsw'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'auth-layout',
    components: {
      login,
      register,
      resetPsw
    },
    computed: {
      ...mapGetters([
        'loginView'
      ])
    },
    methods: {
      ...mapActions([
        'setLoginMaskStatus'
      ]),
      closeLoginMask () {
        this.setLoginMaskStatus({ show: false, view: 'login' })
      },
      change (type) {
        switch (type) {
          case 'login':
            this.setLoginMaskStatus({ show: true, view: 'login' })
            break
          case 'register':
            this.setLoginMaskStatus({ show: true, view: 'register' })
            break
          case 'resetPsw':
            this.setLoginMaskStatus({ show: true, view: 'resetPsw' })
            break
          default:
            break
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~STYLUS/color.styl'
  #auth-layout
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 1000
    background: rgba(255, 255, 255, 0.95)
    .layout-tocompany
      display: block
      width: 460px
      margin: 0 auto
      font-size: 14px
      color: $color-blue
      text-align: right
      cursor: pointer
    .close-icon-wrap
      position: absolute
      right: 30px
      top: 30px
      cursor: pointer
      .el-icon-close
        font-size: 26px
        color: $color-light-grey
      &:hover
        .el-icon-close
          font-size: 26px
          color: $color-blue
    .layout-wrap
      width: 760px
      height: 100%
      margin: 0 auto
      display: table
    .layout-inner
      display: table-cell
      vertical-align: middle
  .component-fade-enter-active, .component-fade-leave-active
    transition: opacity .2s ease;
  .component-fade-enter, .component-fade-leave-to
    opacity: 0;
</style>
