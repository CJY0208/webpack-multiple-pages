import React, { forwardRef, useContext } from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { isFunction, isString } from '@helpers'

import { ConsumerBridge } from './ContextBridge'
import {
  AliveStoreConsumer,
  aliveStoreContext,
  AliveNodeConsumer
} from './context'

export const expandKeepAlive = KeepAlive => {
  const HOCExpandKeepAlive = ({ id: currentId, ...props }) => (
    <AliveStoreConsumer>
      {helpers => (
        <AliveNodeConsumer>
          {({ id: parentId } = {}) => {
            // 兼容不同 parent 下相同 child 的情景，例如
            // Test1 下的 Deep 与 Test2 下的 Deep，若不做处理，两者争抢 Deep 位置时会出现问题
            // 上述情景将 id 分配为 Test1/Deep 与 Test2/Deep
            const id = isString(parentId)
              ? [parentId, currentId].join('/')
              : currentId

            return (
              <ConsumerBridge id={id}>
                {ctxValue => (
                  <KeepAlive id={id} {...helpers} {...props} ctx$$={ctxValue} />
                )}
              </ConsumerBridge>
            )
          }}
        </AliveNodeConsumer>
      )}
    </AliveStoreConsumer>
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

  const ctxValue = useContext(aliveStoreContext)

  if (!ctxValue) {
    return {}
  }

  const { drop, clear, getCachingIds } = ctxValue
  return { drop, clear, getCachingIds }
}

export default withAliveStore
