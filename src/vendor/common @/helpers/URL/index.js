import { get, run } from '../try'

export const param = (name, url = window.location.search) => {
  let r = get(run(url, 'split', '?'), '1', '').match(
    new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  )
  if (r === null) return undefined
  try {
    return window.decodeURIComponent(r[2])
  } catch (err) {
    return unescape(r[2])
  }
}
