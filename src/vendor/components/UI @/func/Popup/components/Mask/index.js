import React, { createRef } from 'react'
import PropTypes from 'prop-types'

import { run, classnames } from '@helpers'

import './style.m.scss'

function Mask({ maskClosable, close, className, children }) {
  const mask = createRef()

  return (
    <div
      className={classnames('mask', className)}
      ref={mask}
      onClick={
        maskClosable
          ? e => {
              if (e.target === mask.current) {
                run(close)
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}

Mask.propTypes = {
  maskClosable: PropTypes.bool,
  close: PropTypes.func
}

Mask.defaultProps = {
  maskClosable: true,
  close: undefined
}

export default Mask
