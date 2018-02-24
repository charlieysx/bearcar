<template>
  <div id="search-car">
      <div class="search-wrap">
        <!-- 面包屑，搜索框 -->
        <div id="search-bread">
            <bread-crumb class="bread-crumb" :items="breadCrumbItems"></bread-crumb>
            <search-car-input 
              @search="toSearch" 
              @search-item="inputSearchItem"
              :searchCarList="innerHotBrands">
            </search-car-input>
        </div>
        <!-- 面包屑，搜索框 结束 -->
        <!-- 车源筛选 -->
        <div id="filter-wrap">
          <ul>
            <!-- 品牌筛选 -->
            <li class="clearfix">
              <div class="filter-name float-left">品牌</div>
              <div class="filter-left float-left">
                <!-- 热门品牌 -->
                <div class="filter-show">
                  <div class="filter-item clearfix">
                    <span 
                      v-for="(brand, index) in innerHotBrands" 
                      :key="index" 
                      :class="{ current: brand.brandId === currentBrand.brandId }" 
                      @click="selectBrand(brand)">
                      {{ brand.brandName }}
                    </span>
                  </div>
                  <div class="more" @click="openMoreBrand()">
                    {{ moreBrandOpen ? '收起' : '全部' }}
                    <i :class="[moreBrandOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                  </div>
                </div>
                <!-- 热门品牌 结束 -->
                <!-- 全部品牌 -->
                <div class="more-brand" :class="{ 'show-more': moreBrandOpen }">
                  <div class="more-brand-wrap" v-for="(brandList, index) in innerAllBrands" :key="index">
                    <ul class="more-brand-list">
                      <li class="clearfix" v-for="(group, key) in brandList" :key="key">
                        <div class="letter">{{ key }}</div>
                        <div class="brand-list clearfix">
                          <span 
                            v-for="(brand, index) in group" 
                            :key="index"
                            @click="selectBrand(brand),moreBrandOpen = false">
                            {{ brand.brandName }}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- 全部品牌 结束 -->
              </div>
            </li>
            <!-- 品牌筛选 结束 -->
            <!-- 车系筛选 -->
            <li class="clearfix">
              <div class="filter-name float-left">车系</div>
              <div class="filter-left float-left">
                <!-- 热门车系 -->
                <div class="filter-show">
                  <div class="filter-item clearfix">
                    <span 
                      v-for="(series, index) in innerHotSeries" 
                      :key="index" 
                      :class="{ current: series.seriesId === currentSeries.seriesId }" 
                      @click="selectSeries(series)">
                      {{ series.seriesName }}
                    </span>
                  </div>
                </div>
                <!-- 热门车系 结束 -->
              </div>
            </li>
            <!-- 车系筛选 结束 -->
            <!-- 价格筛选 -->
            <li class="clearfix">
              <div class="filter-name float-left">价格</div>
              <div class="filter-left float-left">
                <div class="filter-show">
                  <div class="filter-item clearfix">
                    <span 
                      v-for="(price, index) in innerPrice" 
                      :key="index" 
                      :class="{ current: price.priceId === currentPrice.priceId }" 
                      @click="selectPrice(price)">
                      {{ price.priceName }}
                    </span>
                    <!-- 价格输入框 -->
                    <div class="price-input">
                      <span class="input-border">
                        <input v-model="searchPrice1" onKeyUp="value=value.replace(/[^\d]/g,'')" maxlength="3">
                      </span>
                      -
                      <span class="input-border">
                        <input v-model="searchPrice2" onKeyUp="value=value.replace(/[^\d]/g,'')" maxlength="3">
                      </span>
                      万
                      <button @click="searchPrice">确定</button>
                    </div>
                    <!-- 价格输入框 结束 -->
                  </div>
                </div>
              </div>
            </li>
            <!-- 价格筛选 结束 -->
            <!-- 更多筛选 -->
            <li class="clearfix">
              <div class="filter-name float-left">更多</div>
              <div class="filter-left float-left">
                <!-- '更多'选项 -->
                <div class="filter-show">
                  <div class="filter-item clearfix">
                    <div class="select-list"
                      v-for="(more, index) in moreList" 
                      :key="index"
                      :style="[{'display': index < showMoreListIndex ? 'block' : 'none'}]">
                      <select-list
                        :selectModel="more"
                        :mark="more.mark"
                        @item-select="moreItemSelect">
                      </select-list>
                    </div>
                  </div>
                  <div class="more" @click="openMore()">
                    {{ moreOpen ? '收起' : '全部' }}
                    <i :class="[moreOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
                  </div>
                </div>
                <!-- '更多'选项 结束 -->
              </div>
            </li>
            <!-- 品牌筛选 结束 -->
          </ul>
        </div>
        <!-- 车源筛选 结束 -->
        <!-- 筛选结果 -->
        <div id="filter-result">
          <!-- 筛选条件 -->
          <div class="filter-criteria" v-if="filterCount > 0">
            <span>
              当前筛选：
            </span>
            <div class="filter-criteria-item">
                <div class="criteria-item"
                    v-for="(criteria, index) in filterCriteriaList" 
                    :key="index"
                    @click="closeCriteria(criteria)"
                    v-if="criteria.value">
                    <span class="criteria-title" v-if="criteria.item || criteria.tag === 'pi'">
                      {{ criteria.title }} :
                    </span>
                    <span class="criteria-value">
                      {{ criteria.value }}
                    </span>
                    <i class="el-icon-close"></i>
                </div>
            </div>
            <p @click="resetCriteria">重置条件</p>
          </div>
          <!-- 筛选条件 结束 -->
          <span>在 "全国二手车" 中共为您找到53498辆好车</span>
        </div>
        <!-- 筛选结果 结束 -->
        <!-- 结果排序 -->
        <div id="car-order">
          <span class="order-default" :class="[{active : activeOrder.type === 'default'}]" @click="sortResult('default')">
            默认排序
          </span>
          <em>|</em>
          <span class="order-new" :class="[{active : activeOrder.type === 'new'}]" @click="sortResult('new')">
            最新发布
          </span>
          <em>|</em>
          <span class="order-car-price" :class="[{active : activeOrder.type === 'price'}]" @click="sortResult('price')">
            价格
            <i :class="[(activeOrder.sort === 1 && activeOrder.type === 'price') ? 'el-icon-caret-bottom' : 'el-icon-caret-top']"></i>
          </span>
          <em>|</em>
          <span class="order-car-age" :class="[{active : activeOrder.type === 'age'}]" @click="sortResult('age')">
            车龄
            <i :class="[(activeOrder.sort === 1 && activeOrder.type === 'age') ? 'el-icon-caret-bottom' : 'el-icon-caret-top']"></i>
          </span>
          <em>|</em>
          <span class="order-car-mileage" :class="[{active : activeOrder.type === 'mileage'}]" @click="sortResult('mileage')">
            里程
            <i :class="[(activeOrder.sort === 1 && activeOrder.type === 'mileage') ? 'el-icon-caret-bottom' : 'el-icon-caret-top']"></i>
          </span>
        </div>
        <!-- 结果排序 结束 -->
        <!-- 搜索结果 -->
        <div id="car-result-list">
          <ul class="car-list-wrap" v-show="searchResultList.length > 0">
            <li class="car-list" v-for="(item, index) in searchResultList" :key="index" @click="toCarInfo(item)">
              <div class="car-img">
                <div class="icon-guazi icon-sell" v-if="true">急售</div>
                <div class="icon-guazi icon-new" v-else-if="false">新上架</div>
                <img :src="item.carImg" alt="">
              </div>
              <div class="car-info">
                <p class="car-name">{{item.carName}}</p>
                <p class="car-info-p">{{item.year}}<em>|</em>{{item.mileage}}<em>|</em>{{item.place}}</p>
                <p class="car-info-price">
                  {{item.price}}
                  <span>万</span>
                </p>
              </div>
            </li>
          </ul>
          <!-- 分页 -->
          <div class="search-page">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="40"
              @current-change="pageChange"
              :total="1000">
            </el-pagination>
          </div>
          <!-- 分页 结束 -->
        </div>
        <!-- 搜索不到 -->
        <div id="car-empty" v-show="searchResultList.length === 0">
            <img src="~IMAGES/car_empty.png"  alt="">
            <p>
              没有您想要的车?
            </p>
            <p>
              减少筛选条件试试
            </p>
            <div id="filter-result-e">
              <!-- 筛选条件 -->
              <div class="filter-criteria-e" v-if="filterCount > 0">
                <div class="filter-criteria-item-e">
                    <div class="criteria-item-e"
                        v-for="(criteria, index) in filterCriteriaList" 
                        :key="index"
                        @click="closeCriteria(criteria)"
                        v-if="criteria.value">
                        <span class="criteria-title-e" v-if="criteria.item || criteria.tag === 'pi'">
                          {{ criteria.title }} :
                        </span>
                        <span class="criteria-value-e">
                          {{ criteria.value }}
                        </span>
                        <i class="el-icon-close"></i>
                    </div>
                </div>
              </div>
              <!-- 筛选条件 结束 -->
            </div>
        </div>
        <!-- 搜索不到 结束 -->
        <!-- 搜索结果 结束 -->
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import breadCrumb from 'COMMON/breadCrumb/breadCrumb'
import searchCarInput from 'COMMON/searchCarInput/searchCarInput'
import selectList from 'COMMON/selectList/selectList'

