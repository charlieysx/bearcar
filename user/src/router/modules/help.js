const help = r => require.ensure([], () => r(require('VIEWS/help/help.vue')), 'help')

export default [
  {
    path: '/help',
    name: 'help',
    component: help
  }
]
