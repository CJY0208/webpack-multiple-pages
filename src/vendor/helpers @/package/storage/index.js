import { isExist, isNull } from '@helpers/base/is'

import withSupportive from './__with__supportive'

const getter = storage =>
  withSupportive(key => {
    let data = storage.getItem(key)
    let result

    if (data === 'undefined' || isNull(data)) {
      result = undefined
    } else {
      try {
        result = JSON.parse(data)
      } catch (err) {
        console.error('[ERROR ...storage.get --> JSON.parse]', err)
        result = data
      }
    }

    return result
  })

const setter = storage =>
  withSupportive((key, value) => {
    let data

    try {
      data = JSON.stringify(value)
    } catch (err) {
      console.error('[ERROR ...storage.set --> JSON.stringify]', err)
      data = value
    }

    storage.setItem(key, data)

    return data
  })

const remover = storage =>
  withSupportive(key => {
    storage.removeItem(key)
  })

export const get = getter(window.localStorage)
export const set = setter(window.localStorage)
export const remove = remover(window.localStorage)

export const getSession = getter(window.sessionStorage)
export const setSession = setter(window.sessionStorage)
export const removeSession = remover(window.sessionStorage)
