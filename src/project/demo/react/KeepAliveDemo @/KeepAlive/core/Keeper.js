import React, { Component } from 'react'

import { run } from '@helpers'

import { AliveNodeProvider, AliveNodeConsumer } from './context'
import { ProviderBridge } from './ContextBridge'

export default class Keeper extends Component {
  listeners = new Map()
  wrapper = null
  componentDidMount() {
    const { store, id } = this.props
    const listeners = this.listeners
    const node = this.wrapper

    if (store[id]) {
      return
    }

    store[id] = {
      listeners,
      inited: false,
      nodes: [...node.children],
      didActivate: () => this.componentDidActivate(),
      willUnactivate: () => this.componentWillUnactivate()
    }
  }

  componentDidActivate() {
    const listeners = [...this.listeners]

    listeners
      .reverse()
      .filter(([, { isCached }]) => !isCached())
      .forEach(([, { didActivate }]) => run(didActivate))
  }

  componentWillUnactivate() {
    const listeners = [...this.listeners]

    listeners
      .filter(([, { isCached }]) => !isCached())
      .forEach(([, { willUnactivate }]) => run(willUnactivate))
  }

  render() {
    const { context$$, store, id, children, ...props } = this.props
    const listeners = this.listeners

    return (
      <div
        ref={node => {
          this.wrapper = node
        }}
      >
        <ProviderBridge value={context$$}>
          <AliveNodeConsumer>
            {lifecycleContext => (
              <AliveNodeProvider
                value={{
                  id,
                  attach: (ref, id) => {
                    if (!ref) {
                      return () => null
                    }

                    const drop = run(lifecycleContext, 'attach', ref, id)

                    listeners.set(ref, {
                      didActivate: ref.componentDidActivate,
                      willUnactivate: ref.componentWillUnactivate,
                      isCached: () => store[id].cached
                    })

                    return () => {
                      run(drop)
                      listeners.delete(ref)
                    }
                  }
                }}
              >
                {children}
              </AliveNodeProvider>
            )}
          </AliveNodeConsumer>
        </ProviderBridge>
      </div>
    )
  }
}
