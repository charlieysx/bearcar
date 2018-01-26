<template>
  <div id="city-picker">
    <div class="city-inner">
      <!-- 热门城市-->
      <div class="row hot-city-wrap">
        <div class="tag">热门城市：</div>
        <div class="hot-city">
          <span v-for="city in hotCities" :key="city.cityId" :class="{ current: city.cityId === currentCity.cityId }" @click="selectCity(city)">{{ city.cityName }}</span>
        </div>
      </div>
      <!-- 全部城市-->
      <div class="row chose-city-wrap">
        <ul class="chose-city-list">
          <li class="clearfix" v-for="(group, key) in allCities" :key="key">
            <div class="letter">{{ key }}</div>
            <div class="cities clearfix">
              <span v-for="city in group" :key="city.cityId" :class="{ current: city.cityId === currentCity.cityId }" @click="selectCity(city)">{{ city.cityName }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentCity', 'hotCities', 'allCities'],
  name: 'city-picker',
  methods: {
    selectCity (city) {
      this.$emit('city-click', city)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~STYLUS/color.styl"
#city-picker
  font-size: 14px
  box-shadow: 1px 1px 10px 0px #d4efff
  height: 400px
  overflow: auto
  cursor: default
.city-inner
  background: $color-white
  width: 800px

// 热门城市
.hot-city-wrap
  border-bottom: 1px solid $color-border
  padding: 15px
  padding-bottom: 0px
  > div
    float: left
  .tag
    color: $color-dark-blue
  .hot-city
    width: 690px
    color: $color-dark-grey
    > span
      margin: 0 14px
      float: left
      padding-bottom: 15px
      cursor: pointer
      &:last-child
        margin-right: 0
      &:hover,
      &.current
        color: $color-dark-blue
// 城市选择
.chose-city-wrap
  // 全部城市列表
  .chose-city-list
    li
      padding: 15px
      &:hover
        background: $color-bg-grey
        .letter
          background: $color-dark-blue
          color: $color-white
    div
      float: left
    .letter
      width: 32px
      height: @width
      line-height: @height
      color: $color-dark-grey
      border: 1px solid $color-border
      border-radius: 4px
      text-align: center
      margin-right: 40px
    .cities
      width: 690px
      span
        color: $color-dark-grey
        margin-right: 10px
        padding: 8px 14px
        cursor: pointer
        float:left
        &:hover,
        &.current
          color: $color-blue
</style>