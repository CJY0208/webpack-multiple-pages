import React, { Component } from 'react'

import { helpers } from '@common'

import styles from './style.m.scss'

const className = helpers.classNames.react(styles)
const { run } = helpers

export default class Stepper extends Component {
  render() {
    const { min, max, value, onChange, ...props } = this.props

    return (
      <div {...className('stepper', props.className)}>
        <button
          {...className({
            disable: value <= min
          })}
          onClick={() => value > min && run(onChange, undefined, value - 1)}
        >
          -
        </button>
        <span>{value}</span>
        <button
          {...className({
            disable: value >= max
          })}
          onClick={() => value < max && run(onChange, undefined, value + 1)}
        >
          +
        </button>
      </div>
    )
  }
}
