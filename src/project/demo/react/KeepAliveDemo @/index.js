import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import TransitionApp from './Transition'
import SuspenseApp from './Suspense'
import RouterApp from './Router'
import Router2App from './Router/router2'
import App from './Main'

render(<RouterApp />, document.getElementById('root'))
