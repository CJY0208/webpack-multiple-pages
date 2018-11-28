// import eruda from 'eruda'
import '../style/__eruda__fix.css'
import { overide, reset, release } from './helpers/overide'
import * as CDN from './helpers/CDN'

let __console__timeout

const __host__white__list = []
const { prompt } = window
const isDesktop = () =>
  /(Win32|Win64|MacIntel|Linux x86_64)/i.test(window.navigator.platform)

const eruda$ = document.createElement('div')

eruda$.setAttribute('data-eruda', true)
document.body.appendChild(eruda$)

const showConsole = async () => {
  try {
    const eruda = await CDN.js('//cdn.jsdelivr.net/npm/eruda', 'eruda')

    reset()

    eruda.init({
      container: eruda$
    })

    release()

    eruda$.style.display = 'block'

    window.eruda = eruda
  } catch (err) {
    // nothing
  }
}

const bind = e => {
  let x, y

  try {
    x = e.touches[0].pageX
    y = e.touches[0].pageY
  } catch (err) {
    console.error('[eruda] 初始化失败', err)
    remove()
  }

  if (x > 50 || y > 50) {
    return
  }

  __console__timeout = setTimeout(() => {
    if (prompt() === '20160315') {
      showConsole()
    }
  }, 3000)
}

const unbind = e => clearTimeout(__console__timeout)

const attach = () => {
  document.body.addEventListener('touchstart', bind)
  document.body.addEventListener('touchend', unbind)

  overide()
}

const remove = () => {
  try {
    eruda$.parentNode.removeChild(eruda$)
  } catch (error) {
    // nothing
  }
}

if (!isDesktop()) {
  attach()
}

if (
  __host__white__list.includes(window.location.host) ||
  process.env.TEST ||
  process.env.NODE_ENV === 'development'
) {
  showConsole()
}
