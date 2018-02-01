<template>
  <div id="search-car">
      <div class="search-wrap">
        <!-- 面包屑，搜索框 -->
        <div id="search-bread">
            <bread-crumb class="bread-crumb" :items="breadCrumbItems"></bread-crumb>
            <search-car-input @search="toSearch"></search-car-input>
        </div>
        <!-- 面包屑，搜索框 结束 -->
        <!-- 车源筛选 -->
        <div id="filter-wrap">
          <ul>
            <!-- 品牌筛选 -->
            <li class="clearfix">
              <div class="filter-name float-left">品牌</div>
              <div class="filter-left float-left">
                <!-- 热门品牌 -->
                <div class="filter-show">
                  <div class="filter-item clearfix">
                    <span 
                      v-for="(brand, index) in innerHotBrands" 
                      :key="index" 
                      :class="{ current: brand.brandId === currentBrand.brandId }" 
                      @click="selectBrand(brand)">
                      {{ brand.brandName }}
                    </span>
                  </div>
                  <div class="more" @click="openMoreBrand()">
                    {{ moreBrandOpen ? '收起' : '全部' }}
                    <i :class="[moreBrandOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                  </div>
                </div>
                <!-- 热门品牌 结束 -->
                <!-- 全部品牌 -->
                <div class="more-brand" :class="{ 'show-more': moreBrandOpen }">
                  <div class="more-brand-wrap" v-for="(brandList, index) in innerAllBrands" :key="index">
                    <ul class="more-brand-list">
                      <li class="clearfix" v-for="(group, key) in brandList" :key="key">
                        <div class="letter">{{ key }}</div>
                        <div class="brand-list clearfix">
                          <span 
                            v-for="(brand, index) in group" 
                            :key="index"
                            @click="selectBrand(brand)">
                            {{ brand.brandName }}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- 全部品牌 结束 -->
              </div>
            </li>
            <!-- 品牌筛选 结束 -->
            <!-- 车系筛选 -->
            <li class="clearfix">
              <div class="filter-name float-left">车系</div>
              <div class="filter-left float-left">
                <!-- 热门车系 -->
                <div class="filter-show">
                  <div class="filter-item clearfix">
                    <span 
                      v-for="(series, index) in innerHotSeries" 
                      :key="index" 
                      :class="{ current: series.seriesId === currentSeries.seriesId }" 
                      @click="selectSeries(series)">
                      {{ series.seriesName }}
                    </span>
                  </div>
                </div>
                <!-- 热门车系 结束 -->
              </div>
            </li>
            <!-- 车系筛选 结束 -->
            <!-- 价格筛选 -->
            <li class="clearfix">
              <div class="filter-name float-left">价格</div>
              <div class="filter-left float-left">
                <div class="filter-show">
                  <div class="filter-item clearfix">
                    <span 
                      v-for="(price, index) in innerPrice" 
                      :key="index" 
                      :class="{ current: price.priceId === currentPrice.priceId }" 
                      @click="selectPrice(price)">
                      {{ price.priceName }}
                    </span>
                    <!-- 价格输入框 -->
                    <div class="price-input">
                      <input v-model="searchPrice1">
                      -
                      <input v-model="searchPrice2">
                      万
                      <button @click="searchPrice">确定</button>
                    </div>
                    <!-- 价格输入框 结束 -->
                  </div>
                </div>
              </div>
            </li>
            <!-- 价格筛选 结束 -->
            <!-- 更多筛选 -->
            <li class="clearfix">
              <div class="filter-name float-left">更多</div>
              <div class="filter-left float-left">
                <!-- '更多'选项 -->
                <div class="filter-show">
                  <div class="filter-item clearfix">
                    <div class="select-list"
                      v-for="(more, index) in moreList" 
                      :key="index"
                      :style="[{'display': index < showMoreListIndex ? 'block' : 'none'}]">
                      <select-list
                        :selectModel="more"
                        @item-select="moreItemSelect">
                      </select-list>
                    </div>
                  </div>
                  <div class="more" @click="openMore()">
                    {{ moreOpen ? '收起' : '全部' }}
                    <i :class="[moreOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                  </div>
                </div>
                <!-- '更多'选项 结束 -->
              </div>
            </li>
            <!-- 品牌筛选 结束 -->
          </ul>
        </div>
        <!-- 车源筛选 结束 -->
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import breadCrumb from 'COMMON/breadCrumb/breadCrumb'
import searchCarInput from 'COMMON/searchCarInput/searchCarInput'
import selectList from 'COMMON/selectList/selectList'

import searchCarData from 'DATA/searchCar'

import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

