import React, { Component } from 'react'
import { helpers } from '@common'

const { get, set, run, value, isFunction } = helpers

export default class EasyFluxStore {
  __connectedComponent = []
  __mergedStore = []
  __store

  __getAction = event => (...args) => {
    let fn = get(this.__store, event)

    if (!isFunction(fn)) {
      this.__mergedStore.some(store => {
        fn = get(store, event)
        return isFunction(fn)
      })
    }

    return isFunction(fn) ? fn.apply(this.__store, args) : fn
  }

  async __setState(state = {}) {
    this.__state = Object.assign({}, this.__state, state)
    this.__connectedComponent = this.__connectedComponent.filter(component =>
      get(component, '__reactstandin__isMounted')
    )
    await Promise.all(
      this.__connectedComponent.map(this.__distributeStateToComponent)
    )
    return this.__state
  }

  __distributeStateToComponent = component =>
    new Promise(resolve =>
      run(
        component,
        'setState',
        Object.assign(
          value(run(component, '__mapper.actionMapper', this.__getAction), {}),
          value(run(component, '__mapper.stateMapper', this.__state), {})
        ),
        resolve
      )
    )

  constructor(store, state = {}) {
    this.__getAction = this.__getAction.bind(this)

    store.setState = this.__setState.bind(this)
    store.getState = () => this.__state
    store.getAction = this.__getAction

    this.__store = store
    this.__state = state

    run(store, 'init')
  }

  connect = (stateMapper, actionMapper) => Component => {
    const self = this

    return class EFS_HOC extends Component {
      static displayName = `EFS-HOC(${value(
        Component.displayName,
        Component.name
      )})`
      state = Object.assign(
        value(run(actionMapper, undefined, self.__getAction), {}),
        value(run(stateMapper, undefined, Object.assign({}, self.__state)), {})
      )

      componentDidMount() {
        self.__connectedComponent.push(
          Object.assign(this, {
            __mapper: {
              stateMapper,
              actionMapper
            }
          })
        )
      }

      render = () => <Component {...this.state} {...this.props} />
    }
  }

  merge = Store => this.__mergedStore.push(new Store())
}
