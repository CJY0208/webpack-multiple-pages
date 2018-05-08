export tween from './tween'
export classNames from './classNames'
export ScrollListener from './ScrollListener'
export * from './helpers'

export const hot = module => Component =>
  process.env.NODE_ENV === 'development'
    ? require('react-hot-loader').hot(module)(Component)
    : Component

export const __ = fn => (...preArgs) =>
  function(...args) {
    return fn.apply(
      this,
      preArgs.map(pr => (pr === __ ? args.shift() : pr)).concat(args)
    )
  }

export const getFormatter = ({ separator = ' ', length = 3 }) => text => {
  text = typeof text === 'number' ? Math.floor(text) : text
  return typeof text !== 'undefined'
    ? String(text)
        .split('')
        .reverse()
        .reduce(
          (result, letter, index) => (
            result.unshift(
              letter,
              index > 0 && index % length === 0 ? separator : undefined
            ),
            result
          ),
          []
        )
        .join('')
    : text
}

export const preloadImage = srcList =>
  srcList.forEach(src => {
    const img = new Image()
    img.src = src
  })
