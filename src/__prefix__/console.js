import eruda from 'eruda'
import './style/__eruda__fix.css'

let __console__timeout

const { prompt } = window
const isDesktop = () =>
  /(Win32|Win64|MacIntel|Linux x86_64)/i.test(window.navigator.platform)

const eruda$ = document.createElement('div')

eruda$.setAttribute('data-eruda', true)
document.body.appendChild(eruda$)

const showConsole = () => {
  try {
    eruda$.style.display = 'block'
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
    // nothing
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
}

const remove = () => {
  try {
    eruda$.parentNode.removeChild(eruda$)
  } catch (error) {
    // nothing
  }
}

if (!isDesktop()) {
  try {
    eruda.init({
      container: eruda$
    })
    attach()
  } catch (err) {
    console.error('[eruda] 初始化失败', err)
    remove()
  }
}

if (process.env.TEST || process.env.NODE_ENV === 'development') {
  showConsole()
}
