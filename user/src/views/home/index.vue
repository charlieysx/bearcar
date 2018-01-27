<template>
  <div id="index">
    <banner-view
      class="banner-view"
      :banners="banners">
    </banner-view>
    <div id="home-content">
      <div id="show-box">
        <div id="box-left">
          <div id="box-content-top">
            <span @click="buyCar">
              我要买车
              <i class="el-icon-arrow-right"></i>
            </span>
            <div class="header-search">
              <div class="header-search-wrap" :class="{'borderLight': inputBorder}">
                <input 
                  v-model="searchValue" 
                  @keyup.enter="toSearch('keyup')" 
                  @focus="inputBorder = true" 
                  @blur="inputBorder = false" 
                  type="text" 
                  placeholder="搜索您想要的车..." 
                  class="header-search-input">
                <i @click="toSearch('click')" class="el-icon-search"></i>
              </div>
            </div>
          </div>
          <div id="box-content-bottom">
            <div class="car-class">
              <span
                v-for="car in carClassList"
                :key="car.id"
                @click="searchCar(car)">
                {{ car.text }}
              </span>
            </div>
            <div class="car-price">
              <span
                v-for="price in carPriceList"
                :key="price.id"
                @click="searchPrice(price)">
                {{ price.text }}
              </span>
            </div>
          </div>
        </div>
        <div id="box-right">
          <div id="box-content-top">
            <span @click="sellCar">
              我要卖车
              <i class="el-icon-arrow-right"></i>
            </span>
            <div class="person-count-tip">
              已有
              <span>{{ personCount }}</span>
              人提交申请
            </div>
          </div>
          <div id="box-content-bottom">
            <li class="color-blue" @click="sellCar">我要卖车</li>
            <li class="color-green" @click="freeEstimate">免费估价</li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import bannerView from 'COMMON/banner/bannerView'

export default {
  name: 'home',
  data () {
    return {
      inputBorder: false,
      personCount: 26595245,
      searchValue: '',
      banners: [
        {
          id: 0,
          imgUrl: 'https://image.guazistatic.com/gz01171128/18/09/9821b23ae5abc8c309dac11cab305a52.jpg@base@tag=imgScale'
        },
        {
          id: 1,
          imgUrl: 'https://image.guazistatic.com/gz01171128/18/09/5cebdbbdc3088ba927a5745ef0feb55d.jpg@base@tag=imgScale'
        },
        {
          id: 2,
          imgUrl: 'https://image.guazistatic.com/gz01180117/17/52/4985094adcba37aa0854ce02bf8d4695.jpg@base@tag=imgScale'
        }
      ],
      carPriceList: [
        {
          id: 0,
          text: '3万以下'
        },
        {
          id: 1,
          text: '3-6万'
        },
        {
          id: 2,
          text: '6-9万'
        },
        {
          id: 3,
          text: '9-12万'
        },
        {
          id: 4,
          text: '12-16万'
        },
        {
          id: 5,
          text: '16-20万'
        },
        {
          id: 6,
          text: '20万以上'
        }
      ],
      carClassList: [
        {
          id: 0,
          text: '大众'
        },
        {
          id: 1,
          text: '福特'
        },
        {
          id: 2,
          text: '别克'
        },
        {
          id: 3,
          text: '现代'
        },
        {
          id: 4,
          text: '雪佛兰'
        },
        {
          id: 5,
          text: '丰田'
        },
        {
          id: -1,
          text: '...更多'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentCity'
    ])
  },
  created () {
  },
  watch: {
    currentCity (val) {
    }
  },
  methods: {
    ...mapActions([
    ]),
    ...mapMutations({
    }),
    toSearch (type) {
      if (type === 'keyup' && !this.inputBorder) {
        return false
      }
      this.searchValue = ''
    },
    borderLight () {
      return this.inputBorder ? '' : 'borderLight'
    },
    buyCar () {
      alert('buy')
    },
    sellCar () {
      alert('sell')
    },
    searchCar (car) {
      alert(car.text)
    },
    searchPrice (price) {
      alert(price.text)
    },
    freeEstimate () {
      alert('免费估价')
    }
  },
  components: {
    bannerView
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#index
  #home-content
    margin-top: -65px
    position: absolute
    width: 100%
    .borderLight
      border: 1px solid $color-blue !important
      background: $color-white !important
    #show-box
      position: relative
      width: 1170px
      height: 200px
      margin: 0 auto
      background: $color-white
      box-shadow: 1px 1px 10px 1px rgba(15, 166, 255, .1)
      font-size: 0px
      padding: 20px
      padding-left: 30px
      padding-right: 30px
      border-radius: 10px
    #box-left
      display: inline-block
      width: 65%
      height: 100%
      font-size: 16px
    #box-right
      display: inline-block
      width: 35%
      height: 100%
      font-size: 16px
    #box-content-top
      width: 100%
      height: 50px
      padding-left: 10px
      padding-right: 10px
      display: flex
      display: -webkit-flex
      align-items: center
      justify-content: space-between
      > span
        cursor: pointer
        font-size: 20px
        color: $color-mid-grey
        font-weight: bold
        &:hover
          color: $color-blue
      .header-search
        display: inline-block
        margin-right: 30px
      .header-search-wrap
        background: #f5f5f7
        width: 300px
        height: 40px
        padding: 5px 10px
        border-radius: 20px
        text-align: center
        border: 1px solid $color-bg-grey
        .el-icon-search
          color: $color-mid-grey
          cursor: pointer
          font-size: 18px
      .header-search-input
        width: 250px
        height: 28px
        border: none
        background: inherit
        font-size: 14px
        &::placeholder
          color: $text-tip
    .person-count-tip
      color: $text-tip
      > span
        font-size: 20px
        color: $color-blue
        font-weight: bold
    #box-content-bottom
      width: 100%
      height: 120px
      display: flex
      display: -webkit-flex
      align-items: center
      flex-direction: column
      > li
        width: 80%
        height: 40px
        margin-top: 10px
        color: $color-white
        display: flex
        display: -webkit-flex
        align-items: center
        justify-content: center
        font-size: 20px
        font-weight: bold
        border-radius: 20px
        &:hover
          cursor: pointer
      .color-blue
        background: #24b9ffe8
        &:hover
          background: #24b9ff
      .color-green
        background: #8bc434
        &:hover
          background: #85b931
    .car-class
      width: 100%
      padding-left: 10px
      padding-right: 40px
      display: flex
      display: -webkit-flex
      align-items: center
      justify-content: space-between
      font-size: 15px
      padding-top: 20px
      > span
        &:hover
          cursor: pointer
          color: $color-blue
    .car-price
      width: 100%
      padding-left: 10px
      padding-right: 40px
      font-size: 15px
      display: flex
      display: -webkit-flex
      align-items: center
      justify-content: space-between
      padding-top: 30px
      > span
        &:hover
          cursor: pointer
          color: $color-blue
</style>

