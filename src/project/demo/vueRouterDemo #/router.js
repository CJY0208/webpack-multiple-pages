import Vue from 'vue'
import Router from 'vue-router'

import View1 from './view/View1'
import View2 from './view/View2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: View1
    },
    {
      path: '/view2',
      component: View2
    }
  ]
})
