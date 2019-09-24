import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { AliveScope } from '@KeepAlive'

import App from './App'

render(
  <HashRouter>
    <AliveScope>
      <App />
    </AliveScope>
  </HashRouter>,
  document.getElementById('root')
)
