<template>
  <div id="home">
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      //
    }
  },
  created () {
    this.$store.commit('SET_LEFT_NAV_ACTIVE_ITEM', '1')
  }
}
</script>

<style lang="stylus" scoped>
#home
  width: 100%
</style>
