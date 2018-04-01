// 值类型判断 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const isUndefined = val => typeof val === 'undefined'

export const isNull = val => val === null

export const isFunction = val => typeof val === 'function'

export const isArray = val => val instanceof Array

export const isObject = val =>
  typeof val === 'object' && !(isArray(val) || isNull(val))

export const isNumber = val => typeof val === 'number'

export const isBoolean = val => typeof val === 'boolean'

export const isString = val => typeof val === 'string'

export const isExist = val => !(isUndefined(val) || isNull(val))
// 值类型判断 -------------------------------------------------------------

// 环境判断 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const isAndroid = () => /(Android)/i.test(window.navigator.userAgent)

export const isAkulakuAndroid = () =>
  isAndroid() && isExist(window.InstallmentJsObj)

export const isIOS = () =>
  /(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)

export const isWKWebview = () => isIOS() && isExist(window.webkit)

export const isDesktop = () =>
  /(Win32|Win64|MacIntel|Linux x86_64)/i.test(window.navigator.platform)

export const isMobile = () => !isDesktop() && (isAndroid() || isIOS())
// 环境判断 -------------------------------------------------------------
