<template>
  <div id="help">
    <div class="inner">
      <h3 class="help-title">帮助中心</h3>
      <div class="help-content">
        <div class="help-nav">
          <ul class="help-nav-wrap">
            <li @click="changeNav(index)" 
                v-for="(item, index) in navText" 
                :key="index" class="help-nav-item" 
                :class="{'nav-active': index === navIndex}">{{item}}</li>
          </ul>
        </div>
        <div class="help-container">
          <ol class="help-container-ol" v-if="navIndex === 0">
            <li class="help-container-li" v-for="item in faq" :key="item">
              <p>问：{{item.question}}</p>
              <p>答：{{item.answer}}</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import help from 'DATA/help'
  import {
    SET_HEADER_ACTIVE_TAB
  } from 'STORE/mutation-types'
  export default {
    name: 'help',
    data () {
      return {
        faq: [],
        guide: [],
        navText: [
          '常见问题'
          // '防骗指南'
        ],
        navIndex: 0
      }
    },
    created () {
      this.$store.commit(SET_HEADER_ACTIVE_TAB, -1)
      this.faq = help.faq
    },
    methods: {
      changeNav (index) {
        this.navIndex = index
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~STYLUS/color.styl'
  #help
    padding: 50px
    .help-title
      height: 50px
      background: $color-bg-grey
      padding: 0 30px
      line-height: 50px
    .help-content
      margin-top: 40px
      display: flex
      padding: 0 30px
    .help-nav
      flex: 0 0 74px
      margin-right: 40px
    .help-nav-wrap
      font-size: 16px
      font-weight: bold
      border-right: 1px solid $color-border
    .help-nav-item
      margin-bottom: 50px
      padding-right: 8px
      cursor: pointer
      text-align: right
      > h1
        font-size: 16px
      > p
        font-size: 12px
        color: $color-light-grey
        margin-top: 10px
    .nav-active
      position: relative
      color: $color-blue
      &:before
        content: ''
        position: absolute
        right: -2px
        top: 0
        height: 100%
        width: 2px
        z-index: 1
        border-radius: 5px
        background: $color-blue
        background: -prefix-linear-zgradient(to right, #39cfff, $color-blue)
        background: linear-gradient(to right, #39cfff, $color-blue)
    .help-container-ol
      padding-left: 20px
      font-size: 14px
    .help-container-li
      list-style-type: decimal
      margin-bottom: 30px
      > p
        &:last-child
          margin-top: 14px
          color: $color-mid-grey
          line-height: 1.4
</style>

