<template>
  <div id="buy-sell-step">
      <div class="content">
        <img class="img-mask" src="http://sta.guazistatic.com/c2c_web/mask.3642195d3f6eed370c899cc57e6f772e.png" alt="">
        <transition-group name="fade">
          <li 
            class="img-list"
            v-for="(step, index) in stepList"
            :key="index"
            v-show="index === position"
            :style="{backgroundImage: 'url(' + step.imgUrl + ')'}">
          </li>
        </transition-group>
        <div class="text-tip">
          <div class="step-tab">
            <span :class="{ active: stepList ===  buyStepList }" @click="changeView('buy')">买车流程</span>
            <em>|</em>
            <span :class="{ active: stepList ===  sellStepList }" @click="changeView('sell')">卖车流程</span>
          </div>
          <div class="step-big-message">
            <p class="message-title">{{ stepList.length > 0 ? stepList[position].title : '' }}</p>
            <p class="message-tip">{{ stepList.length > 0 ? stepList[position].tip : '' }}</p>
          </div>
          <div class="step-icon-list">
            <div
              class="step-icon"
              v-for="(step, index) in stepList"
              :key="index">
              <img class="icon" :src="index === position ? step.activeIcon : step.icon" alt="" @click="change(index)">
              <div class="text-arrow">
                <span class="text" @click="change(index)" :class="{ stepActive: index === position }">{{ step.title }}</span>
                <i class="arrow el-icon-d-arrow-right" v-if="index < stepList.length - 1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'buySellStepView',
  props: ['pageVisibility'],
  data () {
    return {
      position: 0,
      timer: '',
      buyStepList: [
        {
          id: 0,
          title: '预约看车',
          tip: '拨打020-12345678或在线预约预约看车',
          icon: require('IMAGES/ic_phone.png'),
          activeIcon: require('IMAGES/ic_email.png'),
          imgUrl: 'http://sta.guazistatic.com/static/c2c/web/index/buy-step-order.jpg'
        },
        {
          id: 1,
          title: '专人带看',
          tip: '小熊将安排售车顾问陪同您看车专人带看',
          icon: require('IMAGES/ic_phone.png'),
          activeIcon: require('IMAGES/ic_email.png'),
          imgUrl: 'http://sta.guazistatic.com/static/c2c/web/index/buy-step-see.jpg'
        },
        {
          id: 2,
          title: '签署合同',
          tip: '签署三方合同（买家、卖家、小熊二手车），支付定金签署合同',
          icon: require('IMAGES/ic_phone.png'),
          activeIcon: require('IMAGES/ic_email.png'),
          imgUrl: 'http://sta.guazistatic.com/static/c2c/web/index/buy-step-contract.jpg'
        },
        {
          id: 3,
          title: '交易过户',
          tip: '销售顾问陪同过户，支付车款，好车开回家',
          icon: require('IMAGES/ic_phone.png'),
          activeIcon: require('IMAGES/ic_email.png'),
          imgUrl: 'http://sta.guazistatic.com/static/c2c/web/index/buy-step-deal.jpg'
        }
      ],
      sellStepList: [
        {
          id: 0,
          title: '在线预约',
          tip: '评估师免费上门检测在线预约',
          icon: require('IMAGES/ic_phone.png'),
          activeIcon: require('IMAGES/ic_email.png'),
          imgUrl: 'http://sta.guazistatic.com/static/c2c/web/index/sell-step-info.jpg'
        },
        {
          id: 1,
          title: '全网代售',
          tip: '海量买家快速售出',
          icon: require('IMAGES/ic_phone.png'),
          activeIcon: require('IMAGES/ic_email.png'),
          imgUrl: 'http://sta.guazistatic.com/static/c2c/web/index/sell-step-service.jpg'
        },
        {
          id: 2,
          title: '三方约看',
          tip: '平均7日成交',
          icon: require('IMAGES/ic_phone.png'),
          activeIcon: require('IMAGES/ic_email.png'),
          imgUrl: 'http://sta.guazistatic.com/static/c2c/web/index/sell-step-see.jpg'
        },
        {
          id: 3,
          title: '签约过户',
          tip: '省心省时，全程陪同',
          icon: require('IMAGES/ic_phone.png'),
          activeIcon: require('IMAGES/ic_email.png'),
          imgUrl: 'http://sta.guazistatic.com/static/c2c/web/index/sell-step-deal.jpg'
        }
      ],
      stepList: {}
    }
  },
  watch: {
    pageVisibility (val) {
      if (val) {
        this.start()
      } else {
        this.stop()
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.stepList = this.buyStepList
      this.start()
    })
  },
  methods: {
    autoPlay () {
      this.autoChange(this.position + 1)
    },
    start () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 2000)
    },
    stop () {
      clearInterval(this.timer)
      this.timer = null
    },
    autoChange (pos) {
      if (pos < 0) {
        pos = this.stepList.length - 1
      }
      if (pos > this.stepList.length - 1) {
        pos = 0
      }
      this.position = pos
    },
    change (pos) {
      this.stop()
      this.autoChange(pos)
      this.start()
    },
    changeView (which) {
      this.stop()
      switch (which) {
        case 'buy':
          this.stepList = this.buyStepList
          this.position = 0
          break
        case 'sell':
          this.stepList = this.sellStepList
          this.position = 0
          break
      }
      this.start()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~STYLUS/color.styl"
#buy-sell-step
  height: 400px
  .content
    .img-mask
      width: 100%
      height: 400px
      position: absolute
      background-repeat: no-repeat
      background-position: top
      background-size: auto 100%
      z-index: 10
    .img-list
      width: 100%
      height: 400px
      position: absolute
      background-repeat: no-repeat
      background-position: top
      background-size: auto 100%
    .text-tip
      width: 1170px
      height: 400px
      margin: 0 auto
      position: relative
      z-index: 11
      padding: 30px
      padding-left: 40px
      .step-tab
        margin-top: 35px
        font-size: 16px
        color: $color-black
        > em
          padding: 0 20px
          color: #d2d2d2
          font-style: normal
        > span
          padding-bottom: 8px
          display: inline-block
          border-bottom 3px solid transparent
          &:hover
            cursor: pointer
          &.active
            border-bottom 3px solid $color-blue
      .step-big-message
        margin-top: 56px
        .message-title
          font-size: 40px
          font-style: bold
          color: #495056
        .message-tip
          margin-top: 18px
          font-size: 18px
          font-style: bold
          color: #848c95
      .step-icon-list
        display: flex
        display: -webkit-flex
        align-items: center
        margin-top: 30px
        .step-icon
          > img
            vertical-align: middle
            width: 32px
            height: 32px
          .icon
            margin: 10px
            &:hover
              cursor: pointer
          .text-arrow
            display: flex
            display: -webkit-flex
            justify-content: space-between
            flex-direction: row
            .text
              font-size: 14px
              &:hover
                cursor: pointer
              &.stepActive
                color: $color-blue
            .arrow
              margin: 0 12px
  .fade-enter-active, 
  .fade-leave-active
    transition: opacity .5s
  .fade-enter, 
  .fade-leave-to
    opacity: 0
</style>
