import '__prefix__'
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import App from './app'
import store from './store'

render(
  <Provider {...{ store }}>
    <App />
  </Provider>,
  document.getElementById('app')
)
