/**
 * 二手车详情页面
 */
const car = r => require.ensure([], () => r(require('VIEWS/car/car.vue')), 'car')
/**
 * 卖车页面
 */
const sellCar = r => require.ensure([], () => r(require('VIEWS/car/sellCar.vue')), 'sellCar')

export default [
  {
    path: '/car/:carId',
    name: 'car',
    component: car
  },
  {
    path: '/sellcar',
    name: 'sellCar',
    component: sellCar
  }
]
