import React, { Component } from 'react'

import { AliveStoreProvider } from './context'
import Keeper from './Keeper'

export default class KeepAliveProvider extends Component {
  store = {}
  state = {}

  keep = (id, component, ctx$$) =>
    new Promise(resolve => {
      this.setState(
        {
          [id]: {
            id,
            component,
            ctx$$
          }
        },
        () => {
          resolve(this.store[id])
        }
      )
    })

  drop = id =>
    new Promise(resolve => {
      const cache = this.store[id]

      if (cache && cache.cached) {
        this.setState({ [id]: null }, () => {
          delete this.store[id]
          resolve(true)
        })
      } else {
        resolve(false)
      }
    })

  clear = () =>
    new Promise(resolve => {
      Promise.all(this.getCachingIds().map(id => this.drop(id))).then(res =>
        resolve(res.every(success => success))
      )
    })

  getCache = id => this.store[id]
  getCachingIds = () =>
    Object.values(this.state)
      .filter(info => !!info)
      .map(({ id }) => id)

  render() {
    return (
      <AliveStoreProvider
        value={{
          keep: this.keep,
          drop: this.drop,
          clear: this.clear,
          getCache: this.getCache,
          getCachingIds: this.getCachingIds
        }}
      >
        {this.props.children}
        {Object.values(this.state)
          .filter(info => info)
          .map(({ id, ctx$$, component }) => (
            <Keeper key={id} ctx$$={ctx$$} store={this.store} id={id}>
              {component}
            </Keeper>
          ))}
      </AliveStoreProvider>
    )
  }
}
