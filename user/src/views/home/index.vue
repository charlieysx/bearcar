<template>
  <div id="index">
    <banner-view
      class="banner-view"
      :banners="banners"
      @banner-click="bannerClick"
      @banner-show="bannerShow">
    </banner-view>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import bannerView from 'COMMON/banner/bannerView'

export default {
  name: 'home',
  data () {
    return {
      banners: [
        {
          id: 0,
          imgUrl: 'https://image.guazistatic.com/gz01171128/18/09/9821b23ae5abc8c309dac11cab305a52.jpg@base@tag=imgScale'
        },
        {
          id: 1,
          imgUrl: 'https://image.guazistatic.com/gz01171128/18/09/5cebdbbdc3088ba927a5745ef0feb55d.jpg@base@tag=imgScale'
        },
        {
          id: 2,
          imgUrl: 'https://image.guazistatic.com/gz01180117/17/52/4985094adcba37aa0854ce02bf8d4695.jpg@base@tag=imgScale'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentCity'
    ])
  },
  created () {
  },
  watch: {
    currentCity (val) {
    }
  },
  methods: {
    ...mapActions([
    ]),
    ...mapMutations({
    }),
    bannerClick (banner) {
      console.log('click-----------')
      console.log(banner)
      console.log('end-----------')
    },
    bannerShow (banner) {
      console.log('show-----------')
      console.log(banner)
      console.log('end-----------')
    }
  },
  components: {
    bannerView
  }
}
</script>
<style lang="stylus" scoped>
  @import '~STYLUS/color.styl'
</style>

