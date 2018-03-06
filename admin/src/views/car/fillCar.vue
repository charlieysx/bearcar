<template>
  <div id="fill-car">
    <div class="title">二手车-完善信息</div>
    <div class="content">
      <el-steps :active="active[fillStep]" finish-status="success" align-center>
        <el-step :title="message['1']"></el-step>
        <el-step :title="message['2']"></el-step>
        <el-step :title="message['3']"></el-step>
      </el-steps>
      <div class="first-content">
        <div class="mycar-info">
          <div class="mycar-info-top">
            <div class="img"></div>
            <div class="info-name">
              <div class="info-name-top">
                <div class="name" 
                  @click="car.status === '3' ? toDetail(car.carId) : ''"
                  :class="{'active-detail' : car.status === '3'}">
                  {{ car.brandName }} {{ car.modelName ? car.modelName : car.seriesName }}
                </div>
              </div>
              <div class="i-time">
                <i class="el-icon-date"></i>{{ car.publishTime | time('YYYY-MM-DD HH:mm:ss') }}
                <i class="el-icon-view"></i>{{ car.seeCount }}
              </div>
            </div>
          </div>
          <div class="info-detail">
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
          </div>
        </div>
      </div>
      <step-layout :carId="carId"></step-layout>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import stepLayout from 'VIEWS/fillCar/layout'

export default {
  name: 'fill-car',
  components: {
    stepLayout
  },
  data () {
    return {
      carId: '',
      car: {},
      message: {
        '1': '填写配置信息',
        '2': '填写检测信息',
        '3': '上传图片'
      },
      active: {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3
      }
    }
  },
  watch: {
    fillStep (value) {
      this.scrollToTop()
      if (value === '4') {
        this.error('该车已完成信息填写')
      }
    }
  },
  created () {
    this.$store.commit('SET_LEFT_NAV_ACTIVE_ITEM', '2')
    this.carId = this.$route.params.carId
    this.getFillStep(this.carId)
    this.getFillCarInfo(this.carId)
      .then((data) => {
        this.car = data
      })
      .catch((err) => {
        this.error(err.data.msg)
      })
  },
  computed: {
    ...mapGetters([
      'fillStep'
    ])
  },
  methods: {
    ...mapActions([
      'getFillStep',
      'getFillCarInfo'
    ]),
    scrollToTop () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    error (err) {
      this.$toast({
        message: err
      })
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'

#fill-car
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
    padding: 20px
    .first-content
      width: 100%
      margin: 0 auto
      border: 1px solid #eeeeee
      padding: 0 20px
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
</style>
