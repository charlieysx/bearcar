/**
 * 资讯
 */
const news = r => require.ensure([], () => r(require('VIEWS/news/news.vue')), 'news')

export default [
  {
    path: '/news',
    name: 'news',
    component: news
  }
]
