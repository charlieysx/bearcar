const myCar = r => require.ensure([], () => r(require('VIEWS/myCar/layout.vue')), 'myCar')
const waiting = r => require.ensure([], () => r(require('VIEWS/myCar/waiting.vue')), 'waiting')
const selling = r => require.ensure([], () => r(require('VIEWS/myCar/selling.vue')), 'selling')
const ordering = r => require.ensure([], () => r(require('VIEWS/myCar/ordering.vue')), 'ordering')
const under = r => require.ensure([], () => r(require('VIEWS/myCar/under.vue')), 'under')
const myCarDetail = r => require.ensure([], () => r(require('VIEWS/car/myCarDetail.vue')), 'myCarDetail')

export default [
  {
    path: '/mycar',
    name: 'myCar',
    component: myCar,
    redirect: { name: 'waiting' },
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'waiting',
        name: 'waiting',
        component: waiting,
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'selling',
        name: 'selling',
        component: selling,
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'ordering',
        name: 'ordering',
        component: ordering,
        meta: {
          requireAuth: true
        }
      },
      {
        path: 'under',
        name: 'under',
        component: under,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/carDetail/:carId',
    name: 'cardetail',
    component: myCarDetail,
    meta: {
      requireAuth: true
    }
  }
]
