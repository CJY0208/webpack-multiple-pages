import React from 'react'
import hoistStatics from 'hoist-non-react-statics'

import * as helpers from '@helpers'

const { value } = helpers
const Context = React.createContext()
const { Consumer } = Context

export const { Provider } = Context

export const withContext = Component => {
  const C = props => (
    <Consumer>{context => <Component {...props} {...context} />}</Consumer>
  )

  C.displayName = `withGoogleMapContext(${value(
    Component.displayName,
    Component.name
  )})`

  return hoistStatics(C, Component)
}
