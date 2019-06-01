import { run } from '@helpers/base/try'
import root from '@helpers/base/globalThis'

const { requestAnimationFrame } = root

export default class Thread {
  constructor({ maxTaskCount = 20 } = {}) {
    this.maxTaskCount = maxTaskCount
  }

  taskList = new Set()

  isAvailable = () => this.taskList.size >= this.maxTaskCount

  //进程是否正在工作：进程工作过程中若插入新的任务，不会影响目前的工作流程
  isRunning = false

  //帧函数
  frame = () => {
    const frameTime = Date.now()

    //执行任务帧
    this.taskList.forEach(({ frame, startTime }) =>
      run(frame, undefined, {
        runningTime: frameTime - startTime,
        startTime,
        frameTime
      })
    )

    //若有未结束任务，则继续下一帧
    if (this.taskList.size > 0) {
      requestAnimationFrame(this.frame)
    } else {
      this.isRunning = false
    }
  }

  run = frame => {
    const task = {
      startTime: Date.now(),
      frame
    }

    this.taskList.add(task)

    if (!this.isRunning) {
      requestAnimationFrame(() => {
        this.isRunning = true
        this.frame()
      })
    }

    return () => this.taskList.delete(task)
  }
}
