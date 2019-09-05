import { get } from '@helpers'

let uuid = 1
const typeIdMap = new Map()

window.typeIdMap = typeIdMap

// 对每种 NodeType 做编号处理
const getNodeTypeId = type => {
  let typeId = typeIdMap.get(type)

  if (!typeId) {
    typeId = ++uuid
    typeIdMap.set(type, typeId)
  }

  return typeId
}

// 获取节点的渲染路径，作为节点的 X 坐标
const genRenderPath = (fiberNode, res = []) =>
  fiberNode.return
    ? genRenderPath(fiberNode.return, [fiberNode.return, ...res])
    : res

// 计算元素的剩余同级节点个数，作为节点的 Y 坐标
const getSiblingCount = (fiberNode, res = 0) =>
  fiberNode.sibling ? getSiblingCount(fiberNode.sibling, res + 1) : res

// 根据 X,Y 坐标生成 Key
const getKeyByCoord = nodes =>
  nodes
    .map(node => {
      const x = getNodeTypeId(get(node, 'type.$$typeof', node.type))
      const y = getSiblingCount(node)

      return `${x},${y}`
    })
    .join('|')

const getKeyByFiberNode = fiberNode => getKeyByCoord(genRenderPath(fiberNode))

export default getKeyByFiberNode
