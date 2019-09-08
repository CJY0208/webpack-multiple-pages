import { run, get } from '@helpers/base/try'
import { isArray, isExist, isUndefined, isObject } from '@helpers/base/is'
import EventBus from '@helpers/Constructor/EventBus'

/* Impure Function */
export const hot = module => Component =>
  process.env.NODE_ENV === 'development'
    ? require('react-hot-loader').hot(module)(Component)
    : Component

export const nextTick = func => Promise.resolve().then(func)

export const pipe = (...handlers) => arg =>
  handlers.reduce((res, handler) => run(handler, undefined, res), arg)

export const curry = fn =>
  function(...args) {
    return args.length < fn.length
      ? curry(fn.bind(this, ...args))
      : fn.apply(this, args)
  }

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
export const clamp = (value, min, max = Number.MAX_VALUE) => {
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

  return function(...args) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(this, args)
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

  return function(...args) {
    debounced.apply(this, args) // 确保最后一次会执行

    if (locking) {
      return
    }

    locking = true
    func.apply(this, args)
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
 * [抽样] 随机获取数组中的一个值
 * @param {Array} array 抽样数组
 */
export const sample = array =>
  get(array, [random(0, get(array, 'length', 0) - 1) |> Math.floor])

export const pickBy = (obj, predicate = val => val) =>
  Object.entries(obj)
    .filter(([key, value]) => run(predicate, undefined, value, key))
    .reduce(
      (res, [key, value]) => ({
        ...res,
        [key]: value
      }),
      {}
    )

/**
 * [过滤对象属性] 挑选处一个对象中的指定属性
 * @param {Object} obj 数据源对象
 * @param {Array} keys
 */
export const pick = (obj, keys = Object.keys(obj)) =>
  pickBy(obj, (value, key) => keys.includes(key))

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

/**
 * [缓存函数结果]
 * @param {Function} fn 被处理的函数
 */
export const memoize = (fn, { disable = () => false } = {}) => {
  const cache = new Map()

  const cached = function(param) {
    if (cache.has(param)) {
      return cache.get(param)
    }

    const result = fn.call(this, param)

    if (
      !disable.call(this, {
        cache,
        param,
        result
      })
    ) {
      cache.set(param, result)
    }

    return result
  }

  cached.cache = cache

  return cached
}

/**
 * [单咨询服务] Single Advisory Service 同一时刻对同一异步请求进行统一等待，不重复发起
 * @param {Function: Promise} query 异步查询函数，需要返回 Promise
 */
export const SAS = query => {
  const bus = new EventBus()
  let quering = false

  bus.on('done', () => {
    quering = false
  })

  return function(...args) {
    return new Promise(async (resolve, reject) => {
      bus.on(
        'done',
        (success, result) => (success ? resolve : reject)(result),
        {
          once: true
        }
      )

      if (quering) {
        return
      }
      quering = true

      try {
        const result = await query.apply(this, args)
        bus.emit('done', true, result)
      } catch (error) {
        bus.emit('done', false, error)
      }
    })
  }
}

/**
 * [复制] 尝试通过 web 本身实现复制功能
 * @param {String / Number} value 要复制的值
 */
export const copy = value => {
  if (isUndefined(document)) {
    return console.warn('宿主环境不存在 DOM 对象，无法执行复制操作')
  }

  const input = document.createElement('input')

  input.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0;
  `
  document.body.appendChild(input)

  input.setAttribute('value', value)
  input.setAttribute('readonly', false)

  // execCommand 执行 copy 命令时，页面中需要有一段被选中的文本，此处借用 input 来实现 js 选中文本功能
  input.select()
  input.setSelectionRange(0, 9999)

  if (document.execCommand('copy', true)) {
    document.execCommand('copy', true) // 核心这一句
  }

  document.body.removeChild(input)
}

export const first = value => {
  if (isArray(value)) {
    return value[0]
  }

  if (isObject(value)) {
    const keys = Object.keys(value)
    return value[first(keys)]
  }

  return undefined
}

export const last = value => {
  if (isArray(value)) {
    return value[value.length - 1]
  }

  if (isObject(value)) {
    const keys = Object.keys(value)
    return value[last(keys)]
  }
}
