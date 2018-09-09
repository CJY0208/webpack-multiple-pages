import __get__className__array from './helpers'

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
