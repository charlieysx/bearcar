<template>
  <div id="news-list">
    <div class="title">资讯-资讯列表  （总数：{{ sizeAll }}）</div>
    <div id="news-wrap">
      <div class="news-list">
        <ul class="all-list-ul">
          <li
            v-for="(news, index) in allNewsList"
            :key="index">
            <div class="news-img">
                <img :src="news.newsImg" alt="">
            </div>
            <div class="news-title">{{ news.newsTitle }}</div>
            <div class="news-time">{{ news.newsTime | time('YYYY-MM-DD') }}</div>
            <div class="news-content">{{ news.newsInfo }}</div>
          </li>
        </ul>
        <!-- 分页 -->
        <div class="search-page">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="40"
            @current-change="pageChange"
            :total="40">
          </el-pagination>
        </div>
        <!-- 分页 结束 -->
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'news-list',
  data () {
    return {
      allNewsList: [],
      sizeAll: 0,
      params: {
        page: 0,
        pageSize: 20
      }
    }
  },
  created () {
    this.update()
  },
  methods: {
    ...mapActions([
      'getNewsList'
    ]),
    pageChange (currentPage) {
      this.scrollToTop()
      this.params.page = currentPage - 1
      this.update()
    },
    scrollToTop () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    update () {
      this.getNewsList(this.params)
        .then((data) => {
          this.allNewsList = data.list
          this.sizeAll = data.sizeAll
        })
        .catch(() => {
          this.allNewsList = []
          this.sizeAll = 0
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#news-list
  width: 100%
  min-height: calc(110vh - 110px)
  background: $color-bg-blue
  .title
    text-align: center
    background: #545c64
    color: $color-white
    font-size: 18px
    height: 70px
    line-height: 18px
    padding: 26px
  #news-wrap
    width: 1380px
    margin: 0 auto
    padding: 20px 0px
    .news-list
      width: 100%
      .all-list-ul
        display: flex
        display: -webkit-flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-between
        > li
          width: 680px
          cursor: pointer
          margin-bottom: 20px
          background: $color-white
          .news-title
            font-size: 18px
            single-text-ellipsis()
            cursor: pointer
            color: #495056
            font-weight: bold
            padding: 10px
          .news-time
            font-size: 12px
            color: #999999
            margin-left: 10px
          .news-img
            width: 100%
            height: 240px
            background-image: url('~IMAGES/car_default.png')
            background-size: 100% 240px
            > img
              width: 100%
              height: 240px
          .news-content
            width: 100%
            padding: 10px
            font-size: 14px
          &:hover
            box-shadow: 1px 1px 10px 3px rgba(15, 166, 255, .1) 
      .search-page
        width: 100%
        padding-bottom: 40px
        display: flex
        display: -webkit-flex
        justify-content: center
</style>
