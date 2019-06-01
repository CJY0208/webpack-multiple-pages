import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import * as helpers from '@helpers'

import Portal from '../../../../layout/Portal'

const { get, run, value, isExist } = helpers

export default class PopupFrame extends Component {
  static propTypes = {}
  static defaultProps = {}

  __avaliable = true
  constructor(...args) {
    super(...args)

    if (isExist(PopupFrame.instance)) {
      this.__avaliable = false
      console.error(`[PopupFrame] 只能存在一个实例！`)
    }

    PopupFrame.instance = this
  }

  state = {}

  static add = (key, component) => {
    const setComponent = component =>
      run(PopupFrame.instance, 'setState', {
        [key]: component
      })

    setComponent(component)

    return setComponent
  }

  static remove = key => {
    run(PopupFrame.instance, 'setState', {
      [key]: undefined
    })
  }

  render() {
    return !this.__avaliable ? null : (
      <Portal className="ui-popup-portal">
        {Object.entries(this.state).map(([key, component]) => (
          <Fragment key={key}>{component}</Fragment>
        ))}
      </Portal>
    )
  }
}
