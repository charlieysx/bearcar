<template>
  <div id="step-two">
    <div class="info-wrap"
      v-for="(check, index) in params"
      :key="index"
      :class="{'no-show' : index === 'carId'}">
        <p class="info-title">{{ check.title }}</p>
        <el-form
          label-width="148px"
          class="info-content">
          <el-form-item
            :label="item.name"
            v-for="(item, index) in check.list"
            :key="index"
            class="item">
            <div class="info-row">
              <el-radio-group v-model="item.value">
                <el-radio-button label="正常"></el-radio-button>
                <el-radio-button label="无"></el-radio-button>
                <el-radio-button label="异常"></el-radio-button>
              </el-radio-group>
              <el-input
                style="flex: 1;margin-left: 10px"
                placeholder="请输入异常内容"
                v-model="item.unusual"
                :disabled="item.value !== '异常'">
              </el-input>
            </div>
          </el-form-item>
        </el-form>
    </div>
    <div class="info-btn">
      <el-button type="primary" :loading="submit" @click="submitForm">
        {{ submit ? '提交中...' : '提交'}}
      </el-button>
    </div>
  </div>
</template>

<script>

import {
  mapActions
} from 'vuex'
import stepOneCityPicker from 'COMMON/cityPicker/stepOneCityPicker'

