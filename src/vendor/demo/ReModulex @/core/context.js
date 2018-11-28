import React, { Component } from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { getModules, mapModules } from '../helpers/modules'
import { applyStore } from '../helpers/store'
import { get, run, value } from '../helpers/try'

const { Provider, Consumer } = value(() => {
  try {
    return React.createContext()
  } catch (error) {
    console.warn(
      new Error(`
      [ReModulex Environment Waring] 
        'React.createContext' API is not supported by you React version. 
        So 'ModuleProvider' and 'connectModules' would NOT effect.
        Use 'applyStore' and 'mapModules' with 'Provider' and 'connect' in react-redux instead.
        https://github.com/CJY0208/re-modulex#%E4%B8%8D%E6%83%B3%E7%94%A8%E9%85%8D%E5%A5%97%E7%9A%84-moduleprovider-%E5%92%8C-connectmodules%E6%83%B3%E9%85%8D%E5%90%88-react-redux-
    `)
    )
    return {
      Provider: ({ children }) => run(children),
      Consumer: ({ children }) => run(children)
    }
  }
})

export class ModuleProvider extends Component {
  state = this.props.store.getState()

  constructor(props, ...args) {
    const { store } = props

    super(props, ...args)
    applyStore(store)
    this.unsubscibe = store.subscribe(() =>
      this.setState(this.props.store.getState())
    )
  }

  componentWillUnmount() {
    run(this.unsubscibe)
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export const connectModules = modulesGetter => Component => {
  const C = props => (
    <Consumer>
      {storeState => (
        <Component {...props} {...mapModules(modulesGetter, storeState)} />
      )}
    </Consumer>
  )

  C.displayName = `HOC-ReModulex(${value(
    Component.displayName,
    Component.name
  )})`

  return hoistStatics(C, Component)
}
