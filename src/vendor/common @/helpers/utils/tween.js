/**
 * [缓动公式，网上找的，参考：http://www.cnblogs.com/brainworld/p/7240564.html]
 * @param  {[type]} pos [动画进行百分比，取值：0 - 1]
 * @return {[type]}     [description]
 */
const easeFormula = {
    easeInOutCubic: pos =>
      (pos /= 0.5) < 1
        ? 0.5 * Math.pow(pos, 3)
        : 0.5 * (Math.pow(pos - 2, 3) + 2)
  },
  { requestAnimationFrame } = global || window

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
          easeFn = easeFormula[ease],
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

/**
 * [缓动函数]
 * @return {[Function]}                   [终止缓动函数]
 * e.g:
 *      let stop = tween({
 *          group: [
 *              {
 *                  from: 0,
 *                  to: 100
 *              },
 *              {
 *                  from: 100,
 *                  to: 0
 *              }
 *          ],
 *          duration: 1000,
 *          step([ stepNumber1, stepNumber2 ]) {
 *              console.log(stepNumber1, stepNumber2) //1, 99 ... 2, 98 ... 3, 97 ...... 100, 0
 *          }
 *      })
 *
 *      stop() //缓动终止
 */
export default function tween({
  group, //需要改变的数据组，可同时渐变多组数据
  duration = 500, //动画完成时间
  step = stepGroup => void 0, //步骤监听函数
  onEnd = () => void 0, //结束回调
  ease = 'easeInOutCubic', //缓动方式
  parser = number => number //步骤值预处理函数
}) {
  const startTime = Date.now(),
    task = {
      group,
      duration,
      step,
      onEnd,
      ease,
      parser,
      startTime,
      totalDiffrence: group.map(({ from: _from, to }) => to - _from),
      endTime: startTime + duration,
      __need__to__stop: false
    }

  TweenEngine.run(task)

  return function stop() {
    task.__need__to__stop = true
  }
}
