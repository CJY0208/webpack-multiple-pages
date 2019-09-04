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
      .reverse()
      .filter(([, { isCached }]) => !isCached())
      .forEach(([, listener]) => run(listener, [LIFECYCLE_ACTIVATE]))
  }

  [LIFECYCLE_UNACTIVATE]() {
    const listeners = [...this.listeners]

    listeners
      .filter(([, { isCached }]) => !isCached())
      .forEach(([, listener]) => run(listener, [LIFECYCLE_UNACTIVATE]))
  }

  render() {
    const { ctx$$, store, id, children, ...props } = this.props
    const listeners = this.listeners

    return (
      <div
        ref={node => {
          this.wrapper = node
        }}
      >
        <ProviderBridge value={ctx$$}>
          <AliveNodeConsumer>
            {parentAliveCtx => (
              <AliveNodeProvider
                value={{
                  id,
                  attach(ref, id) {
                    if (!ref) {
                      return () => null
                    }

                    // 嵌套 KeepAlive 中监听父层 KeepAlive 的生命周期
                    const drop = run(parentAliveCtx, 'attach', ref, id)

                    listeners.set(ref, {
                      [LIFECYCLE_ACTIVATE]: () => run(ref, LIFECYCLE_ACTIVATE),
                      [LIFECYCLE_UNACTIVATE]: () =>
                        run(ref, LIFECYCLE_UNACTIVATE),
                      isCached: () => store[id].cached
                    })

                    // 返回 listenerRemover 用以在对应组件卸载时解除监听
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
