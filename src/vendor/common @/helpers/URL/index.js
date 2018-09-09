import { isNull } from '../is'
import { get, run } from '../try'
import { __ } from '../utils'

const root = global || window
const sandbox = fn => {
  try {
    return run(fn)
  } catch (err) {
    console.error('[URL sandbox]', err)
  }
}

export const paramEscape = __(param)(__, __, root.unescape)
export function param(
  name,
  url = root.location.search,
  decoder = root.decodeURIComponent
) {
  let res = get(run(url, 'split', '?'), '1', '').match(
    new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  )

  return isNull(res) ? undefined : decoder(res[2])
}

export const allParamEscape = __(allParam)(__, root.unescape)
export function allParam(
  url = root.location.search,
  decoder = root.decodeURIComponent
) {
  const search = get(url.split('?'), [1], '')

  if (search.length === 0) {
    return {}
  }

  return search
    .split('&')
    .map(param => param.split('='))
    .reduce(
      (res, [key, value]) =>
        Object.assign(res, {
          [key]: sandbox(() => decoder(value))
        }),
      {}
    )
}

export function generateParamStr(paramObj, encoder = root.encodeURIComponent) {
  return `?${Object.entries(paramObj)
    .map(([key, value]) => [key, encoder(value)].join('='))
    .join('&')}`
}