import searchCarData from 'DATA/searchCar'

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
          to: {path: '/searchCar'}
        }
      ],
      currentBrand: { brandId: -1, brandName: '不限' },
      currentSeries: { seriesId: -1, seriesName: '不限' },
      currentPrice: { priceId: -1, priceName: '不限' },
      moreBrandOpen: false,
      moreOpen: false,
      innerHotBrands: [],
      innerAllBrands: [],
      innerHotSeries: [],
      innerPrice: [
        {
          priceId: -1,
          priceName: '不限'
        },
        {
          priceId: 0,
          priceName: '3万以下'
        },
        {
          priceId: 1,
          priceName: '3-6万'
        },
        {
          priceId: 2,
          priceName: '6-9万'
        },
        {
          priceId: 3,
          priceName: '9-12万'
        },
        {
          priceId: 4,
          priceName: '12-16万'
        },
        {
          priceId: 5,
          priceName: '16-20万'
        },
        {
          priceId: 7,
          priceName: '20万以上'
        }
      ],
      searchPrice1: '',
      searchPrice2: '',
      moreList: [],
      showMoreListIndex: 10,
      filterCriteriaList: '',
      filterCount: 0,
      activeOrder: {
        type: 'default',
        sort: 0
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
    breadCrumb,
    searchCarInput,
    selectList
  },
  computed: {
    ...mapGetters([
      'currentCity',
      'hotBrands',
      'allSortBrands',
      'hotSeries'
    ])
  },
  created () {
    this.getHotBrand(15)
    this.getHotSeries(10)
    this.getCarBrandSort()
    this.$store.commit(SET_HEADER_ACTIVE_TAB, 1)
    this.breadCrumbItems[1].text = this.currentCity.cityName + '二手车'
    this.moreList = searchCarData.moreSelectList
    this.filterCriteriaList = searchCarData.filterCriteriaList
    // 先展开，为了计算列表宽度
    this.openMore()
  },
  mounted () {
    // 到这里已经计算完成，就收起
    this.openMore()
  },
  watch: {
    currentCity (value) {
      window.location.reload()
    },
    hotBrands (list) {
      if (list.length > 0) {
        this.innerHotBrands = []
        var i = 1
        this.innerHotBrands[0] = this.currentBrand
        for (; i < 16 && list.length > i - 1; ++i) {
          this.innerHotBrands[i] = list[i - 1]
        }
      }
    },
    hotSeries (list) {
      if (list.length > 0) {
        this.innerHotSeries = []
        var i = 1
        this.innerHotSeries[0] = this.currentSeries
        for (; i < 16 && list.length > i - 1; ++i) {
          this.innerHotSeries[i] = list[i - 1]
        }
      }
    },
    allSortBrands (list) {
      this.innerAllBrands = {}
      var i = 0
      var j = 0
      this.innerAllBrands[0] = {}
      this.innerAllBrands[1] = {}
      this.innerAllBrands[2] = {}
      var letter = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ]
      for (i = 0; i < letter.length; ++i) {
        if (letter[i] === 'I') {
          j = 1
        }
        if (letter[i] === 'R') {
          j = 2
        }
        if (list[letter[i]]) {
          this.innerAllBrands[j][letter[i]] = list[letter[i]]
        }
      }
    },
    filterCount (value) {
      for (var key in this.filterCriteriaList) {
        var item = this.filterCriteriaList[key]
        if (item.value) {
          // console.log(item)
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getHotBrand',
      'getCarBrandSort',
      'getHotSeries'
    ]),
    toSearch (value) {
      this.resetCriteria()
      this.filterCriteriaList['sv'].value = value
      this.filterCount++
    },
    selectBrand (brand) {
      this.currentBrand = brand
      var f = 0
      if (brand.brandName === '不限') {
        if (this.filterCriteriaList['br'].value) {
          f = -1
        } else {
          f = 0
        }
        this.filterCriteriaList['br'].value = ''
        this.filterCriteriaList['br'].item = ''
      } else {
        if (this.filterCriteriaList['br'].value) {
          f = 0
        } else {
          f = 1
        }
        this.filterCriteriaList['br'].value = brand.brandName
        this.filterCriteriaList['br'].item = brand
      }
      this.filterCount += f
    },
    selectSeries (series) {
      this.currentSeries = series
      var f = 0
      if (series.seriesName === '不限') {
        if (this.filterCriteriaList['se'].value) {
          f = -1
        } else {
          f = 0
        }
        this.filterCriteriaList['se'].value = ''
        this.filterCriteriaList['se'].item = ''
      } else {
        if (this.filterCriteriaList['se'].value) {
          f = 0
        } else {
          f = 1
        }
        this.filterCriteriaList['se'].value = series.seriesName
        this.filterCriteriaList['se'].item = series
      }
      this.filterCount += f
    },
    selectPrice (price) {
      this.currentPrice = price
      var f = 0
      if (price.priceName === '不限') {
        if (this.filterCriteriaList['pi'].value) {
          f = -1
        } else {
          f = 0
        }
        this.filterCriteriaList['pi'].value = ''
        this.filterCriteriaList['pi'].item = ''
      } else {
        if (this.filterCriteriaList['pi'].value) {
          f = 0
        } else {
          f = 1
        }
        this.filterCriteriaList['pi'].value = price.priceName
        this.filterCriteriaList['pi'].item = price
      }
      this.filterCount += f
    },
    searchPrice () {
      if (this.searchPrice1 || this.searchPrice2) {
        if (this.searchPrice1 === '') {
          this.searchPrice1 = 0
        }
        if (this.searchPrice2 === '') {
          this.searchPrice2 = 999
        }
        var p1 = parseInt(this.searchPrice1)
        var p2 = parseInt(this.searchPrice2)
        if (p1 > p2) {
          var temp = this.searchPrice1
          this.searchPrice1 = this.searchPrice2
          this.searchPrice2 = temp
        }
        if (!this.filterCriteriaList['pi'].value) {
          this.filterCount++
        }
        this.currentPrice = {}
        this.filterCriteriaList['pi'].value = this.searchPrice1 + '-' + this.searchPrice2 + '万元'
      }
    },
    openMoreBrand () {
      this.moreBrandOpen = !this.moreBrandOpen
    },
    openMore () {
      this.moreOpen = !this.moreOpen
      this.showMoreListIndex = this.moreOpen ? 11 : 10
    },
    moreItemSelect (item) {
      var parent = item.parent
      var realItem = item.item
      var f = 0
      if (realItem.value === '不限') {
        if (this.filterCriteriaList[parent.tag].value) {
          f = -1
        } else {
          f = 0
        }
        this.filterCriteriaList[parent.tag].value = ''
        this.filterCriteriaList[parent.tag].item = ''
      } else {
        if (this.filterCriteriaList[parent.tag].value) {
          f = 0
        } else {
          f = 1
        }
        this.filterCriteriaList[parent.tag].value = realItem.value
        this.filterCriteriaList[parent.tag].item = realItem
      }
      this.filterCount += f
    },
    closeCriteria (criteria) {
      this.filterCount--
      this.filterCriteriaList[criteria.tag].value = ''
      this.filterCriteriaList[criteria.tag].item = ''
      switch (criteria.tag) {
        case 'pi':
          this.searchPrice1 = this.searchPrice2 = ''
          this.currentPrice = { priceId: -1, priceName: '不限' }
          return
        case 'br':
          this.currentBrand = { brandId: -1, brandName: '不限' }
          return
        case 'se':
          this.currentSeries = { seriesId: -1, seriesName: '不限' }
          return
      }
      var keys = {'ca': 0, 'csb': 1, 'cm': 2, 'cmi': 3, 'cd': 4, 'ces': 5, 'cs': 6, 'cft': 7, 'cdt': 8, 'cc': 9, 'cco': 10}
      if (keys[criteria.tag] || keys[criteria.tag] === 0) {
        this.moreList[keys[criteria.tag]].mark = !this.moreList[keys[criteria.tag]].mark
      }
    },
    resetCriteria () {
      this.filterCount = 0
      this.currentPrice = { priceId: -1, priceName: '不限' }
      this.currentBrand = { brandId: -1, brandName: '不限' }
      this.currentSeries = { seriesId: -1, seriesName: '不限' }
      this.searchPrice1 = this.searchPrice2 = ''
      for (var k in this.filterCriteriaList) {
        this.filterCriteriaList[k].value = ''
        this.filterCriteriaList[k].item = ''
      }
      var keys = {'ca': 0, 'csb': 1, 'cm': 2, 'cmi': 3, 'cd': 4, 'ces': 5, 'cs': 6, 'cft': 7, 'cdt': 8, 'cc': 9, 'cco': 10}
      for (var key in keys) {
        this.moreList[keys[key]].mark = !this.moreList[keys[key]].mark
      }
    },
    inputSearchItem (item) {
      this.selectBrand(item)
    },
    sortResult (type) {
      if (type === this.activeOrder.type) {
        if (type === 'price' || type === 'age' || type === 'mileage') {
          this.activeOrder.sort = (this.activeOrder.sort === 0 ? 1 : 0)
        }
        return
      }
      this.activeOrder.sort = 0
      this.activeOrder.type = type
    },
    pageChange (currentPage) {
      this.scrollToTop()
    },
    scrollToTop () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    toCarInfo (item) {
      this.$router.push({
        name: 'car',
        params: {
          carId: item.id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#search-car
  padding-bottom: 10px
  background: $color-white
  .search-wrap
    width: 1170px
    margin: 0 auto
    #search-bread
      height: 60px
      display: flex
      display: -webkit-flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .bread-crumb
        margin: 0 0
    #filter-wrap
      background: #fafafa
      border: 1px solid #e6e6e6
      border-bottom: none
      font-size: 14px
      li
        border-bottom 1px solid #e6e6e6
        .more
          width: 70px
          height: 100%
          color: $color-black
          padding: 14px 0px
          text-align: center
          i
            color: #999999
          &:hover
            cursor: pointer
            color: $color-blue
      .float-left
        float: left
      .filter-name
        width: 70px
        height: 100%
        padding: 19px 0px
        background: #fafafa
        text-align: center
      .filter-left
        background: $color-white
        width: 1098px
        padding-top: 5px
        padding-bottom: 5px
        .filter-show
          display: flex
          display: -webkit-flex
          flex-direction: row
          justify-content: space-between
          .filter-item
            width: 1018px
            padding-left: 10px
            .select-list
              color: $color-dark-grey
              margin-top: 8px
              margin-left: 8px
              margin-bottom: 8px
              margin-right: 4px
              cursor: pointer
              float: left
              &:first-child
                margin-left: 8px
            > span
              color: $color-dark-grey
              margin: 10px
              margin-left: 10px
              margin-right: 0px
              padding: 4px 5px
              cursor: pointer
              float: left
              &:hover
                color: $color-blue
              &.current
                color: $color-white
                background: $color-blue
            .price-input
              color: $color-dark-grey
              margin: 10px
              margin-left: 30px
              margin-right: 2px
              cursor: pointer
              float: left
              display: flex
              display: -webkit-flex
              flex-direction: row
              align-items: center
              .input-border
                border: 1px solid #e6e6e6
                padding: 1px 2px
                margin: 0px 4px
                input
                  width: 40px
                  border: none
                  text-align: right
              button
                width: 50px
                padding: 2px 2px
                border: 1px solid $color-blue
                background: $color-white
                color: $color-blue
                margin-left: 4px
                &:hover
                  cursor: pointer
                  background: $color-blue
                  color: $color-white
        .more-brand
          width: 100%
          border-top 1px solid #e6e6e6
          display: none
          &.show-more
            display: flex
            display: -webkit-flex
            flex-direction: row
            justify-content: space-between
          .more-brand-wrap
            .more-brand-list
              font-size: 14px
              li
                padding: 10px
                padding-bottom: 0px
                border-bottom: none
                &:hover
                  background: $color-bg-grey
                  .letter
                    background: $color-dark-blue
                    color: $color-white
              div
                float: left
              .letter
                width: 20px
                height: @width
                line-height: @height
                color: $color-blue
                border: 1px solid $color-border
                border-radius: 4px
                text-align: center
                margin-right: 20px
              .brand-list
                width: 300px
                span
                  color: $color-dark-grey
                  margin-right: 4px
                  padding: 4px 4px
                  cursor: pointer
                  float:left
                  &:hover,
                  &.current
                    color: $color-blue
    #filter-result
      font-size: 14px
      background: $color-white
      width: 100%
      padding: 15px 5px
      > span
        color: #888888
      .filter-criteria
        display: flex
        display: -webkit-flex
        flex-direction: row
        color: #888888
        margin-bottom: 5px
        > span
          margin-top: 5px
        > p
          color: $color-black
          margin: 0px 15px
          cursor: pointer
          height: 15px
          margin-top: 5px
          &:hover
            color: $color-blue
        .filter-criteria-item
          margin-left: 4px
          max-width: 960px
          .criteria-item
            float: left
            padding: 5px
            margin-left: 10px
            margin-bottom: 10px
            border: 1px solid #e6e6e6
            cursor: pointer
            &:hover
              border: 1px solid $color-blue
              i
                color: $color-blue
            .criteria-title
              color: $color-dark-grey
            .criteria-value
              color: $color-blue
    #car-order
      font-size: 14px
      color: $color-dark-grey
      border-bottom: 1px solid #e6e6e6
      padding: 10px
      text-align: right
      > span
        cursor: pointer
        padding: 5px
        &:hover,
        &.active
          color: $color-blue
      > em
        color: #d2d2d2
        font-style: normal
    #car-empty
      width: 100%
      display: flex
      display: -webkit-flex
      align-content: center
      flex-direction: column
      text-align: center
      padding: 100px 0px
      > img
        width: 400px
        height: 150px
        margin: 0 auto
      > p
        margin: 20px
      #filter-result-e
        font-size: 14px
        background: $color-white
        padding: 15px 5px
        > span
          color: #888888
        .filter-criteria-e
          color: #888888
          margin-bottom: 5px
          > span
            margin-top: 5px
          > p
            color: $color-black
            margin: 0px 15px
            cursor: pointer
            height: 15px
            margin-top: 5px
            &:hover
              color: $color-blue
          .filter-criteria-item-e
            display: flex
            display: -webkit-flex
            flex-direction: row
            justify-content: center
            flex-wrap: wrap
            padding-left: 200px
            padding-right: 200px
            .criteria-item-e
              padding: 5px
              margin-left: 10px
              margin-bottom: 10px
              border: 1px solid #e6e6e6
              cursor: pointer
              &:hover
                border: 1px solid $color-blue
                i
                  color: $color-blue
              .criteria-title-e
                color: $color-dark-grey
              .criteria-value-e
                color: $color-blue
    #car-result-list
      .car-list-wrap
        width: 1170px
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        margin-top: 16px
        .car-list
          width: 280.5px
          height: 314px
          padding: 8px
          margin-bottom: 16px
          &:hover
            cursor: pointer
            box-shadow: 1px 1px 10px 3px rgba(15, 166, 255, .1)
          .car-img
            width: 100%
            height: 174px
            margin-top: 3px
            background-image: url('~IMAGES/car_default.png')
            background-size: 100% 174px
            > img
              width: 100%
              height: 174px
            .icon-new,
            .icon-sell
              position: absolute
              background-position: -100px -100px
              width: 60px
              height: 70px
              margin-top: -4px
              margin-left: 5px
              padding-top: 7px
              font-size: 16px
              color: $color-white
              line-height: 38px
              text-align: center
              font-weight: 700
            .icon-new
              background-position: -36px -100px
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
    .search-page
      width: 100%
      padding-bottom: 40px
      display: flex
      display: -webkit-flex
      flex-direction: row
      justify-content: center


.icon-guazi
  background-image: url('~IMAGES/icon_guazi.png')
  background-repeat: no-repeat
  display: inline-block
</style>