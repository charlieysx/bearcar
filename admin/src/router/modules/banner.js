const banner = r => require.ensure([], () => r(require('VIEWS/banner/banner.vue')), 'banner')

export default [
  {
    path: '/banner',
    name: 'banner',
    component: banner,
    meta: {
      requireAuth: true
    }
  }
]
