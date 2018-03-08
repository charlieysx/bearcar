<template>
  <div id="index">
    <!-- banner -->
    <banner-view
      class="banner-view"
      :banners="banners">
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
                {{ price.priceName }}
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
            <!-- <li class="color-green" @click="freeEstimate">免费估价</li> -->
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
            <span @click="toNews">资讯</span>
            <div class="info-more" @click="toNews">更多</div>
          </div>
          <div id="box-right-content">
            <li 
              v-for="(news, index) in hotNewsList"
              :key="index"
              @click="previewNews(news.newsId)">
              <span class="info-title">• {{ news.newsTitle }}</span>
              <span class="info-time">{{ news.newsTime | time('YYYY-MM-DD') }}</span>
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
      <div id="car_list_box" v-loading="loading">
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
              <div class="icon-guazi icon-sell" v-if="item.expireDateId === '0'">急售</div>
              <div class="icon-guazi icon-new" v-else-if="isNew(item.time)">新上架</div>
              <img :src="item.coverImg" alt="">
            </div>
            <div class="car-info">
              <p class="car-name">{{ item.brandName }} {{ item.modelName ? item.modelName : item.seriesName }}</p>
              <p class="car-info-p">{{ item.licensedYear }}<em>|</em>{{ item.mileage }}万公里<em>|</em>{{ item.cityName }}</p>
              <p class="car-info-price">
                {{item.price}}
                <span>万</span>
                <s class="new-price">
                  {{ item.newCarPrice }} 万
                </s>
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
import moment from 'moment'

export default {
  name: 'home',
  data () {
    return {
      inputBorder: false,
      personCount: 0,
      searchValue: '',
      banners: [],
      carPriceList: [
        {
          priceId: 0,
          priceName: '3万以下',
          from: 0,
          to: 3
        },
        {
          priceId: 1,
          priceName: '3-6万',
          from: 3,
          to: 6
        },
        {
          priceId: 2,
          priceName: '6-9万',
          from: 6,
          to: 9
        },
        {
          priceId: 3,
          priceName: '9-12万',
          from: 9,
          to: 12
        },
        {
          priceId: 4,
          priceName: '12-16万',
          from: 12,
          to: 16
        },
        {
          priceId: 5,
          priceName: '16-20万',
          from: 16,
          to: 20
        },
        {
          priceId: 7,
          priceName: '20万以上',
          from: 20,
          to: 10000
        }
      ],
      hotNewsList: [],
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
      newCarList: [],
      innerHotBrands: [],
      loading: false,
      defaultBanner: {
        banner: 'http://bearcarimg.codebear.cn/1bb69aedc93cc4bea65af42b17dc75bd3fKwdVCj8n5xJ7XHlSlqAM!gradual.show',
        link: ''
      }
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
    this.getBanner()
      .then((data) => {
        this.banners = data
        if (this.banners.length === 0) {
          this.banners = [this.defaultBanner]
        }
      })
      .catch(() => {
        this.banners = [this.defaultBanner]
      })
    this.getHotBrand(6)
    this.getNewsList({
      page: 0,
      pageSize: 8
    })
    .then((data) => {
      this.hotNewsList = data.list
    })
    .catch(() => {
      this.hotNewsList = []
    })
    this.startSearch(this.carTabList[0])
    this.getCarCount()
      .then((data) => {
        this.personCount = data
      })
      .catch(() => {
        this.personCount = 0
      })
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
      'getHotBrand',
      'getNewsList',
      'getCarList',
      'getCarCount',
      'getBanner'
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
        name: 'searchCar',
        params: {
          searchValue: this.searchValue
        }
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
    searchCar (brand) {
      let params = {
        brand: brand
      }
      if (brand.brandId === -1) {
        params = {}
      }
      this.$router.push({
        name: 'searchCar',
        params: params
      })
    },
    searchPrice (price) {
      this.$router.push({
        name: 'searchCar',
        params: {
          price: price
        }
      })
    },
    freeEstimate () {
    },
    toNews () {
      this.$router.push({ name: 'newsList' })
    },
    clickCarTab (tab) {
      this.activeCarTab = tab
      this.startSearch(tab)
    },
    clickMoreCar (name) {
      let params = {}
      switch (name) {
        case '最新上架':
          params = { sort: true }
          break
        case '准新车':
          params = {
            age: {
              parent: {
                type: 'car-age',
                tag: 'ca',
                title: '车龄'
              },
              item: {
                id: '2',
                value: '3年以内'
              }
            }
          }
          break
        case '练手车':
          params = {
            price: {
              priceId: 2,
              priceName: '6-9万',
              from: 6,
              to: 9
            }
          }
          break
      }
      this.$router.push({
        name: 'searchCar',
        params: params
      })
    },
    toCarInfo (item) {
      // this.$router.push({
      //   name: 'car',
      //   params: {
      //     carId: item.carId
      //   }
      // })
      window.open(`${window.location.origin}/car/${item.carId}`)
    },
    searchBox (index) {
      let params = {}
      switch (index) {
        case 0:
          params = {
            age: {
              parent: {
                type: 'car-age',
                tag: 'ca',
                title: '车龄'
              },
              item: {
                id: '2',
                value: '3年以内'
              }
            }
          }
          break
        case 1:
          params = {
            price: {
              priceId: 2,
              priceName: '6-9万',
              from: 6,
              to: 9
            }
          }
          break
        case 2:
          params = {
            speed: {
              parent: {
                type: 'car-speed-box',
                tag: 'csb',
                title: '变速箱'
              },
              item: {
                id: '1',
                value: '手动'
              }
            }
          }
          break
      }
      this.$router.push({
        name: 'searchCar',
        params: params
      })
    },
    previewNews (newsId) {
      this.$router.push({
        name: 'news',
        params: {
          newsId: newsId
        }
      })
    },
    startSearch (tab) {
      this.loading = true
      let searchParams = {
        page: 0,
        pageSize: 12,
        price: {
          from: '',
          to: ''
        },
        carAge: '',
        sort: {
          type: 'default',
          value: ''
        }
      }
      switch (tab.id) {
        case 0:
          searchParams.sort.type = 'new'
          break
        case 1:
          searchParams.carAge = '2'
          break
        case 2:
          searchParams.price.from = '6'
          searchParams.price.to = '9'
          break
      }
      this.getCarList(searchParams)
        .then((data) => {
          this.newCarList = data.list
          this.loading = false
        })
        .catch(() => {
          this.newCarList = []
          this.loading = false
        })
    },
    isNew (value) {
      // 一周之内表示最新发布
      return (moment().unix() * 1000 - parseInt(value) * 1000) / 1000 / 24 / 60 / 60 <= 7
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
      display: flex
      display: -webkit-flex
      flex-direction: row
    #box-left
      width: 65%
      height: 100%
      font-size: 16px
    #box-right
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
        margin-top: 30px
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
        flex-wrap: wrap
        margin-top: 16px
        .car-list
          width: 280.5px
          height: 314px
          margin-right: 15px
          margin-bottom: 16px
          &:nth-child(4n)
            margin-right: 0px
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
            .icon-new,
            .icon-sell
              position: absolute
              background-position: -100px -100px
              width: 60px
              height: 70px
              margin-top: -4px
              margin-left: 5px
              padding-top: 7px
              font-size: 16px
              color: $color-white
              line-height: 38px
              text-align: center
              font-weight: 700
            .icon-new
              background-position: -36px -100px
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
              .new-price
                font-size: 13px
                color: #999999
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


.icon-guazi
  background-image: url('~IMAGES/icon_guazi.png')
  background-repeat: no-repeat
  display: inline-block
</style>

