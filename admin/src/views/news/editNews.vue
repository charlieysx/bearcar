<template>
  <div id="ue">
    <div class="title">资讯-发布资讯</div>
    <div class="editor-container">
      <UE :config="config" :id="uEdit" ref="ue"></UE>
    </div>
  </div>
</template>
<script>
import UE from 'COMMON/ue/ue.vue'

export default {
  components: {
    UE
  },
  data () {
    return {
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 600
      },
      uEdit: 'uEdit'
    }
  },
  methods: {
    getUEContent () {
      // let content = this.$refs.ue.getUEContent()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#ue
  width: 100%
  .title
    text-align: center
    background: #545c64
    color: $color-white
    font-size: 18px
    height: 70px
    line-height: 18px
    padding: 26px
  .editor-container
    width: 100%
</style>
