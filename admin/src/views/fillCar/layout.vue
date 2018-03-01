<template>
  <div id="fill-car-layout">
    <transition name="component-fade" mode="out-in">
      <component 
        ref="viewComponents" 
        :is="stepView" 
        :carId="carId" 
        @next="next">
      </component>
    </transition>
  </div>
</template>

<script>
import stepOne from 'VIEWS/fillCar/stepOne'
import stepTwo from 'VIEWS/fillCar/stepTwo'
import stepThree from 'VIEWS/fillCar/stepThree'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'fill-car-layout',
  props: ['carId'],
  components: {
    stepOne,
    stepTwo,
    stepThree
  },
  data () {
    return {
      stepView: 'stepOne',
      view: {
        '1': 'stepOne',
        '2': 'stepTwo',
        '3': 'stepThree'
      }
    }
  },
  created () {
    this.stepView = this.view[this.fillStep]
  },
  watch: {
    fillStep (value) {
      this.stepView = this.view[value]
    }
  },
  computed: {
    ...mapGetters([
      'fillStep'
    ])
  },
  methods: {
    ...mapActions([
      'getFillStep',
      'getFillCarInfo',
      'setFillStep'
    ]),
    next (step) {
      this.setFillStep(step)
    }
  }
}
</script>

<style lang="stylus" scoped>
#fill-car-layout
  width: 100%

.component-fade-enter-active, .component-fade-leave-active
  transition: opacity .2s ease;
.component-fade-enter, .component-fade-leave-to
  opacity: 0;
</style>
