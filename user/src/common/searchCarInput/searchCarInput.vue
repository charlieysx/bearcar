<template>
  <div id="search-car-input">
    <div class="header-search-wrap" :class="{'borderLight': inputBorder}">
        <input 
            v-model="searchValue"
            @keyup.enter="toSearch('keyup')"
            @focus="inputBorder = true"
            @blur="inputBorder = false"
            type="text"
            placeholder="搜索您想要的车..."
            class="header-search-input"
            @keyup.down="showSearchList('down')"
            @keyup.up="showSearchList('up')">
        <i @click="toSearch('click')" class="el-icon-search"></i>
    </div>
    <div class="search-list" :style="{'display': inputBorder ? 'block' : 'none'}">
        <div 
            v-for="(car, index) in searchCarList"
            :key="index"
            class="search-car-item"
            :class="{ itemActive : searchCarListPos === index }"
            @click="toSearch()">
            {{ car.text }}
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'searchCarInput',
  data () {
    return {
      inputBorder: false,
      searchValue: '',
      searchCarListPos: -1,
      searchCarList: [
        {
          id: 0,
          text: '大众'
        },
        {
          id: 1,
          text: '福特'
        },
        {
          id: 2,
          text: '别克'
        },
        {
          id: 3,
          text: '现代'
        },
        {
          id: 4,
          text: '雪佛兰'
        },
        {
          id: 5,
          text: '丰田'
        }
      ]
    }
  },
  watch: {
    inputBorder (value) {
      if (!value) {
        this.searchCarListPos = -1
      }
    },
    searchValue (value) {
      console.log(value)
    }
  },
  methods: {
    toSearch (type) {
      if (type === 'keyup' && !this.inputBorder) {
        return false
      }
      if (this.searchValue.length === 0) {
        return false
      }
      this.$emit('search', this.searchValue)
    },
    borderLight () {
      return this.inputBorder ? '' : 'borderLight'
    },
    showSearchList (dir) {
      switch (dir) {
        case 'up':
          this.searchCarListPos--
          if (this.searchCarListPos < 0) {
            this.searchCarListPos = this.searchCarList.length - 1
          }
          break
        case 'down':
          this.searchCarListPos++
          if (this.searchCarListPos >= this.searchCarList.length) {
            this.searchCarListPos = 0
          }
          break
      }
      this.searchValue = this.searchCarList[this.searchCarListPos].text
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#search-car-input
   .borderLight
        border: 1px solid $color-blue !important
        background: $color-white !important
    .header-search
        display: inline-block
        margin-right: 30px
    .header-search-wrap
        background: #f5f5f7
        width: 280px
        height: 36px
        padding: 5px 10px
        text-align: center
        border: 1px solid $color-bg-grey
        .el-icon-search
            color: $color-mid-grey
            cursor: pointer
            font-size: 16px
    .header-search-input
        width: 235px
        height: 24px
        border: none
        background: inherit
        font-size: 14px
        &::placeholder
            color: $text-tip
    .search-list
        position: absolute
        width: 280px
        background: $color-white
        box-shadow: 1px 1px 10px 1px #d4efff
        border: 1px solid $color-blue !important
        background: $color-white !important
        z-index: 10
        font-size: 16px
        cursor: default
        display: none
        display: flex
        display: -webkit-flex
        flex-direction: row
        align-items: center
        .search-car-item
            width: 100%
            single-text-ellipsis()
            padding: 10px
            &.itemActive
            &:hover
                cursor: pointer
                background: #f5f5f7
                color: $color-blue


</style>