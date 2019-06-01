import '__prefix__'
import 'css-loader/lib/css-base'
import 'style-loader/lib/addStyles'
import React from 'react'
import { render } from 'react-dom'

import AppRoute from './router'

render(<AppRoute />, document.getElementById('root'))
