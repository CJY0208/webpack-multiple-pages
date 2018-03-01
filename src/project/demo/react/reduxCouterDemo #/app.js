import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add, reduce, delayChangeWord } from './actions'

@connect(state => ({
  count: state.count,
  word: state.word
}))
export default class App extends Component {
  change = () => {
    const { input } = this
    const { dispatch } = this.props
    dispatch(delayChangeWord(input.value))
  }

  render() {
    const { count, word, dispatch } = this.props

    return (
      <div>
        <div>count: {count}</div>
        <button onClick={() => dispatch(add(1))}>add</button>
        <button onClick={() => dispatch(reduce(1))}>reduce</button>
        <div>word: {word}</div>
        <input
          type="text"
          ref={dom => {
            this.input = dom
          }}
          onChange={this.change}
        />
      </div>
    )
  }
}
