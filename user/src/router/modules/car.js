/**
 * 二手车详情页面
 */
const car = r => require.ensure([], () => r(require('VIEWS/car/car.vue')), 'car')

export default [
  {
    path: '/car/:carId',
    name: 'car',
    component: car
  }
]
