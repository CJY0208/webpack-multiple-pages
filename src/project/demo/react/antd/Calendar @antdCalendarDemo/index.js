import '__prefix__'
import React from 'react'
import ReactDOM from 'react-dom'

import * as helpers from '@helpers'
import App from './app'

if (process.env.TEST) {
  helpers.source
    .js('//cdn.jsdelivr.net/npm/eruda', 'eruda')
    .then(eruda => eruda.init())
}

ReactDOM.render(<App />, document.getElementById('root'))
