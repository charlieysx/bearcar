<template>
  <div id="newsList">
    <div id="news-wrap">
      <div class="news-list">
        <ul class="all-list-ul">
          <li
            v-for="(news, index) in allNewsList"
            :key="index"
            @click="previewNews(news.newsId)">
            <div class="news-img">
                <img :src="news.newsImg" alt="">
            </div>
            <div class="news-title">{{ news.newsTitle }}</div>
            <p class="news-time">
              <span>来源：{{ news.from }}</span>
              <i class="el-icon-date"></i>{{ news.newsTime | time('YYYY-MM-DD') }}
              <i class="el-icon-view"></i>{{ news.seeCount }}
            </p>
            <div class="news-content">{{ news.newsInfo }}</div>
          </li>
        </ul>
        <!-- 分页 -->
        <div class="search-page">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="params.pageSize"
            @current-change="pageChange"
            :current-page="currentPage"
            :total="count">
          </el-pagination>
        </div>
        <!-- 分页 结束 -->
      </div>
      <div class="hot-news">
        <p>热门资讯</p>
        <ul class="hot-list-ul">
          <li
            v-for="(hotNews, index) in hotNewsList"
            :key="index">
            <div class="hot-news-title" @click="previewNews(hotNews.newsId)">• {{ hotNews.newsTitle }}</div>
            <div class="hot-news-view">
              <i class="el-icon-date"></i>{{ hotNews.newsTime | time('YYYY-MM-DD') }}
              <i class="el-icon-view"></i>{{ hotNews.seeCount }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

export default {
  name: 'newsList',
  data () {
    return {
      hotNewsList: [],
      allNewsList: [],
      count: 0,
      currentPage: 1,
      params: {
        page: 0,
        pageSize: 10
      }
    }
  },
  created () {
    this.$store.commit(SET_HEADER_ACTIVE_TAB, 3)
    this.update()
  },
  methods: {
    ...mapActions([
      'getHotNewsList',
      'getNewsList',
      'deleteNews'
    ]),
    pageChange (currentPage) {
      this.scrollToTop()
      this.params.page = currentPage - 1
      this.currentPage = currentPage
      this.update()
    },
    scrollToTop () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    update () {
      this.getNewsList(this.params)
        .then((data) => {
          this.allNewsList = data.list
          this.count = data.count
        })
        .catch(() => {
          this.allNewsList = []
          this.count = 0
        })
      this.getHotNewsList(8)
        .then((data) => {
          this.hotNewsList = data
        })
        .catch(() => {
          this.hotNewsList = []
        })
    },
    previewNews (newsId) {
      this.$router.push({
        name: 'news',
        params: {
          newsId: newsId
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#newsList
  width: 100%
  min-height: calc(110vh - 110px)
  background: $color-bg-blue
  #news-wrap
    width: 1000px
    margin: 0 auto
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: space-between
    padding: 20px 0px
    .news-list
      width: 680px
      .all-list-ul
        > li
          width: 100%
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
            margin-right: 10px
            display: flex
            display: -webkit-flex
            flex-direction: row
            > span
              flex: 1
            > i
              margin-right: 5px
              margin-left: 15px
              &:first-child
                margin-left: 0px
          .news-img
            width: 100%
            height: 240px
            margin-top: 3px
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
        flex-direction: row
        justify-content: center
    .hot-news
      position: fixed
      margin-left: 700px
      width: 300px
      background: $color-white
      padding: 5px
      > p
        margin: 10px
        padding-bottom: 10px
        font-size: 20px
        border-bottom: 1px solid #e8e8e8
        color: #495056
        font-weight: bold
      .hot-list-ul
        > li
          width: 100%
          padding: 5px 10px
          .hot-news-title
            padding-right: 10px
            font-size: 14px
            single-text-ellipsis()
            cursor: pointer
            color: #495056
            &:hover
              color: $color-blue
          .hot-news-view
            font-size: 12px
            color: #999999
            margin-left: 20px
            margin-top: 6px
            margin-bottom: 10px
            > i
              margin-right: 5px
              margin-left: 15px
              &:first-child
                margin-left: 0px
</style>
