import __get__className__array from './helpers'

export default function classnames(...args) {
  return [...new Set(__get__className__array(args))].join(' ').trim()
}

classnames.bind = (mapper = {}) => (...args) =>
  [
    ...new Set(
      __get__className__array(args).map(
        className => mapper[className] || className
      )
    )
  ]
    .join(' ')
    .trim()

classnames.react = mapper => {
  const func = classnames.bind(mapper)
  return (...args) => ({
    className: func(...args)
  })
}
