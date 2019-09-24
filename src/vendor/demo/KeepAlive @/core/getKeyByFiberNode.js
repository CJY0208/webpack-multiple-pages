import { get, isObject, isString, getKey2Id } from '../helpers'

let uuid = 1
const typeIdMap = new Map()
const isArrReg = /^iAr/

// 对每种 NodeType 做编号处理

const key2Id = getKey2Id()

// 获取节点的渲染路径，作为节点的 X 坐标
const genRenderPath = node =>
  node.return ? [node, ...genRenderPath(node.return)] : [node]

// 使用节点 _ka 属性或下标与其 key 作为 Y 坐标
// FIXME: 使用 index 作为 Y 坐标是十分不可靠的行为，待想出更好的法子替代
const getNodeId = fiberNode => {
  const _ka = get(fiberNode, 'pendingProps._ka')
  const isArray = isString(_ka) && isArrReg.test(_ka)
  const key = get(fiberNode, 'key', '')

  return isArray ? `${_ka}.${key}` : _ka || key || fiberNode.index
}

// 根据 X,Y 坐标生成 Key
const getKeyByCoord = nodes =>
  nodes
    .map(node => {
      const x = key2Id(get(node, 'type.$$typeof', node.type))
      const y = getNodeId(node)

      return `${x},${y}`
    })
    .join('|')

const getKeyByFiberNode = fiberNode => {
  const key = getKeyByCoord(genRenderPath(fiberNode))

  return key2Id(key)
}

export default getKeyByFiberNode
