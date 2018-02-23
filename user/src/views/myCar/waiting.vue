<template>
  <div id="mycar-waiting">
    <div class="mycar-info" v-for="(car, index) in carList" :key="index">
      <div class="mycar-info-top">
        <div class="img"></div>
        <div class="info-name">
          <p>{{ car.brandName }} {{ car.modelName ? car.modelName : car.seriesName }}</p>
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
      <div class="mycar-button">
        <div class="btn">
          取消上架
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'mycar-waiting',
  data () {
    return {
      page: 0,
      carList: []
    }
  },
  created () {
    this.update()
  },
  methods: {
    ...mapActions([
      'getMyCar'
    ]),
    update () {
      this.page = 0
      this.getMyCar('waiting', this.page)
        .then((data) => {
          this.carList = data
        })
        .catch(() => {
          this.carList = []
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#mycar-waiting
  width: 100%
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
        width: 220px
        font-size: 14px
        margin-right: 15px
        > span
          margin-left: 5px
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
        &:hover
          background: $color-blue
          color: white

</style>

