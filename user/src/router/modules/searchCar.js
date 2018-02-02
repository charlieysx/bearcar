/**
 * 搜索二手车页面
 */
const searchCar = r => require.ensure([], () => r(require('VIEWS/searchCar/index.vue')), 'searchCar')

export default [
  {
    path: '/searchCar/',
    name: 'searchCar',
    component: searchCar
  },
  {
    path: '/searchCar/:keyword',
    name: 'searchCarByKeyword',
    component: searchCar
  }
]
