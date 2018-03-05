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
                <image-preview-list>
                </image-preview-list>
            </div>
            <div class="car-info">
                <p>长安悦翔V3 2015款 1.4L 手动美满型 国V</p>
                <!-- 报价 -->
                <div class="car-price">
                    <div class="car-sell-price">
                        <span>
                            车主报价&nbsp;:
                        </span>
                        <span class="sell-price">
                            ￥10.20万
                        </span>
                        <s class="guide-price">
                            新车指导价37.12万(含税)
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
                            4080元 (车价×4%)
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
                    <span>HC-26469924</span>
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
              ※以上为2018年01月21日车况，交易以复检结果为准
            </div>
          </div>
        </div>
        <!-- 二手车专项检测 结束 -->
        <!-- 基本信息 -->
        <div id="car-basic-info" ref="baseInfo">
          <p>基本信息</p>
          <div class="car-owner">
            车主：郭先生
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

import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

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
      carAssort: {
        licensedTime: {
          title: '上牌时间',
          value: '2016-11'
        },
        mileage: {
          title: '表显里程',
          value: '1.4万公里'
        },
        licensedCity: {
          title: '上牌地',
          value: '南京'
        },
        emissionStandards: {
          title: '排放标准',
          value: '国五'
        },
        displacement: {
          title: '排量',
          value: '2L'
        }
      },
      assessmentList: [
        {
          title: '事故排查检测',
          item: [
            {
              name: '排除重大事故',
              count: 20,
              exception: 10
            },
            {
              name: '排除泡水火烧',
              count: 9,
              exception: 0
            }
          ]
        },
        {
          title: '轻微碰撞',
          item: [
            {
              name: '轻微碰撞',
              count: 14,
              exception: 0
            },
            {
              name: '易损耗部件',
              count: 18,
              exception: 0
            }
          ]
        },
        {
          title: '常用功能检测',
          item: [
            {
              name: '安全系统',
              count: 15,
              exception: 1
            },
            {
              name: '外部配置',
              count: 22,
              exception: 0
            },
            {
              name: '内部配置',
              count: 14,
              exception: 0
            },
            {
              name: '灯光系统',
              count: 15,
              exception: 0
            },
            {
              name: '高科技配置',
              count: 5,
              exception: 0
            },
            {
              name: '随车工具',
              count: 5,
              exception: 0
            }
          ]
        },
        {
          title: '启动驾驶检测',
          item: [
            {
              name: '仪表台指示灯',
              count: 6,
              exception: 0
            },
            {
              name: '发动机状态',
              count: 5,
              exception: 1
            },
            {
              name: '变速箱及转向',
              count: 3,
              exception: 0
            }
          ]
        },
        {
          title: '外观内饰检测',
          item: [
            {
              name: '缺陷项检测',
              count: 67,
              exception: 0
            },
            {
              name: '漆面修复检测',
              count: 21,
              exception: 0
            },
            {
              name: '钣金修复检测',
              count: 21,
              exception: 0
            },
            {
              name: '外观件更换检测',
              count: 21,
              exception: 0
            }
          ]
        }
      ],
      carAssort2: {
        licensedTime: {
          title: '上牌时间',
          value: '2016-11'
        },
        mileage: {
          title: '表显里程',
          value: '1.4万公里'
        },
        licensedCity: {
          title: '上牌地',
          value: '南京'
        },
        emissionStandards: {
          title: '排放标准',
          value: '国五'
        },
        displacement: {
          title: '排量',
          value: '2L'
        },
        guohu: {
          title: '过户次数',
          value: '0'
        },
        speed: {
          title: '变速箱',
          value: '手动'
        },
        address: {
          title: '看车地址',
          value: '广州'
        },
        checkYear: {
          title: '年检到期',
          value: '2018-03'
        },
        qx: {
          title: '交强险',
          value: '2018-03'
        },
        syx: {
          title: '商业险到期',
          value: '2018-03'
        }
      },
      configList: [
        {
          name: '基本参数',
          list: [
            {
              name: '证件品牌型号',
              value: 'SGM7169MTA'
            },
            {
              name: '厂商',
              value: '上汽通用雪佛兰'
            },
            {
              name: '级别',
              value: '紧凑型车'
            },
            {
              name: '发动机',
              value: '1.6L 117马力 L4'
            },
            {
              name: '变速箱',
              value: '5档手动变速箱(MT)'
            },
            {
              name: '车身结构',
              value: '4门5座三厢车'
            },
            {
              name: '长*宽*高(mm)',
              value: '4598/1797/1477'
            },
            {
              name: '轴距(mm)',
              value: '2685'
            },
            {
              name: '行李箱容积(L)',
              value: '400'
            },
            {
              name: '整备质量(kg)',
              value: '1360'
            }
          ]
        },
        {
          name: '发动机参数',
          list: [
            {
              name: '排量(L)',
              value: '1.6'
            },
            {
              name: '进气形式',
              value: '自然吸气'
            },
            {
              name: '气缸',
              value: 'L4'
            },
            {
              name: '最大马力(Ps)',
              value: '117'
            },
            {
              name: '最大扭矩(N*m)',
              value: '150'
            },
            {
              name: '燃料类型',
              value: '汽油'
            },
            {
              name: '燃油标号',
              value: '92号'
            },
            {
              name: '供油方式',
              value: '多点电喷'
            },
            {
              name: '排放标准',
              value: '国四'
            },
            {
              name: '',
              value: ''
            }
          ]
        },
        {
          name: '底盘及制动',
          list: [
            {
              name: '驱动方式',
              value: '前置前驱'
            },
            {
              name: '助力类型',
              value: '机械液压助力'
            },
            {
              name: '前悬挂类型',
              value: '麦弗逊式独立悬架'
            },
            {
              name: '后悬挂类型',
              value: '扭力梁式非独立悬架'
            },
            {
              name: '前制动类型',
              value: '通风盘式'
            },
            {
              name: '后制动类型',
              value: '盘式'
            },
            {
              name: '驻车制动类型',
              value: '-'
            },
            {
              name: '前轮胎规格',
              value: '205/60 R16'
            },
            {
              name: '后轮胎规格',
              value: '205/60 R16'
            },
            {
              name: '',
              value: ''
            }
          ]
        },
        {
          name: '安全配置',
          list: [
            {
              name: '主副驾驶安全气囊',
              value: '标配/标配'
            },
            {
              name: '前后排侧气囊',
              value: '标配/无'
            },
            {
              name: '前后排头部气囊',
              value: '无/无'
            },
            {
              name: '胎压检测',
              value: '无'
            },
            {
              name: '车内中控锁',
              value: '标配'
            },
            {
              name: '儿童座椅接口',
              value: '标配'
            },
            {
              name: '无钥匙启动',
              value: '无'
            },
            {
              name: '防抱死系统(ABS)',
              value: '标配'
            },
            {
              name: '车身稳定控制(ESP)',
              value: '无'
            }
          ]
        },
        {
          name: '外部配置',
          list: [
            {
              name: '电动天窗',
              value: '标配'
            },
            {
              name: '全景天窗',
              value: '无'
            },
            {
              name: '电动吸合门',
              value: '无'
            },
            {
              name: '感应后备箱',
              value: '无'
            },
            {
              name: '感应雨刷',
              value: '无'
            },
            {
              name: '后雨刷',
              value: '无'
            },
            {
              name: '前后电动车窗',
              value: '标配/标配'
            },
            {
              name: '后视镜电动调节',
              value: '标配'
            },
            {
              name: '后视镜加热',
              value: '无'
            }
          ]
        },
        {
          name: '内部配置',
          list: [
            {
              name: '多功能方向盘',
              value: '无'
            },
            {
              name: '定速巡航',
              value: '无'
            },
            {
              name: '空调',
              value: '标配'
            },
            {
              name: '自动空调',
              value: '无'
            },
            {
              name: 'GPS导航',
              value: '无'
            },
            {
              name: '倒车雷达',
              value: '标配'
            },
            {
              name: '倒车影像系统',
              value: '无'
            },
            {
              name: '真皮座椅',
              value: '无'
            },
            {
              name: '前后排座椅加热',
              value: '无/无'
            }
          ]
        }
      ],
      carImage: [
        {
          title: '车辆外观',
          imgList: [
            {
              url: 'https://image1.guazistatic.com/qn1711301305487aa7df3106a288f3dcbeabf4d3e07288.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn1711301305508b0775e94c0db3ab0cb2157339b4ae3a.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130130552d1617866399f257eaac9098a65bb7b61.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130130554b9a61081728a96691111ed67c6fd7d3b.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn1711301305554cc2b394c6951261e8d941c01289a92b.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn1711301305564c3b495f18bf450db5e27f2e2e2ccd31.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130130558c0d5f1e4829e430251549f43e3099c9a.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn17113012333349b56b56f287d7f3907559a9fe0bc732.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn17113012333389780cd60395273ca8d468293585584e.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333ecb5e44f9b20a2d4d85a8ded96347b2b.jpg?imageView2/1/w/1200/h/800/q/88'
            }
          ]
        },
        {
          title: '中控内饰',
          imgList: [
            {
              url: 'https://image1.guazistatic.com/qn1711301233336723441c733bac299dd0019c03a88dec.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn1711301233331dc02051c289d9949726f0cba929c528.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333767ba7e7ec1d5894ad20795b8cbe840b.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333d57495713dba5bd52b4c76fcab937542.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn1711301233332853ecce69cc3e3bad1aadb4d1e9e955.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333456fe49cd9b0ef8570670835114f9df9.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn17113012333381f98f2e3da23d10555cc24246e9ef86.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333947df8ac390fe9c21f3331fd6e54596f.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333a39fbe31215c1a96a0376aa64bbc8bb2.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333caef633d69f4e4c07c1ebafefdafd00d.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn1711301233334bf9bd71cb926cfbb64f4b8b7ee45374.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn17113012333381dd6f1e0e51fc136e0546f1fb32282d.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn1711301233332dbd8670514a13ed8ee6571595c110eb.jpg?imageView2/1/w/1200/h/800/q/88'
            }
          ]
        },
        {
          title: '发动机、底盘',
          imgList: [
            {
              url: 'https://image1.guazistatic.com/qn171130123333989f6980b641625cfa755c448640f2a7.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn1711301233330c87616efb382b3dea24cfa6db1731be.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn1711301233336256d29d13ed0f60b3772c58c30fc7f7.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333a2a1e23ff92f5f98363c49269e278b61.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333cea4d651ffa1160b1502f131c9666419.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333dafcaa1e974c448392ab0bd6e087db0c.jpg?imageView2/1/w/1200/h/800/q/88'
            },
            {
              url: 'https://image1.guazistatic.com/qn171130123333eecda72f7b7dc11656ea83a5f476dbfa.jpg?imageView2/1/w/1200/h/800/q/88'
            }
          ]
        }
      ],
      carReport: {
        accident: {
          name: '20项排除重大事故检测',
          list: [
            {
              name: '左前减震器座',
              value: true
            },
            {
              name: '右前减震器座',
              value: true
            },
            {
              name: '左前纵梁',
              value: true
            },
            {
              name: '右前纵梁',
              value: true
            },
            {
              name: '防火墙',
              value: true
            },
            {
              name: '右A柱',
              value: true
            },
            {
              name: '右B柱',
              value: true
            },
            {
              name: '右侧顶边梁',
              value: true
            },
            {
              name: '右C柱',
              value: true
            },
            {
              name: '右D柱',
              value: true
            },
            {
              name: '右后翼子板内衬',
              value: true
            },
            {
              name: '左后翼子板内衬',
              value: true
            },
            {
              name: '后备箱底板',
              value: true
            },
            {
              name: '右后纵梁',
              value: true
            },
            {
              name: '左后纵梁',
              value: true
            },
            {
              name: '左D柱',
              value: true
            },
            {
              name: '左C柱',
              value: true
            },
            {
              name: '左侧顶边梁',
              value: true
            },
            {
              name: '左B柱',
              value: true
            },
            {
              name: '左A柱',
              value: true
            }
          ]
        },
        waterFire: {
          name: '10项排除泡水火烧检测',
          list: [
            {
              name: '机舱保险盒',
              value: true
            },
            {
              name: '防火墙隔音棉',
              value: true
            },
            {
              name: '发动机主线束',
              value: true
            },
            {
              name: '座椅滑轨及固定螺丝',
              value: true
            },
            {
              name: '车内线束',
              value: true
            },
            {
              name: '安全带底部',
              value: true
            },
            {
              name: '全车座椅座垫',
              value: true
            },
            {
              name: '全车地毯地胶',
              value: true
            },
            {
              name: '烟灰缸底座',
              value: true
            },
            {
              name: '转向柱',
              value: true
            }
          ]
        },
        crash: {
          name: '14项轻微碰撞检测',
          list: [
            {
              name: '前防撞梁',
              value: true
            },
            {
              name: '水箱框架',
              value: true
            },
            {
              name: '左前大灯框架',
              value: true
            },
            {
              name: '右前大灯框架',
              value: true
            },
            {
              name: '左前翼子板内衬',
              value: true
            },
            {
              name: '右前翼子板内衬',
              value: true
            },
            {
              name: '右侧底大边',
              value: true
            },
            {
              name: '右侧驾驶舱底板',
              value: true
            },
            {
              name: '右侧尾灯框架',
              value: true
            },
            {
              name: '左侧尾灯框架',
              value: true
            },
            {
              name: '后防撞梁',
              value: true
            },
            {
              name: '左侧底大边',
              value: true
            },
            {
              name: '左侧驾驶舱底板',
              value: true
            }
          ]
        },
        loss: {
          name: '18项易损耗部件检测',
          list: [
            {
              name: '左前减震器',
              value: true
            },
            {
              name: '气门室盖垫',
              value: true
            },
            {
              name: '发动机油底壳',
              value: true
            },
            {
              name: '防冻液液面',
              value: true
            },
            {
              name: '机油液面',
              value: true
            },
            {
              name: '电瓶（极柱）',
              value: true
            },
            {
              name: '制动油壶',
              value: true
            },
            {
              name: '助力油壶',
              value: true
            },
            {
              name: '转向助力泵',
              value: true
            },
            {
              name: '水箱水管',
              value: true
            },
            {
              name: '水箱',
              value: true
            },
            {
              name: '冷凝器',
              value: true
            },
            {
              name: '发动机外围皮带',
              value: true
            },
            {
              name: '发动机缸垫',
              value: true
            },
            {
              name: '变速箱油底壳',
              value: true
            },
            {
              name: '右前减震器',
              value: true
            },
            {
              name: '右后减震器',
              value: true
            },
            {
              name: '左后减震器',
              value: true
            }
          ]
        },
        safety: {
          name: '15项安全系统检测',
          list: [
            {
              name: '驾驶座安全气囊',
              value: true
            },
            {
              name: '副驾驶安全气囊',
              value: true
            },
            {
              name: '前排侧气囊',
              value: true
            },
            {
              name: '后排侧气囊',
              value: false
            },
            {
              name: '前排头部气囊',
              value: true
            },
            {
              name: '后排头部气囊',
              value: true
            },
            {
              name: '胎压监测',
              value: false
            },
            {
              name: '中控锁',
              value: true
            },
            {
              name: '儿童座椅接口',
              value: true
            },
            {
              name: '无钥匙启动',
              value: false
            },
            {
              name: '无钥匙进入系统',
              value: false
            },
            {
              name: '遥控钥匙',
              value: true
            },
            {
              name: '防抱死系统(ABS)',
              value: true
            },
            {
              name: '车身稳定控制(ESP)',
              value: true
            },
            {
              name: '电子驻车制动',
              value: false
            }
          ]
        },
        outConfig: {
          name: '22项外部配置检测',
          list: [
            {
              name: '左前轮毂',
              value: true
            },
            {
              name: '左前轮胎',
              value: true
            },
            {
              name: '前挡风玻璃',
              value: true
            },
            {
              name: '右前轮毂',
              value: true
            },
            {
              name: '右前轮胎',
              value: true
            },
            {
              name: '右后轮毂',
              value: true
            },
            {
              name: '右后轮胎',
              value: true
            },
            {
              name: '后挡风玻璃',
              value: true
            },
            {
              name: '左后轮毂',
              value: true
            },
            {
              name: '左后轮胎',
              value: true
            },
            {
              name: '全景天窗',
              value: false
            },
            {
              name: '感应雨刷',
              value: false
            },
            {
              name: '后雨刷',
              value: false
            },
            {
              name: '前电动车窗',
              value: true
            },
            {
              name: '后电动车窗',
              value: true
            },
            {
              name: '后视镜电动调节',
              value: true
            },
            {
              name: '后视镜电动折叠',
              value: false
            },
            {
              name: '后视镜加热',
              value: false
            },
            {
              name: '电动吸合门',
              value: false
            },
            {
              name: '后排侧遮阳帘',
              value: false
            },
            {
              name: '感应后备箱',
              value: false
            },
            {
              name: '电动天窗',
              value: true
            }
          ]
        },
        inConfig: {
          name: '14项内部配置检测',
          list: [
            {
              name: '皮质座椅',
              value: false
            },
            {
              name: '前排座椅加热',
              value: false
            },
            {
              name: '座椅通风',
              value: false
            },
            {
              name: '驾驶座座椅电动调节',
              value: false
            },
            {
              name: '多功能方向盘',
              value: true
            },
            {
              name: '定速巡航',
              value: false
            },
            {
              name: 'GPS导航',
              value: true
            },
            {
              name: '倒车雷达',
              value: true
            },
            {
              name: '倒车影像系统',
              value: true
            },
            {
              name: '手动空调',
              value: true
            },
            {
              name: '自动空调',
              value: false
            },
            {
              name: 'HUD抬头显示',
              value: false
            },
            {
              name: '后排座椅加热',
              value: false
            },
            {
              name: '空调',
              value: true
            }
          ]
        },
        lightConfig: {
          name: '15项灯光系统检测',
          list: [
            {
              name: '近光灯',
              value: true
            },
            {
              name: '远光灯',
              value: true
            },
            {
              name: '前转向灯',
              value: true
            },
            {
              name: '前雾灯',
              value: true
            },
            {
              name: '后转向灯',
              value: true
            },
            {
              name: '刹车灯',
              value: true
            },
            {
              name: '倒车灯',
              value: true
            },
            {
              name: '后雾灯',
              value: true
            },
            {
              name: '室内顶灯',
              value: true
            },
            {
              name: '氙气大灯',
              value: false
            },
            {
              name: 'LED大灯',
              value: false
            },
            {
              name: '自动头灯',
              value: false
            },
            {
              name: '前雾灯',
              value: true
            },
            {
              name: '大灯高度可调',
              value: true
            },
            {
              name: '大灯清洗',
              value: false
            }
          ]
        },
        highTechConfig: {
          name: '5项高科技配置检测',
          list: [
            {
              name: '车道偏离预警系统',
              value: false
            },
            {
              name: '自动泊车',
              value: false
            },
            {
              name: '盲点辅助系统',
              value: false
            },
            {
              name: '全景摄像头',
              value: false
            },
            {
              name: '发动机自动启停',
              value: false
            }
          ]
        },
        carToolConfig: {
          name: '5项随车工具检测',
          list: [
            {
              name: '千斤顶',
              value: false
            },
            {
              name: '灭火器',
              value: false
            },
            {
              name: '三角警示标',
              value: false
            },
            {
              name: '维修工具包',
              value: false
            },
            {
              name: '备胎',
              value: false
            }
          ]
        },
        instrumentConfig: {
          name: '6项仪表台指示灯检测',
          list: [
            {
              name: '调表车',
              value: true
            },
            {
              name: '制动系统指示灯',
              value: true
            },
            {
              name: '安全气囊故障灯',
              value: true
            },
            {
              name: '车身稳定系统故障灯',
              value: true
            },
            {
              name: '发动机故障灯',
              value: true
            },
            {
              name: '变速箱故障灯',
              value: true
            }
          ]
        },
        engineConfig: {
          name: '5项发动机状态检测',
          list: [
            {
              name: '发动机总成',
              value: true
            },
            {
              name: '启动',
              value: true
            },
            {
              name: '怠速',
              value: true
            },
            {
              name: '发动机抖动',
              value: true
            },
            {
              name: '尾气',
              value: true
            }
          ]
        },
        transmissionConfig: {
          name: '3项变速箱及转向检测',
          list: [
            {
              name: '变速箱总成',
              value: true
            },
            {
              name: '变速箱挂挡',
              value: true
            },
            {
              name: '转向',
              value: true
            }
          ]
        },
        outInConfig: {
          name: '外观内饰检测',
          list: [
            {
              name: '67项 缺陷项检测',
              value: true
            },
            {
              name: '21项 漆面修复检测',
              value: true
            },
            {
              name: '21项 钣金修复检测',
              value: true
            },
            {
              name: '21项 外观件更换检测',
              value: true
            }
          ]
        }
      },
      searchResultList: [
        {
          id: 0,
          carName: '大众捷达 2015款 1.6L 手动时尚型',
          year: '2015年',
          mileage: '1.4万公里',
          place: '哈尔滨',
          price: '5.46',
          carImg: 'https://image1.guazistatic.com/qn180125190559b0e255718fdf226ae1e0cb71d8cea8d8.jpg?imageView2/1/w/287/h/192/q/88'
        },
        {
          id: 1,
          carName: '别克凯越 2013款 1.5L 自动经典型',
          year: '2014年',
          mileage: '3.4万公里',
          place: '大连',
          price: '5.13',
          carImg: 'https://image1.guazistatic.com/qn180129113256f5bf1b87ff1677d04c16b8a9fd5c2216.jpg?imageView2/1/w/287/h/192/q/88'
        },
        {
          id: 2,
          carName: '本田锋范经典 2014款 风尚 1.5L 手动精英版',
          year: '2015年',
          mileage: '2.3万公里',
          place: '昆明',
          price: '6.20',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/03d8925ef2f2478153f64eac8efec106.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 3,
          carName: '丰田卡罗拉 2013款 特装版 1.6L 自动至酷型GL',
          year: '2013年',
          mileage: '4.4万公里',
          place: '曲靖',
          price: '8.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/3c8d7b700b8d70fa0fc1a49ecdce9438.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        }
      ]
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
    this.$store.commit(SET_HEADER_ACTIVE_TAB, -1)
    this.carId = this.$route.params.carId
  },
  mounted () {
    window.addEventListener('scroll', this.handelFixedTitle)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handelFixedTitle)
  },
  methods: {
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
    background: $color-white
    box-shadow: 1px 1px 10px 1px rgba(15, 166, 255, .1)
    z-index: 1000
    text-align: center
    .title-wrap
      position: relative
      height 70px
      width: 1170px
      margin: 0 auto
      .title-left
        font-size: 0px
        float: left
        > span
          display: inline-block
          font-size: 20px
          color: #495056
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
            color: $color-white
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
