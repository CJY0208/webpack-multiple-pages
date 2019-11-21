import React, { useState, useEffect } from 'react'
import ResizableContent from '../ResizableContent'

import { clamp } from '@helpers'
import './style.m.scss'

function ResizableX({ children, initialValue = 50, min = 0, max = 100 }) {
  const [pos, setPos] = useState(clamp(initialValue, min, max))

  return (
    <div className="wrapper">
      {React.Children.map(
        children,
        (child, index) =>
          child.type === ResizableContent
            ? React.cloneElement(child, {
                width: index === 0 ? pos : 100 - pos
              })
            : null
      )}
      <div className="bar" style={{ left: `${pos}%` }} />
    </div>
  )
}

export default ResizableX
