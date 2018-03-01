<template>
  <div id="step-one">
    <div class="info-wrap">
        <p class="info-title">基础信息</p>
        <el-form
          :model="baseInfo"
          :rules="baseInfoRules"
          ref="baseInfoForm"
          label-width="110px"
          class="info-content">
          <el-form-item label="车主称呼" prop="userName">
            <el-input 
              v-model="baseInfo.userName"
              placeholder="请输入车主称呼">
            </el-input>
          </el-form-item>
          <el-form-item label="车主报价" prop="ownerPrice">
            <el-input 
              v-model="baseInfo.ownerPrice"
              placeholder="请输入车主报价，单位：万"
              @keyup.native="changeValue('ownerPrice')">
              <template slot="append">万</template>
            </el-input>
          </el-form-item>
          <el-form-item label="新车指导价" prop="newCarPrice">
            <el-input 
              v-model="baseInfo.newCarPrice" 
              placeholder="请输入新车指导价，单位：万"
              @keyup.native="changeValue('newCarPrice')">
              <template slot="append">万</template>
            </el-input>
          </el-form-item>
          <el-form-item label="购置税" prop="tax">
            <el-input 
              v-model="baseInfo.tax" 
              placeholder="请输入购置税，单位：万"
              @keyup.native="changeValue('tax')">
              <template slot="append">万</template>
            </el-input>
          </el-form-item>
          <div class="item-col">
            <el-form-item label="年检到期时间" prop="checkYear" style="flex: 1">
              <el-date-picker
                style="width: 100%"
                v-model="baseInfo.checkYear"
                type="month"
                id="1"
                placeholder="年检到期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="交强险时间" prop="strongRiskYear" style="flex: 1">
              <el-date-picker
                style="width: 100%"
                v-model="baseInfo.strongRiskYear"
                type="month"
                id="2"
                placeholder="交强险时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="商业险到期时间" prop="businessRiskYear" style="margin-left: 20px;flex: 1">
              <el-date-picker
                style="width: 100%"
                v-model="baseInfo.businessRiskYear"
                type="month"
                id="3"
                placeholder="商业险到期时间">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="item-col">
            <el-form-item label="上牌年份" prop="licensedYear" style="flex: 1">
              <el-select
                style="width: 100%"
                v-model="baseInfo.licensedYear" 
                placeholder="请选择上牌年份">
                <el-option
                  v-for="(year, index) in yearData"
                  :key="index"
                  :label="year.value"
                  :value="year">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上牌月份" prop="licensedMonth" style="flex: 1">
              <el-select 
                style="width: 100%"
                v-model="baseInfo.licensedMonth" 
                placeholder="请选择上牌月份">
                <el-option 
                  v-for="(month, index) in baseInfo.licensedYear.month"
                  :key="index"
                  :value="month.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="上牌城市" prop="licensedCity">
            <step-one-city-picker
              :allCities="allCities"
              @city-click="selectLicensedCity">
            </step-one-city-picker>
          </el-form-item>
          <el-form-item label="表显里程" prop="mileage">
            <el-input 
              v-model="baseInfo.mileage" 
              placeholder="请输入表显里程，单位：万公里"
              @keyup.native="changeValue('mileage')">
              <template slot="append">万公里</template>
            </el-input>
          </el-form-item>
          <el-form-item label="看车地址" prop="lookCity">
            <step-one-city-picker
              :allCities="allCities"
              @city-click="selectLookCity">
            </step-one-city-picker>
          </el-form-item>
          <el-form-item label="过户次数" prop="transferTime">
            <div class="transfer-time">
              <span
                v-for="(value, index) in transferTimeList" 
                :key="index" 
                @click="selectTransferTime(value)"
                :class="[{'gh-active': baseInfo.transferTime.id === value.id}]">
                {{ value.value }}
              </span>
            </div>
          </el-form-item>
          <el-form-item label="车源号" prop="carOptions">
            <el-input 
              v-model="baseInfo.carOptions"
              placeholder="请输入车源号">
            </el-input>
          </el-form-item>
        </el-form>
    </div>
    <div class="info-wrap">
        <p class="info-title">基本参数</p>
        <el-form 
          :model="configBase" 
          :rules="configBaseRules" 
          ref="configBaseForm"
          label-width="110px"
          class="info-config">
          <el-form-item label="证件品牌型号" prop="credentials" class="info-config-item">
            <el-input 
              v-model="configBase.credentials"
              placeholder="请输入证件品牌型号">
            </el-input>
          </el-form-item>
          <el-form-item label="厂商" prop="vendor" class="info-config-item">
            <el-input 
              v-model="configBase.vendor"
              placeholder="请输入厂商">
            </el-input>
          </el-form-item>
          <el-form-item label="级别" prop="level" class="info-config-item">
            <el-input 
              v-model="configBase.level"
              placeholder="请输入级别">
            </el-input>
          </el-form-item>
          <el-form-item label="发动机" prop="engine" class="info-config-item">
            <el-input 
              v-model="configBase.engine"
              placeholder="请输入发动机">
            </el-input>
          </el-form-item>
          <el-form-item label="变速箱" prop="speed" class="info-config-item">
            <el-input 
              v-model="configBase.speed"
              placeholder="请输入变速箱">
            </el-input>
          </el-form-item>
          <el-form-item label="车身结构" prop="structure" class="info-config-item">
            <el-input 
              v-model="configBase.structure"
              placeholder="请输入车身结构">
            </el-input>
          </el-form-item>
          <el-form-item label="长度" prop="length" class="info-config-item">
            <el-input 
              v-model="configBase.length"
              placeholder="请输入长度，单位：mm">
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="宽度" prop="width" class="info-config-item">
            <el-input 
              v-model="configBase.width"
              placeholder="请输入宽度，单位：mm">
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="高度" prop="height" class="info-config-item">
            <el-input 
              v-model="configBase.height"
              placeholder="请输入高度，单位：mm">
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="轴距" prop="wheelbase" class="info-config-item">
            <el-input 
              v-model="configBase.wheelbase"
              placeholder="请输入轴距，单位：mm">
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="行李箱容积" prop="trunk" class="info-config-item">
            <el-input 
              v-model="configBase.trunk"
              placeholder="请输入行李箱容积，单位：L'">
              <template slot="append">L</template>
            </el-input>
          </el-form-item>
          <el-form-item label="整备质量" prop="quality" class="info-config-item">
            <el-input 
              v-model="configBase.quality"
              placeholder="请输入整备质量，单位：kg">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-form>
    </div>
    <div class="info-wrap">
        <p class="info-title">发动机参数</p>
        <el-form 
          :model="configEngine" 
          :rules="configEngineRules" 
          ref="configEngineForm"
          label-width="110px"
          class="info-config">
          <el-form-item label="排量" prop="displacement" class="info-config-item">
            <el-input 
              v-model="configEngine.displacement"
              placeholder="请输入排量，单位：L">
              <template slot="append">L</template>
            </el-input>
          </el-form-item>
          <el-form-item label="进气形式" prop="airIntake" class="info-config-item">
            <el-input 
              v-model="configEngine.airIntake"
              placeholder="请输入进气形式">
            </el-input>
          </el-form-item>
          <el-form-item label="气缸" prop="cylinder" class="info-config-item">
            <el-input 
              v-model="configEngine.cylinder"
              placeholder="请输入气缸">
            </el-input>
          </el-form-item>
          <el-form-item label="最大马力" prop="maxHorsepower" class="info-config-item">
            <el-input 
              v-model="configEngine.maxHorsepower"
              placeholder="请输入最大马力。单位：Ps">
              <template slot="append">Ps</template>
            </el-input>
          </el-form-item>
          <el-form-item label="最大扭矩" prop="maxTorque" class="info-config-item">
            <el-input 
              v-model="configEngine.maxTorque"
              placeholder="请输入最大扭矩，单位：N*m">
              <template slot="append">N*m</template>
            </el-input>
          </el-form-item>
          <el-form-item label="燃料类型" prop="fuelType" class="info-config-item">
            <el-input 
              v-model="configEngine.fuelType"
              placeholder="请输入燃料类型">
            </el-input>
          </el-form-item>
          <el-form-item label="燃油标号" prop="fuelLabel" class="info-config-item">
            <el-input 
              v-model="configEngine.fuelLabel"
              placeholder="请输入燃油标号">
            </el-input>
          </el-form-item>
          <el-form-item label="供油方式" prop="oilSupplyWay" class="info-config-item">
            <el-input 
              v-model="configEngine.oilSupplyWay"
              placeholder="请输入供油方式">
            </el-input>
          </el-form-item>
          <el-form-item label="排放标准" prop="emissionStandards" class="info-config-item">
            <el-input 
              v-model="configEngine.emissionStandards"
              placeholder="请输入排放标准">
            </el-input>
          </el-form-item>
        </el-form>
    </div>
    <div class="info-wrap">
        <p class="info-title">底盘与制动参数</p>
        <el-form 
          :model="configChassisBrake" 
          :rules="configChassisBrakeRules" 
          ref="configChassisBrakeForm"
          label-width="110px"
          class="info-config">
          <el-form-item label="驱动方式" prop="driveMode" class="info-config-item">
            <el-input 
              v-model="configChassisBrake.driveMode"
              placeholder="请输入驱动方式">
            </el-input>
          </el-form-item>
          <el-form-item label="助力类型" prop="powerType" class="info-config-item">
            <el-input 
              v-model="configChassisBrake.powerType"
              placeholder="请输入助力类型">
            </el-input>
          </el-form-item>
          <el-form-item label="前悬挂类型" prop="suspensionFront" class="info-config-item">
            <el-input 
              v-model="configChassisBrake.suspensionFront"
              placeholder="请输入前悬挂类型">
            </el-input>
          </el-form-item>
          <el-form-item label="后悬挂类型" prop="suspensionBehind" class="info-config-item">
            <el-input 
              v-model="configChassisBrake.suspensionBehind"
              placeholder="请输入后悬挂类型">
            </el-input>
          </el-form-item>
          <el-form-item label="前制动类型" prop="brakeFront" class="info-config-item">
            <el-input 
              v-model="configChassisBrake.brakeFront"
              placeholder="请输入前制动类型">
            </el-input>
          </el-form-item>
          <el-form-item label="后制动类型" prop="brakeBehind" class="info-config-item">
            <el-input 
              v-model="configChassisBrake.brakeBehind"
              placeholder="请输入后制动类型">
            </el-input>
          </el-form-item>
          <el-form-item label="驻车制动类型" prop="parkingBrake" class="info-config-item">
            <el-input 
              v-model="configChassisBrake.parkingBrake"
              placeholder="请输入驻车制动类型">
            </el-input>
          </el-form-item>
          <el-form-item label="前轮胎规格" prop="tireSizeFront" class="info-config-item">
            <el-input 
              v-model="configChassisBrake.tireSizeFront"
              placeholder="请输入前轮胎规格">
            </el-input>
          </el-form-item>
          <el-form-item label="后轮胎规格" prop="tireSizeBehind" class="info-config-item">
            <el-input 
              v-model="configChassisBrake.tireSizeBehind"
              placeholder="请输入后轮胎规格">
            </el-input>
          </el-form-item>
        </el-form>
    </div>
    <div class="info-wrap">
        <p class="info-title">安全配置参数</p>
        <el-form
          label-width="140px"
          class="info-config">
          <el-form-item 
            :label="safety.name"
            v-for="(safety, index) in configSafety"
            :key="index"
            class="info-config-item-three">
            <el-radio-group v-model="configSafety[index].value">
              <el-radio-button label="标配"></el-radio-button>
              <el-radio-button label="无"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
    </div>
    <div class="info-wrap">
        <p class="info-title">外部配置参数</p>
        <el-form
          label-width="140px"
          class="info-config">
          <el-form-item 
            :label="out.name"
            v-for="(out, index) in configOut"
            :key="index"
            class="info-config-item-three">
            <el-radio-group v-model="configOut[index].value">
              <el-radio-button label="标配"></el-radio-button>
              <el-radio-button label="无"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
    </div>
    <div class="info-wrap">
        <p class="info-title">内部配置参数</p>
        <el-form
          label-width="140px"
          class="info-config">
          <el-form-item 
            :label="cin.name"
            v-for="(cin, index) in configIn"
            :key="index"
            class="info-config-item-three">
            <el-radio-group v-model="configIn[index].value">
              <el-radio-button label="标配"></el-radio-button>
              <el-radio-button label="无"></el-radio-button>
            </el-radio-group>
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
  mapGetters,
  mapActions
} from 'vuex'

