// https://github.com/CJY0208/babel-plugin-tester 开发

const crypto = require('crypto')
const jsxHelpers = require('jsx-ast-utils')

function getMap() {
  let uuid = 0
  const map = new Map()

  // 对每种 NodeType 做编号处理
  function getIdByKey(key) {
    let id = map.get(key)

    if (!id) {
      id = (++uuid).toString(32)
      map.set(key, id)
    }

    return id
  }

  return getIdByKey
}

module.exports = function({ types: t, template }) {
  const jSXAttribute = (t.jSXAttribute || t.jsxAttribute).bind(t)
  const jSXIdentifier = (t.jSXIdentifier || t.jsxIdentifier).bind(t)
  const jSXExpressionContainer = (
    t.jSXExpressionContainer || t.jsxExpressionContainer
  ).bind(t)

  function getElementVisitor(filehashIdentifier) {
    const KATypeCountMap = new Map()
    // 对每种 NodeType 做编号处理
    const getTypeId = getMap()

    function genUUID(openingElementNode) {
      try {
        const typeId = getTypeId(openingElementNode.name.name)

        const count = KATypeCountMap.get(typeId) || 0
        const kaValue = count + 1

        KATypeCountMap.set(typeId, kaValue)

        const nodeId = `${typeId}${kaValue.toString(32)}`
        const isArrayElement = openingElementNode.__isArrayElement
        const rawStart = isArrayElement ? 'iAr' : ''

        return jSXExpressionContainer(
          t.templateLiteral(
            [
              t.templateElement({ raw: rawStart, cooked: rawStart }),
              t.templateElement({ raw: nodeId, cooked: nodeId }, true)
            ],
            [filehashIdentifier]
          )
        )
      } catch (error) {
        debugger
        return t.stringLiteral(`error`)
      }
    }

    return {
      JSXOpeningElement: {
        enter(path) {
          const { node } = path
          // 排除 Fragment
          // TODO: 考虑 Fragment 重命名情况
          if (jsxHelpers.elementType(node).includes('Fragment')) {
            return
          }

          const hasKey = jsxHelpers.hasProp(node.attributes, 'key')
          const keyAttr = jsxHelpers.getProp(node.attributes, 'key')
          const keyAttrValue = hasKey && keyAttr.value && keyAttr.value.value

          // 排除 key 为以下的项，保证 SSR 时两端结果一致
          if (
            hasKey &&
            ['keep-alive-placeholder', 'keeper-container'].includes(
              keyAttrValue
            )
          ) {
            return
          }

          const isArrayElement = node.__isArrayElement

          // 不允许自定义 _ka 属性
          // DONE: 使用 key 属性替换，需考虑不覆盖 array 结构中的 key 属性，array 结构中保持 _ka 属性
          // 可参考：https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/rules/jsx-key.js
          const attributes = node.attributes.filter(attr => {
            try {
              return (
                attr.type !== 'JSXAttribute' ||
                jsxHelpers.propName(attr) !== '_ka'
              )
            } catch (error) {
              return true
            }
          })

          const uuidName =
            process.env.NODE_ENV !== 'production' || isArrayElement || hasKey
              ? '_ka'
              : 'key'

          node.attributes = [
            ...attributes,
            jSXAttribute(jSXIdentifier(uuidName), genUUID(node))
          ]
        }
      }
    }
  }

  function markIsArrayElement(node) {
    if (node) {
      node.__isArrayElement = true
    }
  }

  function getReturnStatement(body) {
    return body.filter(item => item.type === 'ReturnStatement')[0]
  }

  // 参考 eslint-plugin-react 对数组 key 的校验过程，来标记数组元素
  // https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/rules/jsx-key.js#L93
  const callExpressionVisitor = {
    // Array.prototype.map
    CallExpression(path) {
      const { node } = path
      if (node.callee && node.callee.type !== 'MemberExpression') {
        return
      }

      if (
        node.callee &&
        node.callee.property &&
        node.callee.property.name !== 'map'
      ) {
        return
      }

      const fn = node.arguments[0]
      const isFn = fn && fn.type === 'FunctionExpression'
      const isArrFn = fn && fn.type === 'ArrowFunctionExpression'

      if (
        isArrFn &&
        (fn.body.type === 'JSXElement' || fn.body.type === 'JSXFragment')
      ) {
        markIsArrayElement(fn.body.openingElement)
      }

      if (isFn || isArrFn) {
        if (fn.body.type === 'BlockStatement') {
          const returnStatement = getReturnStatement(fn.body.body)
          if (returnStatement && returnStatement.argument) {
            markIsArrayElement(returnStatement.argument.openingElement)
          }
        }
      }
    }
  }

  return {
    visitor: {
      Program: {
        enter(path, { cwd, filename, file: { opts = {} } = {} }) {
          const md5 = crypto.createHash('md5')
          const filepath =
            filename && filename.replace && cwd
              ? filename.replace(cwd, '')
              : opts.sourceFileName
          md5.update(filepath)
          const hash = md5.digest('base64').slice(0, 4)
          const filehashIdentifier = path.scope.generateUidIdentifier(
            'filehash'
          )

          let filehashTemplate

          try {
            filehashTemplate = template(`const %%filehash%% = %%hashString%%;`)(
              {
                filehash: filehashIdentifier,
                hashString: t.stringLiteral(hash)
              }
            )
          } catch (error) {
            filehashTemplate = template(
              `const ${filehashIdentifier.name} = '${hash}';`
            )()
          }

          const imports = path.node.body.filter(node =>
            t.isImportDeclaration(node)
          )

          if (imports.length > 0) {
            const insertPlace = imports[imports.length - 1]
            const insertPlacePath = path.get(
              `body.${path.node.body.indexOf(insertPlace)}`
            )
            insertPlacePath.insertAfter(filehashTemplate)
          } else {
            const insertPlacePath = path.get(`body.0`)
            if (insertPlacePath) {
              insertPlacePath.insertBefore(filehashTemplate)
            }
          }
          path.traverse(callExpressionVisitor)
          path.traverse(getElementVisitor(filehashIdentifier))
        }
      }
    }
  }
}
