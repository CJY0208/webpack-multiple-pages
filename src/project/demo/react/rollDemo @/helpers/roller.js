import * as helpers from '@helpers'

import Runner from './runner'

const { run, get, value, Tween } = helpers

export default class Roller {
  __runner = new Runner()

  onRolling = listener => {
    this.__runner.onRunning(distance => {
      run(listener, undefined, distance % 360, distance)
    })
  }

  __rolling = false
  roll = (speed = 1080, { duration = 2000, ease } = {}) => {
    if (this.__rolling) {
      return
    }

    this.__rolling = true

    this.__runner.start()

    new Tween({
      from: 0,
      to: speed,
      duration,
      ease
    })
      .on('update', value => {
        this.__runner.speed = value
      })
      .start()
  }

  stop = (
    deg,
    { duration = 10000, ease = pos => Math.pow(pos - 1, 3) + 1, onEnd } = {}
  ) => {
    const slowDownDuration = duration * 5 / 5

    const __tangent__ratio = ease(0.0001) / 0.0001
    const slowDownDistance =
      slowDownDuration * this.__runner.speed / 1000 / __tangent__ratio

    let slowDownPoint = deg - slowDownDistance
    while (slowDownPoint < this.__runner.distance) {
      slowDownPoint += 360
    }

    this.__runner.onDistanceReach(slowDownPoint, distance => {
      this.__runner.speed = 0

      new Tween({
        from: distance,
        to: slowDownPoint + slowDownDistance,
        ease,
        duration: slowDownDuration
      })
        .on('update', this.__runner.setDistance)
        .on('end', () => {
          run(onEnd, undefined)
          this.__runner.stop()
          this.__rolling = false
        })
        .start()
    })

    // new Tween({
    //   from: this.__runner.speed,
    //   to: this.__runner.speed / 4,
    //   duration: duration * 1 / 5,
    // })
    //   .on('update', value => {
    //     this.__runner.speed = value
    //   })
    //   .on('end', realSlowDown)
    //   .start()
  }
}
