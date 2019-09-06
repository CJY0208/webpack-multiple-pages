import React, { Component } from 'react'

import { get, run, isArray } from '@helpers'

import { expandKeepAlive } from './withAliveStore'
import {
  LIFECYCLE_ACTIVATE,
  LIFECYCLE_UNACTIVATE,
  withLifecycles
} from './lifecycles'
import saveScrollPos from '../helpers/saveScrollPos'
import { getTypeId } from './getKeyByFiberNode'

const getChildType = child => getTypeId(get(child, 'type.$$typeof', child.type))
const getChildrenTypes = children =>
  (isArray(children)
    ? children.map(getChildType)
    : [getChildType(children)]
  ).join('|')

@expandKeepAlive
@withLifecycles
export default class KeepAlive extends Component {
  constructor(props) {
    super(props)
    this.init()

    // 继承响应父级 KeepAlive 的生命周期
    ;[LIFECYCLE_ACTIVATE, LIFECYCLE_UNACTIVATE].forEach(lifecycleName => {
      this[lifecycleName] = () => {
        const { id, getCache } = this.props
        const cache = getCache(id)

        // 若组件即将卸载则不再触发缓存生命周期
        if (!cache || cache.willDrop) {
          return
        }
        run(cache, lifecycleName)
        cache.cached = lifecycleName === LIFECYCLE_UNACTIVATE
      }
    })
  }

  init = async () => {
    const { keep, id, children, ctx$$, name } = this.props

    // 将 children 渲染至 AliveStoreProvider 中
    const cache = await keep(id, {
      name,
      children,
      ctx$$
    })

    // DOM 操作有风险，try catch 护体
    try {
      // 将 AliveStoreProvider 中的渲染内容通过 dom 操作置回当前 KeepAlive
      this.parentNode = this.placeholder.parentNode
      cache.nodes.forEach(node => {
        // this.placeholder.appendChild(node)
        this.parentNode.insertBefore(node, this.placeholder)
      })
      this.parentNode.removeChild(this.placeholder)

      // 恢复该节点下各可滚动元素的滚动位置
      run(cache.revertScrollPos)
    } catch (error) {
      console.error(error)
    }

    // 触发 didActivate 生命周期
    if (cache.inited) {
      run(this, LIFECYCLE_ACTIVATE)
    } else {
      cache.inited = true
    }
  }

  async componentDidUpdate(prevProps) {
    const { keep, id, children, ctx$$, name } = this.props
    console.log(children)
    if (getChildrenTypes() !== getChildrenTypes(children)) {
      console.log(children)
      // 将 children 渲染至 AliveStoreProvider 中
      // const cache = await keep(id, {
      //   name,
      //   children,
      //   ctx$$
      // })
    }
  }

  // getIn = () => {

  // }

  // getOut = () => {}

  componentWillUnmount() {
    const { id, getCache } = this.props
    const cache = getCache(id)

    // DOM 操作有风险，try catch 护体
    try {
      // 保存该节点下各可滚动元素的滚动位置
      cache.revertScrollPos = saveScrollPos(cache.nodes)

      // 将 KeepAlive 中的节点恢复为原先的占位节点，保证卸载操作正常进行
      this.parentNode.insertBefore(this.placeholder, cache.nodes[0])
      cache.nodes.forEach(node => {
        this.parentNode.removeChild(node)
      })
    } catch (error) {
      console.error(error)
    }

    // 触发 willUnactivate 生命周期
    run(this, LIFECYCLE_UNACTIVATE)
  }

  render() {
    return (
      <div
        onClick={e => {
          console.log(e)
        }}
        ref={node => {
          this.placeholder = node
        }}
      />
    )
  }
}
