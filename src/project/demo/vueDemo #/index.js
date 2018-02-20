import 'babel-polyfill'
import Vue from 'vue'

import App from './App'

Vue.config.productionTip = true

new Vue({
  el: '#app',
  render: createElement => createElement('App'),
  components: { App }
})
