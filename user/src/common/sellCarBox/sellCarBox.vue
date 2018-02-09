<template>
  <div id="sell-car-box">
    <modal-layout ref="modal" width="800">
      <div class="box">
        <p>只差<span class="blue-text">2</span>步，多卖<span class="blue-text">20%</span>，平均<span class="blue-text">7</span>天成交</p>
        <!-- 售卖车型 -->
        <div class="sell-item-col">
            <div class="sell-item-title">售卖车型</div>
            <div class="sell-item-input">
                <sort-brand-list
                    class="item-half"
                    :allBrand="allSortBrands"
                    :hotBrand="hotBrands"
                    :title="'品牌'"
                    @brand-select="selectBrandItem">
                </sort-brand-list>
                <select-series-list
                    class="item-half"
                    :selectModel="seriesList"
                    :mark="seriesMark"
                    :title="'车系'"
                    @item-select="selectSeriesItem">
                </select-series-list>
            </div>
        </div>
        <div class="sell-item-col">
            <div class="sell-item-title"></div>
            <div class="sell-item-input">
                <select-model-list
                    class="item"
                    :selectModel="modelList"
                    :mark="modelMark"
                    :title="'车型'"
                    @item-select="selectModelItem">
                </select-model-list>
            </div>
        </div>
        <!-- 售卖车型 结束 -->
        <!-- 上牌时间 -->
        <div class="sell-item-col">
            <div class="sell-item-title">上牌时间</div>
            <div class="sell-item-input">
                <select-list2
                    class="item-half"
                    :selectModel="yearData"
                    :title="'年份'"
                    @item-select="selectYearItem">
                </select-list2>
                <select-list2
                    class="item-half"
                    :selectModel="selectYear.month"
                    :mark="monthMark"
                    :title="'月份'"
                    @item-select="selectMonthItem">
                </select-list2>
            </div>
        </div>
        <!-- 上牌时间 结束 -->
        <!-- 行驶里程 -->
        <div class="sell-item-col">
            <div class="sell-item-title">行驶里程</div>
            <div class="sell-item-input">
                <span class="input-border item">
                    <input v-model="driverMileage" @keyup="changeMileage">
                    <div class="input-suffix">万公里</div>
                </span>
            </div>
        </div>
        <!-- 行驶里程 结束 -->
        <!-- 牌照地 -->
        <div class="sell-item-col">
            <div class="sell-item-title">牌照地</div>
            <div class="sell-item-input">
              <sell-car-city-picker
                class="item"
                :allCities="allCities"
                :currentCity="currentCity"
                @city-click="selectCityItem">
              </sell-car-city-picker>
            </div>
        </div>
        <!-- 牌照地 结束 -->
        <!-- 过户次数 -->
        <div class="sell-item-col">
            <div class="sell-item-title">过户次数</div>
            <div class="sell-item-input">
                <span 
                  v-for="(gh, index) in guohu" 
                  :key="index" 
                  @click="selectGuohuItem(gh)"
                  :class="[{'gh-active': selectGuohu.id === gh.id}]">
                  {{ gh.value }}
                  </span>
            </div>
        </div>
        <!-- 过户次数 结束 -->
        <!-- 车况 -->
        <div class="sell-item-col">
            <div class="sell-item-title">车况</div>
            <div class="sell-item-input">
                <select-list2
                    class="item"
                    :selectModel="carStatus"
                    @item-select="selectCarStatusItem">
                </select-list2>
            </div>
        </div>
        <!-- 车况 结束 -->
        <!-- 预期售出时间 -->
        <div class="sell-item-col">
            <div class="sell-item-title">预期售出时间</div>
            <div class="sell-item-input">
                <select-list2
                    class="item"
                    :selectModel="sellDate"
                    @item-select="selectSellDateItem">
                </select-list2>
            </div>
        </div>
        <!-- 预期售出时间 结束 -->
        <div class="next-step" @click="nextStep">下一步</div>
      </div>
    </modal-layout>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import modalLayout from 'COMMON/modalLayout/modalLayout'