import stepOneCityPicker from 'COMMON/cityPicker/stepOneCityPicker'

export default {
  name: 'stepOne',
  props: ['carId'],
  components: {
    stepOneCityPicker
  },
  data () {
    return {
      submit: false,
      transferTimeList: [
        {
          value: '0',
          id: 0
        },
        {
          value: '1',
          id: 1
        },
        {
          value: '2',
          id: 2
        },
        {
          value: '3',
          id: 3
        },
        {
          value: '4',
          id: 4
        },
        {
          value: '4次以上',
          id: 5
        },
        {
          value: '不清楚',
          id: -1
        }
      ],
      yearData: [],
      baseInfo: {
        userName: '',
        ownerPrice: '',
        newCarPrice: '',
        tax: '',
        mileage: '',
        licensedYear: '',
        licensedMonth: '',
        licensedCity: '',
        lookCity: '',
        checkYear: '',
        strongRiskYear: '',
        businessRiskYear: '',
        carOptions: '',
        transferTime: ''
      },
      baseInfoRules: {
        userName: [
          { required: true, message: '请输入车主称呼', trigger: 'blur' }
        ],
        ownerPrice: [
          { required: true, message: '请输入车主报价', trigger: 'blur' }
        ],
        newCarPrice: [
          { required: true, message: '请输入新车指导价', trigger: 'blur' }
        ],
        tax: [
          { required: true, message: '请输入购置税', trigger: 'blur' }
        ],
        licensedYear: [
          { required: true, message: '请选择上牌年份', trigger: 'blur' }
        ],
        licensedMonth: [
          { required: true, message: '请选择上牌月份', trigger: 'blur' }
        ],
        licensedCity: [
          { required: true, message: '请选择上牌地址', trigger: 'blur' }
        ],
        mileage: [
          { required: true, message: '请输入表显里程', trigger: 'blur' }
        ],
        lookCity: [
          { required: true, message: '请选择看车地址', trigger: 'blur' }
        ],
        checkYear: [
          { required: true, message: '请选择年检到期时间', trigger: 'blur' }
        ],
        carOptions: [
          { required: true, message: '请输入车源号', trigger: 'blur' }
        ],
        transferTime: [
          { required: true, message: '请选择过户次数', trigger: 'blur' }
        ]
      },
      configBase: {
        credentials: '',
        vendor: '',
        level: '',
        engine: '',
        speed: '',
        structure: '',
        length: '',
        width: '',
        height: '',
        wheelbase: '',
        trunk: '',
        quality: ''
      },
      configBaseRules: {
        credentials: [
          { required: true, message: '请输入证件品牌型号', trigger: 'blur' }
        ],
        vendor: [
          { required: true, message: '请输入厂商', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入级别', trigger: 'blur' }
        ],
        engine: [
          { required: true, message: '请输入发动机', trigger: 'blur' }
        ],
        speed: [
          { required: true, message: '请输入变速箱', trigger: 'blur' }
        ],
        structure: [
          { required: true, message: '请输入车身结构', trigger: 'blur' }
        ],
        length: [
          { required: true, message: '请输入长度', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '请输入宽度', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '请输入高度', trigger: 'blur' }
        ],
        wheelbase: [
          { required: true, message: '请输入轴距', trigger: 'blur' }
        ],
        trunk: [
          { required: true, message: '请输入行李箱容积', trigger: 'blur' }
        ],
        quality: [
          { required: true, message: '请输入整备质量', trigger: 'blur' }
        ]
      },
      configEngine: {
        displacement: '',
        airIntake: '',
        cylinder: '',
        maxHorsepower: '',
        maxTorque: '',
        fuelType: '',
        fuelLabel: '',
        oilSupplyWay: '',
        emissionStandards: ''
      },
      configEngineRules: {
        displacement: [
          { required: true, message: '请输入排量', trigger: 'blur' }
        ],
        airIntake: [
          { required: true, message: '进气形式', trigger: 'blur' }
        ],
        cylinder: [
          { required: true, message: '气缸', trigger: 'blur' }
        ],
        maxHorsepower: [
          { required: true, message: '最大马力', trigger: 'blur' }
        ],
        maxTorque: [
          { required: true, message: '最大扭矩', trigger: 'blur' }
        ],
        fuelType: [
          { required: true, message: '燃料类型', trigger: 'blur' }
        ],
        fuelLabel: [
          { required: true, message: '燃油标号', trigger: 'blur' }
        ],
        oilSupplyWay: [
          { required: true, message: '供油方式', trigger: 'blur' }
        ],
        emissionStandards: [
          { required: true, message: '排放标准', trigger: 'blur' }
        ]
      },
      configChassisBrake: {
        driveMode: '',
        powerType: '',
        suspensionFront: '',
        suspensionBehind: '',
        brakeFront: '',
        brakeBehind: '',
        parkingBrake: '',
        tireSizeFront: '',
        tireSizeBehind: ''
      },
      configChassisBrakeRules: {
        driveMode: [
          { required: true, message: '请输入驱动方式', trigger: 'blur' }
        ],
        powerType: [
          { required: true, message: '请输入助力类型', trigger: 'blur' }
        ],
        suspensionFront: [
          { required: true, message: '请输入前悬挂类型', trigger: 'blur' }
        ],
        suspensionBehind: [
          { required: true, message: '请输入后悬挂类型', trigger: 'blur' }
        ],
        brakeFront: [
          { required: true, message: '请输入前制动类型', trigger: 'blur' }
        ],
        brakeBehind: [
          { required: true, message: '请输入后制动类型', trigger: 'blur' }
        ],
        parkingBrake: [
          { required: true, message: '请输入驻车制动类型', trigger: 'blur' }
        ],
        tireSizeFront: [
          { required: true, message: '请输入前轮胎规格', trigger: 'blur' }
        ],
        tireSizeBehind: [
          { required: true, message: '请输入后轮胎规格', trigger: 'blur' }
        ]
      },
      configSafety: {
        safetyAirbagMain: {
          name: '主驾驶安全气囊',
          value: '无'
        },
        safetyAirbagVice: {
          name: '副驾驶安全气囊',
          value: '无'
        },
        sideAirbagFront: {
          name: '前排侧气囊',
          value: '无'
        },
        sideAirbagBehind: {
          name: '后排侧气囊',
          value: '无'
        },
        headAirbagFront: {
          name: '前排头部气囊',
          value: '无'
        },
        headAirbagBehind: {
          name: '后排头部气囊',
          value: '无'
        },
        tirePressureMonitoring: {
          name: '胎压监测',
          value: '无'
        },
        inControlLock: {
          name: '车内中控锁',
          value: '无'
        },
        childSeatInterface: {
          name: '儿童座椅接口',
          value: '无'
        },
        keylessStart: {
          name: '无钥匙启动',
          value: '无'
        },
        abs: {
          name: '防抱死系统(ABS)',
          value: '无'
        },
        esp: {
          name: '车身稳定控制(ESP)',
          value: '无'
        }
      },
      configOut: {
        skylightElectric: {
          name: '电动天窗',
          value: '无'
        },
        skylightFullView: {
          name: '全景天窗',
          value: '无'
        },
        electricSuctionDoor: {
          name: '电动吸合门',
          value: '无'
        },
        inductionTrunk: {
          name: '感应后备箱',
          value: '无'
        },
        windshieldWiperSensing: {
          name: '感应雨刷',
          value: '无'
        },
        windshieldWiperBehind: {
          name: '后雨刷',
          value: '无'
        },
        electricWindowFront: {
          name: '前电动车窗',
          value: '无'
        },
        electricWindowBehind: {
          name: '后电动车窗',
          value: '无'
        },
        rearViewMirrorElectric: {
          name: '后视镜电动调节',
          value: '无'
        },
        rearViewMirrorHot: {
          name: '后视镜加热',
          value: '无'
        }
      },
      configIn: {
        multiSteeringWheel: {
          name: '多功能方向盘',
          value: '无'
        },
        cruiseControl: {
          name: '定速巡航',
          value: '无'
        },
        electricSuctionDoor: {
          name: '空调',
          value: '无'
        },
        airConditionerAuto: {
          name: '自动空调',
          value: '无'
        },
        gps: {
          name: 'GPS导航',
          value: '无'
        },
        reversingRadar: {
          name: '倒车雷达',
          value: '无'
        },
        reversingImageSystem: {
          name: '倒车影像系统',
          value: '无'
        },
        leatherSeat: {
          name: '真皮座椅',
          value: '无'
        },
        seatHotFront: {
          name: '前排座椅加热',
          value: '无'
        },
        searHotBehind: {
          name: '后排座椅加热',
          value: '无'
        }
      }
    }
  },
  created () {
    this.getFillYM()
      .then((data) => {
        this.yearData = data
      })
    this.getCitySort()
  },
  computed: {
    ...mapGetters([
      'allCities'
    ])
  },
  methods: {
    ...mapActions([
      'getFillYM',
      'getCitySort'
    ]),
    selectLicensedCity (city) {
      this.baseInfo.licensedCity = city
    },
    selectLookCity (city) {
      this.baseInfo.lookCity = city
    },
    selectTransferTime (transferTime) {
      this.baseInfo.transferTime = transferTime
    },
    submitForm () {
      let keys = [
        'baseInfoForm',
        'configBaseForm',
        'configEngineForm',
        'configChassisBrakeForm'
      ]
      let flag = true
      for (let i = 0; i < keys.length; ++i) {
        this.$refs[keys[i]].validate((valid) => {
          if (!valid) {
            flag = false
          }
        })
      }
      if (flag) {
        this.$toast({
          message: '上传失败'
        })
        return
      }
      this.$emit('next', '2')
    },
    changeValue (type) {
      switch (type) {
        case 'ownerPrice':
          this.baseInfo.ownerPrice = this.verifyPrice(this.baseInfo.ownerPrice)
          break
        case 'newCarPrice':
          this.baseInfo.newCarPrice = this.verifyPrice(this.baseInfo.newCarPrice)
          break
        case 'tax':
          this.baseInfo.tax = this.verifyPrice(this.baseInfo.tax)
          break
        case 'mileage':
          this.baseInfo.mileage = this.verifyMileage(this.baseInfo.mileage)
          break
      }
    },
    verifyPrice (value) {
      let newValue = ''
      let l = 4
      let pointPos = -1
      for (let i = 0; i < value.length; ++i) {
        let c = value[i]
        if (newValue.length === l && c !== '.') {
          break
        }
        if (c === '0' && (value.length - 1 === i || (newValue.length === 0 && i + i < value.length && value[i + 1] === '.'))) {
          newValue += c
          continue
        }
        if (c === '0' && newValue.length === 0) {
          continue
        }
        if (c === '.') {
          if (i > 0 && pointPos === -1 && i < 5) {
            newValue += c
            pointPos = i
            l = i + 3
          }
          continue
        }
        if (c >= '0' && c <= '9') {
          newValue += c
        }
      }
      return newValue
    },
    verifyMileage (value) {
      let newValue = ''
      let l = 4
      let pointPos = -1
      for (let i = 0; i < value.length; ++i) {
        let c = value[i]
        if (newValue.length === l) {
          break
        }
        if (c === '0' && (value.length - 1 === i || (newValue.length === 0 && i + i < value.length && value[i + 1] === '.'))) {
          newValue += c
          continue
        }
        if (c === '0' && newValue.length === 0) {
          continue
        }
        if (c === '.') {
          if (i > 0 && pointPos === -1 && i < 3) {
            newValue += c
            pointPos = i
            l = i + 3
          }
          continue
        }
        if (c >= '0' && c <= '9') {
          newValue += c
        }
      }
      return newValue
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#step-one
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
      padding: 10px
      border: 1px solid #eeeeee
      .item-col
        display: flex
        display: -webkit-flex
        flex-direction: row
      .transfer-time
        display: flex
        display: -webkit-flex
        flex-direction: row
        align-items: center
        line-height: 1
        > span
          cursor: pointer
          padding: 10px 18px
          border: 1px solid #e6e6e6
          border-radius: 3px
          margin-right: 20px
          &:hover,
          &.gh-active
            border: 1px solid $color-blue
    .info-config
      border: 1px solid #eeeeee
      padding: 10px
      display: flex
      display: -webkit-flex
      flex-direction: row
      flex-wrap: wrap
      .info-config-item
        width: 460px
      .info-config-item-three
        width: 312px
  .info-btn
    width: 100%
    text-align: center
    margin: 30px 0px
</style>

