import easeFormula from './__ease__formula'

const root = global || window
const { requestAnimationFrame } = root

/**
 * 缓动进程
 * 作用：使用一个 requestAnimationFrame 函数来处理多个缓动任务的并行工作
 */
class TweenProgress {
  //任务列表：承载进行中的任务
  taskList = []

  //进程是否正在工作：进程工作过程中若插入新的任务，不会影响目前的工作流程
  isRunning = false

  //帧函数
  requestFrame = () => {
    const stepTime = Date.now()

    //每一帧，对任务列表使用filter来过滤此帧中已结束的任务，并在filter中执行任务帧
    this.taskList = this.taskList.filter(
      ({
        group,
        duration,
        step,
        onEnd,
        ease,
        parser,
        startTime,
        endTime,
        __need__to__stop,
        totalDiffrence
      }) => {
        const taskPercent = (stepTime - startTime) / duration,
          isEnd = stepTime >= endTime,
          easeFn = typeof ease === 'function' ? ease : easeFormula[ease],
          stepGroup = group.map(({ from: _from, to }, idx) =>
            parser(
              isEnd ? to : totalDiffrence[idx] * easeFn(taskPercent) + _from
            )
          )

        step(stepGroup)

        if (isEnd || __need__to__stop) return onEnd(), false
        return true
      }
    )

    //若有未结束任务，则继续下一帧
    if (this.taskList.length > 0) requestAnimationFrame(this.requestFrame)
    else this.isRunning = false
  }

  run(task) {
    this.taskList.push(task)

    if (this.isRunning) return
    this.isRunning = true
    this.requestFrame()
  }
}

/**
 * 缓动引擎
 * 作用：为缓动任务分配适宜进程，并控制进程任务总数，以保证进程性能
 */
const TweenEngine = {
  progressList: [],
  run(task) {
    //获取进程列表中任务总数少于20个的进程
    let progress = this.progressList.find(p => p.taskList.length < 20)

    if (!progress) {
      progress = new TweenProgress()
      this.progressList.push(progress)
    }

    progress.run(task)
  }
}

export default TweenEngine
