import React, { Component, Fragment } from 'react'

import { get, run, nextTick, isRegExp } from '@helpers'

import { AliveScopeProvider } from './context'
import Keeper from './Keeper'

export default class AliveScope extends Component {
  store = new Map()
  nodes = new Map()

  update = (id, { name, children, ctx$$ }) =>
    new Promise(resolve => {
      this.nodes.set(id, {
        id,
        name,
        children,
        ctx$$
      })

      this.forceUpdate(resolve)
    })
  keep = (id, params) =>
    new Promise(resolve => {
      const isNew = !this.nodes.has(id)

      if (isNew) {
        this.helpers = { ...this.helpers }
      }

      this.update(id, {
        id,
        ...params
      }).then(() => {
        resolve(this.store.get(id))
      })
    })

  drop = name =>
    this.dropNodes(
      this.getCachingNodes().filter(
        node => (isRegExp(name) ? name.test(node.name) : node.name === name)
      )
    )

  dropNodes = nodes =>
    new Promise(resolve => {
      const willDropIds = nodes
        .filter(node => {
          const cache = this.store.get(node.id)
          const canDrop = get(cache, 'cached')

          if (canDrop) {
            // 用在多层 KeepAlive 同时触发 drop 时，避免触发深层 KeepAlive 节点的缓存生命周期
            cache.willDrop = true
          }

          return canDrop
        })
        .map(node => {
          const { id } = node
          this.nodes.delete(id)

          return id
        })

      this.helpers = { ...this.helpers }
      this.forceUpdate(() => {
        resolve()

        willDropIds.map(id => {
          this.store.delete(id)
        })
      })
    })

  clear = () => this.dropNodes(this.getCachingNodes())

  getCache = id => this.store.get(id)
  getCachingNodes = () => [...this.nodes.values()]

  // 静态化节点上下文内容，防止重复渲染
  helpers = {
    keep: this.keep,
    update: this.update,
    drop: this.drop,
    clear: this.clear,
    getCache: this.getCache,
    getCachingNodes: this.getCachingNodes
  }

  render() {
    const { children } = this.props

    return (
      <AliveScopeProvider value={this.helpers}>
        {children}
        <div>
          {[...this.nodes.values()].map(({ children, ...props }) => (
            <Keeper key={props.id} {...props} store={this.store}>
              {children}
            </Keeper>
          ))}
        </div>
      </AliveScopeProvider>
    )
  }
}
