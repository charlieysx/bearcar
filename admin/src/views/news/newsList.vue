<template>
  <div id="news-list">
    <div class="title">资讯-资讯列表  （总数：{{ count }}）</div>
    <div id="news-wrap">
      <div class="news-list" v-if="allNewsList.length > 0">
        <ul class="all-list-ul">
          <li
            v-for="(news, index) in allNewsList"
            :key="index">
            <div class="news-img">
                <img :src="news.newsImg" alt="">
            </div>
            <div class="middle">
              <div class="news-title" @click="previewNews(news.newsId)">{{ news.newsTitle }}</div>
              <div class="news-content">{{ news.newsInfo }}</div>
              <div class="news-bottom">
                <span>来源：{{ news.from }}</span>
                <i class="el-icon-date"></i>{{ news.newsTime | time('YYYY-MM-DD') }}
                <i class="el-icon-view"></i>{{ news.seeCount }}
              </div>
            </div>
            <i class="icon-btn el-icon-delete" @click="_deleteNews(news.newsId)"></i>
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
      <no-data text="您没有发布过资讯哦~" v-else></no-data>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import noData from 'COMMON/noData/noData'

export default {
  name: 'news-list',
  components: {
    noData
  },
  data () {
    return {
      allNewsList: [],
      count: 0,
      currentPage: 0,
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
    },
    previewNews (newsId) {
      this.$router.push({
        name: 'news',
        params: {
          newsId: newsId
        }
      })
    },
    _deleteNews (newsId) {
      this.$confirm('是否删除该文章', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNews(newsId)
          .then((data) => {
            this.currentPage = 0
          })
      }).catch(() => {
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
    font-weight: bold
  #news-wrap
    width: 1180px
    margin: 0 auto
    padding: 20px 0px
    .news-list
      width: 100%
      .all-list-ul
        > li
          width: 100%
          margin-bottom: 20px
          background: $color-white
          display: flex
          display: -webkit-flex
          flex-direction: row
          align-items: center
          &:hover
            box-shadow: 1px 1px 10px 3px rgba(15, 166, 255, .1) 
            .icon-btn
              opacity: 1
          .middle
            flex: 1
            margin-right: 20px
            .news-title
              font-size: 18px
              single-text-ellipsis()
              cursor: pointer
              color: #495056
              font-weight: bold
              padding: 10px
              &:hover
                color: $color-blue
            .news-content
              width: 100%
              margin-left: 10px
              margin-bottom: 10px
              font-size: 14px
            .news-bottom
              margin-left: 10px
              margin-bottom: 10px
              height: 16px
              display: flex
              display: -webkit-flex
              flex-direction: row
              font-size: 12px
              > span
                flex: 1
              > i
                margin-right: 5px
                margin-left: 15px
                &:first-child
                  margin-left: 0px
          .icon-btn
            font-size: 24px
            margin: 0 20px
            color: #aaaaaa
            cursor: pointer
            opacity: 0
            &:hover
              color: #666666
          .news-img
            width: auto
            height: 120px
            background-image: url('~IMAGES/car_default.png') no-repeat
            background-size: auto 120px
            > img
              width: auto
              height: 120px
      .search-page
        width: 100%
        padding-bottom: 40px
        display: flex
        display: -webkit-flex
        justify-content: center
</style>
