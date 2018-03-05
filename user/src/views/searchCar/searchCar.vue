<template>
  <div id="search-car">
      <div class="search-wrap">
        <!-- 面包屑，搜索框 -->
        <div id="search-bread">
            <bread-crumb class="bread-crumb" :items="breadCrumbItems"></bread-crumb>
            <search-car-input 
              @search="toSearch" 
              @search-item="inputSearchItem"
              :searchCarList="innerHotBrands">
            </search-car-input>
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
                            @click="selectBrand(brand),moreBrandOpen = false">
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
                  <div class="more" @click="openMoreSeries()">
                      {{ moreSeriesOpen ? '收起' : '全部' }}
                      <i :class="[moreSeriesOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                  </div>
                </div>
                <!-- 热门车系 结束 -->
                <!-- 全部品牌 -->
                <div class="more-brand" :class="{ 'show-more': moreSeriesOpen && innerAllSeries.All.length > 0 }">
                  <div class="more-brand-wrap">
                    <ul class="more-brand-list">
                      <li class="clearfix" v-for="(group, key) in innerAllSeries" :key="key">
                        <div class="letter">{{ key }}</div>
                        <div class="series-list clearfix">
                          <span 
                            v-for="(series, index) in group" 
                            :key="index"
                            @click="selectSeries(series),moreBrandOpen = false">
                            {{ series.seriesName }}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- 全部品牌 结束 -->
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
                      <span class="input-border">
                        <input v-model="searchPrice1" onKeyUp="value=value.replace(/[^\d]/g,'')" maxlength="3">
                      </span>
                      -
                      <span class="input-border">
                        <input v-model="searchPrice2" onKeyUp="value=value.replace(/[^\d]/g,'')" maxlength="3">
                      </span>
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
                        :mark="more.mark"
                        @item-select="moreItemSelect">
                      </select-list>
                    </div>
                  </div>
                  <div class="more" @click="openMore()" v-if="false">
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
        <!-- 筛选结果 -->
        <div id="filter-result">
          <!-- 筛选条件 -->
          <div class="filter-criteria" v-if="filterCount > 0">
            <span>
              当前筛选：
            </span>
            <div class="filter-criteria-item">
                <div class="criteria-item"
                    v-for="(criteria, index) in filterCriteriaList" 
                    :key="index"
                    @click="closeCriteria(criteria)"
                    v-if="criteria.value">
                    <span class="criteria-title" v-if="criteria.item || criteria.tag === 'pi'">
                      {{ criteria.title }} :
                    </span>
                    <span class="criteria-value">
                      {{ criteria.value }}
                    </span>
                    <i class="el-icon-close"></i>
                </div>
            </div>
            <p @click="resetCriteria(true)">重置条件</p>
          </div>
          <!-- 筛选条件 结束 -->
          <span>在 "{{ currentCity.cityName }}二手车" 中共为您找到{{ carTotal }}辆好车</span>
        </div>
        <!-- 筛选结果 结束 -->
        <!-- 结果排序 -->
        <div id="car-order">
          <span class="order-default" :class="[{active : activeOrder.type === 'default'}]" @click="sortResult('default')">
            默认排序
          </span>
          <em>|</em>
          <span class="order-new" :class="[{active : activeOrder.type === 'new'}]" @click="sortResult('new')">
            最新发布
          </span>
          <em>|</em>
          <span class="order-car-price" :class="[{active : activeOrder.type === 'price'}]" @click="sortResult('price')">
            价格
            <i :class="[(activeOrder.sort === 1 && activeOrder.type === 'price') ? 'el-icon-caret-bottom' : 'el-icon-caret-top']"></i>
          </span>
          <em>|</em>
          <span class="order-car-age" :class="[{active : activeOrder.type === 'age'}]" @click="sortResult('age')">
            车龄
            <i :class="[(activeOrder.sort === 1 && activeOrder.type === 'age') ? 'el-icon-caret-bottom' : 'el-icon-caret-top']"></i>
          </span>
          <em>|</em>
          <span class="order-car-mileage" :class="[{active : activeOrder.type === 'mileage'}]" @click="sortResult('mileage')">
            里程
            <i :class="[(activeOrder.sort === 1 && activeOrder.type === 'mileage') ? 'el-icon-caret-bottom' : 'el-icon-caret-top']"></i>
          </span>
        </div>
        <!-- 结果排序 结束 -->
        <!-- 搜索结果 -->
        <div 
          id="car-result-list"
          v-loading="loading"
          v-show="loading || searchResultList.length > 0">
          <ul class="car-list-wrap">
            <li class="car-list" v-for="(item, index) in searchResultList" :key="index" @click="toCarInfo(item)">
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
                </p>
              </div>
            </li>
          </ul>
          <!-- 分页 -->
          <div class="search-page">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="searchParams.pageSize"
              @current-change="pageChange"
              :current-page="currentPage"
              :total="carTotal">
            </el-pagination>
          </div>
          <!-- 分页 结束 -->
        </div>
        <!-- 搜索不到 -->
        <div id="car-empty" v-show="!loading && searchResultList.length === 0">
            <img src="~IMAGES/car_empty.png"  alt="">
            <p>
              没有您想要的车?
            </p>
            <p>
              减少筛选条件试试
            </p>
            <div id="filter-result-e">
              <!-- 筛选条件 -->
              <div class="filter-criteria-e" v-if="filterCount > 0">
                <div class="filter-criteria-item-e">
                    <div class="criteria-item-e"
                        v-for="(criteria, index) in filterCriteriaList" 
                        :key="index"
                        @click="closeCriteria(criteria)"
                        v-if="criteria.value">
                        <span class="criteria-title-e" v-if="criteria.item || criteria.tag === 'pi'">
                          {{ criteria.title }} :
                        </span>
                        <span class="criteria-value-e">
                          {{ criteria.value }}
                        </span>
                        <i class="el-icon-close"></i>
                    </div>
                </div>
              </div>
              <!-- 筛选条件 结束 -->
            </div>
        </div>
        <!-- 搜索不到 结束 -->
        <!-- 搜索结果 结束 -->
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import breadCrumb from 'COMMON/breadCrumb/breadCrumb'
import searchCarInput from 'COMMON/searchCarInput/searchCarInput'
import selectList from 'COMMON/selectList/selectList'

