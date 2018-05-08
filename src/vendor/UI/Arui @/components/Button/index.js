import React from 'react'
import { helpers } from '@common'
import styles from './style.m.scss'

const className = helpers.classNames.react(styles)

const Button = props => (
  <div
    {...props}
    {...className(helpers.value(props.type, 'default'), props.className)}
  >
    {props.children}
  </div>
)

export default Button
