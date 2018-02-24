<template>
  <div id="select-city-list" @mouseover="showList" @mouseout="hideList">
    <div 
        class="select-list-value" 
        :class="{'borderLight': borderLight}"
        ref="valueDiv">
        <span class="select-value" :class="{dark: !selectItemData.cityName}">
            {{ selectItemData.cityName ? selectItemData.cityName : title }}
        </span>
        <i :class="[borderLight ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
    </div>
    <div class="select-list-wrap" 
        :style="[{'display': borderLight ? 'block' : 'none', 'width': width}]">
        <div 
            v-for="(item, index) in selectModel"
            :key="index"
            class="select-item"
            @click="selectItem(item)">
            {{ item.cityName }}
         </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'selectCityList',
  props: ['selectModel', 'mark', 'title', 'currentCity'],
  data () {
    return {
      borderLight: false,
      width: '0px',
      selectItemData: {}
    }
  },
  watch: {
    mark (value) {
      this.selectItemData = {}
    },
    currentCity (value) {
      this.selectItemData = value
    }
  },
  methods: {
    showList () {
      this.borderLight = true
      this.width = this.$refs.valueDiv.offsetWidth + 'px'
    },
    hideList () {
      this.borderLight = false
    },
    selectItem (item) {
      this.selectItemData = item
      this.borderLight = false
      this.$emit('item-select', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#select-city-list
    cursor: pointer
    .borderLight
        border: 1px solid $color-blue !important
        border-bottom-left-radius: 0px !important
        border-bottom-right-radius: 0px !important
        border-bottom: 0px !important
        background: $color-white !important
    .select-list-value
        wdith: 100%
        padding: 10px
        background: $color-white
        border: 1px solid #e6e6e6
        display: flex
        display: -webkit-flex
        flex-direction: row
        justify-content: space-between
        border-radius: 3px
        z-index: 100
        .el-icon-arrow-up,
        .el-icon-arrow-up
            color: $color-mid-grey
    .select-value
        margin-right: 2px
        single-text-ellipsis()
    .dark
        color: #bcbcbc
    .select-list-wrap
        position: absolute
        background: $color-white
        border: 1px solid $color-blue !important
        background: $color-white !important
        z-index: 101
        font-size: 14px
        cursor: default
        display: none
        display: flex
        display: -webkit-flex
        flex-direction: row
        align-items: center
        border-radius: 3px
        border-top-left-radius: 0px !important
        border-top-right-radius: 0px !important
        max-height: 200px
        overflow: auto
        .select-item
            width: 100%
            padding: 10px
            font-size: 14px
            &:hover
                cursor: pointer
                background: $color-blue
                color: $color-white


</style>