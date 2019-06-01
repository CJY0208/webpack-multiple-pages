import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Tween } from '@helpers'

function DynamicNumber({ value: propsValue, format, duration, ease }) {
  const [value, setValue] = useState(propsValue)
  const [tween] = useState(() =>
    new Tween({
      from: value,
      to: propsValue,
      duration,
      ease
    }).on('update', value => setValue(value))
  )

  // 相当于 componentDidUpdate, 仅当 [propsValue, duration, ease] 变化时调用
  useEffect(
    () => {
      tween
        .config({
          from: value,
          to: propsValue
        })
        .restart()
    },
    [propsValue]
  )

  useEffect(
    () => {
      tween.config({
        duration,
        ease
      })
    },
    [duration, ease]
  )

  return format(value)
}

DynamicNumber.propTypes = {
  value: PropTypes.number,
  format: PropTypes.func,
  duration: PropTypes.number,
  ease: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

DynamicNumber.defaultProps = {
  value: 0,
  format: Math.floor,
  duration: 500,
  ease: 'inOutCubic'
}

export default DynamicNumber
