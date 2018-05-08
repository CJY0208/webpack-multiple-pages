import React from 'react'
import { Toast, ActivityIndicator } from 'antd-mobile'

import { helpers } from '@common'

import styles from './style.m.scss'

const className = helpers.classNames.react(styles)

export const show = text =>
  Toast.info(
    <div {...className('loading')}>
      <ActivityIndicator size="large" />
      {helpers.isString(text) && text.length > 0 && <p>{text}</p>}
    </div>,
    0
  )

export const hide = Toast.hide.bind(Toast)
