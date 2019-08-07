import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  createRef
} from 'react'

import { run, get, isObject } from '@helpers'

const nextTick = async func => {
  await Promise.resolve()
  run(func)
}

let Store

export class AliveStore extends Component {
  constructor(props) {
    super(props)

    Store = this
    window.Store = this
  }

  cacheNodes = {}

  state = {
    cache: {}
  }

  setCache = (key, { children, ...payload }) =>
    new Promise(resolve =>
      this.setState(
        {
          cache: {
            ...this.state.cache,
            [key]: {
              component: (
                <div
                  key={key}
                  className={key}
                  ref={node => {
                    if (!this.cacheNodes[key] && node) {
                      this.cacheNodes[key] = get(node, 'children.0')
                    }
                  }}
                >
                  {children}
                </div>
              ),
              ...payload
            }
          }
        },
        () => {
          resolve(this.cacheNodes[key])
        }
      )
    )

  getCache = key => this.state.cache[key]
  getCacheNode = key => this.cacheNodes[key]
  removeCache = key => {
    const node = this.cacheNodes[key]

    if (node.cached) {
      let cache = { ...this.state.cache }
      delete cache[key]
      delete this.cacheNodes[key]
      this.setState({ cache })
    }
  }

  render() {
    const { cache } = this.state

    return (
      <div id="KeepAliveStore" style={{ display: 'none' }}>
        {Object.values(cache).map(({ component, ...rest }) => component)}
      </div>
    )
  }
}

export default class KeepAlive extends Component {
  constructor(props) {
    super(props)

    nextTick(this.init)
  }

  init = async () => {
    const { children, name } = this.props

    window.children = children

    let instance
    const node = await Store.setCache(name, {
      children: React.cloneElement(children, {
        ref: ref => {
          instance = ref
          run(children, 'ref', ref)
          if (isObject(children.ref)) {
            children.ref.current = ref
          }
        },
        injectKeepAliveCycles: val => console.log(val)
      })
    })

    if (!node.inited) {
      node.inited = true
    } else {
      run(instance, 'componentDidRecover')
    }

    node.instance = instance
    node.cached = false
    this.parentNode = this.placeholder.parentNode
    this.parentNode.replaceChild(node, this.placeholder)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')

    const { name } = this.props
    const node = Store.getCacheNode(name)

    node.cached = true
    run(node, 'instance.componentWillCache')

    this.parentNode.replaceChild(this.placeholder, node)
  }

  render() {
    return (
      <span
        ref={node => {
          this.placeholder = node
        }}
      />
    )
  }
}
