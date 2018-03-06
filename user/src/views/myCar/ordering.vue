<template>
  <div id="mycar-ordering">
    <div class="content" v-if="carList.length > 0">
      <div class="mycar-info" v-for="(car, index) in carList" :key="index">
        <div class="mycar-info-top">
          <div class="img"></div>
          <div class="info-name">
            <p @click="toDetail(car.carId)">{{ car.brandName }} {{ car.modelName ? car.modelName : car.seriesName }}</p>
            <div class="i-time">
              <i class="el-icon-date"></i>{{ car.publishTime | time('YYYY-MM-DD HH:mm:ss') }}
              <i class="el-icon-view"></i>{{ car.seeCount }}
            </div>
          </div>
        </div>
        <div class="mycar-button">
          <div class="btn" @click="under(car)">
            下架
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
    <no-data text="没有预约中的二手车哦~" v-else></no-data>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import noData from 'COMMON/noData/noData'

export default {
  name: 'mycar-ordering',
  components: {
    noData
  },
  data () {
    return {
      carList: [],
      count: 0,
      params: {
        type: 'ordering',
        page: 0,
        pageSize: 15
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
    },
    under (car) {
      this.$toast({
        message: '预约中的车辆您不能下架，已通知评估师：' + car.appraiserName + '，他将会电话联系您进行下架相关操作',
        duration: 5000
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#mycar-ordering
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
          > p
            font-size: 18px
            margin-bottom: 10px
            font-weight: bold
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
    .search-page
      width: 100%
      padding-top: 40px
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: center
</style>

