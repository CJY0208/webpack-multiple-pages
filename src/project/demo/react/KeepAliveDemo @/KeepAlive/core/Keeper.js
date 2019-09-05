import React, { Component } from 'react'

import { run } from '@helpers'

import { AliveNodeProvider, AliveNodeConsumer } from './context'
import { ProviderBridge } from './ContextBridge'
import { LIFECYCLE_ACTIVATE, LIFECYCLE_UNACTIVATE } from './lifecycles'

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
      [LIFECYCLE_ACTIVATE]: () => this[LIFECYCLE_ACTIVATE](),
      [LIFECYCLE_UNACTIVATE]: () => this[LIFECYCLE_UNACTIVATE]()
    }
  }

  [LIFECYCLE_ACTIVATE]() {
    const listeners = [...this.listeners]

    listeners
      // .filter(([, { isCached }]) => !isCached())
      .forEach(([, listener]) => run(listener, [LIFECYCLE_ACTIVATE]))
  }

  [LIFECYCLE_UNACTIVATE]() {
    const listeners = [...this.listeners]

    listeners
      // .filter(([, { isCached }]) => !isCached())
      .reverse()
      .forEach(([, listener]) => run(listener, [LIFECYCLE_UNACTIVATE]))
  }

  render() {
    const { ctx$$, store, id, children, ...props } = this.props
    const listeners = this.listeners

    const content = (
      <AliveNodeProvider
        value={{
          id,
          attach(ref) {
            if (!ref) {
              return () => null
            }

            listeners.set(ref, {
              [LIFECYCLE_ACTIVATE]: () => run(ref, LIFECYCLE_ACTIVATE),
              [LIFECYCLE_UNACTIVATE]: () => run(ref, LIFECYCLE_UNACTIVATE)
            })

            // 返回 listenerRemover 用以在对应组件卸载时解除监听
            return () => {
              listeners.delete(ref)
            }
          }
        }}
      >
        {children}
      </AliveNodeProvider>
    )

    return (
      <div
        ref={node => {
          this.wrapper = node
        }}
      >
        {ctx$$.length > 0 ? (
          <ProviderBridge value={ctx$$}>{content}</ProviderBridge>
        ) : (
          content
        )}
      </div>
    )
  }
}
