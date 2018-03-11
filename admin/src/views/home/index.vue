<template>
  <div id='home'>
    <div class='title'>首页</div>
    <div class='home-wrap'>
      <div class='info-wrap' ref="top">
          <p class='info-title'>数据统计</p>
          <div class='info-content'>
            <div class='info-item'>
              <p class='item-title'>累计申请的车数量</p>
              <p class='num'>{{ statistics.allCount }}</p>
            </div>
            <div class='info-item'>
              <p class='item-title'>累计上架的车数量</p>
              <p class='num'>{{ statistics.sellCount }}</p>
            </div>
            <div class='info-item'>
              <p class='item-title'>累计交易完成数量</p>
              <p class='num'>{{ statistics.successCount }}</p>
            </div>
            <div class='info-item'>
              <p class='item-title'>累计用户数量</p>
              <p class='num'>{{ statistics.userCount }}</p>
            </div>
          </div>
      </div>
      <div id='mapChart' style="margin: 20px auto" :style="{width: '1130px', height: '600px'}"></div>
      <div id='applyCarChart' style="margin: 20px auto" :style="{width: '1130px', height: '600px'}"></div>
      <div id='sellCarChart' style="margin: 20px auto" :style="{width: '1130px', height: '600px'}"></div>
      <div id='userChart' style="margin: 20px auto" :style="{width: '1130px', height: '600px'}"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
let echarts = require('echarts/lib/echarts')

export default {
  name: 'home',
  data () {
    return {
      statistics: {}
    }
  },
  created () {
    this.$store.commit('SET_LEFT_NAV_ACTIVE_ITEM', '1')
    this.getStatistics()
      .then((data) => {
        this.statistics = data
        this.drawMap()
        this.drawApplayCar()
        this.drawSellCar()
        this.drawUser()
      })
      .catch((err) => {
        this.$toast({
          message: err.data.msg
        })
      })
  },
  methods: {
    ...mapActions([
      'getStatistics'
    ]),
    getGeo () {
      let res = []
      for (var i = 0; i < this.statistics.cityData.length; i++) {
        let city = this.statistics.cityData[i]
        res.push([city.lng, city.lat, city.cityName, city.count])
      }
      return res
    },
    drawMap () {
      let mapChart = echarts.init(document.getElementById('mapChart'))

      let max = this.statistics.cityData.length > 0 ? this.statistics.cityData[0].count : 0
      max = (parseInt(max / 5) + 1) * 5

      let option = {
        backgroundColor: '#404a59',
        title: {
          text: '全国二手汽车分布图',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params, ticket, callback) {
            return params.data[2] + ' : ' + params.data[3]
          }
        },
        visualMap: {
          min: 0,
          max: max,
          splitNumber: 5,
          color: ['#d94e5d', '#eac736', '#50a3ba'],
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.getGeo(),
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          }
        ]
      }

      mapChart.setOption(option)
    },
    drawApplayCar () {
      let applyCarChart = echarts.init(document.getElementById('applyCarChart'))

      let data = this.statistics.apply

      let option = {
        backgroundColor: '#404a59',
        textStyle: {
          color: '#fff'
        },
        title: {
          text: '申请上架走势图(一周内)',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: data.map(function (item) {
            return item[0]
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        series: {
          name: '申请数量',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item[1]
          }),
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#ff0000'},
                  {offset: 1, color: 'rgba(0, 0, 0, 0)'}
                ]
              )
            }
          }
        }
      }

      applyCarChart.setOption(option)
    },
    drawSellCar () {
      let sellCarChart = echarts.init(document.getElementById('sellCarChart'))

      let data = this.statistics.sell

      let option = {
        backgroundColor: '#404a59',
        textStyle: {
          color: '#fff'
        },
        title: {
          text: '上架走势图(一周内)',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: data.map(function (item) {
            return item[0]
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        series: {
          name: '上架数量',
          type: 'line',
          smooth: true,
          data: data.map(function (item) {
            return item[1]
          }),
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#ff0000'},
                  {offset: 1, color: 'rgba(0, 0, 0, 0)'}
                ]
              )
            }
          }
        }
      }

      sellCarChart.setOption(option)
    },
    drawUser () {
      let userChart = echarts.init(document.getElementById('userChart'))

      let option = {
        backgroundColor: '#404a59',
        textStyle: {
          color: '#fff'
        },
        legend: {
          right: '10%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        title: {
          text: '用户走势图(一周内)',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          showContent: true
        },
        dataset: {
          source: this.statistics.user
        },
        xAxis: {type: 'category'},
        yAxis: {gridIndex: 0},
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            color: '#ff0000',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#ff0000'},
                    {offset: 1, color: 'rgba(0, 0, 0, 0)'}
                  ]
                )
              }
            }
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            color: '#00ff00',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#00ff00'},
                    {offset: 1, color: 'rgba(0, 0, 0, 0)'}
                  ]
                )
              }
            }
          }
        ]
      }

      userChart.setOption(option)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#home
  width: 100%
  min-height: calc(110vh - 110px)
  background: $color-white
  .title
    width: 100%
    text-align: center
    background: #545c64
    color: $color-white
    font-size: 18px
    height: 70px
    line-height: 18px
    padding: 26px
    font-weight: bold
  .home-wrap
    width: 100%
    min-width: 1170px
    padding: 20px
    .info-wrap
      width: 1130px
      margin: 0 auto
      .info-title
        background: #f4f5f9
        color: $545c64
        text-align: center
        padding: 15px
        font-size: 18px
        border: 1px solid #dddddd
      .info-content
        border: 1px solid #dddddd
        border-top: 0px
        display: flex
        .info-item
          text-align: center
          flex: 1
          border-right: 1px solid #dddddd
          margin: 20px 0px
          padding: 5px
          &:last-child
            border-right: 0px
          .item-title
            width: 100%
            margin-bottom: 15px
          .num
            font-size: 18px
            font-weight: bold
            margin-bottom: 15px
</style>
