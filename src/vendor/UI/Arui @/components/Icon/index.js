import React from 'react'
import { helpers } from '@common'
import styles from './style.m.css'

const { get } = helpers
const className = helpers.classNames.react(styles)

export default function Icon(props) {
  let { name = '' } = props
  const isSvg = name.startsWith('#')
  const prefix = name.split('-').shift()

  return isSvg ? (
    <svg
      aria-hidden="true"
      {...props}
      {...className('icon', get(props, 'className'))}
    >
      <use xlinkHref={name} />
    </svg>
  ) : (
    <i
      {...props}
      {...className(
        'icon',
        name,
        get(props, 'className'),
        prefix === 'icon' ? 'iconfont' : prefix
      )}
    />
  )
}
