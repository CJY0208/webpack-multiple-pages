const collectPath = (fiberNode, res = []) => {
  return fiberNode.return
    ? collectPath(fiberNode.return, [fiberNode.return, ...res])
    : res
}

let uuid = 1
const keyMap = new Map()

const getKeyByType = type => {
  let key = keyMap.get(type)

  if (!key) {
    key = ++uuid
    keyMap.set(type, key)
  }

  return key
}

const getKeyByCoord = nodes =>
  nodes
    .map(node => {
      const x = getKeyByType(node.type)
      const y = judgeChildIndex(node)

      return `${x},${y}`
    })
    .join('|')

const judgeChildIndex = (fiberNode, res = 0) => {
  if (!fiberNode.sibling) {
    return res
  }

  return judgeChildIndex(fiberNode.sibling, res + 1)
}

const getRenderCoordByFiberNode = fiberNode => {
  return getKeyByCoord(collectPath(fiberNode))
}

export default getRenderCoordByFiberNode
