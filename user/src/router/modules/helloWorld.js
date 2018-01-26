const helloWorld = r => require.ensure([], () => r(require('VIEWS/test/HelloWorld.vue')), 'helloWorld')

export default [
  {
    path: '/hello',
    name: 'hello',
    component: helloWorld
  }
]
