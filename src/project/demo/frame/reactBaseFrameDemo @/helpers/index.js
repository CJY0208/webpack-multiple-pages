import React, { Component } from 'react'

export const asyncComponent = importComponent =>
  class AsyncComponent extends Component {
    state = {}

    async componentDidMount() {
      const { default: Component } = await importComponent()

      this.setState({ Component })
    }

    render() {
      const { Component } = this.state
      return Component ? <Component {...this.props} /> : null
    }
  }