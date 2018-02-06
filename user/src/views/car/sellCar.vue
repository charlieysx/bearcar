<template>
  <div id="sell-car">
      <div class="sell-car-top">
          <div class="title1">
              个人卖给个人,没有中间商赚差价
          </div>
          <div class="title2">
              买家少花钱，卖家最高多卖20%，平均7天售出
          </div>
          <div class="btn">
            <span class="btn-sell">
                免费卖车
            </span>
            <span class="btn-estimate">
                快速估价
            </span>
          </div>
      </div>
        <!-- 卖车问答 -->
        <div id="car-aq" ref="carAQ">
        <div class="aq-title">
            卖车问答
            <div class="line"></div>
        </div>
        <ul class="aq-wrap">
            <li class="aq-item"
            v-for="(aq, index) in sellCarAQ"
            :key="index">
            <div class="aq-top">
                <span class="icon" :style="aq.style"></span>
                <span class="question">
                {{ aq.question }}
                </span>
            </div>
            <ul class="answer">
                <li v-for="(answer, index) in aq.answer" :key="index">
                {{ answer }}
                </li>
            </ul>
            </li>
        </ul>
        </div>
        <!-- 卖车问答 结束 -->
  </div>
</template>

<script>
import carAQ from 'DATA/carAQ'

import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

export default {
  name: 'sell-car',
  data () {
    return {
      sellCarAQ: {}
    }
  },
  created () {
    this.$store.commit(SET_HEADER_ACTIVE_TAB, 2)
    this.sellCarAQ = carAQ.sellCarAQ
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#sell-car
  background: url('http://sta.guazistatic.com/node_web/sell-bg.290289564e5360959be1857de09bf8c4.jpg') no-repeat center top
  overflow: auto
  .sell-car-top
    width: 100%
    height: 660px
    text-align: center
    padding-top: 150px
    .title1
      color: $color-white
      font-size: 42px
      font-weight: 700
      margin-bottom: 30px
    .title2
      color: $color-white
      font-size: 20px
      font-weight: 700
    .btn
      margin-top: 30px
      font-size: 0px
      > span
        display: inline-block
        padding: 15px 45px
        border-radius: 3px
        color: $color-white
        font-weight: 700
        font-size: 20px
        cursor: pointer
      .btn-sell
        background: #24b9ffe8
        margin-right: 20px
        &:hover
          background: #24b9ff
      .btn-estimate
        background: #8bc434
        &:hover
          background: #85b931
  #car-aq
    width: 100%
    background: #f8f8f8
    padding: 20px
    padding-top: 40px
    text-align: center
    .aq-title
      font-size: 24px
      font-weight: 700
      color: #495056
      margin: 0 auto
      padding: 5px
      width: 106px
      text-align: center
      .line
        height: 3px
        width: 30px
        margin: 0 auto
        margin-top: 5px
        background: $color-blue
    .aq-wrap
      width: 1170px
      height: 100%
      margin: 0 auto
      padding: 20px
      padding-top: 30px
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: space-between
      flex-wrap: wrap
      .aq-item
        width: 540px
        text-align: left
        margin-left: 20px
        margin-top: 40px
        .aq-top
          height: 60px
          font-size: 0px
          display: flex
          display: -webkit-flex
          flex-direction: row
          align-content: center
          .icon
            display: inline-block
            width: 60px
            height: 60px
            border-radius: 30px
          .question
            display: inline-block
            font-size: 18px
            padding: 6px
            background: #ebebeb
            transform: translateY(-50%)
            margin-left: 10px
            margin-top: 30px
            border-radius: 3px
            &:after
              position: absolute
              top: 50%
              left: -5px
              content: ' '
              width: 10px
              height: 10px
              transform: translateY(-50%) rotate(45deg)
              background: #ebebeb
        .answer
          margin-left: 65px
          font-size: 14px
          line-height: 18px
          color: #2e2e2e
          > li
            margin-bottom: 12px

.icon
  background-image: url('~IMAGES/icon_detail.png')
  background-repeat: no-repeat
  display: inline-block
</style>
