<template>
  <div id="appindex">
    <page-header></page-header>
    <div class="viewWrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import pageHeader from 'COMMON/header/header'

export default {
  name: 'app',
  components: {
    pageHeader
  }
}
</script>

 <style lang="stylus" src="STYLUS/main.styl"></style>

<style lang="stylus">
  #appindex
    // padding-top: 65px
    .viewWrap
      background-color: #33000011
      min-height: calc(110vh - 110px)
      min-width: 1170px
  .fade-enter-active, .fade-leave-active
    transition: opacity .3s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