export default {
  name: 'searchCar',
  data () {
    return {
      searchData: {},
      breadCrumbItems: [
        {
          text: '小熊二手车',
          to: {path: '/'}
        },
        {
          text: '全国二手车',
          to: {path: '/d'}
        }
      ],
      currentBrand: { brandId: -1, brandName: '不限' },
      currentSeries: { seriesId: -1, seriesName: '不限' },
      currentPrice: { priceId: -1, priceName: '不限' },
      moreBrandOpen: false,
      moreOpen: false,
      innerHotBrands: [],
      innerAllBrands: [],
      innerHotSeries: [],
      innerPrice: [
        {
          priceId: -1,
          priceName: '不限'
        },
        {
          priceId: 0,
          priceName: '3万以下'
        },
        {
          priceId: 1,
          priceName: '3-5万'
        },
        {
          priceId: 2,
          priceName: '5-7万'
        },
        {
          priceId: 3,
          priceName: '7-9万'
        },
        {
          priceId: 4,
          priceName: '9-12万'
        },
        {
          priceId: 5,
          priceName: '12-16万'
        },
        {
          priceId: 6,
          priceName: '16-20万'
        },
        {
          priceId: 7,
          priceName: '20万以上'
        }
      ],
      searchPrice1: '',
      searchPrice2: '',
      moreList: [],
      showMoreListIndex: 10
    }
  },
  components: {
    breadCrumb,
    searchCarInput,
    selectList
  },
  computed: {
    ...mapGetters([
      'currentCity',
      'hotBrands',
      'allSortBrands',
      'hotSeries'
    ])
  },
  created () {
    this.getHotBrand(15)
    this.getHotSeries(10)
    this.getCarBrandSort()
    this.$store.commit(SET_HEADER_ACTIVE_TAB, 1)
    this.breadCrumbItems[1].text = this.currentCity.cityName + '二手车'
    this.moreList = searchCarData.moreSelectList
  },
  watch: {
    searchPrice1 (value) {
      this.searchPrice1 = value.replace(/[^\d]/g, '')
    },
    currentCity (value) {
      this.$router.go(0)
    },
    hotBrands (list) {
      if (list.length > 0) {
        this.innerHotBrands = []
        var i = 1
        this.innerHotBrands[0] = this.currentBrand
        for (; i < 16 && list.length > i - 1; ++i) {
          this.innerHotBrands[i] = list[i - 1]
        }
      }
    },
    hotSeries (list) {
      if (list.length > 0) {
        this.innerHotSeries = []
        var i = 1
        this.innerHotSeries[0] = this.currentSeries
        for (; i < 16 && list.length > i - 1; ++i) {
          this.innerHotSeries[i] = list[i - 1]
        }
      }
    },
    allSortBrands (list) {
      this.innerAllBrands = {}
      var i = 0
      var j = 0
      this.innerAllBrands[0] = {}
      this.innerAllBrands[1] = {}
      this.innerAllBrands[2] = {}
      var letter = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ]
      for (i = 0; i < letter.length; ++i) {
        if (letter[i] === 'I') {
          j = 1
        }
        if (letter[i] === 'R') {
          j = 2
        }
        if (list[letter[i]]) {
          this.innerAllBrands[j][letter[i]] = list[letter[i]]
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getHotBrand',
      'getCarBrandSort',
      'getHotSeries'
    ]),
    toSearch (value) {
      console.log(value)
    },
    selectBrand (brand) {
      this.currentBrand = brand
    },
    selectSeries (series) {
      this.currentSeries = series
    },
    selectPrice (price) {
      this.currentPrice = price
    },
    searchPrice () {
      if (this.searchPrice1 || this.searchPrice2) {
        if (this.searchPrice1 === '') {
          this.searchPrice1 = 0
        }
        if (this.searchPrice2 === '') {
          this.searchPrice2 = 999
        }
      }
    },
    openMoreBrand () {
      this.moreBrandOpen = !this.moreBrandOpen
    },
    openMore () {
      this.moreOpen = !this.moreOpen
      this.showMoreListIndex = this.moreOpen ? 12 : 10
    },
    moreItemSelect (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#search-car
  padding-bottom: 10px
  background: $color-white
  .search-wrap
    width: 1170px
    margin: 0 auto
    #search-bread
      height: 60px
      display: flex
      display: -webkit-flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .bread-crumb
        margin: 0 0
  #filter-wrap
    background: #fafafa
    border: 1px solid #e6e6e6
    border-bottom: none
    font-size: 14px
    li
      border-bottom 1px solid #e6e6e6
      .more
        width: 70px
        height: 100%
        color: $color-black
        padding: 14px 0px
        text-align: center
        i
          color: #999999
        &:hover
          cursor: pointer
          color: $color-blue
    .float-left
      float: left
    .filter-name
      width: 70px
      height: 100%
      color: $color-dark-grey
      padding: 14px 0px
      background: #fafafa
      text-align: center
    .filter-left
      background: $color-white
      width: 1098px
      .filter-show
        display: flex
        display: -webkit-flex
        flex-direction: row
        justify-content: space-between
        .filter-item
          width: 1018px
          padding-left: 10px
          .select-list
            color: $color-black
            margin-top: 8px
            margin-left: 12px
            margin-bottom: 8px
            cursor: pointer
            float: left
            &:first-child
              margin-left: 8px
          span
            color: $color-black
            margin: 10px
            margin-left: 10px
            margin-right: 0px
            padding: 4px 5px
            cursor: pointer
            float: left
            &:hover
              color: $color-blue
            &.current
              color: $color-white
              background: $color-blue
          .price-input
            color: $color-black
            margin: 10px
            margin-left: 30px
            margin-right: 2px
            cursor: pointer
            float: left
            input
              width: 50px
              padding: 1px 2px
              text-align: right
            button
              width: 50px
              padding: 2px 2px
              border: 1px solid $color-blue
              background: $color-white
              color: $color-blue
              margin-left: 2px
              &:hover
                cursor: pointer
                background: $color-blue
                color: $color-white
      .more-brand
        width: 100%
        border-top 1px solid #e6e6e6
        display: none
        &.show-more
          display: flex
          display: -webkit-flex
          flex-direction: row
          justify-content: space-between
        .more-brand-wrap
          .more-brand-list
            font-size: 14px
            li
              padding: 10px
              padding-bottom: 0px
              border-bottom: none
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
              color: $color-blue
              border: 1px solid $color-border
              border-radius: 4px
              text-align: center
              margin-right: 20px
            .brand-list
              width: 300px
              span
                color: $color-black
                margin-right: 4px
                padding: 4px 4px
                cursor: pointer
                float:left
                &:hover,
                &.current
                  color: $color-blue
</style>