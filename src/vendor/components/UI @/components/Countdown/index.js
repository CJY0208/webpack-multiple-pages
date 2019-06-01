import React, { Component } from 'react'

import * as helpers from '@helpers'

const { get, value } = helpers

const __fix__zero = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']
const __format__time = t => {
  let h = t / 1000 / 3600
  let m = (h - Math.floor(h)) * 60
  let s = (m - Math.floor(m)) * 60
  h = Math.floor(h).toString()
  m = Math.floor(m).toString()
  s = Math.floor(s).toString()

  return `${value(__fix__zero[h], h)}:${value(__fix__zero[m], m)}:${value(
    __fix__zero[s],
    s
  )}`
}

const __get__countdown = (deadline, localOffset = 0) => {
  const date = Date.now() + localOffset

  return date < deadline ? __format__time(deadline - date) : '00:00:00'
}

export default class Countdown extends Component {
  render() {
    return value(this.state.countdown, null)
  }

  constructor(props, ...args) {
    super(props, ...args)

    this.state = {
      countdown: __get__countdown(props.deadline, props.localOffset)
    }
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.stop()
  }

  start = () => {
    const { deadline, localOffset } = this.props

    this.interval = setInterval(() => {
      const countdown = __get__countdown(deadline, localOffset)

      if (countdown === '00:00:00') {
        this.stop()
      }

      this.setState({
        countdown
      })
    }, 1000)
  }

  stop = () => {
    clearInterval(this.interval)
  }
}
