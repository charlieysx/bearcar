const waiting = r => require.ensure([], () => r(require('VIEWS/carList/waiting.vue')), 'waiting')
const checking = r => require.ensure([], () => r(require('VIEWS/carList/checking.vue')), 'checking')
const selling = r => require.ensure([], () => r(require('VIEWS/carList/selling.vue')), 'selling')
const ordering = r => require.ensure([], () => r(require('VIEWS/carList/ordering.vue')), 'ordering')
const under = r => require.ensure([], () => r(require('VIEWS/carList/under.vue')), 'under')

export default [
  {
    path: '/carlist/waiting',
    name: 'waiting',
    component: waiting,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/carlist/checking',
    name: 'checking',
    component: checking,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/carlist/selling',
    name: 'selling',
    component: selling,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/carlist/ordering',
    name: 'ordering',
    component: ordering,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/carlist/under',
    name: 'under',
    component: under,
    meta: {
      requireAuth: true
    }
  }
]
