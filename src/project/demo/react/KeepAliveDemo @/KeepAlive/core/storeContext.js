import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import createContext from 'create-react-context'

import { run } from '@helpers'

import {
  Provider as ChildProvider,
  Consumer as ChildConsumer
} from './createAliveContext'

const Context = createContext()
const { Provider, Consumer } = Context
const storeElement = document.createElement('div')

export default Context

export class KeepAliveProvider extends Component {
  store = {}
  state = {}

  constructor(props) {
    super(props)
    document.body.appendChild(storeElement)
  }

  keep = (key, component) =>
    new Promise(resolve => {
      const listeners = new Map()

      const node = createPortal(
        <div
          key={key}
          ref={node => {
            if (node && !this.store[key]) {
              this.store[key] = {
                inited: false,
                listeners,
                didActivate: () =>
                  listeners.forEach(({ didActivate }) => didActivate()),
                willUnactivate: () =>
                  listeners.forEach(({ willUnactivate }) => willUnactivate()),
                nodes: [...node.children]
              }
            }
          }}
        >
          <ChildConsumer>
            {keepAliveContext => (
              <ChildProvider
                value={{
                  bring: ref => {
                    if (ref) {
                      run(keepAliveContext, 'bring', ref)
                      listeners.set(ref, {
                        didActivate: ref.componentDidActivate,
                        willUnactivate: ref.componentWillUnactivate
                      })
                    }
                  }
                }}
              >
                {component}
              </ChildProvider>
            )}
          </ChildConsumer>
        </div>,
        storeElement
      )

      this.setState({ [key]: node }, () => {
        resolve(this.store[key])
      })
    })

  drop = key => {
    const cache = this.store[key]

    if (cache && cache.cached) {
      this.setState({ [key]: undefined }, () => {
        delete this.store[key]
      })
    }
  }

  getCache = key => this.store[key]

  render() {
    return (
      <Provider
        value={{
          keep: this.keep,
          drop: this.drop,
          getCache: this.getCache
        }}
      >
        {this.props.children}
        {/* <div
          style={{ display: 'none' }}
          ref={container => {
            this.container = container
          }}
        /> */}
        {Object.values(this.state)}
      </Provider>
    )
  }
}

export const connect = WrappedComponent => {
  const HOC = props => (
    <Consumer>
      {helpers => <WrappedComponent {...helpers} {...props} />}
    </Consumer>
  )

  return HOC
}
