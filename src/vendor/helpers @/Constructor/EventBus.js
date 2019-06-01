import { isFunction, isUndefined } from '@helpers/base/is'

export default class EventBus {
  _listeners = {}

  __getEventMap = event => {
    if (!this._listeners[event]) {
      this._listeners[event] = new Map()
    }

    return this._listeners[event]
  }

  on = (event, listener, { once = false } = {}) => {
    if (!isFunction(listener)) {
      return console.error('[EventBus Error] listener is not a function')
    }

    this.__getEventMap(event).set(
      listener,
      once
        ? (...args) => {
            listener(...args)
            this.off(event, listener)
          }
        : listener
    )

    return this
  }

  off = (event, listener) => {
    const eventMap = this.__getEventMap(event)

    if (isUndefined(listener)) {
      eventMap.clear()
    } else {
      eventMap.delete(listener)
    }

    return this
  }

  emit = (event, ...args) =>
    this.__getEventMap(event).forEach(listener => listener(...args))
}
