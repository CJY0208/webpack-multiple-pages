import { run, get } from '../../try'
import { isFunction } from '../../is'
import Platform from './Platform'
import * as helpers from './helpers'

export default class JsBridge {
  static Platform = Platform
  static helpers = helpers

  __methods = {}

  support = api => {
    const runner = this.get(api)

    if (!isFunction(runner)) {
      return false
    }

    return runner.isSupported()
  }

  run = (api, ...args) => {
    if (this.support(api)) {
      const runner = this.get(api)
      return run(runner, undefined, ...args)
    } else {
      console.warn(`jsBridge 不支持 ${api} 接口`)
      return false
    }
  }

  get = api => get(this.__methods, [api])

  register = (api, { isSupported, getRunner }) => {
    this.__methods[api] = Object.assign(
      (...args) => {
        const runner = getRunner(api)

        if (isSupported()) {
          run(runner, undefined, ...args)
          return true
        } else {
          console.warn(`jsBridge 不支持 ${api} 接口`)
          return false
        }
      },
      { isSupported }
    )
  }
}

Object.assign(JsBridge, {
  Platform,
  helpers
})
