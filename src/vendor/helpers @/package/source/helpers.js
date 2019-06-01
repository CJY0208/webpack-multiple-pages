import { isUndefined } from '@helpers/base/is'
import root from '@helpers/base/globalThis'
import { curry } from '@helpers/package/utils'

const getExt = curry((src, key) => {
  const ext = root[key]
  !isUndefined(key) &&
    isUndefined(ext) &&
    console.warn(`No external named '${key}' in global after loaded ${src}`)
  return ext
})

export const getExternals = (src, externals) =>
  Array.isArray(externals) ? externals.map(getExt(src)) : getExt(src, externals)
