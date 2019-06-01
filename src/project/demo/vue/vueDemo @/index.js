import '__prefix__'
import Vue from 'vue'
import 'vuex'

import App from './App'

Vue.config.productionTip = true

new Vue({
  el: '#root',
  render: createElement => createElement('App'),
  components: { App }
})
