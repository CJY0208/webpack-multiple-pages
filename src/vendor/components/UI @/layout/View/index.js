import React from 'react'
import { classnames } from '@helpers'
import './style.m.scss'

const View = props => (
  <div {...props} className={classnames('view', props.className)}>
    {props.children}
  </div>
)

export default View
