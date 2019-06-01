import React from 'react'

import { classnames, get } from '@helpers'

import './style.m.css'

export default function Icon(props) {
  let { name = '' } = props
  const isSvg = name.startsWith('#')
  const prefix = name.split('-').shift()

  return isSvg ? (
    <svg
      aria-hidden="true"
      {...props}
      className={classnames('icon', get(props, 'className'))}
    >
      <use xlinkHref={name} />
    </svg>
  ) : (
    <i
      {...props}
      className={classnames(
        'icon',
        name,
        get(props, 'className'),
        prefix === 'icon' ? 'iconfont' : prefix
      )}
    />
  )
}
