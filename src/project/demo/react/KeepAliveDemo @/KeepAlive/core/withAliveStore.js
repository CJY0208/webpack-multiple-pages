import React, { forwardRef, useContext } from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { isFunction } from '@helpers'

import { ConsumerBridge } from './ContextBridge'
import { AliveStoreConsumer, aliveStoreContext } from './context'

export const expandKeepAlive = KeepAlive => {
  const HOCExpandKeepAlive = props => (
    <ConsumerBridge id={props.id}>
      {contextValue => (
        <AliveStoreConsumer>
          {helpers => (
            <KeepAlive {...helpers} {...props} context$$={contextValue} />
          )}
        </AliveStoreConsumer>
      )}
    </ConsumerBridge>
  )

  return HOCExpandKeepAlive
}

const withAliveStore = WrappedComponent => {
  const HOCWithAliveStore = ({ forwardedRef, ...props }) => (
    <AliveStoreConsumer>
      {({ drop, clear, getCachingIds } = {}) => (
        <WrappedComponent
          {...props}
          {...{ drop, clear, getCachingIds }}
          ref={forwardedRef}
        />
      )}
    </AliveStoreConsumer>
  )

  if (isFunction(forwardRef)) {
    const ForwardedRefHOC = forwardRef((props, ref) => (
      <HOCWithAliveStore {...props} forwardedRef={ref} />
    ))

    return hoistStatics(ForwardedRefHOC, WrappedComponent)
  } else {
    return hoistStatics(HOCWithAliveStore, WrappedComponent)
  }
}

export const useAliveStore = () => {
  if (!isFunction(useContext)) {
    return {}
  }

  const contextValue = useContext(aliveStoreContext)

  if (!contextValue) {
    return {}
  }

  const { drop, clear, getCachingIds } = contextValue
  return { drop, clear, getCachingIds }
}

export default withAliveStore
