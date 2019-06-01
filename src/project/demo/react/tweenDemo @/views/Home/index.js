import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { View } from '@UI'
import { Tween, sample, clamp } from '@helpers'

import './style.m.scss'

export default function Home() {
  const progressRef = useRef(null)
  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0
  })
  const [tweens] = useState(() => {
    const ease = Tween.easing |> Object.keys |> sample

    const x = new Tween({
      from: 0,
      to: 335,
      ease
    })
    const y = new Tween({
      from: 0,
      to: -50,
      ease
    })
    const scale = new Tween({
      from: 1,
      to: 2.5,
      ease
    })
    const rotate = new Tween({
      from: 0,
      to: 360,
      ease
    })
    const main = new Tween({
      from: 0,
      to: 1,
      duration: 1200,
      loop: true
    })
      .on('update', progress => {
        setTransform({
          x: x.value(progress),
          y: y.value(progress),
          scale: scale.value(progress),
          rotate: rotate.value(progress)
        })

        progressRef.current.value = progress * 100
      })
      .start()

    return { main, x, y, scale, rotate }
  })

  const tween = tweens.main

  useEffect(
    () => () => {
      console.log('unmount')
      tween.stop()
    },
    []
  )

  const changeEasing = ease => {
    Object.entries(tweens)
      .filter(([key]) => !['main'].includes(key))
      .forEach(([key, tween]) => tween.config({ ease }))

    if (tween.isEnded()) {
      tween.restart()
    }
  }

  window.changeEasing = changeEasing

  return (
    <View className="container">
      <div className="view">
        <input
          className="progress"
          ref={progressRef}
          type="range"
          defaultValue="0"
          min="0"
          max="100"
          onInput={e => {
            tween.stop()
            tween.progress(e.target.value / 100)
          }}
          onMouseUp={tween.start}
        />
        <div
          className="block"
          style={{
            transform: `
              translateX(${transform.x}px)
              translateY(${transform.y}px)
              scale(${transform.scale})
              rotate(${transform.rotate}deg)
            `
          }}
        />
        <div className="info">
          {tween.state.config.duration}(ms) / {tweens.x.state.config.ease}
        </div>
        <Link to="/Easing" className="easing-link">
          View All Easing
        </Link>
        <div className="buttons">
          <button onClick={tween.start}>Start</button>
          <button onClick={tween.stop}>Stop</button>
          <button onClick={tween.reset}>Reset</button>
          <button onClick={tween.restart}>Restart</button>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              tween.config({
                duration: clamp(tween.state.config.duration - 200, 200)
              })

              if (tween.isEnded()) {
                tween.restart()
              }
            }}
          >
            Faster
          </button>
          <button
            onClick={() => {
              tween.config({ duration: tween.state.config.duration + 200 })

              if (tween.isEnded()) {
                tween.restart()
              }
            }}
          >
            Slow down
          </button>

          <button onClick={tween.reverse}>Reverse</button>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              changeEasing(Tween.easing |> Object.keys |> sample)
            }}
          >
            Random Easing
          </button>
          <button
            onClick={() => {
              tween.config({ loop: !tween.state.config.loop })

              if (tween.isEnded()) {
                tween.reverse()
                tween.restart()
              }
            }}
          >
            Toggle Loop: {String(tween.state.config.loop)}
          </button>
        </div>
      </div>
    </View>
  )
}
