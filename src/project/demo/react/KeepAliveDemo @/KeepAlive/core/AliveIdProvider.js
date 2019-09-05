import React, { Component } from 'react'

import { run } from '@helpers'

import getKeyByFiberNode from './getKeyByFiberNode'

const nextTick = func => Promise.resolve().then(func)

export default class AliveIdProvider extends Component {
  id = null
  genId = () => {
    this.id = getKeyByFiberNode(this._reactInternalFiber)

    return this.id
  }

  render() {
    const { children } = this.props

    return run(children, undefined, this.id || this.genId())
  }
}
