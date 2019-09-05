import React, { forwardRef, useContext } from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { isFunction, isString } from '@helpers'

import { ConsumerBridge } from './ContextBridge'
import {
  AliveStoreConsumer,
  AliveNodeConsumer,
  aliveStoreContext,
  aliveNodeContext
} from './context'

// 兼容不同 parent 下相同 child 的情景，例如
// Test1 下的 Deep 与 Test2 下的 Deep，若不做处理，两者争抢 Deep 位置时会出现问题
// 上述情景将 id 分配为 Test1/Deep 与 Test2/Deep
const genId = (parentId, currentId) =>
  isString(parentId) ? [parentId, currentId].join('/') : currentId

export const expandKeepAlive = KeepAlive => {
  const renderContent = ({ id, helpers, props }) => (
    <ConsumerBridge id={id}>
      {ctxValue => (
        <KeepAlive {...props} id={id} {...helpers} ctx$$={ctxValue} />
      )}
    </ConsumerBridge>
  )

  function HookExpand(props) {
    const helpers = useContext(aliveStoreContext)
    const { id: parentId } = useContext(aliveNodeContext) || {}

    return renderContent({
      id: genId(parentId, props.name),
      helpers,
      props
    })
  }

  function WithExpand(props) {
    return (
      <AliveStoreConsumer>
        {helpers => (
          <AliveNodeConsumer>
            {({ id: parentId } = {}) =>
              renderContent({
                id: genId(parentId, props.name),
                helpers,
                props
              })
            }
          </AliveNodeConsumer>
        )}
      </AliveStoreConsumer>
    )
  }

  return isFunction(useContext) ? HookExpand : WithExpand
}

const withAliveStore = WrappedComponent => {
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
    const { drop, clear, getCachingNodes } = useContext(aliveStoreContext) || {}

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
      <AliveStoreConsumer>
        {({ drop, clear, getCachingNodes } = {}) =>
          renderContent({
            drop,
            clear,
            getCachingNodes,
            props,
            forwardedRef
          })
        }
      </AliveStoreConsumer>
    )
  }

  const HOCWithAliveStore = isFunction(useContext) ? HookStore : WithStore

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

  const { drop, clear, getCachingNodes } = ctxValue
  return { drop, clear, getCachingNodes }
}

export default withAliveStore
