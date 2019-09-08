module.exports = function({ types: t, template }) {
  const jSXAttribute = (t.jSXAttribute || t.jsxAttribute).bind(t)
  const jSXIdentifier = (t.jSXIdentifier || t.jsxIdentifier).bind(t)
  function getVisitor() {
    const KATypeCountMap = new Map()

    let uuid = 1
    const KATypeMap = new Map()

    // 对每种 NodeType 做编号处理
    function getTypeId(type) {
      let typeId = KATypeMap.get(type)

      if (!typeId) {
        typeId = (++uuid).toString(32)
        KATypeMap.set(type, typeId)
      }

      return typeId
    }

    function genKAValue(openingElementNode) {
      try {
        const typeId = getTypeId(openingElementNode.name.name)

        const count = KATypeCountMap.get(typeId) || 0
        const kaValue = count + 1
        KATypeCountMap.set(typeId, kaValue)

        return t.stringLiteral(`${typeId}${kaValue.toString(32)}`)
      } catch (error) {
        return t.stringLiteral(`error`)
      }
    }

    return {
      JSXOpeningElement: {
        enter(path) {
          // 排除 Fragment
          // TODO: 考虑 Fragment 重命名情况
          if (path.node.name.name.includes('Fragment')) {
            return
          }

          // 不允许自定义 data-ka 属性
          const attributes = path.node.attributes.filter(attr => {
            try {
              return (
                attr.type !== 'JSXAttribute' || attr.name.name !== 'data-ka'
              )
            } catch (error) {
              return true
            }
          })

          path.node.attributes = [
            ...attributes,
            jSXAttribute(jSXIdentifier('data-ka'), genKAValue(path.node))
          ]
        }
      }
    }
  }

  return {
    visitor: {
      Program: {
        enter(path) {
          path.traverse(getVisitor())
        }
      }
    }
  }
}
