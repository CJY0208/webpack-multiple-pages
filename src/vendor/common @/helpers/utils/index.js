import { run } from '../try'

export tween from './tween'
export classNames from './classNames'

/**
 * [mountScrollEvent 加载滚动触底事件]
 * @param  {Number}   options.distance        [触底响应距离]
 * @param  {Function} options.onReachBottom   [触底后的回调]
 * @param  {[Element]}   options.scrollContainer [监听的DOM节点]
 */
export function mountScrollEvent({
  distance = 100,
  onReachBottom = () => console.log('reach the bottom'),
  scrollContainer
}) {
  if (typeof scrollContainer === 'undefined')
    throw Error('Need Scroll-Container!')
  let rAFLock = false,
    scrollHandler
  const $controller = {
    pausing: false,
    pause() {
      this.pausing = true
    },
    continue() {
      this.pausing = false
    },
    unmount() {
      scrollContainer.removeEventListener('scroll', scrollHandler)
    }
  }
  function onScroll(e) {
    run(e, 'stopPropagation')
    if ($controller.pausing) return
    if (this.scrollTop + this.offsetHeight + distance > this.scrollHeight)
      onReachBottom.call($controller, $controller)
  }

  scrollHandler = e => {
    if (rAFLock) return
    requestAnimationFrame(() => {
      onScroll.call(scrollContainer, e)
      rAFLock = false
    })
    rAFLock = true
  }
  scrollContainer.addEventListener('scroll', scrollHandler)
}
