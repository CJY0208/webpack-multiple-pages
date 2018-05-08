import './style/reset.css'
import 'babel-polyfill'

import './style/__postcss-viewport-units__fix.css'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
import viewportUnitsBuggyfillHack from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks'
viewportUnitsBuggyfill.init({
  hacks: viewportUnitsBuggyfillHack,
  force: (() => {
    const versionNumber = parseFloat(
      (window.navigator.userAgent.match('Android ([0-9.]+)') || [])[1]
    )
    // anything below 4.4 uses WebKit without *any* viewport support,
    // 4.4 has issues with viewport units within calc()
    return versionNumber <= 4.4
  })(),
  refreshDebounceWait: 250
})

import FastClick from 'fastclick'
FastClick.attach(document.body)

import './style/__eruda__fix.css'

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }
}