export default {
  name: 'stepTwo',
  props: ['carId'],
  components: {
    stepOneCityPicker
  },
  data () {
    return {
      submit: false,
      params: {
        carId: '',
        checkAccident: {
          title: '20项排除重大事故检测',
          list: [
            {
              name: '左前减震器座',
              value: '正常',
              unusual: ''
            },
            {
              name: '右前减震器座',
              value: '正常',
              unusual: ''
            },
            {
              name: '左前纵梁',
              value: '正常',
              unusual: ''
            },
            {
              name: '右前纵梁',
              value: '正常',
              unusual: ''
            },
            {
              name: '防火墙',
              value: '正常',
              unusual: ''
            },
            {
              name: '右A柱',
              value: '正常',
              unusual: ''
            },
            {
              name: '右B柱',
              value: '正常',
              unusual: ''
            },
            {
              name: '右侧顶边梁',
              value: '正常',
              unusual: ''
            },
            {
              name: '右C柱',
              value: '正常',
              unusual: ''
            },
            {
              name: '右D柱',
              value: '正常',
              unusual: ''
            },
            {
              name: '右后翼子板内衬',
              value: '正常',
              unusual: ''
            },
            {
              name: '左后翼子板内衬',
              value: '正常',
              unusual: ''
            },
            {
              name: '后备箱底板',
              value: '正常',
              unusual: ''
            },
            {
              name: '右后纵梁',
              value: '正常',
              unusual: ''
            },
            {
              name: '左后纵梁',
              value: '正常',
              unusual: ''
            },
            {
              name: '左D柱',
              value: '正常',
              unusual: ''
            },
            {
              name: '左C柱',
              value: '正常',
              unusual: ''
            },
            {
              name: '左侧顶边梁',
              value: '正常',
              unusual: ''
            },
            {
              name: '左B柱',
              value: '正常',
              unusual: ''
            },
            {
              name: '左A柱',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkWaterFire: {
          title: '10项排除泡水火烧检测',
          list: [
            {
              name: '机舱保险盒',
              value: '正常',
              unusual: ''
            },
            {
              name: '防火墙隔音棉',
              value: '正常',
              unusual: ''
            },
            {
              name: '发动机主线束',
              value: '正常',
              unusual: ''
            },
            {
              name: '座椅滑轨及固定螺丝',
              value: '正常',
              unusual: ''
            },
            {
              name: '车内线束',
              value: '正常',
              unusual: ''
            },
            {
              name: '安全带底部',
              value: '正常',
              unusual: ''
            },
            {
              name: '全车座椅座垫',
              value: '正常',
              unusual: ''
            },
            {
              name: '全车地毯地胶',
              value: '正常',
              unusual: ''
            },
            {
              name: '烟灰缸底座',
              value: '正常',
              unusual: ''
            },
            {
              name: '转向柱',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkCrash: {
          title: '14项轻微碰撞检测',
          list: [
            {
              name: '前防撞梁',
              value: '正常',
              unusual: ''
            },
            {
              name: '水箱框架',
              value: '正常',
              unusual: ''
            },
            {
              name: '左前大灯框架',
              value: '正常',
              unusual: ''
            },
            {
              name: '右前大灯框架',
              value: '正常',
              unusual: ''
            },
            {
              name: '左前翼子板内衬',
              value: '正常',
              unusual: ''
            },
            {
              name: '右前翼子板内衬',
              value: '正常',
              unusual: ''
            },
            {
              name: '右侧底大边',
              value: '正常',
              unusual: ''
            },
            {
              name: '右侧驾驶舱底板',
              value: '正常',
              unusual: ''
            },
            {
              name: '右侧尾灯框架',
              value: '正常',
              unusual: ''
            },
            {
              name: '左侧尾灯框架',
              value: '正常',
              unusual: ''
            },
            {
              name: '后围板',
              value: '正常',
              unusual: ''
            },
            {
              name: '后防撞梁',
              value: '正常',
              unusual: ''
            },
            {
              name: '左侧底大边',
              value: '正常',
              unusual: ''
            },
            {
              name: '左侧驾驶舱底板',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkBreakablePart: {
          title: '18项易损耗部件检测',
          list: [
            {
              name: '左前减震器',
              value: '正常',
              unusual: ''
            },
            {
              name: '气门室盖垫',
              value: '正常',
              unusual: ''
            },
            {
              name: '发动机油底壳',
              value: '正常',
              unusual: ''
            },
            {
              name: '防冻液液面',
              value: '正常',
              unusual: ''
            },
            {
              name: '机油液面',
              value: '正常',
              unusual: ''
            },
            {
              name: '电瓶（极柱）',
              value: '正常',
              unusual: ''
            },
            {
              name: '制动油壶',
              value: '正常',
              unusual: ''
            },
            {
              name: '助力油壶',
              value: '正常',
              unusual: ''
            },
            {
              name: '转向助力泵',
              value: '正常',
              unusual: ''
            },
            {
              name: '水箱水管',
              value: '正常',
              unusual: ''
            },
            {
              name: '水箱',
              value: '正常',
              unusual: ''
            },
            {
              name: '冷凝器',
              value: '正常',
              unusual: ''
            },
            {
              name: '动机外围皮带',
              value: '正常',
              unusual: ''
            },
            {
              name: '发动机缸垫',
              value: '正常',
              unusual: ''
            },
            {
              name: '变速箱油底壳',
              value: '正常',
              unusual: ''
            },
            {
              name: '右前减震器',
              value: '正常',
              unusual: ''
            },
            {
              name: '右后减震器',
              value: '正常',
              unusual: ''
            },
            {
              name: '左后减震器',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkSafetySystem: {
          title: '15项安全系统检测',
          list: [
            {
              name: '驾驶座安全气囊',
              value: '正常',
              unusual: ''
            },
            {
              name: '副驾驶安全气囊',
              value: '正常',
              unusual: ''
            },
            {
              name: '前排侧气囊',
              value: '正常',
              unusual: ''
            },
            {
              name: '后排侧气囊',
              value: '正常',
              unusual: ''
            },
            {
              name: '前排头部气囊',
              value: '正常',
              unusual: ''
            },
            {
              name: '后排头部气囊',
              value: '正常',
              unusual: ''
            },
            {
              name: '胎压监测',
              value: '正常',
              unusual: ''
            },
            {
              name: '中控锁',
              value: '正常',
              unusual: ''
            },
            {
              name: '儿童座椅接口',
              value: '正常',
              unusual: ''
            },
            {
              name: '无钥匙启动',
              value: '正常',
              unusual: ''
            },
            {
              name: '无钥匙进入系统',
              value: '正常',
              unusual: ''
            },
            {
              name: '遥控钥匙',
              value: '正常',
              unusual: ''
            },
            {
              name: '防抱死系统(ABS)',
              value: '正常',
              unusual: ''
            },
            {
              name: '车身稳定控制(ESP)',
              value: '正常',
              unusual: ''
            },
            {
              name: '电子驻车制动',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkOutConfig: {
          title: '22项外部配置检测',
          list: [
            {
              name: '左前轮毂',
              value: '正常',
              unusual: ''
            },
            {
              name: '左前轮胎',
              value: '正常',
              unusual: ''
            },
            {
              name: '前挡风玻璃',
              value: '正常',
              unusual: ''
            },
            {
              name: '右前轮毂',
              value: '正常',
              unusual: ''
            },
            {
              name: '右前轮胎',
              value: '正常',
              unusual: ''
            },
            {
              name: '右后轮毂',
              value: '正常',
              unusual: ''
            },
            {
              name: '右后轮胎',
              value: '正常',
              unusual: ''
            },
            {
              name: '后挡风玻璃',
              value: '正常',
              unusual: ''
            },
            {
              name: '左后轮毂',
              value: '正常',
              unusual: ''
            },
            {
              name: '左后轮胎',
              value: '正常',
              unusual: ''
            },
            {
              name: '全景天窗',
              value: '正常',
              unusual: ''
            },
            {
              name: '感应雨刷',
              value: '正常',
              unusual: ''
            },
            {
              name: '后雨刷',
              value: '正常',
              unusual: ''
            },
            {
              name: '前电动车窗',
              value: '正常',
              unusual: ''
            },
            {
              name: '后电动车窗',
              value: '正常',
              unusual: ''
            },
            {
              name: '后视镜电动调节',
              value: '正常',
              unusual: ''
            },
            {
              name: '后视镜电动折叠',
              value: '正常',
              unusual: ''
            },
            {
              name: '后视镜加热',
              value: '正常',
              unusual: ''
            },
            {
              name: '电动吸合门',
              value: '正常',
              unusual: ''
            },
            {
              name: '后排侧遮阳帘',
              value: '正常',
              unusual: ''
            },
            {
              name: '感应后备箱',
              value: '正常',
              unusual: ''
            },
            {
              name: '电动天窗',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkInConfig: {
          title: '14项内部配置检测',
          list: [
            {
              name: '皮质座椅',
              value: '正常',
              unusual: ''
            },
            {
              name: '前排座椅加热',
              value: '正常',
              unusual: ''
            },
            {
              name: '座椅通风',
              value: '正常',
              unusual: ''
            },
            {
              name: '驾驶座座椅电动调节',
              value: '正常',
              unusual: ''
            },
            {
              name: '多功能方向盘',
              value: '正常',
              unusual: ''
            },
            {
              name: '定速巡航',
              value: '正常',
              unusual: ''
            },
            {
              name: 'GPS导航',
              value: '正常',
              unusual: ''
            },
            {
              name: '倒车雷达',
              value: '正常',
              unusual: ''
            },
            {
              name: '倒车影像系统',
              value: '正常',
              unusual: ''
            },
            {
              name: '手动空调',
              value: '正常',
              unusual: ''
            },
            {
              name: '自动空调',
              value: '正常',
              unusual: ''
            },
            {
              name: 'HUD抬头显示',
              value: '正常',
              unusual: ''
            },
            {
              name: '后排座椅加热',
              value: '正常',
              unusual: ''
            },
            {
              name: '空调',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkLightSystem: {
          title: '15项灯光系统检测',
          list: [
            {
              name: '近光灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '远光灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '前转向灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '前雾灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '后转向灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '刹车灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '倒车灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '后雾灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '室内顶灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '氙气大灯',
              value: '正常',
              unusual: ''
            },
            {
              name: 'LED大灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '自动头灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '前雾灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '大灯高度可调',
              value: '正常',
              unusual: ''
            },
            {
              name: '大灯清洗',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkHighTech: {
          title: '5项高科技配置检测',
          list: [
            {
              name: '车道偏离预警系统',
              value: '正常',
              unusual: ''
            },
            {
              name: '自动泊车',
              value: '正常',
              unusual: ''
            },
            {
              name: '盲点辅助系统',
              value: '正常',
              unusual: ''
            },
            {
              name: '全景摄像头',
              value: '正常',
              unusual: ''
            },
            {
              name: '发动机自动启停',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkTool: {
          title: '5项随车工具检测',
          list: [
            {
              name: '千斤顶',
              value: '正常',
              unusual: ''
            },
            {
              name: '灭火器',
              value: '正常',
              unusual: ''
            },
            {
              name: '三角警示标',
              value: '正常',
              unusual: ''
            },
            {
              name: '维修工具包',
              value: '正常',
              unusual: ''
            },
            {
              name: '备胎',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkInstrumentDesk: {
          title: '6项仪表台指示灯检测',
          list: [
            {
              name: '调表车',
              value: '正常',
              unusual: ''
            },
            {
              name: '制动系统指示灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '安全气囊故障灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '车身稳定系统故障灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '发动机故障灯',
              value: '正常',
              unusual: ''
            },
            {
              name: '变速箱故障灯',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkEngineStatus: {
          title: '5项发动机状态检测',
          list: [
            {
              name: '发动机总成',
              value: '正常',
              unusual: ''
            },
            {
              name: '启动',
              value: '正常',
              unusual: ''
            },
            {
              name: '怠速',
              value: '正常',
              unusual: ''
            },
            {
              name: '发动机抖动',
              value: '正常',
              unusual: ''
            },
            {
              name: '尾气',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkSpeed: {
          title: '3项变速箱及转向检测',
          list: [
            {
              name: '变速箱总成',
              value: '正常',
              unusual: ''
            },
            {
              name: '变速箱挂挡',
              value: '正常',
              unusual: ''
            },
            {
              name: '转向',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        },
        checkAppearance: {
          title: '外观内饰检测',
          list: [
            {
              name: '67项 缺陷项检测',
              value: '正常',
              unusual: ''
            },
            {
              name: '21项 漆面修复检测',
              value: '正常',
              unusual: ''
            },
            {
              name: '21项 钣金修复检测',
              value: '正常',
              unusual: ''
            },
            {
              name: '21项 外观件更换检测',
              value: '正常',
              unusual: ''
            }
          ],
          abnormal: 0
        }
      }
    }
  },
  mounted () {
    this.params.carId = this.carId
  },
  methods: {
    ...mapActions([
      'fillCarSecond'
    ]),
    submitForm () {
      let flag = true
      for (let key in this.params) {
        if (key === 'carId') {
          continue
        }
        let item = this.params[key]
        item.abnormal = 0
        for (let i = 0, len = item.list.length; i < len; ++i) {
          if (item.list[i].value === '异常' && item.list[i].unusual === '') {
            flag = false
            break
          } else if (item.list[i].value === '异常') {
            item.abnormal++
          }
        }
        if (!flag) {
          break
        }
      }
      if (!flag) {
        this.$toast({
          message: '所有异常项都需要填写异常信息，请检查'
        })
        return
      }
      this.fillCarSecond(this.params)
        .then((data) => {
          this.$emit('next', '3')
        })
        .catch((err) => {
          this.$toast({
            message: err.data.msg
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#step-two
  width: 100%
  .info-wrap
    .info-title
      text-align: center
      background: #545c64
      color: $color-white
      padding: 15px
      font-size: 18px
      font-weight: bold
    .info-content
      border: 1px solid #eeeeee
      padding: 10px
      .info-row
        display: flex
        display: -webkit-flex
        flex-direction: row
  .info-btn
    width: 100%
    text-align: center
    margin: 30px 0px
.no-show
  display: none
</style>

