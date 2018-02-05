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
                <image-preview-list>
                </image-preview-list>
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
        <!-- 二手车专项检测 -->
        <div id="car-special-test">
          <!-- 专业检测 -->
          <div class="car-special-box">
            <span class="icon icon-left-top"></span>
            <span class="icon icon-right-top"></span>
            <span class="icon icon-left-bottom"></span>
            <span class="icon icon-right-bottom"></span>
            <div class="test-title">
              <span class="icon icon-certification"></span>
              <div class="test-box">
                <p>259项专业检测</p>
                小熊要求二手车源必须达到以下标准
              </div>
              <ul class="three-type">
                <li>
                  <span class="icon icon-save"></span>
                  无重大事故
                </li>
                <li>
                  <span class="icon icon-fire"></span>
                  无火烧事故
                </li>
                <li>
                  <span class="icon icon-water"></span>
                  无泡水事故
                </li>
              </ul>
            </div>
            <!-- 专业检测 结束 -->
            <!-- 评估师 -->
            <div class="car-appraiser">
              <span class="icon icon-appraiser"></span>
              <div class="assessment-result">
                高级车辆评估师
                <p>个人一手私家车， 全车原厂漆，少量刮蹭划痕，车况良好无事故，后备箱盖变形，前保险杠轻微破损，内饰保养干净整洁，车内电器设备正常，发动机变速箱工况正常</p>
              </div>
            </div>
            <!-- 评估师 结束 -->
            <!-- 评估项 -->
            <div class="car-assessment-item">
              <div class="assessment-item" v-for="(assesment, index) in assessmentList" :key="index">
                <p> {{ assesment.title }}</p>
                <ul>
                  <li v-for="(item, index) in assesment.item" :key="index">
                    <span class="assement-item-name"> {{ item.name }}</span>
                    <span class="assement-item-count"> {{ item.count }}项</span>
                    <i :class="[item.exception ? 'el-icon-warning' : 'el-icon-check']"></i>
                    <span class="assement-exception-count" v-if="item.exception"> {{ item.exception }}项异常</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 评估项 结束 -->
            <div class="time-tip">
              ※以上为2018年01月21日车况，交易以复检结果为准
            </div>
          </div>
        </div>
        <!-- 二手车专项检测 结束 -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import breadCrumb from 'COMMON/breadCrumb/breadCrumb'
