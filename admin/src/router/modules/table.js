const user = r => require.ensure([], () => r(require('VIEWS/table/user.vue')), 'user')
const admin = r => require.ensure([], () => r(require('VIEWS/table/admin.vue')), 'admin')

export default [
  {
    path: '/table/user',
    name: 'user',
    component: user,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/table/admin',
    name: 'admin',
    component: admin,
    meta: {
      requireAuth: true
    }
  }
]
