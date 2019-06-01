import { run } from '@helpers/base/try'

import Thread from './Thread'

/**
 * 帧任务进程
 * 作用：为任务分配适宜线程，并控制线程任务总数，以保证执行性能
 */
export default class Process {
  threadList = []

  constructor({ maxTaskCount } = {}) {
    this.maxTaskCount = maxTaskCount
  }

  getAvailableThread = () => {
    let thread = this.threadList.find(thread => thread.isAvailable())

    if (!thread) {
      thread = new Thread({
        maxTaskCount: this.maxTaskCount
      })
      this.threadList.push(thread)
    }

    return thread
  }

  start = frame => this.getAvailableThread().run(frame)
  once = frame => {
    const stop = this.start((...args) => {
      run(frame, undefined, ...args)
      stop()
    })
  }
}
