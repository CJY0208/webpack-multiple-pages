// 值类型判断 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const isUndefined = val => typeof val === 'undefined'

export const isNull = val => val === null

export const isFunction = val => typeof val === 'function'

export const isArray = val => val instanceof Array

export const isObject = val =>
  typeof val === 'object' && !(isArray(val) || isNull(val))

export const isString = val => typeof val === 'string'

export const isExist = val => !(isUndefined(val) || isNull(val))
// 值类型判断 -------------------------------------------------------------
