import { isObject, isArray, isString } from '../is'

const __flatten__array = array =>
  array.reduce(
    (res, item) => [
      ...res,
      ...(isArray(item) ? __flatten__array(item) : [item])
    ],
    []
  )

const __map__object__className = obj =>
  Object.entries(obj).map(([key, value]) => (!!value ? key : undefined))

const __parse__className = className =>
  /\s/.test(className) ? className.trim().split(' ') : className

const __get__className__array = (...args) =>
  __flatten__array(
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

export default function classNames(...args) {
  return [...new Set(__get__className__array(args))].join(' ').trim()
}

classNames.bind = (mapper = {}) => (...args) =>
  [
    ...new Set(
      __get__className__array(args).map(
        className => mapper[className] || className
      )
    )
  ]
    .join(' ')
    .trim()

classNames.react = mapper => {
  const func = classNames.bind(mapper)
  return (...args) => ({
    className: func(...args)
  })
}
