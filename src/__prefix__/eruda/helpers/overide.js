/**
 * 此文件用以在 eruda 加载前对 console 输出做记录，在 eruda 加载后做 log 恢复处理
 */
const root = (global || window).console
const __overided__methods = [
  'log',
  'error',
  'info',
  'warn',
  'dir',
  // 'time',
  // 'timeEnd',
  // 'clear',
  // 'count',
  // 'assert',
  'table'
]

const __log__cache = {}

export const overide = () => {
  __overided__methods.forEach(method => {
    root[`_${method}`] = root[method]

    __log__cache[method] = []
    root[method] = (...args) => {
      __log__cache[method].push(args)
      return root[`_${method}`](...args)
    }
  })
}

export const reset = () => {
  __overided__methods.forEach(method => {
    root[method] = root[`_${method}`]
    // delete root[`_${method}`]
  })
}

export const release = () => {
  __overided__methods.forEach(method => {
    __log__cache[method].forEach(args => {
      root[method](...args)
    })
  })
}
