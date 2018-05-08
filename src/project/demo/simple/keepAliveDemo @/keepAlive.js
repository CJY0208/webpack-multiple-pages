import hoistStatics from 'hoist-non-react-statics'
import React from 'react'
import ReactDOM from 'react-dom'
export default function keepAlive(Component) {
  console.log(Component)

  const C = (props, context) => {
    const { wrappedComponentRef, ...remainingProps } = props

    return <Component {...remainingProps} ref={wrappedComponentRef} />
  }
  return C
  // return hoistStatics(C, Component);
  // debugger
}