import selectList2 from 'COMMON/selectList/selectList2'
import selectSeriesList from 'COMMON/selectList/selectSeriesList'
import selectModelList from 'COMMON/selectList/selectModelList'
import sortBrandList from 'COMMON/selectList/sortBrandList'
import sellCarCityPicker from 'COMMON/cityPicker/sellCarCityPicker'

export default {
  name: 'sellCarBox',
  props: {},
  components: {
    modalLayout,
    selectList2,
    selectSeriesList,
    sellCarCityPicker,
    sortBrandList,
    selectModelList
  },
  data () {
    return {
      yearData: [
        {
          value: '2018年',
          month: [
            {
              value: '1月'
            },
            {
              value: '2月'
            }
          ]
        },
        {
          value: '2017年',
          month: [
            {
              value: '1月'
            },
            {
              value: '2月'
            },
            {
              value: '3月'
            },
            {
              value: '4月'
            },
            {
              value: '5月'
            },
            {
              value: '6月'
            },
            {
              value: '7月'
            },
            {
              value: '8月'
            },
            {
              value: '9月'
            },
            {
              value: '10月'
            },
            {
              value: '11月'
            },
            {
              value: '12月'
            }
          ]
        },
        {
          value: '2016年',
          month: [
            {
              value: '1月'
            },
            {
              value: '2月'
            },
            {
              value: '3月'
            },
            {
              value: '4月'
            },
            {
              value: '5月'
            },
            {
              value: '6月'
            },
            {
              value: '7月'
            },
            {
              value: '8月'
            },
            {
              value: '9月'
            },
            {
              value: '10月'
            },
            {
              value: '11月'
            },
            {
              value: '12月'
            }
          ]
        }
      ],
      carStatus: [
        {
          value: '车况好，无事故且外观无损伤'
        },
        {
          value: '车况正常，无事故但有少量剐蹭钣金'
        },
        {
          value: '车况一般，发生过碰撞事故'
        },
        {
          value: '车辆有重大事故，车身骨架受损（含泡水火烧）'
        }
      ],
      sellDate: [
        {
          value: '非常急，3天以内'
        },
        {
          value: '不是很着急，但要在1周之内'
        },
        {
          value: '想卖个好价，1个月内'
        },
        {
          value: '不着急，价格合适再卖'
        }
      ],
      monthMark: true,
      selectYear: {},
      selectMonth: {},
      selectCarStatus: {},
      driverMileage: '',
      selectBrand: {},
      selectSeries: {},
      seriesMark: true,
      seriesList: [],
      selectCity: {},
      selectSellDate: {},
      modelList: [],
      selectModel: {},
      modelMark: true,
      guohu: [
        {
          value: '0',
          id: 0
        },
        {
          value: '1',
          id: 1
        },
        {
          value: '2',
          id: 2
        },
        {
          value: '3',
          id: 3
        },
        {
          value: '4',
          id: 4
        },
        {
          value: '4次以上',
          id: 5
        },
        {
          value: '不清楚',
          id: -1
        }
      ],
      selectGuohu: {},
      message: ''
    }
  },
  created () {
    this.getCitySort()
    this.getHotBrand(8)
    this.getCarBrandSort()
  },
  computed: {
    ...mapGetters([
      'allCities',
      'hotBrands',
      'allSortBrands',
      'currentCity'
    ])
  },
  methods: {
    ...mapActions([
      'getCarBrandSort',
      'getHotBrand',
      'getCitySort',
      'getSeriesByBrandId',
      'getModelBySeriesId'
    ]),
    selectYearItem (year) {
      this.selectYear = year
      this.selectMonth = {}
      this.monthMark = !this.monthMark
    },
    selectMonthItem (month) {
      this.selectMonth = month
    },
    selectCarStatusItem (carStatus) {
      this.selectCarStatus = carStatus
    },
    selectBrandItem (brand) {
      this.selectBrand = brand
      this.seriesMark = !this.seriesMark
      this.modelMark = !this.modelMark
      this.selectSeries = {}
      this.seriesList = []
      this.modelList = []
      this.selectModel = {}
      this.getSeriesByBrandId(brand.brandId)
        .then((list) => {
          this.seriesList = list
        })
        .catch(({response}) => {
          this.seriesList = {}
        })
    },
    selectSeriesItem (series) {
      this.selectSeries = series
      this.modelMark = !this.modelMark
      this.selectModel = {}
      this.getModelBySeriesId(series.seriesId)
        .then((list) => {
          this.modelList = list
        })
        .catch(({response}) => {
          this.modelList = {}
        })
    },
    selectCityItem (city) {
      this.selectCity = city
    },
    selectSellDateItem (sellDate) {
      this.selectSellDate = sellDate
    },
    selectModelItem (model) {
      this.selectModel = model
    },
    selectGuohuItem (guohu) {
      this.selectGuohu = guohu
    },
    nextStep () {
      if (this.message) {
        this.message.close()
      }
      if (!this.selectBrand.brandId) {
        this.error('请选择车品牌')
        return
      }
      if (this.seriesList.length > 0 && !this.selectSeries.seriesId) {
        this.error('请选择车系')
        return
      }
      if (this.modelList.length > 0 && !this.selectModel.modelId) {
        this.error('请选择车型')
        return
      }
      if (!this.selectYear.value || !this.selectMonth.value) {
        this.error('请选择上牌时间')
        return
      }
      if (!this.driverMileage) {
        this.error('请填写行驶里程')
        return
      }
      if (!this.selectCity.cityId) {
        this.error('请选择牌照地')
        return
      }
      if (!this.selectGuohu.value) {
        this.error('请选择过户次数')
        return
      }
      if (!this.selectCarStatus.value) {
        this.error('请选择车况')
        return
      }
      if (!this.selectSellDate.value) {
        this.error('请选择预期售出时间')
        return
      }
      this.message = this.$message({
        showClose: true,
        message: '下一步',
        type: 'success'
      })
    },
    changeMileage () {
      var newValue = ''
      var l = 4
      var pointPos = -1
      for (var i = 0; i < this.driverMileage.length; ++i) {
        var c = this.driverMileage[i]
        if (newValue.length === l) {
          break
        }
        if (c === '0' && newValue.length === 0) {
          continue
        }
        if (c === '.') {
          if (i > 0 && pointPos === -1 && i < 3) {
            newValue += c
            pointPos = i
            l = i + 3
            continue
          } else {
            continue
          }
        }
        if (c >= '0' && c <= '9') {
          newValue += c
        }
      }
      this.driverMileage = newValue
    },
    error (err) {
      this.message = this.$message({
        showClose: true,
        message: err,
        type: 'error'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
.box
  background: $color-white
  height: 620px
  padding: 2px
  > p
    color: #495056
    font-size: 22px
    width: 342px
    margin: 20px auto
    .blue-text
      color: $color-blue
  .next-step
    position: absolute
    width: 400px
    padding: 15px
    cursor: pointer
    color: $color-white
    background: $color-blue
    text-align: center
    font-size: 20px
    font-weight: bold
    bottom: 20px
    left: 210px
  .sell-item-col
    width: 640px
    height: 50px
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: space-between
    margin: 0 auto
    margin-bottom: 10px
    .sell-item-title
      width: 110px
      font-size: 18px
      color: #495056
      text-align: right
      line-height: 20px
      padding: 18px 0px
    .sell-item-input
      width: 530px
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: space-between
      padding: 0px 15px
      align-items: center
      > span
        cursor: pointer
        padding: 10px 18px
        border: 1px solid #e6e6e6
        border-radius: 3px
        &:hover,
        &.gh-active
          border: 1px solid $color-blue
      .item-half
        width: 240px
      .item
        width: 100%
      .input-border
        border: 1px solid #e6e6e6
        padding: 8px
        border-radius: 3px
        display: flex
        display: -webkit-flex
        flex-direction: row
        justify-content: space-between
        input
          flex-grow: 1
          border: none
        .input-suffix
          font-size: 16px
          margin-top: 2px
      .city-picker
        width: 100%
      
</style>