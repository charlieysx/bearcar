<template>
  <div id="mycar-checking">
    <div class="title">二手车-待检测列表  （总数：{{ count }}）</div>
    <div class="content" v-if="carList.length > 0">
      <div class="mycar-info" v-for="(car, index) in carList" :key="index">
        <div class="mycar-info-top">
          <div class="img"></div>
          <div class="info-name">
            <div class="info-name-top">
              <div class="name" 
                @click="car.status === '3' ? toDetail(car.carId) : ''"
                :class="{'active-detail' : car.status === '3'}">
                {{ car.brandName }} {{ car.modelName ? car.modelName : car.seriesName }}
              </div>
              <div class="more" @click="moreOpen === index ? (moreOpen = '-1') : (moreOpen = index)">
                {{ moreOpen === index ? '收起' : '展开' }}
                <i :class="[moreOpen === index ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
              </div>
            </div>
            <div class="i-time">
              <i class="el-icon-date"></i>{{ car.publishTime | time('YYYY-MM-DD HH:mm:ss') }}
              <i class="el-icon-view"></i>{{ car.seeCount }}
            </div>
          </div>
        </div>
        <div class="info-detail" v-if="moreOpen === index">
          <div class="mycar-info-bottom">
            <div class="info-item">
              上牌时间 :
              <span>
                {{ car.licensedYear + car.licensedMonth }}
              </span>
            </div>
            <div class="info-item">
              里程 :
              <span>
                {{ car.mileage }}万公里
              </span>
            </div>
            <div class="info-item">
              牌照地 :
              <span>
                {{ car.licensedCityName }}
              </span>
            </div>
          </div>
          <div class="mycar-info-bottom">
            <div class="info-item">
              过户次数 :
              <span>
                {{ car.transferTime === '-1' ? '不清楚' : (car.transferTime === '5' ? '4次以上' : car.transferTime) }}
              </span>
            </div>
            <div class="info-item">
              车况 :
              <span>
                {{ car.conditionName }}
              </span>
            </div>
            <div class="info-item">
              预期售出时间 :
              <span>
                {{ car.expireDateName }}
              </span>
            </div>
          </div>
          <div class="mycar-info-bottom">
            <div class="info-item two">
              联系方式 :
              <span>
                {{ car.phone }}  
              </span>
            </div>
            <div class="info-item two">
              预约检测时间 :
              <span v-if="car.checkTimeId !== '4'">
                {{ car.publishTime | time('YYYY-MM-DD') }}
              </span>
              -
              <span>
                {{ checkTime[car.checkTimeId] }}
              </span>
            </div>
          </div>
          <div class="mycar-info-bottom">
            <div class="info-item one">
              预约检测地址 :
              <span>
                {{ car.provinceName }}
                -
                {{ car.cityName }}
                -
                {{ car.districtName }}
                -
                {{ car.inspectAddress }}
              </span>
            </div>
          </div>
        </div>
        <div class="mycar-button" v-if="userInfo.userId === car.dealUserId">
          <div class="btn" @click="fill(car.carId)">
            完善信息
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="search-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="params.pageSize"
          @current-change="pageChange"
          :total="count">
        </el-pagination>
      </div>
      <!-- 分页 结束 -->
    </div>
    <no-data text="没有待检测的二手车哦~" v-else></no-data>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import noData from 'COMMON/noData/noData'

export default {
  name: 'mycar-checking',
  components: {
    noData
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data () {
    return {
      carList: [],
      count: 0,
      params: {
        type: 'checking',
        page: 0,
        pageSize: 15
      },
      checkTime: {
        '0': '9:00-12:00',
        '1': '12:00-18:00',
        '2': '第二天 9:00-12:00',
        '3': '第二天 12:00-18:00',
        '4': '客服联系'
      },
      moreOpen: -1
    }
  },
  created () {
    this.update()
  },
  methods: {
    ...mapActions([
      'getMyCar',
      'underMyCar'
    ]),
    update () {
      this.getMyCar(this.params)
        .then((data) => {
          this.carList = data.list
          this.count = data.count
        })
        .catch(() => {
          this.carList = []
          this.count = 0
        })
    },
    pageChange (currentPage) {
      this.scrollToTop()
      this.params.page = currentPage - 1
      this.update()
    },
    scrollToTop () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    fill (carId) {
      this.$router.push({
        name: 'fillcar',
        params: {
          carId: carId
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#mycar-checking
  width: 100%
  .title
    text-align: center
    background: #545c64
    color: $color-white
    font-size: 18px
    height: 70px
    line-height: 18px
    padding: 26px
    font-weight: bold
  .content
    width: 1000px
    margin: 0 auto
    .mycar-info
      border-bottom 1px solid $color-border
      padding: 30px 0px
      .mycar-info-top
        display: flex
        display: -webkit-flex
        flex-direction: row
        align-items: center
        .img
          width: 56px
          height: 56px
          border-radius: 50%
          background-image: url('~IMAGES/icon_car.png')
          background-repeat: no-repeat
          background-size: 48px 48px
          background-position: 4px
        .info-name
          margin-left: 20px
          flex-grow: 1
          .info-name-top
            display: flex
            display: -webkit-flex
            flex-direction: row
            .name
              font-size: 18px
              margin-bottom: 10px
              font-weight: bold
              flex-grow: 1
              &.active-detail
                &:hover
                  cursor: pointer
                  color: $color-blue
            .more
              width: 70px
              color: $color-black
              padding: 0px 0px
              text-align: center
              font-size: 14px
              i
                color: #999999
              &:hover
                cursor: pointer
                color: $color-blue
          .i-time
            font-size: 12px
            > i
              margin-right: 5px
              margin-left: 15px
              &:first-child
                margin-left: 0px
      .mycar-info-bottom
        width: 100%
        display: flex
        display: -webkit-flex
        flex-direction: row
        margin-left: 74px
        margin-top: 10px
        .info-item
          width: 250px
          font-size: 14px
          margin-right: 0px
          display: flex
          display: -webkit-flex
          flex-direction: row
          > span
            width: 140px
            margin-left: 5px
        .two
          width: 375px
          > span
            width: auto
            max-width: 265px
            margin-left: 0px
            &:first-child
              margin-left: 5px
        .one
          width: 750px
          > span
            width: auto
            max-width: 640px
            margin-left: 0px
      .mycar-button
        width: 100%
        margin-top: 15px
        padding: 0px 20px
        display: flex
        display: -webkit-flex
        flex-direction: row
        justify-content: flex-end
        .btn
          border: 1px solid $color-blue
          padding: 6px 15px
          font-size: 14px
          height: 30px
          line-height: 18px
          border-radius: 20px
          cursor: pointer
          margin-left: 10px
          &:hover
            background: $color-blue
            color: white
    .search-page
      width: 100%
      padding-top: 40px
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: center
</style>

