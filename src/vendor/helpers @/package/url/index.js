import { isNull } from '@helpers/base/is'
import { get, run } from '@helpers/base/try'
import root from '@helpers/base/globalThis'
import { __ } from '@helpers/package/utils'

const safeDecode = value => {
  const decoders = [root.decodeURIComponent, root.decodeURI, root.unescape]

  for (let decode of decoders) {
    try {
      return decode(value)
    } catch (error) {
      continue
    }
  }

  return value
}

export const paramEscape = __(param)(__, __, root.unescape)
export function param(name, url = root.location.search, decode = safeDecode) {
  let res = get(run(url, 'split', '?'), '1', '').match(
    new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  )

  return isNull(res) ? undefined : decode(res[2])
}

export const allParamEscape = __(allParam)(__, root.unescape)
export function allParam(url = root.location.search, decode = safeDecode) {
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
          [key]: decode(value)
        }),
      {}
    )
}

export function generateParamStr(paramObj, encode = root.encodeURIComponent) {
  return `?${Object.entries(paramObj)
    .map(([key, value]) => [key, encode(value)].join('='))
    .join('&')}`
}
