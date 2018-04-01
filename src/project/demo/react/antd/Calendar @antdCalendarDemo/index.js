import '__prefix__'
import React from 'react'
import ReactDOM from 'react-dom'

import { helpers } from '@common'
import App from './app'

if (process.env.TEST) {
  helpers.CDN.js('//cdn.jsdelivr.net/npm/eruda', 'eruda').then(eruda =>
    eruda.init()
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
