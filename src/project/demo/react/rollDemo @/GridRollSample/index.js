import React, { Component } from 'react'

import * as helpers from '@helpers'
// import UI, {  } from '@UI'

import './style.scss'
import Divider from '../helpers/divider'

const { classnames } = helpers

export default class GridRollSample extends Component {
  __divider = new Divider(360, 8)

  render() {
    const activeIdx = this.__divider.judge(this.props.deg)

    return (
      <ul className="grid-content">
        <li
          className={classnames({
            active: activeIdx === 0
          })}
        >
          0
        </li>
        <li
          className={classnames({
            active: activeIdx === 1
          })}
        >
          1
        </li>
        <li
          className={classnames({
            active: activeIdx === 2
          })}
        >
          2
        </li>

        <li
          className={classnames({
            active: activeIdx === 7
          })}
        >
          7
        </li>
        <li className="hidden">empty</li>
        <li
          className={classnames({
            active: activeIdx === 3
          })}
        >
          3
        </li>

        <li
          className={classnames({
            active: activeIdx === 6
          })}
        >
          6
        </li>
        <li
          className={classnames({
            active: activeIdx === 5
          })}
        >
          5
        </li>
        <li
          className={classnames({
            active: activeIdx === 4
          })}
        >
          4
        </li>
      </ul>
    )
  }
}
