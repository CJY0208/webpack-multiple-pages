import React, { Component } from 'react'
import { format, subHours } from 'date-fns'

import { helpers } from '@common'

const { get, value } = helpers

const getCountdown = deadline => {
  const date = Date.now()

  return date < deadline
    ? format(subHours(deadline - date, 8), 'HH:mm:ss')
    : '00:00:00'
}

export default class Countdown extends Component {
  render() {
    return value(this.state.countdown, null)
  }

  constructor(props, ...args) {
    super(props, ...args)

    this.state = {
      countdown: getCountdown(props.deadline)
    }
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.stop()
  }

  start = () => {
    const { deadline } = this.props

    this.interval = setInterval(() => {
      const countdown = getCountdown(deadline)

      if (!countdown) {
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
