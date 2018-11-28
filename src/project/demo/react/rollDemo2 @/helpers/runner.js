import { helpers } from '@common'

const root = global || window

const { requestAnimationFrame } = root

const { get, run, clamp, tween } = helpers

export default class Runner {
  constructor({ speed = 0 } = {}) {
    Object.assign(this, {
      speed
    })

    this.distance = 0
  }

  __distance__reach__listener__info = {}
  onDistanceReach = (value, listener) => {
    this.__distance__reach__listener__info = { value, listener }
  }

  __running__listener = []
  onRunning = listener => {
    this.__running__listener.push(listener)
  }

  setDistance = distance => {
    const prevDistance = this.distance
    this.distance = distance

    if (this.distance !== prevDistance) {
      if (
        this.distance >= get(this.__distance__reach__listener__info, 'value', 0)
      ) {
        setTimeout(() => {
          run(this.__distance__reach__listener__info, 'listener', this.distance)

          try {
            delete this.__distance__reach__listener__info.listener
          } catch (err) {
            // nothing
          }
        })
      }

      this.__running__listener.forEach(listener =>
        run(listener, undefined, this.distance)
      )
    }
  }

  __is__running = false
  __run = () => {
    let __prev__step__time = Date.now()
    this.__stop = tween({
      group: [
        {
          from: 0,
          to: Number.MAX_SAFE_INTEGER
        }
      ],
      step: () => {
        const __now = Date.now()
        if (this.speed > 0) {
          const d = this.speed * (__now - __prev__step__time) / 1000
          this.setDistance(this.distance + d)
        }
        __prev__step__time = __now
      },
      onEnd: () => {
        if (this.__is__running) {
          requestAnimationFrame(this.__run)
        }
      }
    })
  }

  start = () => {
    this.__is__running = true
    this.__run()
  }

  stop = () => {
    this.__is__running = false
    run(this.__stop)
  }
}
