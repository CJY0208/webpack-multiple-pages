import 'babel-polyfill'
import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  createContext
} from 'react'
import { render } from 'react-dom'

import RouterApp from './Router'
import KeepAlive, {
  KeepAliveProvider,
  injectKeepAliveLifecycles
} from './KeepAlive'

const { Provider, Consumer } = createContext()

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

@injectKeepAliveLifecycles
class Deep extends Component {
  componentDidActivate() {
    console.log('Deep: componentDidActivate')
  }

  componentWillUnactivate() {
    console.log('Deep: componentWillUnactivate')
  }

  render() {
    return null
  }
}

@injectKeepAliveLifecycles
class Test extends Component {
  state = {
    count: 0,
    showDeep: true
  }

  constructor(props) {
    super(props)

    console.log(props)
  }

  // componentDidMount() {
  //   console.log('Test: didMount')
  // }

  // componentWillUnmount() {
  //   console.log('Test: willUnmount')
  // }

  componentDidActivate() {
    console.log('Test: componentDidActivate')
  }

  componentWillUnactivate() {
    console.log('Test: componentWillUnactivate')
  }

  render() {
    const { count, showDeep } = this.state

    const setCount = count => this.setState({ count })
    const toggleDeep = () =>
      this.setState(({ showDeep }) => ({
        showDeep: !showDeep
      }))
    return (
      <div>
        count: {count}
        <button onClick={() => setCount(count + 1)}>add</button>
        <button onClick={toggleDeep}>toggle Deep</button>
        {showDeep && (
          <KeepAlive name="Deep">
            <Deep />
          </KeepAlive>
        )}
      </div>
    )
  }
}

function App() {
  const [showTest, setShowTest] = useState(true)
  const [showTest2, setShowTest2] = useState(true)
  return (
    <Provider value={{ test1: 1 }}>
      <KeepAliveProvider>
        <div>
          {showTest ? (
            <KeepAlive name="Test">
              <Consumer>
                {context => (
                  <Provider value={{ test2: 2, ...context }}>
                    <Consumer>{context => <Test {...context} />}</Consumer>
                  </Provider>
                )}
              </Consumer>
            </KeepAlive>
          ) : null}

          <button onClick={() => setShowTest(!showTest)}>toggle</button>
        </div>
        <div>
          {showTest2 ? (
            <KeepAlive name="Test2">
              <Test2 />
            </KeepAlive>
          ) : null}

          <button onClick={() => setShowTest2(!showTest2)}>toggle 2</button>
        </div>
      </KeepAliveProvider>
    </Provider>
  )
}

render(<App />, document.getElementById('root'))
