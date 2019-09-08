import React, { forwardRef, useContext } from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { isFunction, isString } from '@helpers'

import { ConsumerBridge } from './ContextBridge'
import AliveIdProvider from './AliveIdProvider'
import { AliveScopeConsumer, aliveScopeContext } from './context'


export const expandKeepAlive = KeepAlive => {
  const renderContent = ({ id, helpers, props }) => (
    <ConsumerBridge id={id}>
      {ctxValue => (
        <KeepAlive {...props} id={id} __aliveScopeHelpers={helpers} ctx$$={ctxValue} />
      )}
    </ConsumerBridge>
  )

  function HookExpand(props) {
    const helpers = useContext(aliveScopeContext)

    return (
      <AliveIdProvider>
        {id => renderContent({ id, helpers, props })}
      </AliveIdProvider>
    )
  }

  function WithExpand(props) {
    return (
      <AliveIdProvider>
        {id => (
          <AliveScopeConsumer>
            {helpers => renderContent({ id, helpers, props })}
          </AliveScopeConsumer>
        )}
      </AliveIdProvider>
    )
  }

  return isFunction(useContext) ? HookExpand : WithExpand
}

const withAliveScope = WrappedComponent => {
  const renderContent = ({
    drop,
    clear,
    getCachingNodes,
    props,
    forwardedRef
  }) => (
    <WrappedComponent
      {...props}
      {...{ drop, clear, getCachingNodes }}
      ref={forwardedRef}
    />
  )

  function HookStore({ forwardedRef, ...props }) {
    const { drop, clear, getCachingNodes } = useContext(aliveScopeContext) || {}

    return renderContent({
      drop,
      clear,
      getCachingNodes,
      props,
      forwardedRef
    })
  }

  function WithStore({ forwardedRef, ...props }) {
    return (
      <AliveScopeConsumer>
        {({ drop, clear, getCachingNodes } = {}) =>
          renderContent({
            drop,
            clear,
            getCachingNodes,
            props,
            forwardedRef
          })
        }
      </AliveScopeConsumer>
    )
  }

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

  const { drop, clear, getCachingNodes } = ctxValue
  return { drop, clear, getCachingNodes }
}

export default withAliveScope
