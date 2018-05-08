import { run, get } from '../../try'
import { isArray } from '../../is'

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

    return Object.assign(res, {
      [groupName]: [...group, item]
    })
  }, {})

export const flatten = array =>
  array.reduce(
    (res, item) => [...res, ...(isArray(item) ? flatten(item) : [item])],
    []
  )

export const intersection = (...args) =>
  (args |> flatten |> (_ => new Set(_)) |> Array.from).filter(item =>
    args.every(arr => arr.includes(item))
  )
