import '__prefix__'
import 'css-loader/lib/css-base'
import 'style-loader/lib/addStyles'
import React from 'react'
import { render } from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ModuleProvider } from 're-modulex'

import * as common from '@common'

import AppRouter from './config/router'
import locale from './config/locale'
import { store, persistor } from './store'

import './config/axios.default'
import './config/CDN.source'
import './assets/style.css'

Object.assign(window, { common })

render(
  <ModuleProvider {...{ store }}>
    <PersistGate {...{ persistor }} Loading={null}>
      <AppRouter />
    </PersistGate>
  </ModuleProvider>,
  document.getElementById('app')
)
