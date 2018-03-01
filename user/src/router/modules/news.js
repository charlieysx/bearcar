/**
 * 资讯
 */
const newsList = r => require.ensure([], () => r(require('VIEWS/news/newsList.vue')), 'newsList')
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
    path: '/news/:newsId',
    name: 'news',
    component: news
  }
]
