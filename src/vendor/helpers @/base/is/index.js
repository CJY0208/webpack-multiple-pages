import root from '@helpers/base/globalThis'

// 值类型判断 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const isUndefined = val => typeof val === 'undefined'

export const isNull = val => val === null

export const isFunction = val => typeof val === 'function'

export const isArray = val => val instanceof Array

export const isRegExp = val => val instanceof RegExp

const __error__type = [
  'Error',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError'
]
  .map(key => root[key])
  .filter(type => !isUndefined(type))
export const isError = val => __error__type.some(type => val instanceof type)

export const isObject = val =>
  typeof val === 'object' && !(isArray(val) || isNull(val))

export const isBoolean = val => typeof val === 'boolean'

export const isString = val => typeof val === 'string'

export const isExist = val => !(isUndefined(val) || isNull(val))

export const isNaN = val => val !== val

export const isNumber = val => typeof val === 'number' && !isNaN(val)
// 值类型判断 -------------------------------------------------------------

// 环境判断 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const isAndroid = () => /(Android)/i.test(window.navigator.userAgent)

export const isIOS = () =>
  /(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)

export const isWKWebview = () => isIOS() && isExist(window.webkit)

export const isDesktop = () =>
  /(Win32|Win64|MacIntel|Linux x86_64)/i.test(window.navigator.platform)

export const isMobile = () => !isDesktop() && (isAndroid() || isIOS())
// 环境判断 -------------------------------------------------------------
