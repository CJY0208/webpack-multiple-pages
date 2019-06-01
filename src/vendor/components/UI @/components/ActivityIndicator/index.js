import React from 'react'

import './style.m.scss'

const ActivityIndicator = ({ subColor, color, ...props }) => (
  <div
    className={`activity-indicator ${props.className}`}
    style={{
      borderColor: subColor,
      borderLeftColor: color
    }}
  />
)

ActivityIndicator.defaultProps = {
  subColor: '#fff',
  color: '#fd9933'
}

export default ActivityIndicator
