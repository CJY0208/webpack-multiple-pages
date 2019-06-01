import React, { Component } from 'react'

import * as helpers from '@helpers'

import './style.scss'

@helpers.hot(module)
export default class RollSample extends Component {
  render() {
    return (
      <div className="content">
        <div
          className="roll"
          style={{
            transform: `rotate(${-this.props.deg + 22.5}deg)`
          }}
        />
        <div
          className="line"
          style={{
            transform: `rotate(${this.props.deg + 22.5}deg)`
          }}
        />
      </div>

      // <div className="roll">
      //   <div className="line" style={{
      //     transform: `rotate(${this.state.deg}deg)`
      //   }}></div>
      // </div>
    )
  }
}
