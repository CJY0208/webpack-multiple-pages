import easeFormula from './__ease__formula'
import TweenEngine from './__tween__engine'

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
