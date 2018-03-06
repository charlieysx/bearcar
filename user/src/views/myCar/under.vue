<template>
  <div id="mycar-under">
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
              <div class="tip">
                {{ tips[car.status] }}
                <p v-if="car.status === '5'">
                  {{ car.underReason }}
                </p>
              </div>
            </div>
            <div class="i-time">
              <i class="el-icon-date"></i>{{ car.publishTime | time('YYYY-MM-DD HH:mm:ss') }}
              <i class="el-icon-view"></i>{{ car.seeCount }}
            </div>
          </div>
        </div>
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
              {{ car.cityName }}
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
    <no-data text="没有已完成的二手车哦~" v-else></no-data>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import noData from 'COMMON/noData/noData'

export default {
  name: 'mycar-under',
  components: {
    noData
  },
  data () {
    return {
      carList: [],
      count: 0,
      params: {
        type: 'under',
        page: 0,
        pageSize: 15
      },
      tips: {
        '3': '交易完成',
        '4': '手动下架',
        '5': '系统下架'
      }
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
    toDetail (carId) {
      // this.$router.push({
      //   name: 'cardetail',
      //   params: {
      //     carId: carId
      //   }
      // })
      window.open(`${window.location.origin}/cardetail/${carId}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#mycar-under
  width: 100%
  .content
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
            justify-content: space-between
            .name
              font-size: 18px
              margin-bottom: 10px
              font-weight: bold
              &.active-detail
                &:hover
                  cursor: pointer
                  color: $color-blue
            .tip
              font-size: 16px
              color: #f76367
              font-weight: bold
              margin-right: 20px
              margin-bottom: 10px
              text-align: right
              > p
                font-size: 14px
                color: #999999
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
    .search-page
      width: 100%
      padding-top: 40px
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: center
</style>

