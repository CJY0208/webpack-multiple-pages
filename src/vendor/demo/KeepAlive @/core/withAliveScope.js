import React, { forwardRef, useContext } from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { isFunction } from '../helpers'

import { Acceptor } from './Bridge'
import AliveIdProvider from './AliveIdProvider'
import { AliveScopeConsumer, aliveScopeContext } from './context'

function controllerCherryPick(controller) {
  const { drop, dropScope, clear, getCachingNodes } = controller
  return { drop, dropScope, clear, getCachingNodes }
}

export const expandKeepAlive = KeepAlive => {
  const renderContent = ({ idPrefix, helpers, props }) => (
    <AliveIdProvider prefix={idPrefix} key={props._ka}>
      {id => (
        <Acceptor id={id}>
          {bridgeProps => (
            <KeepAlive
              key={id}
              {...props}
              {...bridgeProps}
              id={id}
              _helpers={helpers}
            />
          )}
        </Acceptor>
      )}
    </AliveIdProvider>
  )
  const HookExpand = ({ id: idPrefix, ...props }) =>
    renderContent({ idPrefix, helpers: useContext(aliveScopeContext), props })

  const WithExpand = ({ id: idPrefix, ...props }) => (
    <AliveScopeConsumer>
      {helpers => renderContent({ idPrefix, helpers, props })}
    </AliveScopeConsumer>
  )

  return isFunction(useContext) ? HookExpand : WithExpand
}

const withAliveScope = WrappedComponent => {
  const renderContent = ({ helpers, props, forwardedRef }) => (
    <WrappedComponent {...props} {...helpers} ref={forwardedRef} />
  )

  const HookStore = ({ forwardedRef, ...props }) =>
    renderContent({
      helpers: controllerCherryPick(useContext(aliveScopeContext) || {}),
      props,
      forwardedRef
    })

  const WithStore = ({ forwardedRef, ...props }) => (
    <AliveScopeConsumer>
      {(controller = {}) =>
        renderContent({
          helpers: controllerCherryPick(controller),
          props,
          forwardedRef
        })
      }
    </AliveScopeConsumer>
  )

  const HOCWithAliveScope = isFunction(useContext) ? HookStore : WithStore

  if (isFunction(forwardRef)) {
    const ForwardedRefHOC = forwardRef((props, ref) => (
      <HOCWithAliveScope {...props} forwardedRef={ref} />
    ))

    return hoistStatics(ForwardedRefHOC, WrappedComponent)
  } else {
    return hoistStatics(HOCWithAliveScope, WrappedComponent)
  }
}

export const useAliveController = () => {
  if (!isFunction(useContext)) {
    return {}
  }

  const ctxValue = useContext(aliveScopeContext)

  if (!ctxValue) {
    return {}
  }

  return controllerCherryPick(ctxValue)
}

export default withAliveScope
