import { getExternals } from './helpers'

export default new class fetchCDN {
  js = (src, externals) =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.setAttribute('src', src)
      script.addEventListener('load', () =>
        setTimeout(() => resolve(getExternals(src, externals)))
      )
      script.addEventListener('error', reject)
      document.body.appendChild(script)
    })

  css = href => {
    const link = document.createElement('link')
    link.setAttribute('href', href)
    link.setAttribute('rel', 'stylesheet')
    document.body.appendChild(link)
  }
}()
