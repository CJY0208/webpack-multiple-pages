import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  createRef
} from 'react'

import { run, get } from '@helpers'

const nextTick = async func => {
  await Promise.resolve()
  run(func)
}

export class AliveStore extends Component {
  static instance
  static setCache = (...args) => run(AliveStore.instance, 'setCache', ...args)
  static getCache = (...args) => run(AliveStore.instance, 'getCache', ...args)
  static getCacheNode = (...args) =>
    run(AliveStore.instance, 'getCacheNode', ...args)

  constructor(props) {
    super(props)

    AliveStore.instance = this
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
                  ref={node => {
                    if (!this.cacheNodes[key] && node) {
                      node.parentNode.removeChild(node)
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

  render() {
    const { cache } = this.state

    return Object.values(cache).map(({ component, ...rest }) => component)
  }
}

export default class KeepAlive extends Component {
  constructor(props) {
    super(props)

    nextTick(this.init)
  }

  init = async () => {
    const { children, name } = this.props

    const node = await AliveStore.setCache(name, {
      children: React.cloneElement(children, {
        // ref: (instance) => {
        //   // console.log(instance)

        //   instance.componentDidRecover()
        //   children.ref(instance)
        // },
        injectKeepAliveCycles: val => console.log(val)
      })
    })

    this.parentNode = this.placeholder.parentNode
    this.parentNode.replaceChild(node, this.placeholder)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')

    const { name } = this.props
    const node = AliveStore.getCacheNode(name)

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
