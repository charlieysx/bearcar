<template>
  <div id="sell-car">
      <div class="sell-car-top">
          <div class="title1">
              个人卖给个人,没有中间商赚差价
          </div>
          <div class="title2">
              买家少花钱，卖家最高多卖20%，平均7天售出
          </div>
          <div class="btn">
            <span class="btn-sell" @click="sellCar">
                免费卖车
            </span>
            <!-- <span class="btn-estimate">
                快速估价
            </span> -->
          </div>
      </div>
      <!-- 最新成交 -->
      <div id="car-new-sell">
        <div class="new-sell-title">
            最新成交
            <div class="line"></div>
        </div>
        <ul class="car-list-wrap" v-if="!loadImageSuccess">
            <li class="car-list" 
                v-for="n in 4"
                :key="n">
                <div class="car-img">
                </div>
            </li>
        </ul>
        <swiper :options="swiperOption" class="car-list-wrap" v-if="loadImageSuccess">
            <swiper-slide class="car-list" 
                v-for="(item, index) in newSellList"
                :key="index">
                <div class="car-img">
                    <div class="icon2 icon-sell">3天<p>卖出</p></div>
                    <img :src="item.carImg" alt="">
                </div>
                <div class="car-info">
                    <p class="car-name">{{item.carName}}</p>
                    <p class="car-info-p">{{item.year}}<em>|</em>{{item.mileage}}<em>|</em>{{item.place}}</p>
                    <p class="car-info-price">
                    <span style="color: #000000;font-size: 14px">成交价</span>
                    {{item.price}}
                    <span>万</span>
                    </p>
                </div>
            </swiper-slide>
        </swiper>
      </div>
      <!-- 最新成交 结束 -->
      <!-- 卖车问答 -->
      <div id="car-aq">
        <div class="aq-title">
            卖车问答
            <div class="line"></div>
        </div>
        <ul class="aq-wrap">
            <li class="aq-item"
                v-for="(aq, index) in sellCarAQ"
                :key="index">
                <div class="aq-top">
                    <span class="icon" :style="aq.style"></span>
                    <span class="question">
                        {{ aq.question }}
                    </span>
                </div>
                <ul class="answer">
                    <li v-for="(answer, index) in aq.answer" :key="index">
                        {{ answer }}
                    </li>
                </ul>
            </li>
        </ul>
      </div>
      <!-- 卖车问答 结束 -->
      <sell-car-box ref="sellCarBox"></sell-car-box>
  </div>
</template>

<script>
import carAQ from 'DATA/carAQ'
import {
  mapActions,
  mapGetters
} from 'vuex'

import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

import sellCarBox from 'COMMON/sellCarBox/sellCarBox'

