import { get, run } from '../try'

const root = global || window

const query = (name, url = root.location.search) => {
  let r = get(run(url, 'split', '?'), '1', '').match(
    new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  )
  if (r !== null) return r[2]
}

export const param = (...args) => {
  const res = query(...args)
  return res ? root.decodeURIComponent(res) : undefined
}

export const paramEscape = (...args) => {
  const res = query(...args)
  return res ? root.unescape(res) : undefined
}
