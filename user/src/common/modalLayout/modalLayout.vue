<template>
  <div id="modal-layout" v-show="modalShow">
    <div class="layout-inner" :style="{ 'width': width + 'px'}">
      <div class="layout-content">
        <div class="layout-container">
          <span class="layout-icon-wrap" @click="modalShow = !modalShow"><i class="el-icon-close"></i></span>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'modalLayout',
  props: {
    width: String
  },
  data () {
    return {
      modalShow: false
    }
  },
  methods: {
    closeModal () {
      this.modalShow = false
    },
    showModal () {
      this.modalShow = true
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~STYLUS/color.styl'
  #modal-layout
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1000
    background: rgba(0, 0, 0, 0.9)
    .layout-inner
      display: table
      margin: 0 auto
      height: 100%
    .layout-content
      display: table-cell
      vertical-align: middle
    .layout-container
      position: relative
      border-radius: 4px
    .layout-icon-wrap
      position: absolute
      right: 20px
      top: 20px
      cursor: pointer
      .el-icon-close
        font-size: 20px
        color: $color-light-grey
        background: #00000055
        padding: 10px
        border-radius: 100px
        font-weight: bold
      &:hover
        .icon-close
          font-size: 14px
          color: $color-blue
</style>

