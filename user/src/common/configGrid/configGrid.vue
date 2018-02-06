<template>
  <div id="config-grid">
      <p>
        {{ gridData.name }}<i class="el-icon-circle-check"></i><span class="tip">正常</span>
        <span @click="showDetail" class="arrow">
          {{ show ? '收起' : '展开' }}
          <i :class="[show ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
        </span>
      </p>
      <ul id="grid" v-show="show">
        <li 
          v-for="(item, index) in gridData.list"
          :key="index"
          :class="{dark: !item.value}">
          <i :class="[item.value ? 'el-icon-check' : 'el-icon-minus', {dark: !item.value}]"></i>
          {{ item.name }}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'configGrid',
  props: ['gridData'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    showDetail () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#config-grid
  width: 100%
  background: $color-white
  > p
    width: 100%
    background: #f5f5f5
    padding: 10px
    font-size: 16px
    color: $color-black
    border: 1px solid #dee2e6
    text-align: center
    .tip
      font-size: 14px
      color: $color-blue
      margin-left: 5px
    .el-icon-circle-check
      margin-left: 10px
      color: $color-blue
    .arrow
      display: inline-block
      cursor: pointer
      float: right
      font-size:  14px
      &:hover
        color: $color-blue
  > ul
    width: 100%
    background: $color-white
    border: 1px solid #dee2e6
    border-top: 0px
    border-left: 0px
    display: flex
    display: -webkit-flex
    flex-direction: row
    flex-wrap: wrap
    border-bottom: 0px
    > li
      border: 1px solid #dee2e6
      min-width: 180px
      height: 40px
      font-size: 14px
      padding: 12px
      padding-left: 15px
      border-top: 0px
      border-right: 0px
      flex-grow: 1
      color: $color-black
      &.dark
        color: #b4b9bd
      > i
        color: $color-blue
        margin-right: 6px
        &.dark
          color: #b4b9bd

</style>
