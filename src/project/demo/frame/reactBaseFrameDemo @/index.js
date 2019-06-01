import '__prefix__'
import 'css-loader/lib/css-base'
import 'style-loader/lib/addStyles'
import 'antd-mobile/dist/antd-mobile.less'

import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ModuleProvider } from 're-modulex'

import * as helpers from '@helpers'

import AppRouter from './config/router'
import locale from './config/locale'
import { store, persistor } from './store'

import './config/source'
import './assets/style.css'

Object.assign(window, { helpers })

render(
  <ModuleProvider {...{ store }}>
    <PersistGate {...{ persistor }} Loading={null}>
      <Router>
        <AppRouter />
      </Router>
    </PersistGate>
  </ModuleProvider>,
  document.getElementById('root')
)
