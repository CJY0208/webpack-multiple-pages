// import React from 'react'

import { KeepAliveProvider } from './core/storeContext'
import { injectKeepAliveLifecycles } from './core/createAliveContext'
import KeepAlive from './core/KeepAlive'
import fixContext from './helpers/fixContext'

// const { createContext } = React

// console.log('222 createContext')
// React.createContext = (...args) => {
//   const context = createContext.call(React, args)
//   fixContext(context)

//   console.log('createContext')

//   return context
// }

export default KeepAlive
export { KeepAliveProvider, injectKeepAliveLifecycles, fixContext }
