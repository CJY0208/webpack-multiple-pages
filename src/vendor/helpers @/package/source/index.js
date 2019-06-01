import { isExist } from '@helpers/base/is'

import { getExternals } from './helpers'

// 增加 source 缓存，防止多次加载同一资源
const cache = {
  js: [],
  css: []
}

export const js = (src, externals) => {
  if (cache.js.includes(src)) {
    console.warn(`[source.js] ${src} 已被加载`)
    return Promise.resolve(getExternals(src, externals))
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('src', src)
    script.addEventListener('load', () =>
      setTimeout(() => {
        cache.js.push(src)

        resolve(getExternals(src, externals))
      })
    )
    script.addEventListener('error', reject)
    document.body.appendChild(script)
  })
}

export const css = href => {
  if (cache.css.includes(href)) {
    console.warn(`[source.css] ${href} 已被加载`)
    return
  }

  const link = document.createElement('link')
  link.setAttribute('href', href)
  link.setAttribute('rel', 'stylesheet')
  document.body.appendChild(link)

  cache.css.push(href)
}
