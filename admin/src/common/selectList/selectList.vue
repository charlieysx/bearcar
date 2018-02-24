<template>
  <div id="select-list" @mouseover="showList" @mouseout="hideList">
    <div 
        class="select-list-value" 
        :class="{'borderLight': borderLight}"
        ref="valueDiv"
        :style="{'width': width}">
        <span class="select-value">
            {{ selectItemData.realValue ? selectItemData.realValue : selectItemData.value }}
        </span>
        <i :class="[borderLight ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
    </div>
    <div class="select-list-wrap" 
        :style="[{'display': borderLight ? 'block' : 'none'}]"
        ref="list">
        <div 
            v-for="(item, index) in selectModel.list"
            :key="index"
            class="select-item"
            @click="selectItem(item)">
            {{ item.value }}
         </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'selectList',
  props: ['selectModel', 'mark'],
  data () {
    return {
      borderLight: true,
      width: '0px',
      selectItemData: {}
    }
  },
  mounted () {
    this.selectItemData = this.selectModel.list[0]
    this.width = this.$refs.list.offsetWidth + 'px'
    this.borderLight = false
  },
  watch: {
    mark (value) {
      this.selectItemData = this.selectModel.list[0]
    }
  },
  methods: {
    showList () {
      this.borderLight = true
    },
    hideList () {
      this.borderLight = false
    },
    selectItem (item) {
      this.selectItemData = item
      this.hideList()
      this.$emit('item-select', {
        parent: {
          type: this.selectModel.type,
          tag: this.selectModel.tag,
          title: this.selectModel.title
        },
        item: item
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#select-list
    .borderLight
        border: 1px solid $color-blue !important
        background: $color-white !important
    .select-list-value
        min-width: 84px
        padding: 5px
        background: $color-white
        border: 1px solid #e6e6e6
        display: flex
        display: -webkit-flex
        flex-direction: row
        justify-content: space-between
        .el-icon-arrow-up,
        .el-icon-arrow-up
            color: $color-mid-grey
    .select-value
        margin-right: 2px
        single-text-ellipsis()
    .select-list-wrap
        position: absolute
        min-width: 84px
        background: $color-white
        border: 1px solid $color-blue !important
        background: $color-white !important
        z-index: 10
        font-size: 14px
        cursor: default
        display: none
        display: flex
        display: -webkit-flex
        flex-direction: row
        align-items: center
        .select-item
            width: 100%
            padding: 5px
            &:hover
                cursor: pointer
                background: $color-blue
                color: $color-white


</style>