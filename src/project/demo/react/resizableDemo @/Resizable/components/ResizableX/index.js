import React, { useState, useEffect, useCallback, useRef } from 'react'
import ResizableContent from '../ResizableContent'

import { clamp } from '@helpers'
import './style.m.scss'

function ResizableX({ children, initialValue = 50, min = 0, max = 100 }) {
  const [pos, setPos] = useState(clamp(initialValue, min, max))
  const [draging, setDraging] = useState(false)
  const container = useRef()
  const bar = useRef()

  const resize = useCallback(
    () => {
      if (!draging) {
        return
      }

      const currentLeft = bar.current.offsetLeft
      const containerWidth = container.current.offsetWidth
      const currentPos = currentLeft / containerWidth * 100
      console.log(currentLeft, containerWidth, currentPos, pos)
      const nextPos = clamp(currentPos, min, max)

      console.log(nextPos)

      if (!Number.isNaN(nextPos)) {
        setPos(nextPos)
      }
    },
    [draging]
  )

  return (
    <div
      ref={container}
      className="wrapper"
      onMouseUp={() => setDraging(false)}
      onMouseMove={resize}
    >
      {React.Children.map(
        children,
        (child, index) =>
          child.type === ResizableContent
            ? React.cloneElement(
                child,
                index === 0
                  ? {
                      style: {
                        width: `${pos}%`
                      }
                    }
                  : {
                      style: { flex: 1 }
                    }
              )
            : null
      )}
      <div
        ref={bar}
        className="bar"
        style={{ left: `${pos}%` }}
        onMouseDown={() => setDraging(true)}
      />
    </div>
  )
}

export default ResizableX
