<template>
  <div id="sort-brand-list" @mouseover="showList" @mouseout="hideList">
    <div 
        class="select-list-value" 
        :class="{'borderLight': borderLight}"
        ref="valueDiv">
        <span class="select-value" :class="{dark: !selectBrandData.brandName}">
            {{ selectBrandData.brandName ? selectBrandData.brandName : title }}
        </span>
        <i :class="[borderLight ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
    </div>
    <div :style="{width: width}" style="position: absolute" v-show="borderLight">
      <div class="list-inner" :style="{width: width}">
        <!-- 热门-->
        <ul class="chose-brand-list">
          <li class="clearfix"  ref="hot">
            <div class="letter">热门</div>
            <div class="hot-brand-list clearfix">
              <div class="hot-brand-item" v-for="(brand, index) in hotBrand" :key="index" @click="selectBrand(brand)">{{ brand.brandName }}</div>
            </div>
          </li>
        </ul>
        <!-- 全部-->
        <ul class="chose-brand-list">
          <li class="clearfix" v-for="(group, key) in allBrand" :key="key" ref="letter">
            <div class="letter">{{ key }}</div>
            <div class="all-brand-list clearfix">
              <div class="all-brand-item" v-for="brand in group" :key="brand.brandId" @click="selectBrand(brand)">{{ brand.brandName }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="letter-select">
        <ul>
          <li @click="toKey(-1)">
            热
          </li>
          <li v-for="(group, key, index) in allBrand" :key="index" @click="toKey(index)">
            {{ key }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'sortBrandList',
  props: ['allBrand', 'mark', 'title', 'hotBrand'],
  data () {
    return {
      borderLight: false,
      width: '0px',
      selectBrandData: {}
    }
  },
  watch: {
    mark (value) {
      this.selectBrandData = {}
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
    selectBrand (brand) {
      this.selectBrandData = brand
      this.borderLight = false
      this.$emit('brand-select', brand)
    },
    toKey (index) {
      if (index === -1) {
        this.$refs.hot.scrollIntoView()
      } else {
        this.$refs.letter[index].scrollIntoView()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#sort-brand-list
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
  .letter-select
    position: absolute
    right: 20px
    cursor: pointer
    font-size: 12px
    z-index: 101
    text-align: center
    height: 338px
    top: 1px
    display: flex
    display: -webkit-flex
    align-items: center
    li
      &:hover
        color: $color-blue
  .list-inner
    position: absolute
    wdith: 100%
    background: $color-white
    font-size: 14px
    height: 340px
    z-index: 101
    overflow: auto
    cursor: default
    overflow-x: hidden
    border-radius: 3px
    border-top-left-radius: 0px !important
    border-top-right-radius: 0px !important
    border: 1px solid $color-blue !important
    .chose-brand-list
      margin-right: 20px
      li
        .letter
          background: #e2e2e2
          color: #999999
          padding: 5px 10px
        .hot-brand-list
          display: flex
          display: -webkit-flex
          flex-direction: row
          flex-wrap: wrap
          .hot-brand-item
            margin: 4px
            padding: 4px
            &:hover
                cursor: pointer
                background: $color-blue
                color: $color-white
        .all-brand-list
          .all-brand-item
            width: 100%
            padding: 10px
            &:hover
                cursor: pointer
                background: $color-blue
                color: $color-white

</style>