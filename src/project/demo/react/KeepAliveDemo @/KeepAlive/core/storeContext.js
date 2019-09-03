import React, {
  Component,
  useContext,
  useState,
  useEffect,
  useRef
} from 'react'
// import { createPortal } from 'react-dom'
import createContext from 'create-react-context'

import { run } from '@helpers'

import {
  Provider as ChildProvider,
  Consumer as ChildConsumer
} from './createAliveContext'

import { getFixedContext } from '../helpers/fixContext'

const Context = createContext()
const { Provider, Consumer } = Context

export default Context

export class KeepAliveProvider extends Component {
  store = {}
  state = {}

  constructor(props) {
    super(props)
  }

  keep = (key, component, context$$) =>
    new Promise(resolve => {
      const listeners = new Map()
      const [context] = context$$
      const { Provider } = context.context
      const { value, onUpdate } = context

      const AliveComponent = () => {
        const [contextValue, setContextValue] = useState(value)
        // useEffect(() => {
        //   const unmount = onUpdate(setContextValue)
        //   return unmount
        // }, [])

        return (
          <Provider value={contextValue}>
            <div
              ref={node => {
                if (node && !this.store[key]) {
                  this.store[key] = {
                    inited: false,
                    listeners,
                    didActivate: () =>
                      listeners.forEach(({ didActivate }) => didActivate()),
                    willUnactivate: () =>
                      listeners.forEach(({ willUnactivate }) =>
                        willUnactivate()
                      ),
                    nodes: [...node.children]
                  }
                }
              }}
            >
              {component}
            </div>
          </Provider>
        )
      }

      const node = <AliveComponent key={key} />

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
        {Object.values(this.state)}
      </Provider>
    )
  }
}

const listenerCache = {}
export const connect = WrappedComponent => {
  const fixedContext = getFixedContext()

  const HOC = props => {
    const context$$ = fixedContext.map(context => {
      const value = useContext(context)
      const { current: updateListener } = useRef(
        listenerCache[props.name] || new Map()
      )

      // useEffect(
      //   () => {
      //     updateListener.forEach(fn => fn(value))
      //   },
      //   [value]
      // )

      useEffect(() => {
        return () => {
          // debugger
          listenerCache[props.name] = updateListener
        }
      }, [])

      return {
        context,
        value,
        onUpdate: fn => {
          updateListener.set(fn, fn)

          return updateListener.delete(updateListener)
        }
      }
    })

    return (
      <Consumer>
        {helpers => (
          <WrappedComponent {...helpers} {...props} context$$={context$$} />
        )}
      </Consumer>
    )
  }

  return HOC
}
