import root from './globalThis'
/**
 * 此文件用以在 eruda 加载前对 console 输出做记录，在 eruda 加载后做 log 恢复处理
 */
const console = root.console
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
    console[`_${method}`] = console[method]

    __log__cache[method] = []
    console[method] = (...args) => {
      __log__cache[method].push(args)
      return console[`_${method}`](...args)
    }
  })
}

export const reset = () => {
  __overided__methods.forEach(method => {
    console[method] = console[`_${method}`]
    // delete console[`_${method}`]
  })
}

export const release = () => {
  __overided__methods.forEach(method => {
    __log__cache[method].forEach(args => {
      console[method](...args)
    })
  })
}
