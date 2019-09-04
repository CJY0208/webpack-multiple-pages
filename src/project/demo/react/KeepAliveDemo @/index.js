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
  withLifecycles,
  fixContext,
  useAliveStore
} from './KeepAlive'

const context = createContext()
const { Provider, Consumer } = context

fixContext(context)

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
      <Deep />
    </div>
  )
}

@withLifecycles
class Deep extends Component {
  componentDidMount() {
    console.log('Deep: componentDidMount')
  }

  componentWillUnmount() {
    console.log('Deep: componentWillUnmount')
  }

  componentDidActivate() {
    console.log('Deep: componentDidActivate')
  }

  componentWillUnactivate() {
    console.log('Deep: componentWillUnactivate')
  }

  render() {
    return (
      <div>
        I am Deep
        <KeepAlive id="DeepDeep">
          <DeepDeep />
        </KeepAlive>
      </div>
    )
  }
}

@withLifecycles
class DeepDeep extends Component {
  componentDidMount() {
    console.log('DeepDeep: componentDidMount')
  }

  componentWillUnmount() {
    console.log('DeepDeep: componentWillUnmount')
  }

  componentDidActivate() {
    console.log('DeepDeep: componentDidActivate')
  }

  componentWillUnactivate() {
    console.log('DeepDeep: componentWillUnactivate')
  }

  render() {
    return <div>I am DeepDeep</div>
  }
}

@withLifecycles
class Test extends Component {
  state = {
    count: 0,
    showDeep: true
  }

  componentDidMount() {
    console.log('Test: componentDidMount')
  }

  componentWillUnmount() {
    console.log('Test: componentWillUnmount')
  }

  componentDidActivate() {
    console.log('Test: componentDidActivate')
  }

  componentWillUnactivate() {
    console.log('Test: componentWillUnactivate')
  }

  render() {
    const { count, showDeep } = this.state
    const { count: contextCount } = this.props

    const setCount = count => this.setState({ count })
    const toggleDeep = () =>
      this.setState(({ showDeep }) => ({
        showDeep: !showDeep
      }))
    return (
      <div>
        <div>
          count: {count}
          <button onClick={() => setCount(count + 1)}>add</button>
        </div>
        <div>contextCount: {contextCount}</div>
        <button onClick={toggleDeep}>toggle Deep</button>
        {showDeep && <Deep />}
      </div>
    )
  }
}

function Test3() {
  useEffect(() => {
    console.log('Test3: didMount')

    return () => {
      console.log('Test3: willUnmount')
    }
  }, [])
  return <div>Test3</div>
}

function Main() {
  const [count, setCount] = useState(0)
  const [showTest, setShowTest] = useState(true)
  const [showTest2, setShowTest2] = useState(true)
  const { drop, clear, getCachingIds } = useAliveStore()

  return (
    <Provider value={{ count }}>
      <div>
        count: {count}
        <button onClick={() => setCount(count + 1)}>Main add</button>
      </div>
      <div>
        {showTest ? (
          <KeepAlive id="Test">
            <Consumer>{context => <Test {...context} />}</Consumer>
          </KeepAlive>
        ) : null}

        <button onClick={() => setShowTest(!showTest)}>toggle</button>
        <div>caching ids: {getCachingIds()}</div>
        <button
          onClick={() => {
            drop('Test')
          }}
        >
          drop Test
        </button>
        <div>
          <button onClick={clear}>clear</button>
        </div>
      </div>
      {/* <div>
          {showTest2 ? (
            <KeepAlive id="Test2">
              <Test2 />
            </KeepAlive>
          ) : null}

          {showTest2 ? (
            <div>
              <Test />
            </div>
          ) : (
            <KeepAlive id="Test4">
              <Test />
            </KeepAlive>
          )}

          <button onClick={() => setShowTest2(!showTest2)}>toggle 2</button>
        </div> */}
    </Provider>
  )
}

function App() {
  return (
    <KeepAliveProvider>
      <Main />
    </KeepAliveProvider>
  )
}

render(<App />, document.getElementById('root'))
