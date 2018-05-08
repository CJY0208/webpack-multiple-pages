import { run } from '../try'

export default class ScrollListener {
  constructor({
    distanceToReachEnd = 100,
    onEndReached = () => console.log('reach the bottom'),
    element,
    distanceEvents = []
  }) {
    const self = this

    if (typeof element === 'undefined') throw Error('Need Scroll-Container!')

    let rAFLock = false
    let scrollHandler
    let distanceEventsStatus = distanceEvents.map(
      ({ distance }) => (element.scrollTop > distance ? 'outside' : 'inside')
    )

    self.destroy = () => element.removeEventListener('scroll', scrollHandler)

    function onScroll(e) {
      run(e, 'stopPropagation')

      distanceEvents.forEach(
        (
          {
            distance = -1,
            onGoingIn = () => console.log('on going in'),
            onGoingOut = () => console.log('on going out')
          },
          idx
        ) => {
          switch (distanceEventsStatus[idx]) {
            case 'inside':
              if (this.scrollTop > distance) {
                onGoingOut.call(this, self)
                distanceEventsStatus[idx] = 'outside'
              }
              break
            case 'outside':
              if (this.scrollTop <= distance) {
                onGoingIn.call(this, self)
                distanceEventsStatus[idx] = 'inside'
              }
              break
          }
        }
      )

      if (
        !self.endReacher.pausing &&
        this.scrollTop + this.offsetHeight + distanceToReachEnd >
          this.scrollHeight
      ) {
        onEndReached.call(this, self)
      }
    }

    scrollHandler = e => {
      if (rAFLock) return
      requestAnimationFrame(() => {
        onScroll.call(element, e)
        rAFLock = false
      })
      rAFLock = true
    }
    element.addEventListener('scroll', scrollHandler)

    return self
  }

  endReacher = {
    pausing: false,
    pause() {
      this.pausing = true
    },
    continue() {
      this.pausing = false
    }
  }
}
