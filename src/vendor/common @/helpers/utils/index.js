import { run, get } from '../try'
import { isArray, isExist } from '../is'

/* Impure Function */
export const hot = module => Component =>
  process.env.NODE_ENV === 'development'
    ? require('react-hot-loader').hot(module)(Component)
    : Component

export const pipe = (...handlers) => arg =>
  handlers.reduce((res, handler) => run(handler, undefined, res), arg)

export const curry = fn => (...args) =>
  args.length < fn.length
    ? curry(fn.bind(undefined, ...args))
    : fn.apply(undefined, args)

export const groupBy = (namer, list) =>
  list.reduce((res, item, ...args) => {
    const groupName = String(namer(item, ...args))
    const group = get(res, groupName, [])

    return {
      ...res,
      [groupName]: [...group, item]
    }
  }, {})

export const flatten = array =>
  array.reduce(
    (res, item) => [...res, ...(isArray(item) ? flatten(item) : [item])],
    []
  )

export const __ = (fn, context) => (...preArgs) =>
  function(...args) {
    return fn.apply(
      context || this,
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

/**
 * [交集]
 * 示例：intersection([1, 2], [2, 3]) => [2]
 */
export const intersection = (...args) =>
  (args |> flatten |> (_ => new Set(_)) |> Array.from).filter(item =>
    args.every(arr => arr.includes(item))
  )

/**
 * [钳子] 用来将数字限制在给定范围内
 * @param {Number} value 被限制值
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export const clamp = (value, min, max) => {
  if (value < min) {
    return min
  }

  if (value > max) {
    return max
  }

  return value
}

/**
 * [防抖]
 * @param {Function} func 执行函数
 * @param {Number} wait 多少毫秒后运行一次
 */
export const debounce = (func, wait = 16) => {
  let timeout

  return (...args) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, wait)

    return timeout
  }
}

/**
 * [节流]
 * @param {Function} func 执行函数
 * @param {Number} wait 多少毫秒内运行一次
 */
export const throttle = (func, wait = 16) => {
  let locking = false

  const release = () => {
    locking = false
  }

  const debounced = debounce(func, wait)

  return (...args) => {
    debounced(...args) // 确保最后一次会执行

    if (locking) {
      return
    }

    locking = true
    func(...args)
    setTimeout(release, wait)
  }
}

/**
 * [随机函数] 获取 (min, max) 之间的一个随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export const random = (min = 0, max = 1) => Math.random() * (max - min) + min

/**
 * [过滤对象属性] 挑选处一个对象中的指定属性，属性必须是有效值（不为 null 或 undefined）
 * @param {Object} obj 数据源对象
 * @param {Array} keys
 */
export const getAvailableKeys = (obj, keys = Object.keys(obj)) =>
  Object.entries(obj)
    .filter(([key, value]) => keys.includes(key) && isExist(value))
    .reduce(
      (res, [key, value]) => ({
        ...res,
        [key]: value
      }),
      {}
    )
