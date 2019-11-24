import React, { useState, useEffect, useRef } from 'react'

import { clamp } from '@helpers'

import './style.m.scss'

const percentReg = /\%$/

export function ResizableX({
  children: [leftContent, rightContent],
  initialValue = '50%',
  min = 0,
  max = '100%',
  barSize = 6
}) {
  const [pos, setPos] = useState(0)
  const [resizing, setResizing] = useState(false)
  const container = useRef()
  const calcValue = value =>
    percentReg.test(value)
      ? parseFloat(value) * container.current.offsetWidth / 100
      : value
  const fixPos = pos => clamp(pos - 1, calcValue(min), calcValue(max))
  const resize = e => {
    if (!resizing) {
      return
    }

    const nextPos = fixPos(
      e.clientX - container.current.getBoundingClientRect().x
    )

    if (!Number.isNaN(nextPos)) {
      setPos(nextPos)
    }
  }

  useEffect(() => {
    setPos(fixPos(calcValue(initialValue)))
  }, [])

  useEffect(
    () => {
      const resizeListener = () => {
        setPos(fixPos(pos))
      }
      window.addEventListener('resize', resizeListener)

      return () => window.removeEventListener('resize', resizeListener)
    },
    [pos]
  )

  return (
    <div
      ref={container}
      className={`resizable resizable-x ${resizing ? 'resizing' : ''}`}
      onMouseUp={() => setResizing(false)}
      onMouseMove={resize}
    >
      <div
        className="content"
        style={{
          width: pos
        }}
      >
        {leftContent}
      </div>
      <div className="content auto">{rightContent}</div>
      <div
        className="bar"
        style={{ left: pos, width: barSize }}
        onMouseDown={() => setResizing(true)}
      />
    </div>
  )
}

export function ResizableY({
  children: [topContent, bottomContent],
  initialValue = '50%',
  min = 0,
  max = '100%',
  barSize = 6
}) {
  const [pos, setPos] = useState(0)
  const [resizing, setResizing] = useState(false)
  const container = useRef()
  const calcValue = value =>
    percentReg.test(value)
      ? parseFloat(value) * container.current.offsetHeight / 100
      : value
  const fixPos = pos => clamp(pos - 1, calcValue(min), calcValue(max))
  const resize = e => {
    if (!resizing) {
      return
    }

    const nextPos = fixPos(
      e.clientY - container.current.getBoundingClientRect().y
    )

    if (!Number.isNaN(nextPos)) {
      setPos(nextPos)
    }
  }

  useEffect(() => {
    setPos(fixPos(calcValue(initialValue)))
  }, [])

  useEffect(
    () => {
      const resizeListener = () => {
        setPos(fixPos(pos))
      }
      window.addEventListener('resize', resizeListener)

      return () => window.removeEventListener('resize', resizeListener)
    },
    [pos]
  )

  return (
    <div
      ref={container}
      className={`resizable resizable-y ${resizing ? 'resizing' : ''}`}
      onMouseUp={() => setResizing(false)}
      onMouseMove={resize}
    >
      <div
        className="content"
        style={{
          height: pos
        }}
      >
        {topContent}
      </div>
      <div className="content auto">{bottomContent}</div>
      <div
        className="bar"
        style={{ top: pos, height: barSize }}
        onMouseDown={() => setResizing(true)}
      />
    </div>
  )
}
