<template>
  <div id="news">
    <div id="news-wrap">
      <div class="news-list">
        <ul class="all-list-ul">
          <li
            v-for="(news, index) in allNewsList"
            :key="index">
            <div class="news-img">
                <img :src="news.image" alt="">
            </div>
            <div class="news-title">{{ news.title }}</div>
            <div class="news-time">{{ news.time }}</div>
            <div class="news-content">{{ news.content }}</div>
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
      <div class="hot-news">
        <p>热门资讯</p>
        <ul class="hot-list-ul">
          <li
            v-for="(hotNews, index) in hotNewsList"
            :key="index">
            <div class="hot-news-title">• {{ hotNews.title }}</div>
            <div class="hot-news-view"><i class="el-icon-view"></i>{{ hotNews.views }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import {
  SET_HEADER_ACTIVE_TAB
} from 'STORE/mutation-types'

export default {
  name: 'news',
  data () {
    return {
      hotNewsList: [
        {
          id: 0,
          title: '编辑开啥车 编辑部高尔夫使用感受',
          views: 213213
        },
        {
          id: 1,
          title: '高保值车型年终盘点第十名本田CR-V',
          views: 123213
        },
        {
          id: 2,
          title: '车型保值就是好 瑕疵凯美瑞照样抢着要',
          views: 21322
        },
        {
          id: 3,
          title: '秒完天地秒空气 本田思域到底能秒谁',
          views: 3213
        },
        {
          id: 4,
          title: '编辑心凉了 原来是用生命在开事故车！',
          views: 312
        },
        {
          id: 5,
          title: '小车也有大惊喜，7年二手车到底值不值',
          views: 123
        },
        {
          id: 6,
          title: '很可能颠覆你的认知 关于奔驰G级的历史',
          views: 123
        },
        {
          id: 7,
          title: '想不到法拉利被兰博基尼打脸 到底为何',
          views: 12
        }
      ],
      allNewsList: [
        {
          id: 0,
          title: '1万块的二手F0也加全合成？廉价车要不要加全合成机油？',
          content: '机油大家都知道是全合成的好，很多人也会选择更换这种，但是一些购买廉价车型的车主心理会犯嘀咕，两三万买的车有必要用全合成机油？很多人都说廉价车矿物油就够了，加全合成反而对车不好！廉价车到底加哪种机油好？',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201802/05/181328it7axm0xh20hh2u0.jpg',
          time: ' 2018-1-31'
        },
        {
          id: 0,
          title: '20万的车制造成本还不到10万？汽车的哪个部位最值钱？',
          content: '汽车的售价虽然与前些年相比已经便宜了不少，但它的售价还是要比生活中的其他消费品贵出很多。辛辛苦苦攒了好久钱才买回来的车，它的制造成本是多少？哪个部位最值钱？',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201802/06/110720x0pozr7a1caa7q0r.jpg',
          time: '2018-1-26'
        },
        {
          id: 0,
          title: '新式碰瓷频发，成功率100%！赶紧收藏这篇防碰瓷指南！',
          content: '随着汽车数量的增加，“碰瓷”这种最早出现在古玩行业的讹诈手段，越来越多的出现在马路上。最近各种新式碰瓷手段频出，而且已与以往“傻笨”的碰瓷手段不同，新式碰瓷往往都采用隐蔽手段，能够成功躲避行车记录仪。',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201801/16/174158uxgs927mzxa2x9j0.jpg',
          time: '2018-1-16'
        },
        {
          id: 0,
          title: '美系、日系完爆德系！沃德十佳发动机二手车能买到谁？',
          content: '年末是一年中最让人期待的时刻，除了盼了一年的年终奖和假期，还能看到各种有意思的年终总结、年终排行。近日，美国权威汽车杂志《Ward\'s Auto World》公布了2018沃德十佳发动机，今年的沃德十佳花落谁家？',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201801/10/185735jdbxbasy0xun0nn1.jpg',
          time: '2018-1-2'
        },
        {
          id: 0,
          title: '冬季挡风玻璃起雾、结冰怎么破？老司机教你处理小妙招！',
          content: '冬季到了，由于车内车外温差大，经常会出现挡风玻璃起雾的现象。另外在北方夜里气温都在零下，车辆在室外放置一夜后，挡风玻璃就会出现结冰的现象，而且这层薄薄的冰霜清理起来非常麻烦，搞不好还会伤到挡风玻璃。',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201801/02/184929doj6ozzqn1j4q8hf.jpg',
          time: '2017-12-27'
        },
        {
          id: 0,
          title: '注意！机动车新规1月1日开始实施！汽车要配反光背心是谣言',
          content: '最近网上传言：2018年1月1日开始，所有车辆都要配备至少1件反光背心，不然车辆过不了年检！难道跟贫僧一样的车主们又要掏钱买反光背心了？',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201801/02/164612i97799pjzpmkp66k.jpg',
          time: '2017-12-29'
        },
        {
          id: 0,
          title: '买车要注意！原来车企最爱偷偷减配这些部位！',
          content: '说起偷工减料大家先想到的都是建筑行业中的那些豆腐渣工程。其实最近几年由于汽车行业竞争越来越激烈，利润越来越低，汽车的“减配风”也越来越严重，今天贫僧就盘点一下汽车上那些最爱被车企们偷工减料的部位。',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201712/25/120522jzhsbzh4sg9d41lb.jpg',
          time: '2017-12-22'
        },
        {
          id: 0,
          title: '谁说冬季热车等于毁车？不热车才是真的毁车！',
          content: '冬天的寒意越来越明显了，北方的最低气温早已跌到了0℃以下。每年到了冬季老司机们都会为要不要热车争个昏天黑地，贫僧今天不争论直接说观点，冬季需要热车！',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201712/13/172647qyc1vqobhyqnkyrz.jpg',
          time: '2017-12-6'
        },
        {
          id: 0,
          title: '五方店 - 聊聊“翻新”呗！',
          content: '最近啊，老有客户问我啊，这车买完了你们能给整整不？那必须的能整啊！',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201712/07/193006fupnufbu7pmurbjx.jpg',
          time: '2017-12-2'
        },
        {
          id: 0,
          title: '强势安利！几款全球都畅销的SUV',
          content: '最近国际知名市场调查机构《Focus2Move》针对150多个国家由2017年1月至9月的销量数据统计公布了2017年全球最畅销SUV车型。前10位当中，就有来自我们中国的神车哈弗H6。在这份榜单中，H6排名第6，666啊！',
          image: 'https://misc.rrcimg.com/data/attachment/portal/201712/07/175113bgocqwkomnnoe4vq.jpg',
          time: '2017-12-6'
        }
      ]
    }
  },
  created () {
    this.$store.commit(SET_HEADER_ACTIVE_TAB, 3)
  },
  methods: {
    pageChange (currentPage) {
      this.scrollToTop()
    },
    scrollToTop () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
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
            font-size: 16px
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
              color: #495056
              margin-right: 10px
</style>
