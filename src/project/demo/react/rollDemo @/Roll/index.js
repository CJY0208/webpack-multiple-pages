import React, { Component } from 'react'

import { helpers } from '@common'

import RollSample from '../RollSample'
import GridRollSample from '../GridRollSample'

import Roller from '../helpers/roller'
import Divider from '../helpers/divider'
import './style.scss'

window.Roller = Roller
window.Divider = Divider

window.helpers = helpers

const { random } = helpers

@helpers.hot(module)
export default class Roll extends Component {
  state = {
    deg: 0
  }

  __roller = new Roller()

  componentDidMount() {
    this.__roller.onRolling(deg => this.setState({ deg }))

    this.roll()

    window.roller = this.__roller
  }

  roll = () => {
    this.__roller.roll()
  }

  stop = () => {
    this.__roller.stop(random(0, 360))
  }

  render() {
    return (
      <div>
        <RollSample deg={this.state.deg} />
        <GridRollSample deg={this.state.deg} />

        <button onClick={this.roll}>Roll</button>
        <button onClick={this.stop}>Stop</button>
      </div>
    )
  }
}