export default {
  name: 'sell-car',
  data () {
    return {
      showSellBox: false,
      loadImageSuccess: false,
      sellCarAQ: {},
      newSellIndex: {
        first: 0,
        last: 4
      },
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 4,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loopedSlides: 0
      },
      newSellList: [
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
        },
        {
          id: 4,
          carName: '别克GL8 2014款 3.0L GT豪华商务豪雅版',
          year: '2015年',
          mileage: '3.4万公里',
          place: '呼和浩特',
          price: '27.70',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/758204d8085be3b30c0114abfddefb82.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 5,
          carName: '雪佛兰迈锐宝 2013款 2.0L 自动豪华版',
          year: '2013年',
          mileage: '5.0万公里',
          place: '大连',
          price: '9.38',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/3328539214f793b76b288d71ae2b2da3.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 6,
          carName: '开瑞优胜 2010款 1.0L基本型',
          year: '2010年',
          mileage: '6.6万公里',
          place: '泸州',
          price: '0.80',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/60ebe74b3ff36875a0719abfb954a3fe.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 7,
          carName: '大众迈腾 2018款 330TSI DSG 豪华型',
          year: '2018年',
          mileage: '0.1万公里',
          place: '汕头',
          price: '23.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/d4db7f310badfdd892264bbd533ddd9d.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 8,
          carName: '凯迪拉克ATS-L 2014款 25T 舒适型',
          year: '2015年',
          mileage: '5.9万公里',
          place: '洛阳',
          price: '17.30',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/8ac0527f50de490ecec298ddf3faece4.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 9,
          carName: '标致3008 2015款 2.0L 手动经典版',
          year: '2015年',
          mileage: '4.0万公里',
          place: '石家庄',
          price: '10.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/6d056ae1311079c3002b7e43065519ab.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 10,
          carName: '大众速腾 2010款 1.4TSI 自动豪华型',
          year: '2010年',
          mileage: '7.5万公里',
          place: '盐城',
          price: '5.80',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/19907410cc26baf7da4ed6af0c1e7bb2.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 11,
          carName: '宝骏730 2014款 1.5L 手动舒适型 7座',
          year: '2015年',
          mileage: '3.6万公里',
          place: '上海',
          price: '5.50',
          carImg: 'https://image.guazistatic.com/gz01180129/13/34/c0cbbcf60539fdfec2b4fc49b580e11a.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 12,
          carName: '大众捷达 2015款 1.6L 手动时尚型',
          year: '2015年',
          mileage: '1.4万公里',
          place: '哈尔滨',
          price: '5.46',
          carImg: 'https://image1.guazistatic.com/qn180125190559b0e255718fdf226ae1e0cb71d8cea8d8.jpg?imageView2/1/w/287/h/192/q/88'
        },
        {
          id: 13,
          carName: '别克凯越 2013款 1.5L 自动经典型',
          year: '2014年',
          mileage: '3.4万公里',
          place: '大连',
          price: '5.13',
          carImg: 'https://image1.guazistatic.com/qn180129113256f5bf1b87ff1677d04c16b8a9fd5c2216.jpg?imageView2/1/w/287/h/192/q/88'
        },
        {
          id: 14,
          carName: '本田锋范经典 2014款 风尚 1.5L 手动精英版',
          year: '2015年',
          mileage: '2.3万公里',
          place: '昆明',
          price: '6.20',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/03d8925ef2f2478153f64eac8efec106.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 15,
          carName: '丰田卡罗拉 2013款 特装版 1.6L 自动至酷型GL',
          year: '2013年',
          mileage: '4.4万公里',
          place: '曲靖',
          price: '8.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/3c8d7b700b8d70fa0fc1a49ecdce9438.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 16,
          carName: '别克GL8 2014款 3.0L GT豪华商务豪雅版',
          year: '2015年',
          mileage: '3.4万公里',
          place: '呼和浩特',
          price: '27.70',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/758204d8085be3b30c0114abfddefb82.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 17,
          carName: '雪佛兰迈锐宝 2013款 2.0L 自动豪华版',
          year: '2013年',
          mileage: '5.0万公里',
          place: '大连',
          price: '9.38',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/3328539214f793b76b288d71ae2b2da3.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 18,
          carName: '开瑞优胜 2010款 1.0L基本型',
          year: '2010年',
          mileage: '6.6万公里',
          place: '泸州',
          price: '0.80',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/60ebe74b3ff36875a0719abfb954a3fe.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 19,
          carName: '大众迈腾 2018款 330TSI DSG 豪华型',
          year: '2018年',
          mileage: '0.1万公里',
          place: '汕头',
          price: '23.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/d4db7f310badfdd892264bbd533ddd9d.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 20,
          carName: '凯迪拉克ATS-L 2014款 25T 舒适型',
          year: '2015年',
          mileage: '5.9万公里',
          place: '洛阳',
          price: '17.30',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/8ac0527f50de490ecec298ddf3faece4.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 21,
          carName: '标致3008 2015款 2.0L 手动经典版',
          year: '2015年',
          mileage: '4.0万公里',
          place: '石家庄',
          price: '10.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/6d056ae1311079c3002b7e43065519ab.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 22,
          carName: '大众速腾 2010款 1.4TSI 自动豪华型',
          year: '2010年',
          mileage: '7.5万公里',
          place: '盐城',
          price: '5.80',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/19907410cc26baf7da4ed6af0c1e7bb2.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 23,
          carName: '宝骏730 2014款 1.5L 手动舒适型 7座',
          year: '2015年',
          mileage: '3.6万公里',
          place: '上海',
          price: '5.50',
          carImg: 'https://image.guazistatic.com/gz01180129/13/34/c0cbbcf60539fdfec2b4fc49b580e11a.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 24,
          carName: '大众捷达 2015款 1.6L 手动时尚型',
          year: '2015年',
          mileage: '1.4万公里',
          place: '哈尔滨',
          price: '5.46',
          carImg: 'https://image1.guazistatic.com/qn180125190559b0e255718fdf226ae1e0cb71d8cea8d8.jpg?imageView2/1/w/287/h/192/q/88'
        },
        {
          id: 25,
          carName: '别克凯越 2013款 1.5L 自动经典型',
          year: '2014年',
          mileage: '3.4万公里',
          place: '大连',
          price: '5.13',
          carImg: 'https://image1.guazistatic.com/qn180129113256f5bf1b87ff1677d04c16b8a9fd5c2216.jpg?imageView2/1/w/287/h/192/q/88'
        },
        {
          id: 26,
          carName: '本田锋范经典 2014款 风尚 1.5L 手动精英版',
          year: '2015年',
          mileage: '2.3万公里',
          place: '昆明',
          price: '6.20',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/03d8925ef2f2478153f64eac8efec106.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 27,
          carName: '丰田卡罗拉 2013款 特装版 1.6L 自动至酷型GL',
          year: '2013年',
          mileage: '4.4万公里',
          place: '曲靖',
          price: '8.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/3c8d7b700b8d70fa0fc1a49ecdce9438.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 28,
          carName: '别克GL8 2014款 3.0L GT豪华商务豪雅版',
          year: '2015年',
          mileage: '3.4万公里',
          place: '呼和浩特',
          price: '27.70',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/758204d8085be3b30c0114abfddefb82.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 29,
          carName: '雪佛兰迈锐宝 2013款 2.0L 自动豪华版',
          year: '2013年',
          mileage: '5.0万公里',
          place: '大连',
          price: '9.38',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/3328539214f793b76b288d71ae2b2da3.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 30,
          carName: '开瑞优胜 2010款 1.0L基本型',
          year: '2010年',
          mileage: '6.6万公里',
          place: '泸州',
          price: '0.80',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/60ebe74b3ff36875a0719abfb954a3fe.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 31,
          carName: '大众迈腾 2018款 330TSI DSG 豪华型',
          year: '2018年',
          mileage: '0.1万公里',
          place: '汕头',
          price: '23.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/39/d4db7f310badfdd892264bbd533ddd9d.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 32,
          carName: '凯迪拉克ATS-L 2014款 25T 舒适型',
          year: '2015年',
          mileage: '5.9万公里',
          place: '洛阳',
          price: '17.30',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/8ac0527f50de490ecec298ddf3faece4.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 33,
          carName: '标致3008 2015款 2.0L 手动经典版',
          year: '2015年',
          mileage: '4.0万公里',
          place: '石家庄',
          price: '10.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/6d056ae1311079c3002b7e43065519ab.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 34,
          carName: '大众速腾 2010款 1.4TSI 自动豪华型',
          year: '2010年',
          mileage: '7.5万公里',
          place: '盐城',
          price: '5.80',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/19907410cc26baf7da4ed6af0c1e7bb2.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 35,
          carName: '宝骏730 2014款 1.5L 手动舒适型 7座',
          year: '2015年',
          mileage: '3.6万公里',
          place: '上海',
          price: '5.50',
          carImg: 'https://image.guazistatic.com/gz01180129/13/34/c0cbbcf60539fdfec2b4fc49b580e11a.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 36,
          carName: '凯迪拉克ATS-L 2014款 25T 舒适型',
          year: '2015年',
          mileage: '5.9万公里',
          place: '洛阳',
          price: '17.30',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/8ac0527f50de490ecec298ddf3faece4.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 37,
          carName: '标致3008 2015款 2.0L 手动经典版',
          year: '2015年',
          mileage: '4.0万公里',
          place: '石家庄',
          price: '10.00',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/6d056ae1311079c3002b7e43065519ab.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 38,
          carName: '大众速腾 2010款 1.4TSI 自动豪华型',
          year: '2010年',
          mileage: '7.5万公里',
          place: '盐城',
          price: '5.80',
          carImg: 'https://image.guazistatic.com/gz01180129/13/38/19907410cc26baf7da4ed6af0c1e7bb2.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        },
        {
          id: 39,
          carName: '宝骏730 2014款 1.5L 手动舒适型 7座',
          year: '2015年',
          mileage: '3.6万公里',
          place: '上海',
          price: '5.50',
          carImg: 'https://image.guazistatic.com/gz01180129/13/34/c0cbbcf60539fdfec2b4fc49b580e11a.jpg@base@tag=imgScale&w=287&h=192&c=1&m=2&q=88'
        }
      ]
    }
  },
  components: {
    sellCarBox
  },
  created () {
    this.$store.commit(SET_HEADER_ACTIVE_TAB, 2)
    this.sellCarAQ = carAQ.sellCarAQ
    this.load()
  },
  mounted () {
    this.sellCar()
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'setLoginMaskStatus'
    ]),
    load () {
      this.initConfig()
    },
    initConfig () {
      this.swiperOption.loopedSlides = this.newSellList.length
      if (this.newSellList.length < 4) {
        this.swiperOption.slidesPerView = this.newSellList.length
      }
      this.loadImageSuccess = true
    },
    sellCar () {
      if (!this.isLogin) {
        this.setLoginMaskStatus({ show: true, view: 'login' })
      } else {
        this.$refs.sellCarBox.$refs.modal.showModal()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#sell-car
  background: url('http://sta.guazistatic.com/node_web/sell-bg.290289564e5360959be1857de09bf8c4.jpg') no-repeat center top
  overflow: auto
  .sell-car-top
    width: 100%
    height: 660px
    text-align: center
    padding-top: 150px
    .title1
      color: $color-white
      font-size: 42px
      font-weight: 700
      margin-bottom: 30px
    .title2
      color: $color-white
      font-size: 20px
      font-weight: 700
    .btn
      margin-top: 30px
      font-size: 0px
      > span
        display: inline-block
        padding: 15px 45px
        border-radius: 3px
        color: $color-white
        font-weight: 700
        font-size: 20px
        cursor: pointer
      .btn-sell
        background: #24b9ffe8
        margin-right: 20px
        &:hover
          background: #24b9ff
      .btn-estimate
        background: #8bc434
        &:hover
          background: #85b931
  #car-aq
    width: 100%
    background: #f8f8f8
    padding: 20px
    padding-top: 80px
    text-align: center
    .aq-title
      font-size: 24px
      font-weight: 700
      color: #495056
      margin: 0 auto
      padding: 5px
      width: 106px
      text-align: center
      .line
        height: 3px
        width: 30px
        margin: 0 auto
        margin-top: 5px
        background: $color-blue
    .aq-wrap
      width: 1170px
      height: 100%
      margin: 0 auto
      padding: 20px
      padding-top: 30px
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: space-between
      flex-wrap: wrap
      .aq-item
        width: 540px
        text-align: left
        margin-left: 20px
        margin-top: 40px
        .aq-top
          height: 60px
          font-size: 0px
          display: flex
          display: -webkit-flex
          flex-direction: row
          align-content: center
          .icon
            display: inline-block
            width: 60px
            height: 60px
            border-radius: 30px
          .question
            display: inline-block
            font-size: 18px
            padding: 6px
            background: #ebebeb
            transform: translateY(-50%)
            margin-left: 10px
            margin-top: 30px
            border-radius: 3px
            &:after
              position: absolute
              top: 50%
              left: -5px
              content: ' '
              width: 10px
              height: 10px
              transform: translateY(-50%) rotate(45deg)
              background: #ebebeb
        .answer
          margin-left: 65px
          font-size: 14px
          line-height: 18px
          color: #2e2e2e
          > li
            margin-bottom: 12px
  #car-new-sell
    width: 100%
    background: $color-white
    padding: 20px
    padding-top: 80px
    text-align: center
    .new-sell-title
      font-size: 24px
      font-weight: 700
      color: #495056
      margin: 0 auto
      padding: 5px
      width: 106px
      text-align: center
      .line
        height: 3px
        width: 30px
        margin: 0 auto
        margin-top: 5px
        background: $color-blue
        margin-bottom: 20px
    .car-list-wrap
        width: 1170px
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        text-align: left
        margin: 16px auto
        .car-list
          width: 280.5px
          height: 314px
          padding: 2px
          margin-bottom: 16px
          .car-img
            width: 100%
            height: 174px
            margin-top: 3px
            background-image: url('~IMAGES/car_default.png')
            background-size: 100% 174px
            > img
              width: 100%
              height: 174px
          .icon-sell
            position: absolute
            background-position: -330px -130px
            width: 60px
            height: 70px
            right: 10px
            top: 0px
            padding-top: 7px
            font-size: 24px
            color: $color-white
            line-height: 22px
            text-align: center
            font-weight: 700
            > p
              font-size: 14px
          .car-info
            width: 100%
            height: 121px
            padding: 20px 5px
            background: $color-white
            .car-name
              font-size: 16px
              color: $color-black
              single-text-ellipsis()
            .car-info-p
              font-size: 14px
              color: #a5abb2
              margin: 12px 0
              > em
                padding: 0 6px
                color: #d2d2d2
                font-style: normal
            .car-info-price
              font-size: 20px
              color: #ff0000cc
              > span
                font-size: 14px

.icon
  background-image: url('~IMAGES/icon_detail.png')
  background-repeat: no-repeat
  display: inline-block
.icon2
  background-image: url('~IMAGES/icon_detail2.png')
  background-repeat: no-repeat
  display: inline-block
</style>
