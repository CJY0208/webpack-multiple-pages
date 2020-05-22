import React, { Component } from 'react'

import { get, flatten, isRegExp } from '../helpers'

import { AliveScopeProvider } from './context'
import Keeper from './Keeper'

const HANDLE_TYPE_DROP = 'drop'
const HANDLE_TYPE_REFRESH = 'refresh'

console.log(React.version)

export default class AliveScope extends Component {
  store = new Map()
  nodes = new Map()
  keepers = new Map()

  update = (id, params) =>
    new Promise(resolve => {
      const keeper = this.keepers.get(id)
      const isNew = !keeper
      const now = Date.now()
      const node = this.nodes.get(id) || null
      this.nodes.set(id, {
        id,
        createTime: now,
        updateTime: now,
        ...node,
        ...params
      })

      if (isNew) {
        this.helpers = { ...this.helpers }

        this.forceUpdate(resolve)
      } else {
        const { children, bridgeProps } = params
        keeper.setState({ children, bridgeProps }, resolve)
      }
    })

  keep = (id, params) =>
    new Promise(resolve => {
      this.update(id, {
        id,
        ...params
      }).then(() => {
        resolve(this.store.get(id))
      })
    })

  getCachingNodesByName = name =>
    this.getCachingNodes().filter(
      node => (isRegExp(name) ? name.test(node.name) : node.name === name)
    )

  getScopeIds = ids => {
    // 递归采集 scope alive nodes id
    const getCachingNodesId = id => {
      const aliveNodesId = get(this.getCache(id), 'aliveNodesId', [])

      if (aliveNodesId.size > 0) {
        return [id, [...aliveNodesId].map(getCachingNodesId)]
      }

      return [id, ...aliveNodesId]
    }

    return flatten(ids.map(id => getCachingNodesId(id)))
  }

  dropById = id => this.handleNodes([id], HANDLE_TYPE_DROP)
  dropScopeByIds = ids =>
    this.handleNodes(this.getScopeIds(ids), HANDLE_TYPE_DROP)

  drop = name =>
    this.handleNodes(
      this.getCachingNodesByName(name).map(node => node.id),
      HANDLE_TYPE_DROP
    )

  dropScope = name =>
    this.dropScopeByIds(this.getCachingNodesByName(name).map(({ id }) => id))

  refreshById = id => this.handleNodes([id], HANDLE_TYPE_REFRESH)
  refreshScopeByIds = ids =>
    this.handleNodes(this.getScopeIds(ids), HANDLE_TYPE_REFRESH)

  refresh = name =>
    this.handleNodes(
      this.getCachingNodesByName(name).map(node => node.id),
      HANDLE_TYPE_REFRESH
    )

  refreshScope = name =>
    this.refreshScopeByIds(this.getCachingNodesByName(name).map(({ id }) => id))

  handleNodes = (nodesId, type = HANDLE_TYPE_DROP) =>
    new Promise(resolve => {
      const willRefreshKeepers = []
      const willDropNodes = []

      nodesId.forEach(id => {
        const cache = this.store.get(id)

        if (!cache) {
          return
        }

        const canRefresh = type === HANDLE_TYPE_REFRESH && !get(cache, 'cached')
        const canDrop =
          (type === HANDLE_TYPE_DROP && get(cache, 'cached')) ||
          get(cache, 'willDrop')

        if (canDrop) {
          // 用在多层 KeepAlive 同时触发 drop 时，避免触发深层 KeepAlive 节点的缓存生命周期
          cache.willDrop = true
          this.nodes.delete(id)
          willDropNodes.push(id)
        }

        if (canRefresh) {
          const keeper = this.keepers.get(id)
          willRefreshKeepers.push(keeper)
        }
      })

      Promise.all([
        willDropNodes.length === 0
          ? Promise.resolve(false)
          : new Promise(resolve => {
              this.helpers = { ...this.helpers }
              this.forceUpdate(() => resolve(true))
            }),
        willRefreshKeepers.length === 0
          ? Promise.resolve(false)
          : Promise.all(
              willRefreshKeepers.map(
                keeper => new Promise(resolve => keeper.refresh(resolve))
              )
            )
      ]).then(([dropSuccessfully, refreshSuccessfully]) =>
        resolve(Boolean(dropSuccessfully || refreshSuccessfully))
      )
    })

  clear = () => this.handleNodes(this.getCachingNodes().map(({ id }) => id))

  getCache = id => this.store.get(id)
  getNode = id => this.nodes.get(id)
  getCachingNodes = () => [...this.nodes.values()]

  // 静态化节点上下文内容，防止重复渲染
  helpers = {
    keep: this.keep,
    update: this.update,
    drop: this.drop,
    dropScope: this.dropScope,
    dropById: this.dropById,
    dropScopeByIds: this.dropScopeByIds,
    refresh: this.refresh,
    refreshScope: this.refreshScope,
    refreshById: this.refreshById,
    refreshScopeByIds: this.refreshScopeByIds,
    getScopeIds: this.getScopeIds,
    clear: this.clear,
    getCache: this.getCache,
    getNode: this.getNode,
    getCachingNodes: this.getCachingNodes
  }

  render() {
    const { children } = this.props

    console.log(this.helpers)

    return (
      <AliveScopeProvider value={this.helpers}>
        {children}
        <div style={{ display: 'none' }}>
          {[...this.nodes.values()].map(({ children, ...props }) => (
            <Keeper
              key={props.id}
              {...props}
              store={this.store}
              keepers={this.keepers}
              ref={keeper => {
                this.keepers.set(props.id, keeper)
              }}
            >
              {children}
            </Keeper>
          ))}
        </div>
      </AliveScopeProvider>
    )
  }
}
