<template>
  <div id="tab-view">
    <div class="tab" v-for="tab in tabs" :key="tab.id" @click="selectTab(tab)">
        <div class="tabName">
            <span :class="{ active: tab.id === innerActiveTab.id }">{{ tab.name }}</span>
        </div>
        <div class="line" v-show="tab.id === innerActiveTab.id">
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['tabs', 'activeTab'],
    data () {
      return {
        innerActiveTab: {}
      }
    },
    mounted () {
      this.innerActiveTab = this.tabs[0]
    },
    methods: {
      selectTab (tab) {
        if (this.innerActiveTab.id !== tab.id) {
          this.innerActiveTab = tab
          this.$emit('tab-click', tab)
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import "~STYLUS/color.styl"
#tab-view
  font-size: 16px
  cursor: default
  height: 100%
  color: $color-dark-grey
  .tab
    margin: 12px 20px
    display: inline-block
    .tabName
      > span
        cursor: pointer
        &:last-child
          margin-right: 0
        &:hover,
        &.active
          color: $color-dark-blue
    .line
      background: $color-dark-blue
      margin-top: 5px
      width: 100%
      height: 2px
</style>
