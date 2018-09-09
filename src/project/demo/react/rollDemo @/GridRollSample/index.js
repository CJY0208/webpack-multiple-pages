import React, { Component } from 'react'

import { helpers } from '@common'

import './style.scss'
import Divider from '../helpers/divider'

const { classNames } = helpers

export default class GridRollSample extends Component {
  __divider = new Divider(360, 8)

  render() {
    const activeIdx = this.__divider.judge(this.props.deg)

    return (
      <ul className="grid-content">
        <li
          className={classNames({
            active: activeIdx === 0
          })}
        >
          0
        </li>
        <li
          className={classNames({
            active: activeIdx === 1
          })}
        >
          1
        </li>
        <li
          className={classNames({
            active: activeIdx === 2
          })}
        >
          2
        </li>

        <li
          className={classNames({
            active: activeIdx === 7
          })}
        >
          7
        </li>
        <li className="hidden">empty</li>
        <li
          className={classNames({
            active: activeIdx === 3
          })}
        >
          3
        </li>

        <li
          className={classNames({
            active: activeIdx === 6
          })}
        >
          6
        </li>
        <li
          className={classNames({
            active: activeIdx === 5
          })}
        >
          5
        </li>
        <li
          className={classNames({
            active: activeIdx === 4
          })}
        >
          4
        </li>
      </ul>
    )
  }
}
