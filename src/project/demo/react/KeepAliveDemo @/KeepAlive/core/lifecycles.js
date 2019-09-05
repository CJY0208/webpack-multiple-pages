import React, {
  Component,
  forwardRef,
  useEffect,
  useRef,
  useContext
} from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { get, run, isObject, isFunction, isUndefined } from '@helpers'

import { AliveNodeConsumer, aliveNodeContext } from './context'

export const LIFECYCLE_ACTIVATE = 'componentDidActivate'
export const LIFECYCLE_UNACTIVATE = 'componentWillUnactivate'

export const withLifecycles = WrappedComponent => {
  class HOC extends Component {
    drop = null

    componentWillUnmount() {
      run(this.drop)
    }

    render() {
      const { forwardedRef, ...props } = this.props

      return (
        <AliveNodeConsumer>
          {({ attach } = {}) => (
            <WrappedComponent
              ref={ref => {
                if (
                  [LIFECYCLE_ACTIVATE, LIFECYCLE_UNACTIVATE].every(
                    lifecycleName => !isFunction(get(ref, lifecycleName))
                  )
                ) {
                  return
                }
                this.drop = run(attach, undefined, ref)

                // 以下保持 ref 功能
                if (isUndefined(forwardedRef)) {
                  return
                }

                if (isObject(forwardedRef) && 'current' in forwardedRef) {
                  forwardedRef.current = ref
                  return
                }

                run(forwardedRef, undefined, ref)
              }}
              {...props}
            />
          )}
        </AliveNodeConsumer>
      )
    }
  }

  if (isFunction(forwardRef)) {
    const ForwardedRefHOC = forwardRef((props, ref) => (
      <HOC {...props} forwardedRef={ref} />
    ))

    return hoistStatics(ForwardedRefHOC, WrappedComponent)
  } else {
    return hoistStatics(HOC, WrappedComponent)
  }
}

const useLifecycle = (funcName, func) => {
  // 兼容性判断
  if ([useRef, useContext, useEffect].some(fn => !isFunction(fn))) {
    return
  }

  const ctxValue = useContext(aliveNodeContext)

  // 未处于 KeepAlive 中
  if (!ctxValue) {
    return
  }

  const { current: ref } = useRef({})
  const { attach } = ctxValue

  ref[funcName] = func
  ref.drop = attach(ref)

  useEffect(() => {
    return () => run(ref.drop)
  }, [])
}

export const useActivate = useLifecycle.bind(null, LIFECYCLE_ACTIVATE)
export const useUnactivate = useLifecycle.bind(null, LIFECYCLE_UNACTIVATE)
