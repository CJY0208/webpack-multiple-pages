import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.use(router)

new Vue({
  el: '#app',
  router,
  render: createElement => createElement('App'),
  components: { App }
})
