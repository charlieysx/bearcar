<template>
  <div id="news">
    <div id="news-wrap">
      <div class="title">
        {{ news.newsTitle ? news.newsTitle : '文章不存在'}}
        <p>
          <span>来源：{{ news.from }}</span>
          <i class="el-icon-date"></i>{{ news.newsTime | time('YYYY-MM-DD') }}
          <i class="el-icon-view"></i>{{ news.seeCount }}
        </p>
      </div>
      <div class="news-content" ref="content">
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
  name: 'news',
  data () {
    return {
      news: {
        newsTitle: ''
      }
    }
  },
  created () {
    this.$store.commit(SET_HEADER_ACTIVE_TAB, -1)
    let newsId = this.$route.params.newsId
    this.getNewsInfo(newsId)
      .then((data) => {
        this.news = data
        this.$refs.content.innerHTML = data.newsContent.replace(new RegExp('data-src', 'gm'), 'src')
      })
  },
  methods: {
    ...mapActions([
      'getNewsInfo'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#news
  width: 100%
  min-height: calc(110vh - 110px)
  background: $color-bg-blue
  padding-top: 20px
  #news-wrap
    width: 800px
    margin: 0 auto
    padding: 20px
    background: $color-white
    .title
      font-size: 18px
      color: $color-black
      border-bottom 1px solid #eeeeee
      padding: 5px 0
      margin-bottom: 20px
      > p
        font-size: 14px
        color: #999999
        margin-top: 10px
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
    .news-content
      overflow: hidden
</style>
