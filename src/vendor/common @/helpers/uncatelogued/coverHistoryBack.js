import { isIOS } from '../is'
import { run } from '../try'

const callStack = []

const IOSZIndexBugFixDom = document.createElement('div')

IOSZIndexBugFixDom.style.cssText = `
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 9999999;
  overflow: scroll;
`
IOSZIndexBugFixDom.innerHTML = `
  <div style="height: 200%;">IOSZIndexBugFixDom</div>
`

function fixIOSZIndexBug() {
  if (!isIOS()) {
    return
  }
  console.log('fixIOSZIndexBug')
  document.body.appendChild(IOSZIndexBugFixDom)
  setTimeout(() => document.body.removeChild(IOSZIndexBugFixDom), 320)
}

function call(e) {
  // console.log(e, 'popevent')
  run(callStack.pop())

  callStack.length === 0 && window.removeEventListener('popstate', call)
  fixIOSZIndexBug()
}

/**
 * [setBackBtn 覆盖返回按钮的功能]
 * @param {Function} fn   [触发返回后执行的回调]
 */
export function cover(fn) {
  callStack.push(fn)
  window.history.pushState('jsBack', null, window.location.href)
  window.addEventListener('popstate', call)
  fixIOSZIndexBug()
}

export function silenceBack() {
  callStack.pop()
  callStack.push(undefined)
  // console.log('执行了back')
  history.back()
}

export function isCovering() {
  return callStack.length > 0
}
