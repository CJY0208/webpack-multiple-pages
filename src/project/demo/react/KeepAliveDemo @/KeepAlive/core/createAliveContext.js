import React, { Component, forwardRef } from 'react'
import createContext from 'create-react-context'

import { run } from '@helpers'

const Context = createContext()
export const { Provider, Consumer } = Context

export const injectKeepAliveLifecycles = WrappedComponent => {
  const HOC = ({ forwardedRef, ...props }) => (
    <Consumer>
      {keepAliveContext => (
        <WrappedComponent
          ref={ref => {
            run(keepAliveContext, 'bring', ref)
            run(forwardedRef, undefined, ref)
          }}
          {...props}
        />
      )}
    </Consumer>
  )

  return forwardRef((props, ref) => <HOC {...props} forwardedRef={ref} />)
}
