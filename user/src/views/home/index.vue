<template>
  <div id="index">
    <banner-view
      class="banner-view"
      :banners="banners">
    </banner-view>
    <div id="home-content">
      <!-- 选择box -->
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
      <!-- 资讯 -->
      <div id="car-box">
        <div id="car-box-left">
          <img src="~IMAGES/car1.png" alt="">
          <li class="li-color-black">选你所爱</li>
          <li class="li-color-red">3年内准新车</li>
        </div>
        <div id="car-box-middle">
          <div id="box-middle">
            <img src="~IMAGES/car2.png" alt="">
            <div>
              <li class="li-color-black">入门首选</li>
              <li class="li-color-red">5-7万品质而手车</li>
            </div>
          </div>
          <div id="box-middle">
            <img src="~IMAGES/car3.png" alt="">
            <div>
              <li class="li-color-black">车美价优</li>
              <li class="li-color-red">体验手动乐趣</li>
            </div>
          </div>
        </div>
        <div id="car-box-right">
          <div id="box-right-top">
            <span>资讯</span>
            <div class="info-more">更多</div>
          </div>
          <div id="box-right-content">
            <li 
              v-for="carInfo in carInfoList"
              :key="carInfo.id">
              <span class="info-title">• {{ carInfo.title }}</span>
              <span class="info-time">{{ carInfo.time }}</span>
            </li>
          </div>
        </div>
      </div>
      <!-- 买卖流程 -->
      <buy-sell-step-view class="buy-sell-step">
      </buy-sell-step-view>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import bannerView from 'COMMON/banner/bannerView'
import buySellStepView from 'COMMON/buySellStep/buySellStepView'

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
      ],
      carInfoList: [
        {
          id: 0,
          title: '我们不一样！沃尔沃S60L才是绝佳伴侣',
          time: '2018-1-27'
        },
        {
          id: 1,
          title: '二手车上的刹车片能看出车主人品 你信吗？',
          time: '2018-1-27'
        },
        {
          id: 2,
          title: '曾经100多万，现在只要8000！收一辆不？',
          time: '2018-1-27'
        },
        {
          id: 3,
          title: '二手车如何辨别好坏，学会这9点拒绝被坑！',
          time: '2018-1-27'
        },
        {
          id: 4,
          title: '征服男人的几款车，有钱也不一定能买到！',
          time: '2018-1-27'
        },
        {
          id: 5,
          title: '驾着风情满满的V90 CC 去体会北欧生活',
          time: '2018-1-27'
        },
        {
          id: 6,
          title: '美系、日系完爆德系！沃德十佳发动机二手车能买到谁？',
          time: '2018-1-27'
        },
        {
          id: 7,
          title: '冬季挡风玻璃起雾、结冰怎么破？老司机教你处理小妙招！',
          time: '2018-1-27'
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
    },
    sellCar () {
    },
    searchCar (car) {
    },
    searchPrice (price) {
    },
    freeEstimate () {
    }
  },
  components: {
    bannerView,
    buySellStepView
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#index
  #home-content
    margin-top: -65px
    position: relative
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
    #car-box
      position: relative
      width: 1170px
      height: 320px
      margin: 0 auto
      margin-top: 30px
      padding-bottom: 30px
      display: flex
      display: -webkit-flex
      align-items: center
      justify-content: space-between
      font-size: 16px
      #car-box-left
        width: 200px
        height: 100%
        background: $color-white
        display: flex
        display: -webkit-flex
        align-items: center
        justify-content: center
        flex-direction: column
        > img
          width: 200px
          margin-bottom: 30px
        &:hover
          cursor: pointer
          box-shadow: 1px 1px 10px 1px rgba(15, 166, 255, .1)
      #car-box-middle
        width: 440px
        height: 100%
        display: flex
        display: -webkit-flex
        align-items: center
        justify-content: space-between
        flex-direction: column
        #box-middle
          width: 100%
          height: 137px
          background: $color-white
          display: flex
          display: -webkit-flex
          align-items: center
          justify-content: flex-start
          > img
            width: 250px
          &:hover
            cursor: pointer
            box-shadow: 1px 1px 10px 1px rgba(15, 166, 255, .1)
      #car-box-right
        width: 498px
        height: 100%
        background: $color-white
        padding: 20px
        #box-right-top
          display: flex
          display: -webkit-flex
          align-items: center
          justify-content: space-between
          > span
            font-size: 18px
            color: $color-black
            &:hover
              cursor: pointer
              color: $color-blue
          .info-more
            font-size: 13px
            &:hover
              cursor: pointer
              color: $color-blue
        #box-right-content
          font-size: 15px
          color: $color-black
          margin-top: 16px
          li
            margin-top: 12px
            display: flex
            display: -webkit-flex
            align-items: center
            justify-content: space-between
            &:hover
              cursor: pointer
              color: $color-blue
          .info-title
            width: 70%
            text-overflow:ellipsis
            white-space:nowrap
            overflow:hidden
          .info-time
            width: auto
            font-size: 12px
    .li-color-black
      color: #495056
      margin-bottom: 14px
      font-weight: bold
    .li-color-red
      color: #f76367
      font-weight: bold
    .buy-sell-step
      position: relative
      margin-bottom: 30px
      
</style>

