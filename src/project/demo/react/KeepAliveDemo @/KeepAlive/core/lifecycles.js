import React, {
  Component,
  forwardRef,
  useEffect,
  useRef,
  useContext
} from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { get, run, isObject, isFunction } from '@helpers'

import { AliveNodeConsumer, aliveNodeContext } from './context'

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
          {({ attach, id } = {}) => (
            <WrappedComponent
              ref={ref => {
                if (
                  ['componentDidActivate', 'componentWillUnactivate'].every(
                    lifecycleName => !isFunction(get(ref, 'lifecycleName'))
                  )
                ) {
                  return
                }
                this.drop = run(attach, undefined, ref, id)

                // 以下保持 ref 功能
                if (!forwardedRef) {
                  return
                }

                if (isObject(forwardedRef)) {
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

  const contextValue = useContext(aliveNodeContext)

  // 未处于 KeepAlive 中
  if (!contextValue) {
    return
  }

  const { current: ref } = useRef({})
  const { attach, id } = contextValue

  ref[funcName] = func
  ref.drop = attach(ref, id)

  useEffect(() => {
    return () => run(ref.drop)
  }, [])
}

export const useActivate = useLifecycle.bind(null, 'componentDidActivate')
export const useUnactivate = useLifecycle.bind(null, 'componentWillUnactivate')
