<template>
  <div id="step-one-city-picker" @mouseover="showList" @mouseout="hideList" ref="picker">
    <div 
        class="select-list-value" 
        :class="{'borderLight': borderLight}"
        ref="valueDiv">
        <span :class="{'select-value': innerCurrentCity.cityName}">
            {{ innerCurrentCity.cityName ? innerCurrentCity.cityName : '请输入城市' }}
        </span>
        <i :class="[borderLight ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
    </div>
    <div :style="{width: width}" style="position: relative" v-show="borderLight">
      <div class="city-inner" :style="{width: width}">
        <!-- 全部城市-->
        <div class="chose-city-wrap">
          <ul class="chose-city-list">
            <li class="clearfix" v-for="(group, key) in allCities" :key="key" ref="letter">
              <div class="letter">{{ key }}</div>
              <div class="cities clearfix">
                <span v-for="city in group" :key="city.cityId" @click="selectCity(city)">{{ city.cityName }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="letter-select">
        <ul>
          <li v-for="(group, key, index) in allCities" :key="index" @click="toKey(index)">
            {{ key }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['allCities'],
  name: 'step-one-city-picker',
  data () {
    return {
      borderLight: false,
      innerCurrentCity: {},
      width: '0px'
    }
  },
  methods: {
    selectCity (city) {
      this.innerCurrentCity = city
      this.borderLight = false
      this.$emit('city-click', city)
    },
    showList () {
      this.borderLight = true
      if (this.$refs.valueDiv) {
        this.width = this.$refs.valueDiv.offsetWidth + 'px'
      }
    },
    hideList () {
      this.borderLight = false
    },
    toKey (index) {
      this.$refs.letter[index].scrollIntoView()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~STYLUS/color.styl"
@import '~STYLUS/mixin.styl'
#step-one-city-picker
  width: 100%
  cursor: pointer
  position: absolute
  line-height: 1
  .borderLight
    border: 1px solid $color-blue !important
    border-bottom-left-radius: 0px !important
    border-bottom-right-radius: 0px !important
    border-bottom: 0px !important
    background: $color-white !important
  .select-list-value
    width: 100%
    height: 40px
    border: 1px solid #e6e6e6
    padding: 0px 15px
    z-index: 100
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    border-radius: 3px
    .el-icon-arrow-up,
    .el-icon-arrow-up
      color: $color-mid-grey
    > span
      color: #C4C9D0
      &.select-value
        color: #606266
  .letter-select
    position: absolute
    right: 20px
    cursor: pointer
    font-size: 10px
    z-index: 101
    text-align: center
    height: 285px
    display: flex
    display: -webkit-flex
    align-items: center
    li
      &:hover
        color: $color-blue
  .city-inner
    position: absolute
    wdith: 100%
    background: $color-white
    font-size: 14px
    height: 286px
    z-index: 101
    overflow: scroll
    cursor: default
    overflow-x: hidden
    border-radius: 3px
    border-top-left-radius: 0px !important
    border-top-right-radius: 0px !important
    border: 1px solid $color-blue !important
    // 城市选择
    .chose-city-wrap
      // 全部城市列表
      .chose-city-list
        li
          padding: 6px 10px
          &:hover
            background: $color-bg-grey
            .letter
              background: $color-dark-blue
              color: $color-white
        div
          float: left
        .letter
          width: 20px
          height: @width
          line-height: @height
          color: $color-dark-grey
          border: 1px solid $color-border
          border-radius: 4px
          text-align: center
          margin-right: 5px
        .cities
          width: 760px
          span
            color: $color-dark-grey
            margin-right: 5px
            padding: 2px 4px
            cursor: pointer
            float:left
            &:hover
              color: $color-blue
</style>