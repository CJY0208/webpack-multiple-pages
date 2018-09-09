/**
 * [缓动公式，网上找的，参考：http://www.cnblogs.com/brainworld/p/7240564.html]
 * @param  {[type]} pos [动画进行百分比，取值：0 - 1]
 * @return {[type]}     [description]
 */
export default {
  easeInOutCubic: pos =>
    (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 3) : 0.5 * (Math.pow(pos - 2, 3) + 2)
}
