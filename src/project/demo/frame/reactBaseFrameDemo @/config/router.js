import React from 'react'
import { Route } from 'react-router-dom'
import { CacheRoute, CacheSwitch as Switch } from 'react-router-cache-route'

import Home from '../views/Home'
import SubPage from '../views/SubPage'

const AppRouter = () => (
  <Switch>
    <CacheRoute
      exact
      path="/"
      component={Home}
      className="__CacheRoute__wrapper"
    />
    <Route exact path="/sub-page" component={SubPage} />
  </Switch>
)

export default AppRouter
