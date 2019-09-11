import { isArray } from './is'

const flatten = array =>
  array.reduce(
    (res, item) => [...res, ...(isArray(item) ? flatten(item) : [item])],
    []
  )

const checkStyleList = ['overflow', 'overflow-x', 'overflow-y']
const scrollableStyleValue = ['auto', 'scroll']

function getScrollableNodes(from = document) {
  return [...from.querySelectorAll('*'), from].filter(node => {
    const styles = getComputedStyle(node)

    return (
      (!node.saving && // 过滤已经进入保存状态的 DOM 以节约性能
        (checkStyleList.some(style =>
          scrollableStyleValue.includes(styles[style])
        ) &&
          node.scrollWidth > node.offsetWidth)) ||
      node.scrollHeight > node.offsetHeight
    )
  })
}

export default function saveScrollPosition(from = document) {
  const nodes = flatten(
    (!isArray(from) ? [from] : from).map(getScrollableNodes)
  )
  const saver = nodes.map(node => {
    node.saving = true

    return [
      node,
      {
        x: node.scrollLeft,
        y: node.scrollTop
      }
    ]
  })

  return function revert() {
    saver.forEach(([node, { x, y }]) => {
      node.scrollLeft = x
      node.scrollTop = y

      delete node.saving
    })
  }
}
