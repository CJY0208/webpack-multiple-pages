import { Component } from 'react'

import { run } from '../helpers'

import getKeyByFiberNode from './getKeyByFiberNode'

// 根据 FiberNode 所处位置来确定 KeepAlive ID
export default class AliveIdProvider extends Component {
  genId = () => getKeyByFiberNode(this._reactInternalFiber)

  render() {
    const { children, prefix = '' } = this.props

    return run(children, undefined, `${prefix}${this.genId()}`)
  }
}
