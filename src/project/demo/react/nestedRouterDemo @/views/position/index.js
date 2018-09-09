import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom'

import './style.scss'

import Route1 from './route1'
import Route2 from './route2'
import Route3 from './route3'

import StupidLink from '../../components/StupidLink'

export default class Position extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <div className="nav">
            <StupidLink to="/position/route1">route1</StupidLink>
            <StupidLink to="/position/route2">route2</StupidLink>
            <StupidLink to="/position/route3">route3</StupidLink>
          </div>
          <Switch>
            <Route path="/position/route1" component={Route1} />
            <Route path="/position/route2" component={Route2} />
            <Route path="/position/route3" component={Route3} />
            <Redirect to="/position/route1" />
          </Switch>
        </div>
        <div className="footer">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li className="active">4</li>
            <li>5</li>
          </ul>
        </div>
      </div>
    )
  }
}
