<template>
  <div id="sell-car-box">
    <modal-layout ref="modal" width="800">
      <div class="box" v-show="step === 1">
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
      <div class="box" v-show="step === 2" style="height: 450px">
        <p>只差<span class="blue-text">1</span>步，多卖<span class="blue-text">20%</span>，平均<span class="blue-text">7</span>天成交</p>
        <!-- 验车时间 -->
        <div class="sell-item-col">
            <div class="sell-item-title">验车时间</div>
            <div class="sell-item-check-time">
                <span 
                  v-for="(item, index) in checkCarTimeList" 
                  :key="index"
                  :class="{ban: !item.disable, active: selectCheckCarTime.id === item.id, 'space-right': index === 0 || index === 2}"
                  @click="selectCheckCarTimeItem(item.disable ? item : selectCheckCarTime)">
                  {{ item.value }}
                  <i class="el-icon-check" v-if="selectCheckCarTime.id === item.id"></i>
                  </span>
            </div>
        </div>
        <!-- 验车时间 结束 -->
        <!-- 验车地点 -->
        <div class="sell-item-col">
            <div class="sell-item-title">验车地点</div>
            <div class="sell-item-input">
                <select-province-list
                    class="item-three"
                    :selectModel="provinceList"
                    :title="'省份'"
                    :currentProvince="selectProvince"
                    @item-select="selectProvinceItem">
                </select-province-list>
                <select-city-list
                    class="item-three"
                    :selectModel="cityList"
                    :mark="cityMark"
                    :title="'城市'"
                    :currentCity="selectCity2"
                    @item-select="selectCityItem2">
                </select-city-list>
                <select-district-list
                    class="item-three"
                    :selectModel="districtList"
                    :mark="districtMark"
                    :title="'地区'"
                    @item-select="selectDistrictItem">
                </select-district-list>
            </div>
        </div>
        <div class="sell-item-col">
            <div class="sell-item-title"></div>
            <div class="sell-item-input">
                <div class="input-border item">
                    <input v-model="address"
                      type="text"
                      placeholder="详细地址">
                </div>
            </div>
        </div>
        <!-- 验车地点 结束 -->
        <div class="btn">
          <div class="pre-step" @click="preStep">上一步</div>
          <div class="submit" @click="submit">提交</div>
        </div>
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
import selectProvinceList from 'COMMON/selectList/selectProvinceList'
import selectCityList from 'COMMON/selectList/selectCityList'
import selectDistrictList from 'COMMON/selectList/selectDistrictList'

