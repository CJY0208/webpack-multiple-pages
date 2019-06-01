import '__prefix__'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.use(router)

new Vue({
  el: '#root',
  router,
  render: createElement => createElement('App'),
  components: { App }
})
