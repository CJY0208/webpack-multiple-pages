import React, { Component } from 'react'

import { run } from '@helpers'

import { connect } from './storeContext'
import { Provider } from './createAliveContext'
import saveScrollPos from '../helpers/saveScrollPos'

@connect
class KeepAlive extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    const { keep, children, name, context$$ } = this.props
    const cache = await keep(name, children, context$$)

    cache.inited = true
    cache.cached = false

    this.parentNode = this.placeholder.parentNode
    cache.nodes.forEach(node => {
      this.parentNode.insertBefore(node, this.placeholder)
    })
    this.parentNode.removeChild(this.placeholder)

    run(cache.revertScrollPos)
    run(cache.didActivate)
  }

  componentWillUnmount() {
    const { name, getCache } = this.props
    const cache = getCache(name)

    cache.cached = true
    cache.revertScrollPos = saveScrollPos(cache.nodes)
    this.parentNode.insertBefore(this.placeholder, cache.nodes[0])
    cache.nodes.forEach(node => {
      this.parentNode.removeChild(node)
    })
    run(cache.willUnactivate)
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

export default KeepAlive
