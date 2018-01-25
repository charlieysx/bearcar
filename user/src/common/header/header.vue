<template>
  <div id="header-main" v-if="showHeader">
    <div id="header-body">
      <div class="header-wrap" :style="style">
        <a class="header-logo"></a>
        <div class="header-city" @mouseover="showCityPickerF" @mouseout="hideCityPickerF">
          <div class="city-name">{{currentCity.cityName}}</div>
          <i class="el-icon-arrow-down"></i>
          <city-picker
            class="city-picker"
            v-show="showCityPicker"
            :currentCity="currentCity"
            :hotCities="hotCities" 
            :allCities="allCities"
            @city-click="cityClick">
          </city-picker>
        </div>
      </div>
    </div>
    <div id="header-space"></div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
import {
  SET_CURRENT_CITY
} from 'STORE/mutation-types'
import clickoutside from 'UTIL/clickoutside.js'
import cityPicker from 'COMMON/cityPicker/cityPicker'

export default {
  name: 'page-header',
  directives: {
    clickoutside
  },
  components: {
    cityPicker
  },
  data () {
    return {
      msg: '啦啦',
      result: '空',
      text: '0',
      showCityPicker: false,
      style: {
        left: '0px'
      },
      hotCities: [
        {
          cityId: '-1',
          cityName: '全国'
        },
        {
          cityId: '1',
          cityName: '北京'
        },
        {
          cityId: '2',
          cityName: '上海'
        },
        {
          cityId: '3',
          cityName: '广州'
        },
        {
          cityId: '4',
          cityName: '深圳'
        },
        {
          cityId: '5',
          cityName: '成都'
        },
        {
          cityId: '6',
          cityName: '杭州'
        }
      ]
    }
  },
  created () {
    this.getCitySort()
  },
  mounted () {
    window.addEventListener('scroll', this.fixTopBarScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.fixTopBarScroll)
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'showHeader',
      'allCities',
      'currentCity'
    ])
  },
  methods: {
    showCityPickerF () {
      this.showCityPicker = true
    },
    hideCityPickerF () {
      this.showCityPicker = false
    },
    cityClick (city) {
      this.changeCity(city)
      this.hideCityPickerF()
    },
    submit () {
      let loginFormParams = {
        userName: 'admin',
        password: '123456'
      }
      this.login(loginFormParams)
        .then((info) => {
          this.result = info
        })
        .catch((err) => {
          this.result = err
        })
    },
    fixTopBarScroll () {
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      this.style.left = `-${scrollLeft}px`
    },
    ...mapActions([
      'login',
      'getCitySort'
    ]),
    ...mapMutations({
      'changeCity': SET_CURRENT_CITY
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~STYLUS/mixin.styl'
  @import '~STYLUS/color.styl'
  #header-body
    width: 100%
    position: fixed
    top: 0
    left: 0
    right: 0
    background: $color-white
    user-select: none
    z-index: 10
    box-shadow: 1px 1px 10px 1px rgba(15, 166, 255, .1)
    .header-wrap
      position: relative
      height 70px
      width: 1370px
      margin: 0 auto
      .header-logo
        display: inline-block
        margin: 23px 0
        height: 24px
        width: 112px
        background: url('~IMAGES/logo.png') no-repeat
        background-position: 50% 50%
        background-size: 112px 24px
        cursor: pointer
      .header-city
        display: inline-block
        padding: 26px 0
        vertical-align: top
        margin-left: 20px
        font-size: 16px
        cursor: pointer
        color: $color-dark-grey
        &:hover
          color: $color-blue
        .city-name
          display: inline-block
  #header-space
    width: 100%
    height: 70px
  .city-picker
    position: absolute
    top: 60px
</style>
