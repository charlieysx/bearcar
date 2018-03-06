<template>
  <div id="car">
    <div id="title" v-if="fixedTitle">
      <div class="title-wrap" :style="style">
        <div class="title-left">
          <span class="btn-left"
            v-for="(tab, index) in titleTab"
            :key="index"
            :class="{ active: tab.name === thisTitleTab.name }"
            @click="clickTitleTab(tab, index)">
            {{ tab.name }}
          </span>
        </div>
      </div>
    </div>
    <!-- 空白 占位用 -->
    <div id="title-space" v-if="fixedTitle"></div>
    <!-- 空白 占位用 结束 -->
    <div class="car-wrap">
        <!-- 二手车基础信息 -->
        <div id="car-base-info">
            <div class="car-base-image">
                <image-preview-list :imageData="previewImage">
                </image-preview-list>
            </div>
            <div class="car-info">
                <p>
                  {{ info.brandName }} 
                  {{ info.modelName ? info.modelName : info.seriesName }}
                </p>
                <!-- 报价 -->
                <div class="car-price">
                    <div class="car-sell-price">
                        <span>
                            车主报价&nbsp;:
                        </span>
                        <span class="sell-price">
                            ￥{{ info.price }}万
                        </span>
                        <s class="guide-price">
                            新车指导价{{ info.newCarPrice }}万(含税)
                        </s>
                        <el-popover
                            ref="guide"
                            placement="bottom"
                            width="270"
                            trigger="hover">
                            <div class="guide-tip">
                                <p class="tip">"新车指导价(含税) = 厂商公布的指导价 + 购置税费，该价格仅供参考。</p>
                            </div>
                        </el-popover>
                        <i class="el-icon-info" v-popover:guide></i>
                    </div>
                    <div class="car-sell-price">
                        <span>
                            服务升级保证
                            <span class="server-border">
                                理赔高达2.01万
                            </span>
                            <span class="server-border">
                                保全车13大系统
                            </span>
                            <span class="server-detail">
                                查看详情
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </span>
                    </div>
                    <div class="server-list-wrap">
                        <span class="server-list">
                            <i class="el-icon-circle-check"></i>
                            1年2万公里售后保障
                        </span>
                        <span class="server-list">
                            <i class="el-icon-circle-check"></i>
                            14天可退
                        </span>
                        <span class="server-list">
                            <i class="el-icon-circle-check"></i>
                            259项检测
                        </span>
                        <span class="server-list">
                            <i class="el-icon-circle-check"></i>
                            优质个人车
                        </span>
                    </div>
                    <div class="car-sell-price">
                        <span>
                            服&nbsp;务&nbsp;费&nbsp;&nbsp;:
                        </span>
                        <span class="server-price">
                            {{ info.price | serverPirce }}元 (车价×4%)
                        </span>
                    </div>
                </div>
                <!-- 报价 结束 -->
                <!-- 部分参数 -->
                <ul class="car-assort">
                    <li v-for="(item, index) in carAssort" :key="index">
                        <p class="assort-value">
                            {{ item.value }}
                        </p>
                        {{ item.title }}
                    </li>
                </ul>
                <!-- 部分参数 结束 -->
                <div class="car-source-number">
                    <span>车源号:</span>
                    <span>{{ info.carOptions }}</span>
                </div>
            </div>
        </div>
        <!-- 二手车基础信息 结束 -->
        <!-- 二手车专项检测 -->
        <div id="car-special-test">
          <!-- 专业检测 -->
          <div class="car-special-box">
            <span class="icon icon-left-top"></span>
            <span class="icon icon-right-top"></span>
            <span class="icon icon-left-bottom"></span>
            <span class="icon icon-right-bottom"></span>
            <div class="test-title">
              <span class="icon icon-certification"></span>
              <div class="test-box">
                <p>259项专业检测</p>
                小熊要求二手车源必须达到以下标准
              </div>
              <ul class="three-type">
                <li>
                  <span class="icon icon-save"></span>
                  无重大事故
                </li>
                <li>
                  <span class="icon icon-fire"></span>
                  无火烧事故
                </li>
                <li>
                  <span class="icon icon-water"></span>
                  无泡水事故
                </li>
              </ul>
            </div>
            <!-- 专业检测 结束 -->
            <!-- 评估师 -->
            <div class="car-appraiser">
              <span class="icon icon-appraiser"></span>
              <div class="assessment-result">
                高级车辆评估师
                <p>个人一手私家车， 全车原厂漆，少量刮蹭划痕，车况良好无事故，后备箱盖变形，前保险杠轻微破损，内饰保养干净整洁，车内电器设备正常，发动机变速箱工况正常</p>
              </div>
            </div>
            <!-- 评估师 结束 -->
            <!-- 评估项 -->
            <div class="car-assessment-item">
              <div class="assessment-item" v-for="(assesment, index) in assessmentList" :key="index">
                <p> {{ assesment.title }}</p>
                <ul>
                  <li v-for="(item, index) in assesment.item" :key="index">
                    <span class="assement-item-name"> {{ item.name }}</span>
                    <span class="assement-item-count"> {{ item.count }}项</span>
                    <i :class="[item.exception ? 'el-icon-warning' : 'el-icon-check']"></i>
                    <span class="assement-exception-count" v-if="item.exception"> {{ item.exception }}项异常</span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 评估项 结束 -->
            <div class="time-tip">
              ※以上为{{ info.checkTime | time('YYYY年MM月DD日') }}车况，交易以复检结果为准
            </div>
          </div>
        </div>
        <!-- 二手车专项检测 结束 -->
        <!-- 基本信息 -->
        <div id="car-basic-info" ref="baseInfo">
          <p>基本信息</p>
          <div class="car-owner">
            车主：{{ info.userName }}
          </div>
          <!-- 部分参数 -->
          <ul class="car-assort">
            <li v-for="(item, index) in carAssort2" :key="index">
              <p class="assort-value">
                {{ item.value }}
              </p>
                {{ item.title }}
            </li>
          </ul>
          <!-- 部分参数 结束 -->
          <div class="car-config">
            <config-list
              class="car-config-list"
              v-for="(list, index) in configList"
              :key="index"
              :listData="list">
            </config-list>
          </div>
          <div class="config-tip">以上基本信息为车辆初评时录入，实际情况以看车时为准</div>
        </div>
        <!-- 基本信息 结束 -->
        <!-- 车辆图片 -->
        <div id="car-image" ref="carImage">
          <p>车辆图片</p>
          <car-image v-for="(imageData, index) in carImage" :key="index" :data="imageData"></car-image>
        </div>
        <!-- 车辆图片 结束 -->
        <!-- 检测报告 -->
        <div id="car-report" ref="carReport">
          <p>检测报告</p>
          <div class="report-grid" v-for="(report, index) in carReport" :key="index">
            <config-grid :gridData="report"></config-grid>
          </div>
        </div>
        <!-- 检测报告 结束 -->
    </div>
  </div>
