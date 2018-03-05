const carDetail = r => require.ensure([], () => r(require('VIEWS/car/myCarDetail.vue')), 'carDetail')
const fillCar = r => require.ensure([], () => r(require('VIEWS/car/fillCar.vue')), 'fillCar')

export default [
  {
    path: '/carDetail/:carId',
    name: 'cardetail',
    component: carDetail,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/fillCar/:carId',
    name: 'fillcar',
    component: fillCar,
    meta: {
      requireAuth: true
    }
  }
]
