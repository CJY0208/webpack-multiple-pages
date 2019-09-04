import React, { Component } from 'react'

import { run } from '@helpers'

import { expandKeepAlive } from './withAliveStore'
import { LIFECYCLE_ACTIVATE, LIFECYCLE_UNACTIVATE } from './lifecycles'
import saveScrollPos from '../helpers/saveScrollPos'

@expandKeepAlive
export default class KeepAlive extends Component {
  constructor(props) {
    super(props)
    this.init()
  }

  init = async () => {
    const { keep, id, children, ctx$$ } = this.props

    // 将 children 渲染至 AliveStoreProvider 中
    const cache = await keep(id, children, ctx$$)

    // 将 AliveStoreProvider 中的渲染内容通过 dom 操作置回当前 KeepAlive
    this.parentNode = this.placeholder.parentNode
    cache.nodes.forEach(node => {
      this.parentNode.insertBefore(node, this.placeholder)
    })
    this.parentNode.removeChild(this.placeholder)

    // 恢复该节点下各可滚动元素的滚动位置
    run(cache.revertScrollPos)

    // 触发 didActivate 生命周期
    cache.cached = false
    if (cache.inited) {
      run(cache, LIFECYCLE_ACTIVATE)
    } else {
      cache.inited = true
    }
  }

  componentWillUnmount() {
    const { id, getCache } = this.props
    const cache = getCache(id)

    // 保存该节点下各可滚动元素的滚动位置
    cache.revertScrollPos = saveScrollPos(cache.nodes)

    // 将 KeepAlive 中的节点恢复为原先的占位节点，保证卸载操作正常进行
    this.parentNode.insertBefore(this.placeholder, cache.nodes[0])
    cache.nodes.forEach(node => {
      this.parentNode.removeChild(node)
    })

    // 触发 willUnactivate 生命周期
    run(cache, LIFECYCLE_UNACTIVATE)
    cache.cached = true
  }

  render() {
    return (
      <div
        ref={node => {
          this.placeholder = node
        }}
      />
    )
  }
}
