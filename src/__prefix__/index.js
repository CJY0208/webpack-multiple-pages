import 'babel-polyfill'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
import viewportUnitsBuggyfillHack from 'viewport-units-buggyfill/viewport-units-buggyfill.hacks'
import FastClick from 'fastclick'

import './style/reset.css'
import './style/__postcss-viewport-units__fix.css'
import './style/__antd__fix.scss'
import './console'

viewportUnitsBuggyfill.init({
  hacks: viewportUnitsBuggyfillHack,
  force: (() => {
    const versionNumber = parseFloat(
      (window.navigator.userAgent.match('Android ([0-9.]+)') || [])[1]
    )

    const __need__fix = versionNumber <= 4.4

    if (__need__fix) {
      // 修复部分低端机 viewportUnitsBuggyfill 未生效的问题
      setTimeout(() => {
        viewportUnitsBuggyfill.refresh()
      }, 2000)
    }

    // anything below 4.4 uses WebKit without *any* viewport support,
    // 4.4 has issues with viewport units within calc()
    return __need__fix
  })()
  // refreshDebounceWait: 250
})

FastClick.attach(document.body)

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }
}
