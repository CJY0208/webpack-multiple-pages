import React, { Component, Fragment } from 'react'

import { run, isRegExp } from '@helpers'

import { AliveStoreProvider } from './context'
import Keeper from './Keeper'

export default class KeepAliveProvider extends Component {
  store = {}
  state = {}

  keep = (id, { name, children, ctx$$ }) =>
    new Promise(resolve => {
      this.setState(
        {
          [id]: {
            id,
            name,
            children,
            ctx$$
          }
        },
        () => {
          resolve(this.store[id])
        }
      )
    })

  dropById = id =>
    new Promise(resolve => {
      const cache = this.store[id]

      if (cache && cache.cached) {
        // 用在多层 KeepAlive 同时触发 drop 时，避免触发深层 KeepAlive 节点的缓存生命周期
        cache.willDrop = true

        this.setState({ [id]: null }, () => {
          delete this.store[id]
          resolve(true)
        })
      } else {
        resolve(false)
      }
    })

  drop = name =>
    this.dropNodes(
      this.getCachingNodes().filter(
        node => (isRegExp(name) ? name.test(node.name) : node.name === name)
      )
    )

  dropNodes = nodes =>
    new Promise(resolve => {
      Promise.all(nodes.map(node => this.dropById(node.id))).then(res =>
        resolve(res.every(success => success))
      )
    })

  clear = () => this.dropNodes(this.getCachingNodes())

  getCache = id => this.store[id]
  getCachingNodes = () => Object.values(this.state).filter(info => !!info)

  render() {
    return (
      <AliveStoreProvider
        value={{
          keep: this.keep,
          drop: this.drop,
          clear: this.clear,
          getCache: this.getCache,
          getCachingNodes: this.getCachingNodes
        }}
      >
        {this.props.children}
        <div>
          {Object.values(this.state)
            .filter(info => info)
            .map(({ children, ...props }) => (
              <Keeper key={props.id} store={this.store} {...props}>
                {children}
              </Keeper>
            ))}
        </div>
      </AliveStoreProvider>
    )
  }
}
