import React, { Component, PureComponent } from 'react'
import Store from './store'

@Store.connect(
  state => ({
    name: state.name
  }),
  getAction => ({
    next: getAction('next')
  })
)
class App extends PureComponent {
  render() {
    const { name, next } = this.props

    return <div onClick={() => next('hello')}>{name}</div>
  }
}

export default (process.env.NODE_ENV === 'development'
  ? require('react-hot-loader').hot(module)(App)
  : App)
// export default App
