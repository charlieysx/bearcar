<template>
  <div id="config-list">
      <p>{{ listData.name }}</p>
      <ul>
        <li v-for="(config, key, index) in listData.list" :key="index" :class="{ active: index % 2 }">
            <span>{{ config.name }}</span>
            <span>{{ config.value }}</span>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'configList',
  props: ['listData']
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#config-list
  width: 100%
  background: $color-white
  border: 1px solid #dee2e6
  text-align: center
  > p
    width: 100%
    background: #f5f5f5
    padding: 10px
    font-size: 16px
    color: #495056
    border-bottom: 1px solid #dee2e6
  li
    width: 100%
    font-size: 0px
    border-bottom: 1px solid #dee2e6
    &:last-child
      border-bottom: 0px
    > span
      display: inline-block
      width: 65%
      height: 38px
      font-size: 12px
      padding: 12px
      color: #495056
      border-right: 1px solid #dee2e6
      &:last-child
        border-right: 0px
      &:first-child
        width: 35%
  .active
    background: #fbfbfb

</style>
