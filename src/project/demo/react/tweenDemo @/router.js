import React from 'react'
import { createHashHistory } from 'history'
import { Router } from 'react-router-dom'
import {
  CacheRoute as Route,
  CacheSwitch as Switch
} from 'react-router-cache-route'

import Home from './views/Home'
import Easing from './views/Easing'

export const history = createHashHistory()

export default function AppRoute() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} when="always" />
        <Route exact path="/Easing" component={Easing} when="always" />
      </Switch>
    </Router>
  )
}
