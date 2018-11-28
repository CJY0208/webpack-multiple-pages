import { getExternals } from './helpers'

// 增加 CDN 缓存，防止多次加载同一资源
const cache = {
  js: []
}

export const js = (src, externals) => {
  if (cache.js.includes(src)) {
    console.warn(`[CDN.js] ${src} 已被加载`)
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
