import React, { Component } from 'react'

import { helpers } from '@common'
import { connectModules } from 're-modulex'

import styles from './style.m.scss'

const className = helpers.classNames.react(styles)

@helpers.hot(module)
// 简化 connect 过程
@connectModules(({ main }) => ({
  main
}))
export default class Home extends Component {
  render() {
    const { main } = this.props

    return (
      <div>
        Home
        <div>
          module counter is: {main.state.counter}
          <button onClick={() => main.dispatch.counter.add(2)}>add</button>
          <button onClick={() => main.dispatch('counter/reduce')}>
            reduce
          </button>
        </div>
        {/* 允许直接 commit */}
        <input onChange={e => main.commit('text', e.target.value)} />
        <input onChange={e => main.dispatch('text', e.target.value)} />
        <div>main text is: {main.state.text}</div>
        <div>main getters.text is: {main.getters.text}</div>
      </div>
    )
  }
}
