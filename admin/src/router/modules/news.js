/**
 * 资讯列表
 */
const newsList = r => require.ensure([], () => r(require('VIEWS/news/newsList.vue')), 'newsList')
/**
 * 编辑资讯
 */
const editNews = r => require.ensure([], () => r(require('VIEWS/news/editNews.vue')), 'editNews')
/**
 * 资讯
 */
const news = r => require.ensure([], () => r(require('VIEWS/news/news.vue')), 'news')

export default [
  {
    path: '/news/newslist',
    name: 'newsList',
    component: newsList
  },
  {
    path: '/news/editnews',
    name: 'editNews',
    component: editNews
  },
  {
    path: '/news/:newsId',
    name: 'news',
    component: news
  }
]
