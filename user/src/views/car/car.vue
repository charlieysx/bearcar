<template>
  <div id="car">
    <div class="car-wrap">
        <!-- 面包屑，搜索框 -->
        <div id="car-bread">
            <bread-crumb class="bread-crumb" :items="breadCrumbItems"></bread-crumb>
            <search-car-input 
              @search="toSearch" 
              @search-item="inputSearchItem"
              :searchCarList="innerHotBrands">
            </search-car-input>
        </div>
        <!-- 面包屑，搜索框 结束 -->
        <!-- 二手车基础信息 -->
        <div id="car-base-info">
            <div class="car-base-image">
                <img src="https://image1.guazistatic.com/qn180121173829c50906dc12f7d6c816300f4a1e0cbae1.jpg?imageView2/1/w/1200/h/800/q/88" alt="">
            </div>
            <div class="car-info">
                <p>长安悦翔V3 2015款 1.4L 手动美满型 国V</p>
                <!-- 报价 -->
                <div class="car-price">
                    <div class="car-sell-price">
                        <span>
                            车主报价&nbsp;:
                        </span>
                        <span class="sell-price">
                            ￥10.20万
                        </span>
                        <s class="guide-price">
                            新车指导价37.12万
                        </s>
                        <el-popover
                            ref="guide"
                            placement="bottom"
                            width="270"
                            trigger="hover">
                            <div class="guide-tip">
                                <p>厂商新车指导价：34.2万</p>
                                <p>车辆购置税：2.92万</p>
                                <div></div>
                                <p class="tip">"新车指导价"是厂商公布的指导价，不是零售价，亦不是该车购入价。</p>
                            </div>
                        </el-popover>
                        <i class="el-icon-info" v-popover:guide></i>
                    </div>
                    <div class="car-sell-price">
                        <span>
                            服务升级保证
                            <span class="server-border">
                                理赔高达2.01万
                            </span>
                            <span class="server-border">
                                保全车13大系统
                            </span>
                            <span class="server-detail">
                                查看详情
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </span>
                    </div>
                    <div class="server-list-wrap">
                        <span class="server-list">
                            <i class="el-icon-circle-check"></i>
                            1年2万公里售后保障
                        </span>
                        <span class="server-list">
                            <i class="el-icon-circle-check"></i>
                            14天可退
                        </span>
                        <span class="server-list">
                            <i class="el-icon-circle-check"></i>
                            259项检测
                        </span>
                        <span class="server-list">
                            <i class="el-icon-circle-check"></i>
                            优质个人车
                        </span>
                    </div>
                    <div class="car-sell-price">
                        <span>
                            服&nbsp;务&nbsp;费&nbsp;&nbsp;:
                        </span>
                        <span class="server-price">
                            4080元 (车价×4%)
                        </span>
                    </div>
                </div>
                <!-- 报价 结束 -->
                <!-- 部分参数 -->
                <ul class="car-assort">
                    <li v-for="(item, index) in carAssort" :key="index">
                        <p class="assort-value">
                            {{ item.value }}
                        </p>
                        {{ item.title }}
                    </li>
                </ul>
                <!-- 部分参数 结束 -->
                <div class="info-button">
                    <div class="subscribe-button">
                        预约看车
                    </div>
                    <div class="bargain-button">
                        我要砍价
                    </div>
                    <div class="consult-button">
                        免费咨询
                    </div>
                </div>
                <div class="car-source-number">
                    <span>车源号:</span>
                    <span>HC-26469924</span>
                </div>
            </div>
        </div>
        <!-- 二手车基础信息 结束 -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import breadCrumb from 'COMMON/breadCrumb/breadCrumb'
import searchCarInput from 'COMMON/searchCarInput/searchCarInput'

import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

