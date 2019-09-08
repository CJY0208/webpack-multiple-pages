import React, { Component } from 'react'

import {
  get,
  run,
  globalThis as root,
  isArray,
  isFunction,
  throttle,
  debounce,
  nextTick
} from '@helpers'

import { expandKeepAlive } from './withAliveScope'
import {
  LIFECYCLE_ACTIVATE,
  LIFECYCLE_UNACTIVATE,
  withActivation
} from './lifecycles'
import saveScrollPos from '../helpers/saveScrollPos'

const getErrorTips = name =>
  `<KeepAlive ${
    name ? `name="${name}" ` : ''
  }/>  瞬时更新次数过多，可能遇到了更新的死循环，已强制暂停更新
您现在可见的更新结果存在严重的性能问题
可能遇到了隐含的 bug，请不要使用 KeepAlive 并联系作者解决`

@expandKeepAlive
@withActivation
class KeepAlive extends Component {
  // 本段为 KeepAlive 更新隐患检测，通过检测 KeepAlive 瞬时更新次数来判断是否进入死循环，并在 update 中强制阻止更新
  updateTimes = 0
  errorTips = debounce(() => {
    const { name } = this.props
    console.error(getErrorTips(name))
  }, 100)
  releaseUpdateTimes = debounce(() => {
    this.updateTimes = 0
  }, 32)
  needForceStopUpdate = () => {
    const needForceStopUpdate = this.updateTimes > 16

    if (needForceStopUpdate) {
      this.errorTips()
    }

    this.updateTimes++
    this.releaseUpdateTimes()

    return needForceStopUpdate
  }

  constructor(props) {
    super(props)
    this.init()

    // 继承响应父级 KeepAlive 的生命周期
    ;[LIFECYCLE_ACTIVATE, LIFECYCLE_UNACTIVATE].forEach(lifecycleName => {
      this[lifecycleName] = () => {
        const { id, __aliveScopeHelpers } = this.props
        const cache = __aliveScopeHelpers.getCache(id)

        // 若组件即将卸载则不再触发缓存生命周期
        if (!cache || cache.willDrop) {
          return
        }
        run(cache, lifecycleName)
        cache.cached = lifecycleName === LIFECYCLE_UNACTIVATE
      }
    })
  }

  // DOM 操作将实际内容插入占位元素
  inject = (didActivate = true) => {
    const { id, __aliveScopeHelpers } = this.props
    const cache = __aliveScopeHelpers.getCache(id)
    // DOM 操作有风险，try catch 护体
    try {
      // // 原计划不增加额外的节点，直接将 Keeper 中所有内容节点一一迁移
      // // 后发现缺乏统一 react 认可的外层包裹，可能会造成 react dom 操作的错误
      // // 且将导致 KeepAlive 进行 update 时需先恢复各 dom 节点的组件归属，成本过高
      // // 故此处增加统一的 div 外层，Keeper 中与 KeepAlive 中各一个且外层不做移除处理
      // this.parentNode = this.placeholder.parentNode
      // cache.nodes.forEach(node => {
      //   this.parentNode.insertBefore(node, this.placeholder)
      // })
      // this.parentNode.removeChild(this.placeholder)
      // 将 AliveScopeProvider 中的渲染内容通过 dom 操作置回当前 KeepAlive
      cache.nodes.forEach(node => {
        this.placeholder.appendChild(node)
      })

      if (didActivate) {
        // 恢复该节点下各可滚动元素的滚动位置
        run(cache.revertScrollPos)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // DOM 操作将实际内容移出占位元素
  eject = (willUnactivate = true) => {
    const { id, __aliveScopeHelpers } = this.props
    const cache = __aliveScopeHelpers.getCache(id)

    // DOM 操作有风险，try catch 护体
    try {
      if (willUnactivate) {
        // 保存该节点下各可滚动元素的滚动位置
        cache.revertScrollPos = saveScrollPos(cache.nodes)
      }

      //
      // // 原计划不增加额外的节点，直接将 Keeper 中所有内容节点一一迁移
      // // 后发现缺乏统一 react 认可的外层包裹，可能会造成 react dom 操作的错误
      // // 且将导致 KeepAlive 进行 update 时需先恢复各 dom 节点的组件归属，成本过高
      // // 故此处增加统一的 div 外层，Keeper 中与 KeepAlive 中各一个且外层不做移除处理
      // this.parentNode.insertBefore(this.placeholder, cache.nodes[0])
      // cache.nodes.forEach(node => {
      //   if (willUnactivate) {
      //     this.parentNode.removeChild(node)
      //   } else {
      //     cache.wrapper.appendChild(node)
      //   }
      // })
      // this.parentNode.insertBefore(this.placeholder, cache.nodes[0])
      // 将 KeepAlive 中的节点恢复为原先的占位节点，保证卸载操作正常进行
      cache.nodes.forEach(node => {
        if (willUnactivate) {
          this.placeholder.removeChild(node)
        } else {
          cache.wrapper.appendChild(node)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  cache = null
  init = async () => {
    const { __aliveScopeHelpers, id, children, ctx$$, name } = this.props

    // 将 children 渲染至 AliveScopeProvider 中
    const cache = await __aliveScopeHelpers.keep(id, {
      name,
      children,
      ctx$$
    })

    this.inject()

    // 触发 didActivate 生命周期
    if (cache.inited) {
      run(this, LIFECYCLE_ACTIVATE)
    } else {
      cache.inited = true
    }
    cache.keepAliveInstance = this
  }

  update = ({ __aliveScopeHelpers, id, children, ctx$$, name }) => {
    if (this.needForceStopUpdate(name)) {
      return
    }

    // // 原先打算更新过程中先重置 dom 节点状态，更新后恢复 dom 节点
    // // 但考虑到性能消耗可能过大，且可能因 dom 操作时机引发其他 react 渲染问题，故不使用
    // // 对应 Keeper 处 componentDidUpdate 也注释起来不使用
    // this.eject(false)
    __aliveScopeHelpers.update(id, {
      name,
      children,
      ctx$$
    })
    // this.inject(false)
  }

  // 利用 shouldComponentUpdate 提前触发组件更新
  shouldComponentUpdate(nextProps) {
    // console.log(nextProps)
    // nextTick(() => this.update(nextProps))
    this.update(nextProps)

    return false
  }

  // 组件卸载时将
  componentWillUnmount() {
    const { id, __aliveScopeHelpers } = this.props
    this.eject()

    // 触发 willUnactivate 生命周期
    run(this, LIFECYCLE_UNACTIVATE)
    const cache = __aliveScopeHelpers.getCache(id)
    delete cache.keepAliveInstance
  }

  render() {
    if (this.catchError) {
      throw this.catchError
    }

    return (
      <div
        key="keep-alive-placeholder"
        ref={node => {
          this.placeholder = node
        }}
      />
    )
  }
}

// 兼容 SSR 服务端渲染
function SSRKeepAlive({ children }) {
  return (
    <div key="keep-alive-placeholder">
      <div key="keeper-container">{children}</div>
    </div>
  )
}

export default (isFunction(get(root, 'document.getElementById'))
  ? KeepAlive
  : SSRKeepAlive)
