import React, { Component } from 'react'
import { createPortal } from 'react-dom'

const $root = document.body

export default class Portal extends Component {
  __$node = document.createElement('div')

  constructor(props) {
    super(props)
    if (props.className) {
      this.__$node.className = props.className
    }
  }

  componentDidMount = () => $root.appendChild(this.__$node)
  componentWillUnmount = () => $root.removeChild(this.__$node)
  render = () => createPortal(this.props.children, this.__$node)
}
