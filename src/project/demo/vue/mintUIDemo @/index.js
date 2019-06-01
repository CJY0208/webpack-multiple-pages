import '__prefix__'
import Vue from 'vue'
import { DatetimePicker } from 'mint-ui'
import App from './App'

Vue.component(DatetimePicker.name, DatetimePicker)

new Vue({
  el: '#root',
  render: createElement => createElement('App'),
  components: { App }
})
