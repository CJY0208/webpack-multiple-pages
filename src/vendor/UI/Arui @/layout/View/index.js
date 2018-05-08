import React from 'react'
import { helpers } from '@common'
import styles from './style.m.scss'

const className = helpers.classNames.react(styles)

const View = props => (
  <div {...props} {...className('wrapper', props.className)}>
    {props.children}
  </div>
)

export default View
