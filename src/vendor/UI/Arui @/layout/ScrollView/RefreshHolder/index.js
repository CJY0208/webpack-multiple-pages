import React, { Component } from 'react'
import { helpers } from '@common'
import styles from './style.m.css'

const className = helpers.classNames.react(styles)

export default ({ children }) => (
  <div {...className('holder')}>
    <div {...className('wrapper')}>{children}</div>
  </div>
)
