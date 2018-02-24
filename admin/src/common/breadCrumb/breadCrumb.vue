<template>
  <div id="breadCrumb">
      <span 
        id="breadItem" 
        v-for="(item, index) in items"
        :key="index">
        <span @click="toItem(item, index < items.length - 1)">
            {{ item.text }}
        </span>
        <i class="el-icon-arrow-right" v-if="index < items.length - 1"></i>
      </span>
  </div>
</template>
<script>
export default {
  props: ['items'],
  methods: {
    toItem (item, canClick) {
      if (canClick) {
        this.$router.push(item.to)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#breadCrumb
  #breadItem
    font-size: 14px
    cursor: default
    color: $color-dark-grey
    > span
      &:hover
        cursor: pointer
        color: $color-blue
      &:last-child
        cursor: default
        color: #a5abb2
    > i
      color: #a5abb2
        
</style>
