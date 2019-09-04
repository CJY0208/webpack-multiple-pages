import React, { PureComponent } from 'react'
import createReactContext from 'create-react-context'

import { run, get, isUndefined } from '@helpers'

const fixedContext = []
const updateListenerCache = new Map()

export function fixContext(context) {
  fixedContext.push(context)
}

export const createContext = (...args) => {
  const context = createReactContext(...args)

  fixContext(context)
  return context
}

export class ProviderBridge extends PureComponent {
  unmount = null
  constructor(props, ...args) {
    super(props, ...args)

    const { value: contextValues } = props
    const [{ context, value, onUpdate }] = contextValues

    this.state = {
      contextValue: value
    }

    this.unmount = onUpdate(value => {
      this.setState({
        contextValue: value
      })
    })
  }

  componentWillUnmount() {
    console.log('ProviderBridge componentWillUnmount')
    run(this.unmount)
  }

  render() {
    const { value: contextValues, children } = this.props
    const { contextValue } = this.state
    const [{ context }, ...restValues] = contextValues
    const { Provider } = context

    const nextChildren = contextValue ? (
      <Provider value={contextValue}>{children}</Provider>
    ) : (
      children
    )

    return restValues.length > 0 ? (
      <ProviderBridge value={restValues}>{nextChildren}</ProviderBridge>
    ) : (
      nextChildren
    )
  }
}

class ConsumerWrapper extends PureComponent {
  updateListener = null
  contextInfo = null
  constructor(props, ...args) {
    super(props, ...args)

    const { value, context, id } = props
    if (isUndefined(value)) {
      return
    }

    this.updateListener = get(updateListenerCache.get(context), id, new Map())
    this.contextInfo = {
      context,
      value,
      onUpdate: fn => {
        this.updateListener.set(fn, fn)

        return () => this.updateListener.delete(fn)
      }
    }
  }

  componentWillUnmount() {
    const { value, context, id } = this.props
    if (isUndefined(value)) {
      return
    }

    updateListenerCache.set(context, {
      ...get(updateListenerCache.get(context), undefined, {}),
      [id]: this.updateListener
    })
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (prevProps.value !== value) {
      run(this.updateListener, 'forEach', fn => fn(value))
    }
  }

  render() {
    const { value, renderWrapper, renderContent, id } = this.props

    return renderWrapper(context$$ =>
      renderContent(
        isUndefined(value) ? context$$ : [...context$$, this.contextInfo]
      )
    )
  }
}

export function ConsumerBridge({ children: renderChildren, id }) {
  const renderWrapper = fixedContext.reduce(
    (render, context) => {
      const { Consumer } = context

      const renderWrapper = renderContent => (
        <Consumer>
          {value => (
            <ConsumerWrapper
              {...{
                value,
                context,
                renderWrapper: render,
                renderContent,
                id
              }}
            />
          )}
        </Consumer>
      )

      return renderWrapper
    },
    renderContent => renderContent([])
  )

  return renderWrapper(renderChildren)
}
