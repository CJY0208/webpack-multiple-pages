import React, { Component } from 'react'
import { helpers } from '@common'

const { isExist, value } = helpers

export const asyncComponent = importComponent =>
  class AsyncComponent extends Component {
    state = {}

    async componentDidMount() {
      const { default: Component } = await importComponent()

      this.setState({ Component })
    }

    render() {
      const { Component } = this.state
      return isExist(Component) ? <Component {...this.props} /> : null
    }
  }
