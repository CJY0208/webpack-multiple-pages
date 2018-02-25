import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add, reduce } from './actions'

@connect(state => ({
  count: state.count
}))
export default class App extends Component {
  render() {
    const { count, dispatch } = this.props

    return (
      <div>
        <div>count: {count}</div>
        <button onClick={() => dispatch(add(1))}>add</button>
        <button onClick={() => dispatch(reduce(1))}>reduce</button>
      </div>
    )
  }
}