export default {
  name: 'car',
  data () {
    return {
      breadCrumbItems: [
        {
          text: '小熊二手车',
          to: {path: '/'}
        },
        {
          text: '全国二手车',
          to: {path: '/searchCar'}
        }
      ],
      innerHotBrands: [],
      carId: '',
      carAssort: {
        licensedTime: {
          title: '上牌时间',
          value: '2016-11'
        },
        mileage: {
          title: '表显里程',
          value: '1.4万公里'
        },
        licensedCity: {
          title: '上牌地',
          value: '南京'
        },
        emissionStandards: {
          title: '排放标准',
          value: '国五'
        },
        displacement: {
          title: '排量',
          value: '2L'
        }
      }
    }
  },
  components: {
    breadCrumb,
    searchCarInput
  },
  created () {
    this.$store.commit(SET_HEADER_ACTIVE_TAB, -1)
    this.carId = this.$route.params.carId
    this.getHotBrand(15)
    this.breadCrumbItems[1].text = this.currentCity.cityName + '二手车'
    this.breadCrumbItems[2] = {
      text: '长安悦翔V3 2015款 1.4L 手动美满型 国V',
      to: {name: 'car', params: { carId: this.carId }}
    }
  },
  computed: {
    ...mapGetters([
      'currentCity',
      'hotBrands'
    ])
  },
  watch: {
    currentCity (value) {
      window.location.reload()
    },
    hotBrands (list) {
      this.innerHotBrands = list
    }
  },
  methods: {
    ...mapActions([
      'getHotBrand'
    ]),
    toSearch (value) {
    },
    inputSearchItem (item) {
      this.selectBrand(item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#car
  padding-bottom: 10px
  background: $color-white
  .car-wrap
    width: 1170px
    margin: 0 auto
    #car-bread
      height: 60px
      display: flex
      display: -webkit-flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .bread-crumb
        margin: 0 0
    #car-base-info
      display: flex
      display: -webkit-flex
      flex-direction: row
      .car-base-image
        width: 585px
        height: 500px
        text-align: center
        > img
          width: 585px
      .car-info
        width: 585px
        padding: 10px 10px
        > p
          padding: 10px 15px
          font-size: 24px
          color: $color-black
          margin-bottom: 10px
        .car-assort
          display: flex
          display: -webkit-flex
          flex-direction: row
          padding: 15px
          > li
            width: 142px
            text-align: center
            font-size: 12px
            position: relative
            color: #a5abb2
            line-height: 24px
            > p
              color: #495056
              font-size: 18px
            &:first-child
              &:before
                width: 0px
            &:before
              content: ""
              width: 1px
              height: 34px
              position: absolute
              left: 0px
              top: 6px
              background: #e6e6e6
        .car-price
          margin: 10px 15px
          padding: 12px
          background: #f6f6f6
          .car-sell-price
            padding: 12px 0px
            &:first-child
              padding-top: 0px
              border-bottom 1px solid $color-white
            > span
              font-size: 14px
              margin-right: 10px
              color: $color-black
            .sell-price
              font-size: 24px
              color: #ff0000
            .guide-price
              font-size: 13px
              color: #999999
            > i
              font-size: 13px
              color: #999999
              cursor: pointer
              &:hover
                color: $color-blue
            .server-price
              color: #666666
              font-size: 14px
            .server-border
              font-size: 12px
              color: $color-blue
              margin-left: 10px
              padding: 1px
              border: 1px solid $color-blue
            .server-detail
              float: right
              cursor: pointer
              &:hover
                color: $color-blue
          .server-list-wrap
            padding: 12px 0px
            padding-right: 20px
            display: flex
            display: -webkit-flex
            flex-direction: row
            justify-content: space-between
            .server-list
              font-size: 14px
              color: #666666
              > i
                font-size: 16px
                color: $color-blue
        .info-button
          margin: 10px 15px
          padding: 12px
          display: flex
          display: -webkit-flex
          flex-direction: row
          justify-content: space-between
          font-size: 20px
          text-align: center
          font-weight: bold
          .subscribe-button
            padding: 16px 40px
            background: #fd6c34e8
            color: $color-white
            cursor: pointer
            border-radius: 4px
            &:hover
              background: #fd6c34
          .bargain-button
            padding: 16px 40px
            color: $color-white
            background: #24b9ffe8
            cursor: pointer
            border-radius: 4px
            &:hover
              background: #24b9ff
          .consult-button
            padding: 16px 40px
            background: $color-white
            color: #24b9ffe8
            border 1px solid $color-blue
            cursor: pointer
            border-radius: 4px
            &:hover
              color: #24b9ff
        .car-source-number
          text-align: right
          margin: 0px 15px
          padding: 12px
          font-size: 14px


.guide-tip
  padding: 6px
  text-align: center
  font-size: 13px
  line-height: 18px
  > div
    height: 1px
    width: 100%
    background: #e8e8e8
    margin: 10px 0px
  .tip
    color: #a5abb2
</style>