import searchCarInput from 'COMMON/searchCarInput/searchCarInput'
import imagePreviewList from 'COMMON/imagePreviewList/imagePreviewList'

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
      },
      imageData: [],
      assessmentList: [
        {
          title: '事故排查检测',
          item: [
            {
              name: '排除重大事故',
              count: 20,
              exception: 10
            },
            {
              name: '排除泡水火烧',
              count: 9,
              exception: 0
            }
          ]
        },
        {
          title: '轻微碰撞',
          item: [
            {
              name: '轻微碰撞',
              count: 14,
              exception: 0
            },
            {
              name: '易损耗部件',
              count: 18,
              exception: 0
            }
          ]
        },
        {
          title: '常用功能检测',
          item: [
            {
              name: '安全系统',
              count: 15,
              exception: 1
            },
            {
              name: '外部配置',
              count: 22,
              exception: 0
            },
            {
              name: '内部配置',
              count: 14,
              exception: 0
            },
            {
              name: '灯光系统',
              count: 15,
              exception: 0
            },
            {
              name: '高科技配置',
              count: 5,
              exception: 0
            },
            {
              name: '随车工具',
              count: 5,
              exception: 0
            }
          ]
        },
        {
          title: '启动驾驶检测',
          item: [
            {
              name: '仪表台指示灯',
              count: 6,
              exception: 0
            },
            {
              name: '发动机状态',
              count: 5,
              exception: 1
            },
            {
              name: '变速箱及转向',
              count: 3,
              exception: 0
            }
          ]
        },
        {
          title: '外观内饰检测',
          item: [
            {
              name: '缺陷项检测',
              count: 67,
              exception: 0
            },
            {
              name: '漆面修复检测',
              count: 21,
              exception: 0
            },
            {
              name: '钣金修复检测',
              count: 21,
              exception: 0
            },
            {
              name: '外观件更换检测',
              count: 21,
              exception: 0
            }
          ]
        }
      ]
    }
  },
  components: {
    breadCrumb,
    searchCarInput,
    imagePreviewList
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
      justify-content: space-between
      .car-info
        width: 585px
        padding: 10px 10px
        padding-right: 0px
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
          margin-left: 10px
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
          margin-right: 0px
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
    #car-special-test
      width: 100%
      height: 580px
      border: 1px solid #dee2e6
      padding: 14px
      margin: 16px 0px
      .car-special-box
        position: relative
        width: 100%
        height: 100%
        border: 5px solid #dee2e6
        background-image: url('~IMAGES/bg_line.png')
        background-repeat: resize none
        background-position: 0 0
        .time-tip
          width: 100%
          position: absolute
          bottom: 20px
          color: #a5abb2
          font-size: 14px
          text-align: center
        .icon-left-top
          background-position: -131px -437px
          width: 55px
          height: 55px
          left: 6px
          top: 6px
          position: absolute
        .icon-right-top
          background-position: -198px -437px
          width: 55px
          height: 55px
          right: 6px
          top: 6px
          position: absolute
        .icon-left-bottom
          background-position: -267px -437px
          width: 55px
          height: 55px
          left: 6px
          bottom: 6px
          position: absolute
        .icon-right-bottom
          background-position: -330px -437px
          width: 55px
          height: 55px
          right: 6px
          bottom: 6px
          position: absolute
        .test-title
          display: flex
          display: -webkit-flex
          flex-direction: row
          align-items: center
          margin: 0 0 0 49px
          padding: 51px 0 30px 46px
          border-bottom: 1px dashed #dee2e6
          .icon-certification
            background-position: 0 -351px
            width: 84px
            height: 88px
          .test-box
            width: 342px
            font-size: 16px
            margin-left: 18px
            color: #7a838d
            line-height: 32px
            > p
              color: #495056
              font-size: 30px
          .three-type
            > li
              width: 188px
              font-size: 16px
              color: #666666
              line-height: 48px
              float: left
              .icon-save,
              .icon-fire,
              .icon-water
                width: 48px
                height: 48px
                vertical-align: middle
                margin-right: 8px
        .car-appraiser
          display: flex
          display: -webkit-flex
          flex-direction: row
          margin: 0 10px 0 49px
          padding: 20px 0
          .icon-appraiser
            width: 76px
            height: 76px
            border-radius: 38px
            margin: 0 24px 0 12px
          .assessment-result
            font-size: 16px
            color: #495056
            font-weight: 700
            padding-top: 8px
            > p
              padding: 8px 0
              font-size: 14px
              line-height: 20px
              font-weight: 500
        .car-assessment-item
          margin: 12px 0 0 46px
          .assessment-item
            font-size: 14px
            float: left
            width: 216px
            > p
              color: #495056
              font-weight: 700
              padding-bottom: 15px
            li
              padding-bottom: 10px
              font-size: 0px
              .assement-item-name
                display: inline-block
                width: 98px
                font-size: 14px
              .assement-item-count
                display: inline-block
                width: 34px
                margin-right: 4px
                text-align: right
                font-size: 14px
              .el-icon-warning,
              .assement-exception-count
                font-size: 14px
                color: #fece36
              .el-icon-check
                font-size: 14px
                color: $color-blue
              
              
                
                
.icon
  background-image: url('~IMAGES/icon_detail.png')
  background-repeat: no-repeat
  display: inline-block
.icon-save
  background-position: -89px -350px
.icon-fire
  background-position: -143px -350px
.icon-water
  background-position: -200px -350px
.icon-appraiser
  background-position: -571px -183px

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
