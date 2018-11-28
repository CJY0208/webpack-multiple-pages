import { isString } from '../../../is'
import { get, run } from '../../../try'

const root = global || window

export const registerGlobalCallback = (
  handler,
  name = `__afterAction__${Date.now()}`,
  throwaway = false
) => {
  if (isString(handler)) {
    return handler
  }

  root[name] = (...args) => {
    if (typeof handler === 'function') {
      handler(...args)
    }

    if (throwaway) {
      delete root[name]
    }
  }

  return name
}
