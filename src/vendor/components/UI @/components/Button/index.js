import React from 'react'
import PropTypes from 'prop-types'

import { classnames } from '@helpers'
import './style.m.scss'

const Button = ({
  children,
  type,
  disable,
  active,
  onClick,
  className,
  ...props
}) => (
  <div
    {...props}
    onClick={!disable ? onClick : null}
    className={classnames(type, className, { active, disable })}
  >
    {children}
  </div>
)

Button.defaultProps = {
  type: 'default',
  disable: false,
  active: false
}

Button.propTypes = {
  type: PropTypes.oneOf(['default', 'capsule', 'full']),
  disable: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
