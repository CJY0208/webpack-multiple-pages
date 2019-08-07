import 'babel-polyfill'
import React, { Component, Fragment, useState, useEffect } from 'react'
import { render } from 'react-dom'

import RouterApp from './Router'
import KeepAlive, { AliveStore } from './KeepAlive'

function Test2({ injectKeepAliveCycles }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Test2: didMount effect', injectKeepAliveCycles)

    return () => {
      console.log('Test2: willUnmount effect')
    }
  }, [])

  return (
    <div>
      count: {count}
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}

class Test extends Component {
  state = {
    count: 0
  }

  constructor(props) {
    super(props)

    console.log(props)
  }

  componentDidMount() {
    console.log('Test: didMount')
  }

  componentWillUnmount() {
    console.log('Test: willUnmount')
  }

  componentDidRecover() {
    console.log('Test: componentDidRecover')
  }

  render() {
    const { count } = this.state

    const setCount = count => this.setState({ count })
    return (
      <div>
        count: {count}
        <button onClick={() => setCount(count + 1)}>add</button>
      </div>
    )
  }
}

function App() {
  const [showTest, setShowTest] = useState(true)
  return (
    <Fragment>
      <div>
        {showTest ? (
          <KeepAlive>
            <Test />
          </KeepAlive>
        ) : null}

        <button onClick={() => setShowTest(!showTest)}>toggle</button>
      </div>
      <AliveStore />
    </Fragment>
  )
}

render(<RouterApp />, document.getElementById('root'))
