import React, { useState, useEffect, useRef } from 'react'

import { Tween, run } from '@helpers'
import { history } from '__src__/project/demo/react/tweenDemo @/router'

import styles from './style.m.scss'

export default function Easing({ ease }) {
  const ref = useRef(null)
  const [dots, setDots] = useState([])
  const [tween] = useState(
    () =>
      new Tween({
        from: 0,
        to: 1,
        duration: 500
      })
  )

  const start = () => {
    const x = new Tween({
      from: 0,
      to: 400
    })
    const y = new Tween({
      from: 300,
      to: 100,
      ease
    })

    let loopTimes = 0
    let drawLine = false

    tween
      .config({
        from: 0,
        to: 1,
        duration: 500
      })
      .off('start')
      .on('start', () => {
        const canvas = ref.current
        const context = canvas.getContext('2d')

        function dashedLineTo([startX, startY], [x, y]) {
          const dashLength = 2

          //线段数量
          let dashNum = Math.floor(
            Math.sqrt(Math.pow(startX - x, 2) + Math.pow(startY - y, 2)) /
              dashLength
          )
          for (let i = 0; i < dashNum; i++) {
            context[i % 2 === 0 ? 'moveTo' : 'lineTo'](
              startX + i * (x - startX) / dashNum,
              startY + i * (y - startY) / dashNum
            )
          }
        }

        context.moveTo(0, 100)
        context.lineTo(0, 300)
        // context.lineTo(400, 300)
        dashedLineTo([0, 300], [400, 300])
        context.lineTo(400, 100)
        // context.lineTo(0, 100)
        dashedLineTo([400, 100], [0, 100])

        context.lineWidth = 0.5
        context.strokeStyle = '#666666'

        context.stroke()
        context.beginPath()
      })
      .off('update')
      .on('update', (progress, prevProgress) => {
        const canvas = ref.current
        const context = canvas.getContext('2d')
        // context.beginPath()
        if (drawLine) {
          context.moveTo(x.value(prevProgress), y.value(prevProgress))
        } else {
          context.moveTo(x.value(progress) - 1, y.value(progress) - 1)
        }
        context.lineTo(x.value(progress), y.value(progress))
        context.lineWidth = 1
        context.strokeStyle = '#fed477'

        context.stroke()
      })
      .off('end')
      .on('end', () => {
        if (loopTimes <= 6) {
          tween.reverse().start()
        }

        if (loopTimes === 2) {
          tween.config({
            duration: 1000
          })
        }

        if (loopTimes === 5) {
          tween.config({
            duration: 5000
          })
        }

        if (loopTimes === 6) {
          drawLine = true
          tween.config({
            duration: 10000
          })
        }

        loopTimes++
      })
      .restart()
  }

  useEffect(() => {
    start()
    return tween.stop
  }, [])

  return (
    <div className="content">
      <h2
        onClick={() => {
          history.goBack()
          run(window, 'changeEasing', ease)
        }}
      >
        {ease}
      </h2>
      <div
        className="line"
        onClick={() => {
          const canvas = ref.current
          const context = canvas.getContext('2d')

          context.clearRect(0, 0, canvas.width, canvas.height)
          context.beginPath()

          start()
        }}
      >
        <canvas ref={ref} width={400} height={400} />
      </div>
    </div>
  )
}
