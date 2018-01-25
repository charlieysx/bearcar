<template>
  <div id="header-main" v-if="showHeader">
    <div id="header-body">
      <div class="header-wrap" :style="style">
        <a class="header-logo"></a>
        <div class="header-city" @mouseover="showCityPickerF" @mouseout="hideCityPickerF">
          <div class="city-name">{{currentCity.name}}</div>
          <i class="el-icon-arrow-down"></i>
          <city-picker
            class="city-picker"
            v-show="showCityPicker"
            :currentCity="currentCity"
            :hotCities="hotCities" 
            :allCities="allCities"
            @city-click="cityClick">
          </city-picker>
        </div>
      </div>
    </div>
    <div id="header-space"></div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import clickoutside from 'UTIL/clickoutside.js'
import cityPicker from 'COMMON/cityPicker/cityPicker'

export default {
  name: 'page-header',
  directives: {
    clickoutside
  },
  components: {
    cityPicker
  },
  data () {
    return {
      msg: '啦啦',
      result: '空',
      text: '0',
      showCityPicker: false,
      style: {
        left: '0px'
      },
      currentCity: {
        id: '0',
        name: '全国'
      },
      hotCities: [
        {
          id: '0',
          name: '全国'
        },
        {
          id: '1',
          name: '北京'
        },
        {
          id: '2',
          name: '上海'
        },
        {
          id: '3',
          name: '广州'
        },
        {
          id: '4',
          name: '深圳'
        },
        {
          id: '5',
          name: '成都'
        },
        {
          id: '6',
          name: '杭州'
        }
      ],
      allCities: {
        'A': [
          {
            id: '7',
            name: '阿勒泰'
          },
          {
            id: '8',
            name: '阿坝藏族'
          },
          {
            id: '9',
            name: '阿拉善盟'
          },
          {
            id: '10',
            name: '阿里'
          },
          {
            id: '11',
            name: '鞍山'
          }
        ],
        'B': [
          {
            id: '12',
            name: '白城'
          },
          {
            id: '13',
            name: '白山'
          },
          {
            id: '14',
            name: '白银'
          },
          {
            id: '15',
            name: '百色'
          },
          {
            id: '16',
            name: '蚌埠'
          }
        ],
        'C': [
          {
            id: '17',
            name: '崇左'
          },
          {
            id: '18',
            name: '常州'
          },
          {
            id: '19',
            name: '常德'
          },
          {
            id: '20',
            name: '成都'
          },
          {
            id: '21',
            name: '承德'
          },
          {
            id: '22',
            name: '昌吉回族'
          },
          {
            id: '23',
            name: '昌都'
          },
          {
            id: '24',
            name: '朝阳'
          },
          {
            id: '25',
            name: '楚雄彝族'
          },
          {
            id: '26',
            name: '池州'
          },
          {
            id: '27',
            name: '沧州'
          },
          {
            id: '28',
            name: '滁州'
          },
          {
            id: '29',
            name: '潮州'
          },
          {
            id: '30',
            name: '赤峰'
          },
          {
            id: '31',
            name: '郴州'
          },
          {
            id: '32',
            name: '重庆'
          },
          {
            id: '33',
            name: '长春'
          },
          {
            id: '34',
            name: '长沙'
          },
          {
            id: '35',
            name: '长治'
          }
        ],
        'Z': [
          {
            id: '36',
            name: '中卫'
          },
          {
            id: '37',
            name: '中山'
          },
          {
            id: '38',
            name: '周口'
          },
          {
            id: '39',
            name: '张家口'
          },
          {
            id: '40',
            name: '张家界'
          },
          {
            id: '41',
            name: '张掖'
          },
          {
            id: '42',
            name: '昭通'
          },
          {
            id: '43',
            name: '枣庄'
          },
          {
            id: '44',
            name: '株洲'
          },
          {
            id: '45',
            name: '淄博'
          },
          {
            id: '46',
            name: '湛江'
          },
          {
            id: '47',
            name: '漳州'
          },
          {
            id: '48',
            name: '珠海'
          },
          {
            id: '49',
            name: '肇庆'
          },
          {
            id: '50',
            name: '自贡'
          },
          {
            id: '51',
            name: '舟山'
          },
          {
            id: '52',
            name: '资阳'
          },
          {
            id: '53',
            name: '遵义'
          },
          {
            id: '54',
            name: '郑州'
          },
          {
            id: '55',
            name: '镇江'
          },
          {
            id: '56',
            name: '驻马店'
          }
        ]
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.fixTopBarScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.fixTopBarScroll)
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'showHeader'
    ])
  },
  methods: {
    showCityPickerF () {
      this.showCityPicker = true
    },
    hideCityPickerF () {
      this.showCityPicker = false
    },
    cityClick (city) {
      this.currentCity = city
      this.hideCityPickerF()
    },
    open () {
      this.$message({
        message: this.isLogin,
        type: 'success'
      })
    },
    submit () {
      let loginFormParams = {
        userName: 'admin',
        password: '123456'
      }
      this.login(loginFormParams)
        .then((info) => {
          this.result = info
        })
        .catch((err) => {
          this.result = err
        })
    },
    fixTopBarScroll () {
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      this.style.left = `-${scrollLeft}px`
    },
    ...mapActions([
      'login'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import '~STYLUS/mixin.styl'
  @import '~STYLUS/color.styl'
  #header-body
    width: 100%
    position: fixed
    top: 0
    left: 0
    right: 0
    background: $color-white
    user-select: none
    z-index: 10
    box-shadow: 1px 1px 10px 1px rgba(15, 166, 255, .1)
    .header-wrap
      position: relative
      height 70px
      width: 1170px
      margin: 0 auto
      .header-logo
        display: inline-block
        margin: 23px 0
        height: 24px
        width: 112px
        background: url('~IMAGES/logo.png') no-repeat
        background-position: 50% 50%
        background-size: 112px 24px
        cursor: pointer
      .header-city
        display: inline-block
        padding: 26px 0
        vertical-align: top
        margin-left: 20px
        font-size: 16px
        cursor: pointer
        color: $color-dark-grey
        &:hover
          color: $color-blue
        .city-name
          display: inline-block
  #header-space
    width: 100%
    height: 70px
  .city-picker
    position: absolute
    top: 60px
</style>
