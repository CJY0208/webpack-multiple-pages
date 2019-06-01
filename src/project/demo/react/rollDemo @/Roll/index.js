import React, { Component } from 'react'

import * as helpers from '@helpers'
import UI, { View, ScrollView } from '@UI'

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
    deg: 0,
    stopAt: undefined
  }

  __roller = new Roller()
  __divider = new Divider(360, 8)
  __roller__stopping = false

  componentDidMount() {
    this.__roller.onRolling(deg => this.setState({ deg }))

    this.roll()

    window.roller = this.__roller
  }

  roll = () => {
    if (this.__roller.__rolling) {
      return
    }
    this.setState(
      {
        stopAt: undefined
      },
      () => this.__roller.roll()
    )
  }

  stop = () => {
    if (this.__roller__stopping) {
      return
    }
    this.__roller__stopping = true
    this.setState(
      {
        stopAt: random(0, 360)
      },
      () => {
        this.__roller.stop(this.state.stopAt, {
          onEnd: () => {
            this.__roller__stopping = false
          }
        })
      }
    )
  }

  render() {
    return (
      <View>
        <ScrollView>
          <RollSample deg={this.state.deg} />
          <GridRollSample deg={this.state.deg} />

          <button onClick={this.roll}>Roll</button>
          <button onClick={this.stop}>Stop</button>
          <div>
            Now At Block {this.__divider.judge(this.state.deg)} ({(this.state
              .deg +
              292.5) %
              360})
          </div>
          {this.state.stopAt && (
            <div>
              Stop At Block {this.__divider.judge(this.state.stopAt)} ({(this
                .state.stopAt +
                292.5) %
                360})
            </div>
          )}
        </ScrollView>
      </View>
    )
  }
}
