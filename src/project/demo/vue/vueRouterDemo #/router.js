import Vue from 'vue'
import Router from 'vue-router'

import Home from './view/Home'
import About from './view/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})
