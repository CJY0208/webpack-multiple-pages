import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  createRef
} from 'react'
import { createPortal, render } from 'react-dom'

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
                    if (!this.cacheNodes[key]) {
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
          console.log('setStateCallback')
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
    const { children } = this.props

    window.children = children

    const node = await AliveStore.setCache('Test', {
      children: React.cloneElement(children, {
        // ref: (instance) => {
        //   // console.log(instance)

        //   instance.componentDidRecover()
        //   children.ref(instance)
        // },
        injectKeepAliveCycles: val => console.log(val)
      })
    })

    this.placeholder.appendChild(node)
    // run(children, 'componentDidRecover')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    return (
      <div
        ref={node => {
          this.placeholder = node
        }}
      />
    )
  }
}
