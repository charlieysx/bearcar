<template>
  <div id="index">
    <!-- banner -->
    <banner-view
      class="banner-view"
      :banners="banners"
      :pageVisibility="pageVisibility">
    </banner-view>
    <!-- banner 结束 -->
    <div id="home-content">
      <!-- 买卖车box -->
      <div id="show-box">
        <!-- 买车 -->
        <div id="box-left">
          <div id="box-content-top">
            <span @click="buyCar">
              我要买车
              <i class="el-icon-arrow-right"></i>
            </span>
            <!-- 搜索 -->
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
            <!-- 搜索 结束 -->
          </div>
          <div id="box-content-bottom">
            <!-- 汽车品牌 -->
            <div class="car-class">
              <span
                v-for="brand in innerHotBrands"
                :key="brand.brandId"
                @click="searchCar(brand)">
                {{ brand.brandName }}
              </span>
            </div>
            <!-- 汽车品牌 结束 -->
            <!-- 汽车价格 -->
            <div class="car-price">
              <span
                v-for="price in carPriceList"
                :key="price.id"
                @click="searchPrice(price)">
                {{ price.text }}
              </span>
            </div>
            <!-- 汽车价格 结束 -->
          </div>
        </div>
        <!-- 买车 结束 -->
        <!-- 卖车 -->
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
        <!-- 买车 结束 -->
      </div>
      <!-- 买卖车box 结束 -->
      <!-- 资讯 -->
      <div id="car-box">
        <!-- 推荐 -->
        <div id="car-box-left" @click="searchBox(0)">
          <img src="~IMAGES/car1.png" alt="">
          <li class="li-color-black">选你所爱</li>
          <li class="li-color-red">3年内准新车</li>
        </div>
        <div id="car-box-middle">
          <div id="box-middle" @click="searchBox(1)">
            <img src="~IMAGES/car2.png" alt="">
            <div>
              <li class="li-color-black">入门首选</li>
              <li class="li-color-red">6-9万品质二手车</li>
            </div>
          </div>
          <div id="box-middle" @click="searchBox(2)">
            <img src="~IMAGES/car3.png" alt="">
            <div>
              <li class="li-color-black">车美价优</li>
              <li class="li-color-red">体验手动乐趣</li>
            </div>
          </div>
        </div>
        <!-- 推荐 结束 -->
        <!-- 资讯 -->
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
        <!-- 资讯 结束 -->
      </div>
      <!-- 资讯 结束 -->
      <!-- 买卖流程 -->
      <buy-sell-step-view class="buy-sell-step">
      </buy-sell-step-view>
      <!-- 买卖流程 结束 -->
      <!-- 最新上架等二手车列表 -->
      <div id="car_list_box">
        <!-- tab -->
        <tab-view
          :tabs="carTabList"
          :activeTab="activeCarTab"
          @tab-click="clickCarTab">
        </tab-view>
        <!-- tab 结束 -->
        <ul class="car-list-wrap">
          <li class="car-list" v-for="item in newCarList" :key="item.id" @click="toCarInfo(item)">
            <div class="car-img">
              <img :src="item.carImg" alt="">
            </div>
            <div class="car-info">
              <p class="car-name">{{item.carName}}</p>
              <p class="car-info-p">{{item.year}}<em>|</em>{{item.mileage}}<em>|</em>{{item.place}}</p>
              <p class="car-info-price">
                {{item.price}}
                <span>万</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="car_more" @click="clickMoreCar(activeCarTab.name)">
          <span>更多{{activeCarTab.name}}</span>
          <i class="ic_more_car"></i>
        </div>
      </div>
      <!-- 最新上架等二手车列表 结束 -->
      <div id="content-footer-buy-sell">
        <div class="buy-sell-left">
          <i class="icon_bg"></i>
          <span>免费咨询电话：020-12345678</span>
        </div>
        <li class="color-blue" @click="buyCar">我要买车</li>
        <li class="color-green" @click="sellCar">我要卖车</li>
      </div>
    </div>      
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import bannerView from 'COMMON/banner/bannerView'
import buySellStepView from 'COMMON/buySellStep/buySellStepView'
import tabView from 'COMMON/tabView/tabView'
import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

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
      ],
      carTabList: [
        {
          id: 0,
          name: '最新上架'
        },
        {
          id: 1,
          name: '准新车'
        },
        {
          id: 2,
          name: '练手车'
        }
      ],
      activeCarTab: {},
      newCarList: [
        {
          id: 0,
          carName: '大众捷达 2015款 1.6L 手动时尚型',
          year: '2015年',
          mileage: '1.4万公里',
          place: '哈尔滨',
          price: '5.46',
          carImg: 'https://image1.guazistatic.com/qn180125190559b0e255718fdf226ae1e0cb71d8cea8d8.jpg?imageView2/1/w/287/h/192/q/88'
        },
        {
          id: 1,
          carName: '别克凯越 2013款 1.5L 自动经典型',
          year: '2014年',
          mileage: '3.4万公里',
          place: '大连',
          price: '5.13',
          carImg: 'https://image1.guazistatic.com/qn180129113256f5bf1b87ff1677d04c16b8a9fd5c2216.jpg?imageView2/1/w/287/h/192/q/88'
        },
        {
          id: 2,
          carName: '本田锋范经典 2014款 风尚 1.5L 手动精英版',
          year: '2015年',
          mileage: '2.3万公里',
          place: '昆明',
          price: '6.20',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/03d8925ef2f2478153f64eac8efec106.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 3,
          carName: '丰田卡罗拉 2013款 特装版 1.6L 自动至酷型GL',
          year: '2013年',
          mileage: '4.4万公里',
          place: '曲靖',
          price: '8.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/3c8d7b700b8d70fa0fc1a49ecdce9438.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 4,
          carName: '别克GL8 2014款 3.0L GT豪华商务豪雅版',
          year: '2015年',
          mileage: '3.4万公里',
          place: '呼和浩特',
          price: '27.70',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/758204d8085be3b30c0114abfddefb82.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 5,
          carName: '雪佛兰迈锐宝 2013款 2.0L 自动豪华版',
          year: '2013年',
          mileage: '5.0万公里',
          place: '大连',
          price: '9.38',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/3328539214f793b76b288d71ae2b2da3.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 6,
          carName: '开瑞优胜 2010款 1.0L基本型',
          year: '2010年',
          mileage: '6.6万公里',
          place: '泸州',
          price: '0.80',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/60ebe74b3ff36875a0719abfb954a3fe.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 7,
          carName: '大众迈腾 2018款 330TSI DSG 豪华型',
          year: '2018年',
          mileage: '0.1万公里',
          place: '汕头',
          price: '23.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/d4db7f310badfdd892264bbd533ddd9d.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 8,
          carName: '凯迪拉克ATS-L 2014款 25T 舒适型',
          year: '2015年',
          mileage: '5.9万公里',
          place: '洛阳',
          price: '17.30',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/8ac0527f50de490ecec298ddf3faece4.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 9,
          carName: '标致3008 2015款 2.0L 手动经典版',
          year: '2015年',
          mileage: '4.0万公里',
          place: '石家庄',
          price: '10.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/6d056ae1311079c3002b7e43065519ab.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 10,
          carName: '大众速腾 2010款 1.4TSI 自动豪华型',
          year: '2010年',
          mileage: '7.5万公里',
          place: '盐城',
          price: '5.80',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/19907410cc26baf7da4ed6af0c1e7bb2.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 11,
          carName: '宝骏730 2014款 1.5L 手动舒适型 7座',
          year: '2015年',
          mileage: '3.6万公里',
          place: '上海',
          price: '5.50',
          carImg: 'https://image.guazistatic.com/gz01180129/13/34/c0cbbcf60539fdfec2b4fc49b580e11a.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        }
      ],
      innerHotBrands: []
    }
  },
  computed: {
    ...mapGetters([
      'currentCity',
      'pageVisibility',
      'hotBrands'
    ])
  },
  created () {
    this.getHotBrand(6)
    this.$store.commit(SET_HEADER_ACTIVE_TAB, 0)
  },
  watch: {
    currentCity (val) {
    },
    hotBrands (list) {
      if (list.length > 0) {
        this.innerHotBrands = list
        this.innerHotBrands[list.length] = {
          brandId: -1,
          brandName: '...更多'
        }
      }
    }
  },
  mounted () {
    this.activeCarTab = this.carTabList[0]
  },
  methods: {
    ...mapActions([
      'getHotBrand'
    ]),
    ...mapMutations({
    }),
    toSearch (type) {
      if (type === 'keyup' && !this.inputBorder) {
        return false
      }
      if (this.searchValue.length === 0) {
        return false
      }
      this.$router.push({
        name: 'searchCar'
      })
      this.searchValue = ''
    },
    borderLight () {
      return this.inputBorder ? '' : 'borderLight'
    },
    buyCar () {
      this.$router.push({
        name: 'searchCar'
      })
    },
    sellCar () {
      this.$router.push({
        name: 'sellCar'
      })
    },
    searchCar (car) {
      this.$router.push({
        name: 'searchCar'
      })
    },
    searchPrice (price) {
      this.$router.push({
        name: 'searchCar'
      })
    },
    freeEstimate () {
    },
    clickCarTab (tab) {
      this.activeCarTab = tab
    },
    clickMoreCar (name) {
      this.$router.push({
        name: 'searchCar'
      })
    },
    toCarInfo (item) {
      this.$router.push({
        name: 'car',
        params: {
          carId: item.id
        }
      })
    },
    searchBox (index) {
      this.$router.push({
        name: 'searchCar'
      })
    }
  },
  components: {
    bannerView,
    buySellStepView,
    tabView
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#index
  .banner-view
    position: relative
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
      box-shadow: 1px 1px 10px 3px rgba(15, 166, 255, .1)
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
            box-shadow: 1px 1px 10px 3px rgba(15, 166, 255, .1)
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
    #content-footer-buy-sell
      position: relative
      width: 100%
      height: 120px
      background: $color-white
      display: flex
      display: -webkit-flex
      align-items: center
      flex-direction: row
      justify-content: center
      > li
        width: 179px
        color: $color-white
        display: flex
        display: -webkit-flex
        align-items: center
        justify-content: center
        font-size: 16px
        line-height: 64px
        font-weight: bold
        border-radius: 5px
        margin: 0 5px
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
      .buy-sell-left
        margin-right: 20px
        width: 382px
        color: #858d96
        font-weight: bold
        font-size: 14px
        text-align: center
        .icon_bg
          display: block
          width: 382px
          height: 30px
          margin-bottom: 9px
          background-image: url('~IMAGES/icon_guazi.png')
          background-position: 0 -170px
    #car_list_box
      position: relative
      width: 100%
      display: flex
      display: -webkit-flex
      align-items: center
      justify-content: center
      flex-direction: column
      .car-list-wrap
        width: 1170px
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        margin-top: 16px
        .car-list
          width: 280.5px
          height: 314px
          margin-bottom: 16px
          &:hover
            cursor: pointer
            box-shadow: 1px 1px 10px 3px rgba(15, 166, 255, .1)
          .car-img
            width: 100%
            height: 190px
            margin-top: 3px
            background-image: url('~IMAGES/car_default.png')
            background-size: 100% 190px
            > img
              width: 100%
              height: 190px
          .car-info
            width: 100%
            height: 121px
            padding: 20px
            background: $color-white
            .car-name
              font-size: 16px
              color: $color-black
              single-text-ellipsis()
            .car-info-p
              font-size: 14px
              color: #a5abb2
              margin: 12px 0
              > em
                padding: 0 6px
                color: #d2d2d2
                font-style: normal
            .car-info-price
              font-size: 20px
              color: #ff0000cc
              > span
                font-size: 14px
      .car_more
        display: flex
        display: -webkit-flex
        flex-direction: row
        align-items: center
        justify-content: center
        color: #495056
        margin-bottom: 30px
        margin-top: 10px
        &:hover
          cursor: pointer
          color: $color-blue
        > span
          font-size: 14px
          margin-right: 5px
        .ic_more_car
          display: block
          width: 17px
          height: 17px
          background-image: url('~IMAGES/ic_more_car_arrow.png')
          background-size: 17px
</style>