export default {
  name: 'sellCarBox',
  props: {},
  components: {
    modalLayout,
    selectList2,
    selectSeriesList,
    sellCarCityPicker,
    sortBrandList,
    selectModelList,
    selectProvinceList,
    selectCityList,
    selectDistrictList
  },
  data () {
    return {
      step: 1,
      yearData: [],
      carStatus: [],
      sellDate: [],
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
      message: '',
      checkCarTimeList: [],
      selectCheckCarTime: {},
      provinceList: [],
      cityList: [],
      districtList: [],
      selectProvince: {},
      selectCity2: {},
      selectDistrict: {},
      cityMark: true,
      districtMark: true,
      address: ''
    }
  },
  created () {
    if (this.isLogin) {
      this.getCitySort()
      this.getHotBrand(8)
      this.getCarBrandSort()
      this.getProvince()
        .then((list) => {
          this.provinceList = list
        })
      this.getSellInfo()
        .then((data) => {
          this.yearData = data.licenseTime
          this.carStatus = data.condition
          this.sellDate = data.expireDate
        })
    }
  },
  computed: {
    ...mapGetters([
      'allCities',
      'hotBrands',
      'allSortBrands',
      'currentCity',
      'isLogin'
    ])
  },
  methods: {
    ...mapActions([
      'getCarBrandSort',
      'getHotBrand',
      'getCitySort',
      'getSeriesByBrandId',
      'getModelBySeriesId',
      'getProvince',
      'getCity',
      'getDistrict',
      'getInfoByCity',
      'getSellInfo',
      'getCheckTime',
      'sellCar'
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
    },
    selectSeriesItem (series) {
      this.selectSeries = series
      this.modelMark = !this.modelMark
      this.selectModel = {}
      this.getModelBySeriesId(series.seriesId)
        .then((list) => {
          this.modelList = list
        })
    },
    selectCityItem (city) {
      this.selectCity = city
      this.selectProvince = {}
      this.selectCity2 = {}
      this.cityList = []
      this.districtList = []
      this.getInfoByCity(city.cityId)
        .then((data) => {
          this.selectProvince = data.province
          this.selectCity2 = city
          this.cityList = data.cityList
          this.districtList = data.districtList
        })
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
      this.step = 2
      this.getCheckTime()
        .then((data) => {
          this.checkCarTimeList = data
        })
    },
    preStep () {
      this.step = 1
    },
    submit () {
      if (!this.selectCheckCarTime.id) {
        this.error('请选择验车时间')
        return
      }
      if (!this.selectProvince.provinceId) {
        this.error('请选择省份')
        return
      }
      if (!this.selectCity2.cityId) {
        this.error('请选择城市')
        return
      }
      if (!this.address) {
        this.error('请填写详细地址')
        return
      }
      var params = {
        'brandId': this.selectBrand.brandId,
        'seriesId': this.selectSeries.seriesId ? this.selectSeries.seriesId : '-9999',
        'modelId': this.selectModel.modelId ? this.selectModel.modelId : '-9999',
        'year': this.selectYear.value,
        'month': this.selectMonth.value,
        'driverMileage': this.driverMileage,
        'guohu': this.selectGuohu.id,
        'licenseCity': this.selectCity.cityId,
        'condition': this.selectCarStatus.conditionId,
        'expireDate': this.selectSellDate.expireDateId,
        'checkTime': this.selectCheckCarTime.id,
        'provinceId': this.selectProvince.provinceId,
        'cityId': this.selectCity2.cityId,
        'districtId': this.selectDistrict.districtId ? this.selectDistrict.districtId : '-9999',
        'address': this.address
      }
      this.sellCar(params)
        .then((data) => {
          this.$router.push({ name: 'home' })
        })
        .catch((err) => {
          if (err.status === 401) {
            this.error('登录过期，请重新登录')
          }
        })
    },
    selectCheckCarTimeItem (item) {
      this.selectCheckCarTime = item
    },
    selectProvinceItem (province) {
      this.selectProvince = province
      this.selectCity2 = {}
      this.selectDistrict = {}
      this.cityList = []
      this.districtList = []
      this.cityMark = !this.cityMark
      this.districtMark = !this.districtMark
      this.getCity(province.provinceId)
        .then((data) => {
          this.cityList = data.list
        })
    },
    selectCityItem2 (city) {
      this.selectCity2 = city
      this.selectDistrict = {}
      this.districtList = []
      this.districtMark = !this.districtMark
      this.getDistrict(city.cityId)
        .then((data) => {
          this.districtList = data.list
        })
    },
    selectDistrictItem (district) {
      this.selectDistrict = district
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
  .btn
    position: absolute
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: space-between
    width: 420px
    bottom: 20px
    left: 210px
    .pre-step,
    .submit
      width: 300px
      color: $color-white
      background: $color-blue
      text-align: center
      font-size: 20px
      font-weight: bold
      padding: 15px
      cursor: pointer
      border-radius: 3px
    .pre-step
      width: 100px
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
    border-radius: 3px
  .sell-item-col
    width: 640px
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
      line-height: 18px
      padding: 15px 0px
    .sell-item-check-time
      width: 530px
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: space-between
      flex-wrap: wrap
      padding: 0px 15px
      align-items: center
      > span
        cursor: pointer
        min-width: 240px
        flex-grow: 1
        padding: 10px 18px
        border: 1px solid #e6e6e6
        border-radius: 3px
        margin-bottom: 15px
        &.space-right
          margin-right: 10px
        &.active,
        &:hover
          border: 1px solid $color-blue
        &.ban
          background: #eeeeee
          color: #b4b9bd
          cursor: not-allowed
          &:hover
            border: 1px solid #e6e6e6
        > i
          float: right
          font-size: 18px
          color: $color-blue
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
      .item-three
        width: 160px
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
      
</style>