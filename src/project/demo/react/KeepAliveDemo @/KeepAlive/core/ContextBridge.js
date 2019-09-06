import React, { PureComponent, useContext, useRef, useEffect } from 'react'
import createReactContext from 'create-react-context'

import { run, get, isUndefined, isFunction } from '@helpers'

const fixedContext = []
const updateListenerCache = new Map()

export function fixContext(ctx) {
  fixedContext.push(ctx)
}

export const createContext = (...args) => {
  const ctx = createReactContext(...args)

  fixContext(ctx)
  return ctx
}

export class ProviderBridge extends PureComponent {
  unmount = null
  constructor(props, ...args) {
    super(props, ...args)

    const { value: ctxValues } = props

    const [{ ctx, value, onUpdate }] = ctxValues

    this.state = {
      ctxValue: value
    }

    this.unmount = onUpdate(value => {
      this.setState({
        ctxValue: value
      })
    })
  }

  componentWillUnmount() {
    run(this.unmount)
  }

  render() {
    const { value: ctxValues, children } = this.props
    const { ctxValue } = this.state
    const [{ ctx }, ...restValues] = ctxValues
    const { Provider } = ctx

    const nextChildren = ctxValue ? (
      <Provider value={ctxValue}>{children}</Provider>
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
  ctxInfo = null
  constructor(props, ...args) {
    super(props, ...args)

    const { value, ctx, id } = props
    if (isUndefined(value)) {
      return
    }

    this.updateListener = get(updateListenerCache.get(ctx), id, new Map())
    this.ctxInfo = {
      ctx,
      value,
      onUpdate: fn => {
        this.updateListener.set(fn, fn)

        return () => this.updateListener.delete(fn)
      }
    }
  }

  componentWillUnmount() {
    const { value, ctx, id } = this.props
    if (isUndefined(value)) {
      return
    }

    updateListenerCache.set(ctx, {
      ...get(updateListenerCache.get(ctx), undefined, {}),
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

    return renderWrapper(ctx$$ =>
      renderContent(isUndefined(value) ? ctx$$ : [...ctx$$, this.ctxInfo])
    )
  }
}

function HooksConsumerBridge({ children: renderChildren, id }) {
  const context$$ = fixedContext
    .map(ctx => {
      const value = useContext(ctx)
      const { current: updateListener } = useRef(
        get(updateListenerCache.get(ctx), id, new Map())
      )

      useEffect(
        () => {
          run(updateListener, 'forEach', fn => fn(value))
        },
        [value]
      )

      useEffect(() => {
        return () => {
          if (isUndefined(value)) {
            return
          }

          updateListenerCache.set(ctx, {
            ...get(updateListenerCache.get(ctx), undefined, {}),
            [id]: updateListener
          })
        }
      }, [])

      return {
        ctx,
        value,
        onUpdate: fn => {
          updateListener.set(fn, fn)

          return () => updateListener.delete(fn)
        }
      }
    })
    .filter(({ value }) => !isUndefined(value))

  return renderChildren(context$$)
}

function RecursiveConsumerBridge({ children: renderChildren, id }) {
  const renderWrapper = fixedContext.reduce(
    (render, ctx) => {
      const { Consumer } = ctx

      const renderWrapper = renderContent => (
        <Consumer>
          {value => (
            <ConsumerWrapper
              {...{
                value,
                ctx,
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

export const ConsumerBridge = [useContext, useRef, useEffect].every(isFunction)
  ? HooksConsumerBridge
  : RecursiveConsumerBridge