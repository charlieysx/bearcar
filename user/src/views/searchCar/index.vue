<template>
  <div id="search-car">
      <div class="search-wrap">
        <!-- 面包屑，搜索框 -->
        <div id="search-bread">
            <bread-crumb class="bread-crumb" :items="breadCrumbItems"></bread-crumb>
            <search-car-input @search="toSearch"></search-car-input>
        </div>
        <!-- 面包屑，搜索框 结束 -->
        <!-- 车源筛选 -->
        
        <!-- 车源筛选 结束 -->
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import breadCrumb from 'COMMON/breadCrumb/breadCrumb'
import searchCarInput from 'COMMON/searchCarInput/searchCarInput'
import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

export default {
  name: 'searchCar',
  data () {
    return {
      searchData: {},
      breadCrumbItems: [
        {
          text: '小熊二手车',
          to: {path: '/'}
        },
        {
          text: '全国二手车',
          to: {path: '/d'}
        }
      ]
    }
  },
  components: {
    breadCrumb,
    searchCarInput
  },
  computed: {
    ...mapGetters([
      'currentCity'
    ])
  },
  created () {
    this.$store.commit(SET_HEADER_ACTIVE_TAB, 1)
    this.breadCrumbItems[1].text = this.currentCity.cityName + '二手车'
  },
  watch: {
    currentCity (value) {
      this.$router.go(0)
    }
  },
  methods: {
    toSearch (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#search-car
  width: 100%
  background: $color-white
  .search-wrap
    width: 1170px
    height: 50px
    margin: 0 auto
    #search-bread
      height: 100%
      display: flex
      display: -webkit-flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .bread-crumb
        margin: 0 0
</style>