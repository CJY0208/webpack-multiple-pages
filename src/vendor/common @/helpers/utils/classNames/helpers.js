import { isObject, isArray, isString } from '../../is'
import { flatten } from '../helpers'

export const __map__object__className = obj =>
  Object.entries(obj)
    .filter(([key, value]) => !!value)
    .map(([key, value]) => key)

export const __parse__className = className =>
  /\s/.test(className) ? className.trim().split(' ') : className

const __get__className__array = (...args) =>
  flatten(
    args
      .filter(arg => !!arg)
      .map(
        arg =>
          isObject(arg)
            ? __map__object__className(arg)
            : isArray(arg)
              ? __get__className__array(...arg)
              : isString(arg) ? __parse__className(arg) : String(arg)
      )
  )

export default __get__className__array
