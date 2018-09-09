import React, { Component } from 'react'

import { helpers } from '@common'

import styles from './style.m.scss'

const className = helpers.classNames.react(styles)

@helpers.hot(module)
export default class SubPage extends Component {
  render() {
    return <div>SubPage</div>
  }
}