import searchCarData from 'DATA/searchCar'
import moment from 'moment'

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
          to: {path: '/searchCar'}
        }
      ],
      currentBrand: { brandId: -1, brandName: '不限' },
      currentSeries: { seriesId: -1, seriesName: '不限' },
      currentPrice: { priceId: -1, priceName: '不限' },
      moreBrandOpen: false,
      moreSeriesOpen: false,
      moreOpen: false,
      innerHotBrands: [],
      innerAllBrands: [],
      innerHotSeries: [],
      innerAllSeries: {
        'All': []
      },
      innerPrice: [
        {
          priceId: -1,
          priceName: '不限'
        },
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
      searchPrice1: '',
      searchPrice2: '',
      moreList: [],
      showMoreListIndex: 10,
      filterCriteriaList: '',
      filterCount: 0,
      activeOrder: {
        type: 'default',
        sort: 0
      },
      searchResultList: [],
      searchParams: {
        page: 0,
        pageSize: 40,
        cityId: '',
        searchValue: '',
        brandId: '',
        seeriesId: '',
        price: {
          from: '',
          to: ''
        },
        carAge: '',
        speed: '',
        model: '',
        mileage: '',
        displacement: '',
        emissionStandards: '',
        seating: '',
        fuelType: '',
        drivingType: '',
        sort: {
          type: 'default',
          value: ''
        }
      },
      carTotal: 0,
      refresh: true,
      currentPage: 1,
      loading: false
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
    this.startSearch()
    this.$store.commit(SET_HEADER_ACTIVE_TAB, 1)
    this.breadCrumbItems[1].text = this.currentCity.cityName + '二手车'
    this.moreList = searchCarData.moreSelectList
    this.filterCriteriaList = searchCarData.filterCriteriaList
    // 先展开，为了计算列表宽度
    this.openMore()
  },
  mounted () {
    // 到这里已经计算完成，就收起
    this.openMore()
  },
  watch: {
    currentCity (value) {
      window.location.reload()
    },
    hotBrands (list) {
      if (list.length > 0) {
        this.innerHotBrands = []
        let i = 1
        this.innerHotBrands[0] = this.currentBrand
        for (; i < 16 && list.length > i - 1; ++i) {
          this.innerHotBrands[i] = list[i - 1]
        }
      }
    },
    hotSeries (list) {
      this.reSetHotSeries()
    },
    allSortBrands (list) {
      this.innerAllBrands = {}
      let i = 0
      let j = 0
      this.innerAllBrands[0] = {}
      this.innerAllBrands[1] = {}
      this.innerAllBrands[2] = {}
      let letter = [
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
    },
    refresh (value) {
      this.sortResult('default')
    }
  },
  methods: {
    ...mapActions([
      'getHotBrand',
      'getCarBrandSort',
      'getHotSeries',
      'getCarList',
      'getSeriesByBrandId'
    ]),
    startSearch () {
      this.loading = true
      if (this.currentCity.cityId === '-1') {
        this.searchParams.cityId = ''
      } else {
        this.searchParams.cityId = this.currentCity.cityId
      }
      this.getCarList(this.searchParams)
        .then((data) => {
          this.searchResultList = data.list
          this.carTotal = data.count
          this.loading = false
        })
        .catch(() => {
          this.searchResultList = []
          this.carTotal = 0
          this.loading = false
        })
    },
    toSearch (value) {
      this.resetCriteria(false)
      this.filterCriteriaList['sv'].value = value
      this.searchParams.searchValue = value
      this.filterCount++
      this.refresh = !this.refresh
    },
    reSetHotSeries () {
      this.innerAllSeries.All = []
      let list = this.hotSeries
      if (list.length > 0) {
        this.innerHotSeries = []
        let i = 1
        this.innerHotSeries[0] = { seriesId: -1, seriesName: '不限' }
        for (; i < 16 && list.length > i - 1; ++i) {
          this.innerHotSeries[i] = list[i - 1]
        }
      }
    },
    selectBrand (brand) {
      this.currentBrand = brand
      let f = 0
      if (brand.brandName === '不限') {
        if (this.filterCriteriaList['br'].value) {
          f = -1
        } else {
          f = 0
        }
        this.searchParams.brandId = ''
        this.searchParams.seriesId = ''
        this.reSetHotSeries()
        this.filterCriteriaList['br'].value = ''
        this.filterCriteriaList['br'].item = ''
      } else {
        if (this.filterCriteriaList['br'].value) {
          f = 0
        } else {
          f = 1
        }
        this.searchParams.brandId = brand.brandId
        this.searchParams.seriesId = ''
        this.getSeriesByBrandId(brand.brandId)
          .then((data) => {
            this.innerAllSeries.All = data
            this.innerHotSeries = []
            this.innerHotSeries.push({ seriesId: -1, seriesName: '不限' })
            for (let i = 0, len = data.length; i < len && i < 8; ++i) {
              this.innerHotSeries.push(data[i])
            }
          })
          .catch(() => {
            this.innerAllSeries.All = []
            this.reSetHotSeries()
          })
        this.filterCriteriaList['br'].value = brand.brandName
        this.filterCriteriaList['br'].item = brand
      }
      this.filterCount += f
      this.refresh = !this.refresh
    },
    selectSeries (series) {
      this.currentSeries = series
      let f = 0
      if (series.seriesName === '不限') {
        if (this.filterCriteriaList['se'].value) {
          f = -1
        } else {
          f = 0
        }
        this.searchParams.seriesId = ''
        this.filterCriteriaList['se'].value = ''
        this.filterCriteriaList['se'].item = ''
      } else {
        if (this.filterCriteriaList['se'].value) {
          f = 0
        } else {
          f = 1
        }
        this.searchParams.seriesId = series.seriesId
        this.filterCriteriaList['se'].value = series.seriesName
        this.filterCriteriaList['se'].item = series
      }
      this.filterCount += f
      this.refresh = !this.refresh
    },
    selectPrice (price) {
      this.currentPrice = price
      let f = 0
      if (price.priceName === '不限') {
        if (this.filterCriteriaList['pi'].value) {
          f = -1
        } else {
          f = 0
        }
        this.searchParams.price.from = ''
        this.searchParams.price.to = ''
        this.filterCriteriaList['pi'].value = ''
        this.filterCriteriaList['pi'].item = ''
      } else {
        if (this.filterCriteriaList['pi'].value) {
          f = 0
        } else {
          f = 1
        }
        this.searchParams.price.from = price.from
        this.searchParams.price.to = price.to
        this.filterCriteriaList['pi'].value = price.priceName
        this.filterCriteriaList['pi'].item = price
      }
      this.filterCount += f
      this.refresh = !this.refresh
    },
    searchPrice () {
      if (this.searchPrice1 || this.searchPrice2) {
        if (this.searchPrice1 === '') {
          this.searchPrice1 = 0
        }
        if (this.searchPrice2 === '') {
          this.searchPrice2 = 999
        }
        let p1 = parseInt(this.searchPrice1)
        let p2 = parseInt(this.searchPrice2)
        if (p1 > p2) {
          let temp = this.searchPrice1
          this.searchPrice1 = this.searchPrice2
          this.searchPrice2 = temp
        }
        this.searchParams.price.from = this.searchPrice1
        this.searchParams.price.to = this.searchPrice2
        if (!this.filterCriteriaList['pi'].value) {
          this.filterCount++
        }
        this.refresh = !this.refresh
        this.currentPrice = {}
        this.filterCriteriaList['pi'].value = this.searchPrice1 + '-' + this.searchPrice2 + '万元'
      }
    },
    openMoreBrand () {
      this.moreBrandOpen = !this.moreBrandOpen
    },
    openMoreSeries () {
      this.moreSeriesOpen = !this.moreSeriesOpen
    },
    openMore () {
      this.moreOpen = !this.moreOpen
      this.showMoreListIndex = this.moreOpen ? 11 : 10
    },
    moreItemSelect (item) {
      let parent = item.parent
      let realItem = item.item
      let f = 0
      let id = ''
      if (realItem.value === '不限') {
        if (this.filterCriteriaList[parent.tag].value) {
          f = -1
        } else {
          f = 0
        }
        this.filterCriteriaList[parent.tag].value = ''
        this.filterCriteriaList[parent.tag].item = ''
      } else {
        if (this.filterCriteriaList[parent.tag].value) {
          f = 0
        } else {
          f = 1
        }
        this.filterCriteriaList[parent.tag].value = realItem.value
        this.filterCriteriaList[parent.tag].item = realItem
        id = realItem.id
      }
      switch (parent.tag) {
        case 'ca':
          this.searchParams.carAge = id
          break
        case 'csb':
          this.searchParams.speed = id
          break
        case 'cm':
          this.searchParams.model = id
          break
        case 'cmi':
          this.searchParams.mileage = id
          break
        case 'cd':
          this.searchParams.displacement = id
          break
        case 'ces':
          this.searchParams.emissionStandards = id
          break
        case 'cs':
          this.searchParams.seating = id
          break
        case 'cft':
          this.searchParams.fuelType = id
          break
        case 'cdt':
          this.searchParams.drivingType = id
          break
      }
      this.filterCount += f
      this.refresh = !this.refresh
    },
    closeCriteria (criteria) {
      switch (criteria.tag) {
        case 'ca':
          this.searchParams.carAge = ''
          break
        case 'csb':
          this.searchParams.speed = ''
          break
        case 'cm':
          this.searchParams.model = ''
          break
        case 'cmi':
          this.searchParams.mileage = ''
          break
        case 'cd':
          this.searchParams.displacement = ''
          break
        case 'ces':
          this.searchParams.emissionStandards = ''
          break
        case 'cs':
          this.searchParams.seating = ''
          break
        case 'cft':
          this.searchParams.fuelType = ''
          break
        case 'cdt':
          this.searchParams.drivingType = ''
          break
        case 'sv':
          this.searchParams.searchValue = ''
          break
        case 'br':
          this.searchParams.brandId = ''
          break
        case 'se':
          this.searchParams.seriesId = ''
          break
        case 'pi':
          this.searchParams.price.from = ''
          this.searchParams.price.to = ''
          break
      }

      this.filterCount--
      this.refresh = !this.refresh
      this.filterCriteriaList[criteria.tag].value = ''
      this.filterCriteriaList[criteria.tag].item = ''
      switch (criteria.tag) {
        case 'pi':
          this.searchPrice1 = this.searchPrice2 = ''
          this.currentPrice = { priceId: -1, priceName: '不限' }
          return
        case 'br':
          this.currentBrand = { brandId: -1, brandName: '不限' }
          return
        case 'se':
          this.currentSeries = { seriesId: -1, seriesName: '不限' }
          return
      }
      let keys = {'ca': 0, 'csb': 1, 'cm': 2, 'cmi': 3, 'cd': 4, 'ces': 5, 'cs': 6, 'cft': 7, 'cdt': 8, 'cc': 9, 'cco': 10}
      if (keys[criteria.tag] || keys[criteria.tag] === 0) {
        this.moreList[keys[criteria.tag]].mark = !this.moreList[keys[criteria.tag]].mark
      }
    },
    resetCriteria (refresh) {
      this.searchParams.searchValue = ''
      this.searchParams.brandId = ''
      this.searchParams.seriesId = ''
      this.searchParams.carAge = ''
      this.searchParams.speed = ''
      this.searchParams.model = ''
      this.searchParams.mileage = ''
      this.searchParams.displacement = ''
      this.searchParams.emissionStandards = ''
      this.searchParams.seating = ''
      this.searchParams.fuelType = ''
      this.searchParams.drivingType = ''
      this.searchParams.price.from = ''
      this.searchParams.price.to = ''

      if (refresh) {
        this.refresh = !this.refresh
      }
      this.filterCount = 0
      this.currentPrice = { priceId: -1, priceName: '不限' }
      this.currentBrand = { brandId: -1, brandName: '不限' }
      this.currentSeries = { seriesId: -1, seriesName: '不限' }
      this.searchPrice1 = this.searchPrice2 = ''
      for (let k in this.filterCriteriaList) {
        this.filterCriteriaList[k].value = ''
        this.filterCriteriaList[k].item = ''
      }
      let keys = {'ca': 0, 'csb': 1, 'cm': 2, 'cmi': 3, 'cd': 4, 'ces': 5, 'cs': 6, 'cft': 7, 'cdt': 8}
      for (let key in keys) {
        this.moreList[keys[key]].mark = !this.moreList[keys[key]].mark
      }
    },
    inputSearchItem (item) {
      this.selectBrand(item)
    },
    sortResult (type) {
      if (type === this.activeOrder.type) {
        if (type === 'price' || type === 'age' || type === 'mileage') {
          this.activeOrder.sort = (this.activeOrder.sort === 0 ? 1 : 0)
        }
      } else {
        this.activeOrder.sort = 0
      }
      this.activeOrder.type = type
      this.searchParams.sort.type = type
      this.searchParams.sort.value = this.activeOrder.sort
      this.startSearch()
    },
    pageChange (currentPage) {
      this.scrollToTop()
      this.searchParams.page = currentPage - 1
      this.currentPage = currentPage
      this.startSearch()
    },
    scrollToTop () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    toCarInfo (item) {
      this.$router.push({
        name: 'car',
        params: {
          carId: item.id
        }
      })
    },
    isNew (value) {
      // 一周之内表示最新发布
      return (moment().unix() * 1000 - parseInt(value) * 1000) / 1000 / 24 / 60 / 60 <= 7
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
        padding: 19px 0px
        background: #fafafa
        text-align: center
      .filter-left
        background: $color-white
        width: 1098px
        padding-top: 5px
        padding-bottom: 5px
        .filter-show
          display: flex
          display: -webkit-flex
          flex-direction: row
          justify-content: space-between
          .filter-item
            width: 1018px
            padding-left: 10px
            .select-list
              color: $color-dark-grey
              margin-top: 8px
              margin-left: 8px
              margin-bottom: 8px
              margin-right: 4px
              cursor: pointer
              float: left
              &:first-child
                margin-left: 8px
            > span
              color: $color-dark-grey
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
              color: $color-dark-grey
              margin: 10px
              margin-left: 30px
              margin-right: 2px
              cursor: pointer
              float: left
              display: flex
              display: -webkit-flex
              flex-direction: row
              align-items: center
              .input-border
                border: 1px solid #e6e6e6
                padding: 1px 2px
                margin: 0px 4px
                input
                  width: 40px
                  border: none
                  text-align: right
              button
                width: 50px
                padding: 2px 2px
                border: 1px solid $color-blue
                background: $color-white
                color: $color-blue
                margin-left: 4px
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
              .brand-list,
              .series-list
                width: 300px
                span
                  color: $color-dark-grey
                  margin-right: 4px
                  padding: 4px 4px
                  cursor: pointer
                  float:left
                  &:hover,
                  &.current
                    color: $color-blue
              .series-list
                width: 1000px
                span
                  color: $color-dark-grey
                  margin-right: 8px
    #filter-result
      font-size: 14px
      background: $color-white
      width: 100%
      padding: 15px 5px
      > span
        color: #888888
      .filter-criteria
        display: flex
        display: -webkit-flex
        flex-direction: row
        color: #888888
        margin-bottom: 5px
        > span
          margin-top: 5px
        > p
          color: $color-black
          margin: 0px 15px
          cursor: pointer
          height: 15px
          margin-top: 5px
          &:hover
            color: $color-blue
        .filter-criteria-item
          margin-left: 4px
          max-width: 960px
          .criteria-item
            float: left
            padding: 5px
            margin-left: 10px
            margin-bottom: 10px
            border: 1px solid #e6e6e6
            cursor: pointer
            &:hover
              border: 1px solid $color-blue
              i
                color: $color-blue
            .criteria-title
              color: $color-dark-grey
            .criteria-value
              color: $color-blue
    #car-order
      font-size: 14px
      color: $color-dark-grey
      border-bottom: 1px solid #e6e6e6
      padding: 10px
      text-align: right
      > span
        cursor: pointer
        padding: 5px
        &:hover,
        &.active
          color: $color-blue
      > em
        color: #d2d2d2
        font-style: normal
    #car-empty
      width: 100%
      display: flex
      display: -webkit-flex
      align-content: center
      flex-direction: column
      text-align: center
      padding: 100px 0px
      > img
        width: 400px
        height: 150px
        margin: 0 auto
      > p
        margin: 20px
      #filter-result-e
        font-size: 14px
        background: $color-white
        padding: 15px 5px
        > span
          color: #888888
        .filter-criteria-e
          color: #888888
          margin-bottom: 5px
          > span
            margin-top: 5px
          > p
            color: $color-black
            margin: 0px 15px
            cursor: pointer
            height: 15px
            margin-top: 5px
            &:hover
              color: $color-blue
          .filter-criteria-item-e
            display: flex
            display: -webkit-flex
            flex-direction: row
            justify-content: center
            flex-wrap: wrap
            padding-left: 200px
            padding-right: 200px
            .criteria-item-e
              padding: 5px
              margin-left: 10px
              margin-bottom: 10px
              border: 1px solid #e6e6e6
              cursor: pointer
              &:hover
                border: 1px solid $color-blue
                i
                  color: $color-blue
              .criteria-title-e
                color: $color-dark-grey
              .criteria-value-e
                color: $color-blue
    #car-result-list
      min-height: 600px
      .car-list-wrap
        width: 1170px
        display: flex
        flex-wrap: wrap
        margin-top: 16px
        .car-list
          width: 280.5px
          height: 314px
          padding: 8px
          margin-right: 15px
          margin-bottom: 16px
          &:last-child
            margin-right: 0px
          &:hover
            cursor: pointer
            box-shadow: 1px 1px 10px 3px rgba(15, 166, 255, .1)
          .car-img
            width: 100%
            height: 174px
            margin-top: 3px
            background-image: url('~IMAGES/car_default.png')
            background-size: 100% 174px
            > img
              width: 100%
              height: 174px
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
            padding: 20px 5px
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
    .search-page
      width: 100%
      padding-bottom: 40px
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: center


.icon-guazi
  background-image: url('~IMAGES/icon_guazi.png')
  background-repeat: no-repeat
  display: inline-block
</style>