</template>

<script>
import searchCarInput from 'COMMON/searchCarInput/searchCarInput'
import imagePreviewList from 'COMMON/imagePreviewList/imagePreviewList'
import configList from 'COMMON/configList/configList'
import carImage from 'COMMON/carImage/carImage'
import configGrid from 'COMMON/configGrid/configGrid'

import { mapActions } from 'vuex'

export default {
  name: 'car',
  data () {
    return {
      fixedTitle: false,
      style: {
        left: '0px'
      },
      titleTab: [
        {
          name: '基本信息'
        },
        {
          name: '车辆图片'
        },
        {
          name: '检测报告'
        }
      ],
      thisTitleTab: {
        name: '基本信息'
      },
      carId: '',
      carInfo: {},
      info: {},
      carAssort: {
        licensedTime: {
          title: '上牌时间',
          value: ''
        },
        mileage: {
          title: '表显里程',
          value: ''
        },
        licensedCity: {
          title: '上牌地',
          value: ''
        },
        emissionStandards: {
          title: '排放标准',
          value: ''
        },
        displacement: {
          title: '排量',
          value: ''
        }
      },
      assessmentList: [
        {
          title: '事故排查检测',
          item: {
            checkAccident: {
              name: '排除重大事故',
              count: 20,
              exception: 0
            },
            checkWaterFire: {
              name: '排除泡水火烧',
              count: 9,
              exception: 0
            }
          }
        },
        {
          title: '轻微碰撞',
          item: {
            checkCrash: {
              name: '轻微碰撞',
              count: 14,
              exception: 0
            },
            checkBreakablePart: {
              name: '易损耗部件',
              count: 18,
              exception: 0
            }
          }
        },
        {
          title: '常用功能检测',
          item: {
            checkSafetySystem: {
              name: '安全系统',
              count: 15,
              exception: 0
            },
            checkOutConfig: {
              name: '外部配置',
              count: 22,
              exception: 0
            },
            checkInConfig: {
              name: '内部配置',
              count: 14,
              exception: 0
            },
            checkLightSystem: {
              name: '灯光系统',
              count: 15,
              exception: 0
            },
            checkHighTech: {
              name: '高科技配置',
              count: 5,
              exception: 0
            },
            checkTool: {
              name: '随车工具',
              count: 5,
              exception: 0
            }
          }
        },
        {
          title: '启动驾驶检测',
          item: {
            checkInstrumentDesk: {
              name: '仪表台指示灯',
              count: 6,
              exception: 0
            },
            checkEngineStatus: {
              name: '发动机状态',
              count: 5,
              exception: 0
            },
            checkSpeed: {
              name: '变速箱及转向',
              count: 3,
              exception: 0
            }
          }
        },
        {
          title: '外观内饰检测',
          item: {
            '0': {
              name: '缺陷项检测',
              count: 67,
              exception: 0
            },
            '1': {
              name: '漆面修复检测',
              count: 21,
              exception: 0
            },
            '2': {
              name: '钣金修复检测',
              count: 21,
              exception: 0
            },
            '3': {
              name: '外观件更换检测',
              count: 21,
              exception: 0
            }
          }
        }
      ],
      carAssort2: {
        licensedTime: {
          title: '上牌时间',
          value: ''
        },
        mileage: {
          title: '表显里程',
          value: ''
        },
        licensedCity: {
          title: '上牌地',
          value: ''
        },
        emissionStandards: {
          title: '排放标准',
          value: ''
        },
        displacement: {
          title: '排量',
          value: ''
        },
        transferTime: {
          title: '过户次数',
          value: ''
        },
        speed: {
          title: '变速箱',
          value: ''
        },
        address: {
          title: '看车地址',
          value: ''
        },
        checkYear: {
          title: '年检到期',
          value: ''
        },
        strongRisk: {
          title: '交强险',
          value: ''
        },
        businessRisk: {
          title: '商业险到期',
          value: ''
        }
      },
      configList: {
        configBase: {
          name: '基本参数',
          list: {
            credentials: {
              name: '证件品牌型号',
              value: ''
            },
            vendor: {
              name: '厂商',
              value: ''
            },
            level: {
              name: '级别',
              value: ''
            },
            engine: {
              name: '发动机',
              value: ''
            },
            speed: {
              name: '变速箱',
              value: ''
            },
            structure: {
              name: '车身结构',
              value: ''
            },
            length: {
              name: '长*宽*高(mm)',
              value: ''
            },
            wheelbase: {
              name: '轴距(mm)',
              value: ''
            },
            trunk: {
              name: '行李箱容积(L)',
              value: ''
            },
            quality: {
              name: '整备质量(kg)',
              value: ''
            }
          }
        },
        configEngine: {
          name: '发动机参数',
          list: {
            displacement: {
              name: '排量(L)',
              value: ''
            },
            airIntake: {
              name: '进气形式',
              value: ''
            },
            cylinder: {
              name: '气缸',
              value: ''
            },
            maxHorsePower: {
              name: '最大马力(Ps)',
              value: ''
            },
            maxTorque: {
              name: '最大扭矩(N*m)',
              value: ''
            },
            fuelType: {
              name: '燃料类型',
              value: ''
            },
            fuelLabel: {
              name: '燃油标号',
              value: ''
            },
            oilSupplyWay: {
              name: '供油方式',
              value: ''
            },
            emissionStandards: {
              name: '排放标准',
              value: ''
            },
            space: {
              name: '',
              value: ''
            }
          }
        },
        configChassisBrake: {
          name: '底盘及制动',
          list: {
            driveMode: {
              name: '驱动方式',
              value: ''
            },
            powerType: {
              name: '助力类型',
              value: ''
            },
            suspensionFront: {
              name: '前悬挂类型',
              value: ''
            },
            suspensionBehind: {
              name: '后悬挂类型',
              value: ''
            },
            brakeFront: {
              name: '前制动类型',
              value: ''
            },
            brakeBehind: {
              name: '后制动类型',
              value: ''
            },
            parkingBrake: {
              name: '驻车制动类型',
              value: ''
            },
            tireSizeFront: {
              name: '前轮胎规格',
              value: ''
            },
            tireSizeBehind: {
              name: '后轮胎规格',
              value: ''
            },
            space: {
              name: '',
              value: ''
            }
          }
        },
        configSafety: {
          name: '安全配置',
          list: {
            safetyAirbag: {
              name: '主副驾驶安全气囊',
              value: ''
            },
            sideAirbag: {
              name: '前后排侧气囊',
              value: ''
            },
            headAirbag: {
              name: '前后排头部气囊',
              value: ''
            },
            tirePressureMonitoring: {
              name: '胎压检测',
              value: ''
            },
            inControlLock: {
              name: '车内中控锁',
              value: ''
            },
            childSeatInterface: {
              name: '儿童座椅接口',
              value: ''
            },
            keylessStart: {
              name: '无钥匙启动',
              value: ''
            },
            abs: {
              name: '防抱死系统(ABS)',
              value: ''
            },
            esp: {
              name: '车身稳定控制(ESP)',
              value: ''
            }
          }
        },
        configOut: {
          name: '外部配置',
          list: {
            skylightElectric: {
              name: '电动天窗',
              value: ''
            },
            skylightFullView: {
              name: '全景天窗',
              value: ''
            },
            electricSuctionDoor: {
              name: '电动吸合门',
              value: ''
            },
            inductionTrunk: {
              name: '感应后备箱',
              value: ''
            },
            windshieldWiperSensing: {
              name: '感应雨刷',
              value: ''
            },
            windshieldWiperBehind: {
              name: '后雨刷',
              value: ''
            },
            electricWindow: {
              name: '前后电动车窗',
              value: ''
            },
            rearViewMirrorElectric: {
              name: '后视镜电动调节',
              value: ''
            },
            rearViewMirrorHot: {
              name: '后视镜加热',
              value: ''
            }
          }
        },
        configIn: {
          name: '内部配置',
          list: {
            multiSteeringWheel: {
              name: '多功能方向盘',
              value: ''
            },
            cruiseControl: {
              name: '定速巡航',
              value: ''
            },
            airConditioner: {
              name: '空调',
              value: ''
            },
            airConditionerAuto: {
              name: '自动空调',
              value: ''
            },
            gps: {
              name: 'GPS导航',
              value: ''
            },
            reversingRadar: {
              name: '倒车雷达',
              value: ''
            },
            reversingImageSystem: {
              name: '倒车影像系统',
              value: ''
            },
            leatherSeat: {
              name: '真皮座椅',
              value: ''
            },
            seatHot: {
              name: '前后排座椅加热',
              value: ''
            }
          }
        }
      },
      carImage: [
        {
          title: '车辆外观',
          imgList: []
        },
        {
          title: '中控内饰',
          imgList: []
        },
        {
          title: '发动机、底盘',
          imgList: []
        }
      ],
      carReport: {
        checkAccident: {
          name: '20项排除重大事故检测',
          list: []
        },
        checkWaterFire: {
          name: '10项排除泡水火烧检测',
          list: []
        },
        checkCrash: {
          name: '14项轻微碰撞检测',
          list: []
        },
        checkBreakablePart: {
          name: '18项易损耗部件检测',
          list: []
        },
        checkSafetySystem: {
          name: '15项安全系统检测',
          list: []
        },
        checkOutConfig: {
          name: '22项外部配置检测',
          list: []
        },
        checkInConfig: {
          name: '14项内部配置检测',
          list: []
        },
        checkLightSystem: {
          name: '15项灯光系统检测',
          list: []
        },
        checkHighTech: {
          name: '5项高科技配置检测',
          list: []
        },
        checkTool: {
          name: '5项随车工具检测',
          list: []
        },
        checkInstrumentDesk: {
          name: '6项仪表台指示灯检测',
          list: []
        },
        checkEngineStatus: {
          name: '5项发动机状态检测',
          list: []
        },
        checkSpeed: {
          name: '3项变速箱及转向检测',
          list: []
        },
        checkAppearance: {
          name: '外观内饰检测',
          list: []
        }
      },
      previewImage: []
    }
  },
  components: {
    searchCarInput,
    imagePreviewList,
    configList,
    carImage,
    configGrid
  },
  created () {
    this.$store.commit('SET_LEFT_NAV_ACTIVE_ITEM', '2')
    this.carId = this.$route.params.carId
    this.getCarInfo(this.carId)
      .then((data) => {
        this.carInfo = data
        this.info = this.carInfo.carBaseInfo
        this.show()
      })
      .catch((err) => {
        this.$toast({
          message: err.data.msg
        })
        this.$router.push({
          path: '/'
        })
      })
  },
  mounted () {
    window.addEventListener('scroll', this.handelFixedTitle)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handelFixedTitle)
  },
  methods: {
    ...mapActions([
      'getCarInfo'
    ]),
    handelFixedTitle () {
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      this.style.left = `-${scrollLeft}px`
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop < this.$refs.baseInfo.offsetTop - 70) {
        this.thisTitleTab = {}
      } else if (scrollTop < this.$refs.carImage.offsetTop - 70) {
        this.thisTitleTab = this.titleTab[0]
      } else if (scrollTop < this.$refs.carReport.offsetTop - 70) {
        this.thisTitleTab = this.titleTab[1]
      } else {
        this.thisTitleTab = this.titleTab[2]
      }
      if (scrollTop > 482) {
        this.fixedTitle = true
        this.$store.commit('SET_SHOW_HEADER', false)
      } else {
        this.fixedTitle = false
        this.$store.commit('SET_SHOW_HEADER', true)
      }
    },
    clickTitleTab (tab, index) {
      this.thisTitleTab = tab
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      switch (index) {
        case 0:
          scrollTop = this.$refs.baseInfo.offsetTop - 70
          break
        case 1:
          scrollTop = this.$refs.carImage.offsetTop - 70
          break
        case 2:
          scrollTop = this.$refs.carReport.offsetTop - 70
          break
      }
      document.body.scrollTop = document.documentElement.scrollTop = scrollTop
    },
    show () {
      this.dealImage()
      this.dealCheck()
      this.dealBaseInfo()
      this.dealConfigInfo()
      this.dealCarReport()
    },
    dealImage () {
      // 图片
      this.carImage[0].imgList = this.carInfo.carImage.imgOut
      this.carImage[1].imgList = this.carInfo.carImage.imgIn
      this.carImage[2].imgList = this.carInfo.carImage.imgEngineChassis
      for (let i = 0, len = this.carImage.length; i < len; ++i) {
        this.previewImage = this.previewImage.concat(this.carImage[i].imgList)
      }
    },
    dealCheck () {
      // 专项检测
      for (let i = 0, len = this.assessmentList.length; i < len; ++i) {
        let assessment = this.assessmentList[i].item
        for (let key in assessment) {
          if (key === '0' || key === '1' || key === '2' || key === '3') {
            let unusual = this.carInfo.checkAppearance.value[key].unusual
            let count = unusual.split('-').length
            assessment[key].exception = unusual === '' ? 0 : count
          } else {
            assessment[key].exception = parseInt(this.carInfo[key].abnormal)
          }
        }
      }
    },
    dealBaseInfo () {
      // 基本信息
      this.carAssort.licensedTime.value = this.info.licensedYear + this.info.licenedMonth
      this.carAssort.licensedTime.value = this.carAssort.licensedTime.value.replace('年', '-').replace('月', '')
      this.carAssort.mileage.value = this.info.mileage + '万公里'
      this.carAssort.licensedCity.value = this.info.licensedCityName
      this.carAssort.emissionStandards.value = this.carInfo.configEngine.emissionStandards
      this.carAssort.displacement.value = this.carInfo.configEngine.displacement + 'L'
      this.carAssort2.licensedTime.value = this.carAssort.licensedTime.value
      this.carAssort2.mileage.value = this.info.mileage + '万公里'
      this.carAssort2.licensedCity.value = this.info.licensedCityName
      this.carAssort2.emissionStandards.value = this.carInfo.configEngine.emissionStandards
      this.carAssort2.displacement.value = this.carInfo.configEngine.displacement + 'L'
      this.carAssort2.transferTime.value = this.info.transferTime === '-1' ? '不清楚' : (this.info.transferTime === '5' ? '4次以上' : this.info.transferTime)
      this.carAssort2.speed.value = this.carInfo.configBase.speed.indexOf('自') ? '自动' : (this.carInfo.configBase.speed.indexOf('手') ? '手动' : '自动')
      this.carAssort2.address.value = this.info.lookDistrictName
      this.carAssort2.checkYear.value = this.info.yearCheck
      this.carAssort2.strongRisk.value = this.info.strongRisk
      this.carAssort2.businessRisk.value = this.info.businessRisk
    },
    dealConfigInfo () {
      // 基本参数
      let configBase = this.configList.configBase.list
      let netConfigBase = this.carInfo.configBase
      configBase.credentials.value = netConfigBase.credentials
      configBase.vendor.value = netConfigBase.vendor
      configBase.level.value = netConfigBase.level
      configBase.engine.value = netConfigBase.engine
      configBase.speed.value = netConfigBase.speed
      configBase.structure.value = netConfigBase.structure
      configBase.length.value = netConfigBase.length + '/' + netConfigBase.width + '/' + netConfigBase.height
      configBase.wheelbase.value = netConfigBase.wheelbase
      configBase.trunk.value = netConfigBase.trunk
      configBase.quality.value = netConfigBase.quality

      // 发动机参数
      let configEngine = this.configList.configEngine.list
      let netConfigEngine = this.carInfo.configEngine
      configEngine.displacement.value = netConfigEngine.displacement
      configEngine.airIntake.value = netConfigEngine.airIntake
      configEngine.cylinder.value = netConfigEngine.cylinder
      configEngine.maxHorsePower.value = netConfigEngine.maxHorsePower
      configEngine.maxTorque.value = netConfigEngine.maxTorque
      configEngine.fuelType.value = netConfigEngine.fuelType
      configEngine.fuelLabel.value = netConfigEngine.fuelLabel
      configEngine.oilSupplyWay.value = netConfigEngine.oilSupplyWay
      configEngine.emissionStandards.value = netConfigEngine.emissionStandards

      // 底盘与制动参数
      let configChassisBrake = this.configList.configChassisBrake.list
      let netConfigChassisBrake = this.carInfo.configChassisBrake
      configChassisBrake.driveMode.value = netConfigChassisBrake.driveMode
      configChassisBrake.powerType.value = netConfigChassisBrake.powerType
      configChassisBrake.suspensionFront.value = netConfigChassisBrake.suspensionFront
      configChassisBrake.suspensionBehind.value = netConfigChassisBrake.suspensionBehind
      configChassisBrake.brakeFront.value = netConfigChassisBrake.brakeFront
      configChassisBrake.brakeBehind.value = netConfigChassisBrake.brakeBehind
      configChassisBrake.parkingBrake.value = netConfigChassisBrake.parkingBrake
      configChassisBrake.tireSizeFront.value = netConfigChassisBrake.tireSizeFront
      configChassisBrake.tireSizeBehind.value = netConfigChassisBrake.tireSizeBehind

      // 安全配置
      let configSafety = this.configList.configSafety.list
      let netConfigSafety = this.carInfo.configSafety
      configSafety.safetyAirbag.value = netConfigSafety.safetyAirbagMain + '/' + netConfigSafety.safetyAirbagVic
      configSafety.sideAirbag.value = netConfigSafety.sideAirbagFront + '/' + netConfigSafety.sideAirbagBehind
      configSafety.headAirbag.value = netConfigSafety.headAirbagFront + '/' + netConfigSafety.headAirbagBehind
      configSafety.tirePressureMonitoring.value = netConfigSafety.tirePressureMonitoring
      configSafety.inControlLock.value = netConfigSafety.inControlLock
      configSafety.childSeatInterface.value = netConfigSafety.childSeatInterface
      configSafety.keylessStart.value = netConfigSafety.keylessStart
      configSafety.abs.value = netConfigSafety.abs
      configSafety.esp.value = netConfigSafety.esp

      // 外部配置
      let configOut = this.configList.configOut.list
      let netConfigOut = this.carInfo.configOut
      configOut.skylightElectric.value = netConfigOut.skylightElectric
      configOut.skylightFullView.value = netConfigOut.skylightFullView
      configOut.electricSuctionDoor.value = netConfigOut.electricSuctionDoor
      configOut.inductionTrunk.value = netConfigOut.inductionTrunk
      configOut.windshieldWiperSensing.value = netConfigOut.windshieldWiperSensing
      configOut.windshieldWiperBehind.value = netConfigOut.windshieldWiperBehind
      configOut.electricWindow.value = netConfigOut.electricWindowFront + '/' + netConfigOut.electricWindowBehind
      configOut.rearViewMirrorElectric.value = netConfigOut.rearViewMirrorElectric
      configOut.rearViewMirrorHot.value = netConfigOut.rearViewMirrorHot

      // 内部配置
      let configIn = this.configList.configIn.list
      let netConfigIn = this.carInfo.configIn
      configIn.multiSteeringWheel.value = netConfigIn.multiSteeringWheel
      configIn.cruiseControl.value = netConfigIn.cruiseControl
      configIn.airConditioner.value = netConfigIn.airConditioner
      configIn.airConditionerAuto.value = netConfigIn.airConditionerAuto
      configIn.gps.value = netConfigIn.gps
      configIn.reversingRadar.value = netConfigIn.reversingRadar
      configIn.reversingImageSystem.value = netConfigIn.reversingImageSystem
      configIn.leatherSeat.value = netConfigIn.leatherSeat
      configIn.seatHot.value = netConfigIn.seatHotFront + '/' + netConfigIn.seatHotBehind
    },
    dealCarReport () {
      for (let key in this.carReport) {
        this.carReport[key].list = this.carInfo[key].value
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#car
  background: $color-white
  #title
    width: 100%
    height: 70px
    position: fixed
    background: #545c64
    z-index: 600
    text-align: center
    .title-wrap
      position: relative
      height 70px
      margin: 0 auto
      .title-left
        font-size: 0px
        float: left
        > span
          display: inline-block
          font-size: 20px
          color: $color-white
          height: 70px
          text-align: center
          line-height: 20px
          padding: 25px 20px
          font-weight: 700
          cursor: pointer
          &:hover
            color: $color-blue
          &.active
            background: $color-blue
  #title-space
    width: 100%
    height: 70px
  .car-wrap
    width: 1170px
    margin: 0 auto
    padding-top: 40px
    #car-base-info
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: space-between
      z-index: 1
      .car-info
        width: 585px
        padding: 10px 10px
        padding-right: 0px
        > p
          padding: 10px 15px
          font-size: 24px
          color: $color-black
          margin-bottom: 10px
        .car-assort
          display: flex
          display: -webkit-flex
          flex-direction: row
          padding: 15px
          margin-left: 10px
          > li
            width: 142px
            text-align: center
            font-size: 12px
            position: relative
            color: #a5abb2
            line-height: 24px
            > p
              color: #495056
              font-size: 18px
            &:first-child
              &:before
                width: 0px
            &:before
              content: ""
              width: 1px
              height: 34px
              position: absolute
              left: 0px
              top: 6px
              background: #e6e6e6
        .car-price
          margin: 10px 15px
          padding: 12px
          background: #f6f6f6
          margin-right: 0px
          .car-sell-price
            padding: 12px 0px
            &:first-child
              padding-top: 0px
              border-bottom 1px solid $color-white
            > span
              font-size: 14px
              margin-right: 10px
              color: $color-black
            .sell-price
              font-size: 24px
              color: #ff0000
            .guide-price
              font-size: 13px
              color: #999999
            > i
              font-size: 13px
              color: #999999
              cursor: pointer
              &:hover
                color: $color-blue
            .server-price
              color: #666666
              font-size: 14px
            .server-border
              font-size: 12px
              color: $color-blue
              margin-left: 10px
              padding: 1px
              border: 1px solid $color-blue
            .server-detail
              float: right
              cursor: pointer
              &:hover
                color: $color-blue
          .server-list-wrap
            padding: 12px 0px
            padding-right: 20px
            display: flex
            display: -webkit-flex
            flex-direction: row
            justify-content: space-between
            .server-list
              font-size: 14px
              color: #666666
              > i
                font-size: 16px
                color: $color-blue
        .car-source-number
          text-align: right
          margin: 0px 15px
          padding: 12px
          font-size: 14px
    #car-special-test
      width: 100%
      height: 580px
      border: 1px solid #dee2e6
      padding: 14px
      margin: 16px 0px
      z-index: 1
      .car-special-box
        position: relative
        width: 100%
        height: 100%
        border: 5px solid #dee2e6
        background-image: url('~IMAGES/bg_line.png')
        background-repeat: resize none
        background-position: 0 0
        .time-tip
          width: 100%
          position: absolute
          bottom: 20px
          color: #a5abb2
          font-size: 14px
          text-align: center
        .icon-left-top
          background-position: -131px -437px
          width: 55px
          height: 55px
          left: 6px
          top: 6px
          position: absolute
        .icon-right-top
          background-position: -198px -437px
          width: 55px
          height: 55px
          right: 6px
          top: 6px
          position: absolute
        .icon-left-bottom
          background-position: -267px -437px
          width: 55px
          height: 55px
          left: 6px
          bottom: 6px
          position: absolute
        .icon-right-bottom
          background-position: -330px -437px
          width: 55px
          height: 55px
          right: 6px
          bottom: 6px
          position: absolute
        .test-title
          display: flex
          display: -webkit-flex
          flex-direction: row
          align-items: center
          margin: 0 0 0 49px
          padding: 51px 0 30px 46px
          border-bottom: 1px dashed #dee2e6
          .icon-certification
            background-position: 0 -351px
            width: 84px
            height: 88px
          .test-box
            width: 342px
            font-size: 16px
            margin-left: 18px
            color: #7a838d
            line-height: 32px
            > p
              color: #495056
              font-size: 30px
          .three-type
            > li
              width: 188px
              font-size: 16px
              color: #666666
              line-height: 48px
              float: left
              .icon-save,
              .icon-fire,
              .icon-water
                width: 48px
                height: 48px
                vertical-align: middle
                margin-right: 8px
        .car-appraiser
          display: flex
          display: -webkit-flex
          flex-direction: row
          margin: 0 10px 0 49px
          padding: 20px 0
          .icon-appraiser
            width: 76px
            height: 76px
            border-radius: 38px
            margin: 0 24px 0 12px
          .assessment-result
            font-size: 16px
            color: #495056
            font-weight: 700
            padding-top: 8px
            > p
              padding: 8px 0
              font-size: 14px
              line-height: 20px
              font-weight: 500
        .car-assessment-item
          margin: 12px 0 0 46px
          .assessment-item
            font-size: 14px
            float: left
            width: 216px
            > p
              color: #495056
              font-weight: 700
              padding-bottom: 15px
            li
              padding-bottom: 10px
              font-size: 0px
              .assement-item-name
                display: inline-block
                width: 98px
                font-size: 14px
              .assement-item-count
                display: inline-block
                width: 34px
                margin-right: 4px
                text-align: right
                font-size: 14px
              .el-icon-warning,
              .assement-exception-count
                font-size: 14px
                color: #fece36
              .el-icon-check
                font-size: 14px
                color: $color-blue
    #car-basic-info
      width: 100%
      > p
        width: 100%
        height: 47px
        line-height: 47px
        font-size: 22px
        color: #495056
        font-weight: 700
        border-bottom: 1px solid #dee2e6
      .car-owner
        width: 100%
        padding: 30px 15px
        color: #495056
        font-size: 18px
        font-weight: 700
        > span
          margin-left: 10px
          padding: 5px
          border-radius: 2px
          font-size: 14px
          background: $color-blue
          color: $color-white
          cursor: pointer
      .car-assort
        display: flex
        display: -webkit-flex
        flex-direction: row
        padding-bottom: 15px
        > li
          padding: 0px 20px
          text-align: center
          font-size: 14px
          position: relative
          color: #a5abb2
          line-height: 24px
          > p
            color: #495056
            font-size: 16px
            font-weight: 700
          &:first-child
            &:before
              width: 0px
          &:before
            content: ""
            width: 1px
            height: 34px
            position: absolute
            left: 0px
            top: 6px
            background: #e6e6e6
      .car-config
        display: flex
        display: -webkit-flex
        flex-direction: row
        justify-content: space-between
        flex-wrap: wrap
        .car-config-list
          float: left
          width: 380px
          margin-top: 15px
          height: auto
      .config-tip
        width: 100%
        font-size: 12px
        text-align: center
        color: #49505699
        padding: 20px
        margin-top: 20px
    #car-image
      width: 100%
      > p
        width: 100%
        height: 47px
        line-height: 47px
        font-size: 22px
        color: #495056
        font-weight: 700
        border-bottom: 1px solid #dee2e6
    #car-report
      width: 100%
      > p
        width: 100%
        height: 47px
        line-height: 47px
        font-size: 22px
        color: #495056
        font-weight: 700
        margin-top: 10px
        border-bottom: 1px solid #dee2e6
      .report-grid
        margin: 20px 0px

            
.icon
  background-image: url('~IMAGES/icon_detail.png')
  background-repeat: no-repeat
  display: inline-block
.icon-save
  background-position: -89px -350px
.icon-fire
  background-position: -143px -350px
.icon-water
  background-position: -200px -350px
.icon-appraiser
  background-position: -571px -183px

.guide-tip
  padding: 6px
  text-align: center
  font-size: 13px
  line-height: 18px
  > div
    height: 1px
    width: 100%
    background: #e8e8e8
    margin: 10px 0px
  .tip
    color: #a5abb2
</style>
