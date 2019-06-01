import { defaultProcess as tweenFrameProcess } from '@helpers/Constructor/FrameProcess'
import EventBus from '@helpers/Constructor/EventBus'
import { clamp, pickBy } from '@helpers/package/utils'
import { get, run } from '@helpers/base/try'
import { isFunction, isExist } from '@helpers/base/is'

import easing from './easing'

const DEFAULT_CONFIG = {
  from: 0,
  to: 1,
  duration: 1000,
  ease: 'linear',
  loop: false
}

export default class Tween {
  static easing = easing
  static DEFAULT_CONFIG = DEFAULT_CONFIG

  bus = new EventBus()
  state = {
    reversed: false,
    progress: 0,
    stoped: true,
    config: DEFAULT_CONFIG
  }

  constructor(config = DEFAULT_CONFIG) {
    this.config(config)
  }

  on = (...args) => {
    this.bus.on(...args)
    return this
  }

  off = (...args) => {
    this.bus.off(...args)
    return this
  }

  config = (config = DEFAULT_CONFIG) => {
    this.state.config = {
      ...DEFAULT_CONFIG,
      ...this.state.config,
      ...pickBy(config, isExist)
    }

    return this
  }

  start = () => {
    if (this.isEnded() || !this.state.stoped) {
      return this
    }

    this.state.stoped = false
    this.bus.emit('start')

    let prevFrameTime = Date.now()

    this.stopRunningFrame = tweenFrameProcess.start(({ frameTime }) => {
      const frameProgress =
        (frameTime - prevFrameTime) / clamp(this.state.config.duration, 16)
      const direction = this.state.reversed ? -1 : 1

      this.progress(this.state.progress + frameProgress * direction)
      prevFrameTime = frameTime
    })

    return this
  }

  restart = () => this.reset().start()

  reset = () => {
    const { reversed } = this.state

    return this.stop().progress(reversed ? 1 : 0)
  }

  stop = () => {
    if (this.state.stoped) {
      return this
    }

    this.state.stoped = true
    run(this.stopRunningFrame)
    this.bus.emit('stop')

    return this
  }

  reverse = () => {
    this.state.reversed = !this.state.reversed
    this.bus.emit('reverse')

    return this
  }

  progress = progress => {
    const preProgress = this.state.progress
    this.state.progress = clamp(progress, 0, 1)

    this.bus.emit('update', this.value(progress), this.value(preProgress))

    if (this.isEnded()) {
      if (this.state.config.loop) {
        this.state.reversed = !this.state.reversed
      } else {
        this.stop()
        this.bus.emit('end')
      }
    }

    return this
  }

  value = (progress = this.state.progress) => {
    progress = clamp(progress, 0, 1)
    const { config, reversed } = this.state
    const { ease, to, from } = config
    const easeFn = isFunction(ease) ? ease : easing[ease]

    return (to - from) * easeFn(progress) + from
  }

  isEnded = (progress = this.state.progress) => {
    const { reversed } = this.state

    return reversed ? progress <= 0 : progress >= 1
  }
}

Tween.easing = easing
Tween.DEFAULT_CONFIG = DEFAULT_CONFIG
