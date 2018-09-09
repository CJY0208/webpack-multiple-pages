import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom'

import Position from './views/position'

const App = () => (
  <Router>
    <Switch>
      <Route path="/position" component={Position} />
      <Redirect to="/position" />
    </Switch>
  </Router>
)

export default App
