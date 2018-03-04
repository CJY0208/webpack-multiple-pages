import './style/reset'
import 'babel-polyfill'

import './style/__postcss-viewport-units__fix.css'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
viewportUnitsBuggyfill.init()

import FastClick from 'fastclick'
FastClick.attach(document.body)

require('./style/__eruda__fix.css')
if (process.env.NODE_ENV !== 'production') {
  require('eruda').init()
}

if (module.hot) {
  module.hot.accept()
}
