import '__prefix__'

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './app'
import { store, persistor } from './store'

if (process.env.NODE_ENV === 'production') {
  persistor.pause()
}

render(
  <Provider {...{ store }}>
    <PersistGate {...{ persistor }} loading={null}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
