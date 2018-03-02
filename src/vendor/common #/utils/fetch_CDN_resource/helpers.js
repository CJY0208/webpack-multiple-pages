const isUndefined = obj => typeof obj === 'undefined'
const curry = fn => (...args) =>
  args.length < fn.length
    ? curry(fn.bind(undefined, ...args))
    : fn.apply(undefined, args)

const getExt = curry((src, key) => {
  const ext = window[key]
  !isUndefined(key) &&
    isUndefined(ext) &&
    console.warn(`No external named '${key}' in window after loaded ${src}`)
  return ext
})

export const getExternals = (src, externals) =>
  Array.isArray(externals) ? externals.map(getExt(src)) : getExt(src, externals)
