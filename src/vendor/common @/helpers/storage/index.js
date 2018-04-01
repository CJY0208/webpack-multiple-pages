import { isExist, isNull } from '../is'
import withSupportive from './__with__supportive'

export const get = withSupportive(key => {
  let data = window.localStorage.getItem(key)
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

export const set = withSupportive((key, value) => {
  let data

  try {
    data = JSON.stringify(value)
  } catch (err) {
    console.error('[ERROR ...storage.set --> JSON.stringify]', err)
    data = value
  }

  window.localStorage.setItem(key, data)

  return data
})

export const remove = withSupportive(key => {
  window.localStorage.removeItem(key)
})
