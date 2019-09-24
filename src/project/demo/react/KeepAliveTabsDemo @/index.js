import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { AliveScope } from 'react-activation'

import App from './App'

render(
  <HashRouter>
    <AliveScope>
      <App />
    </AliveScope>
  </HashRouter>,
  document.getElementById('root')
)
