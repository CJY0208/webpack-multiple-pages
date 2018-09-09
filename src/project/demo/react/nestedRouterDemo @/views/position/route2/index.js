import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom'

import Sub1 from './sub1'
import Sub2 from './sub2'
import Sub3 from './sub3'

export default () => (
  <div>
    <div className="nav">
      <NavLink to="/position/route2/sub1">sub1</NavLink>
      <NavLink to="/position/route2/sub2">sub2</NavLink>
    </div>
    <Switch>
      <Route path="/position/route2/sub1" component={Sub1} />
      <Route path="/position/route2/sub2" component={Sub2} />
      <Redirect to="/position/route2/sub1" />
    </Switch>
  </div>
)
