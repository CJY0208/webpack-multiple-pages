import React, { Component, PureComponent } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { asyncComponent } from './helpers'

import Home from './views/Home'

const About = asyncComponent(() =>
  import(/* webpackChunkName: 'groupBuy/About' */ './views/About')
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </div>
  </Router>
)

export default (process.env.NODE_ENV === 'development'
  ? require('react-hot-loader').hot(module)(App)
  : App)
