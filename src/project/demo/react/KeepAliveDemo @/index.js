import 'babel-polyfill'
import React, { Component, Fragment, useState, useEffect, useRef } from 'react'
import { render } from 'react-dom'

import RouterApp from './Router'
import KeepAlive, {
  KeepAliveProvider,
  withLifecycles,
  fixContext,
  useAliveStore,
  useActivate,
  useUnactivate,
  createContext
} from './KeepAlive'

const context = createContext()
const { Provider, Consumer } = context

// fixContext(context)

function Test2({ injectKeepAliveCycles }) {
  const [count, setCount] = useState(0)
  const ref = useRef()

  // console.log('ref', ref)

  useEffect(() => {
    // console.log('ref', ref)
    console.log('Test2: didMount effect', injectKeepAliveCycles)

    return () => {
      console.log('Test2: willUnmount effect')
    }
  }, [])

  return (
    <div>
      count: {count}
      <button onClick={() => setCount(count + 1)}>add</button>
      <DeepDeep ref={ref} />
    </div>
  )
}

// @withLifecycles
class Deep extends Component {
  componentDidMount() {
    console.log('Deep: componentDidMount')
  }

  componentWillUnmount() {
    console.log('Deep: componentWillUnmount')
  }

  componentDidActivate() {
    console.log('Deep: componentDidActivate')
    console.log(this)
  }

  componentWillUnactivate() {
    console.log('Deep: componentWillUnactivate')
    console.log(this)
  }

  render() {
    return (
      <div>
        I am Deep
        <KeepAlive name="DeepDeep">
          <DeepDeep
            ref={ref => {
              // console.log('ref', ref)
            }}
          />
        </KeepAlive>
      </div>
    )
  }
}

@withLifecycles
class DeepDeep extends Component {
  state = {
    count: 0
  }

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
    const { count } = this.state

    const setCount = count => this.setState({ count })
    return (
      <div>
        I am DeepDeep
        {/* <div>
          count: {count}
          <button onClick={() => setCount(count + 1)}>add</button>
        </div> */}
      </div>
    )
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
        {/* <button onClick={toggleDeep}>toggle Deep</button>
        {showDeep && <Deep />} */}
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
  const { drop, clear, getCachingNodes } = useAliveStore()

  useEffect(() => {
    // setInterval(() => {
    //   setShowTest(Math.random() > 0.5)
    // }, 1000)
  }, [])

  return (
    <Provider value={{ count }}>
      <div>
        count: {count}
        <button onClick={() => setCount(count + 1)}>Main add</button>
      </div>
      <div
        onClick={() => {
          console.log('Parent Click')
        }}
      >
        {!showTest && <div>random1</div>}
        {showTest && (
          <Consumer>
            {contextValue => (
              <KeepAlive name="Test" key="Test">
                {/* <div>random2</div> */}
                <Test {...contextValue} />
                {/* <Test /> */}
                {/* <Test data-KA={'KA1'} /> */}
                {/* <Test data-KA={'KA2'} /> */}
                {/* <Consumer>{contextValue => <Test {...contextValue} />}</Consumer> */}
              </KeepAlive>
            )}
          </Consumer>
        )}

        {!showTest && <div>random3</div>}

        <button
          onClick={() => {
            console.log(123)
            setShowTest(!showTest)
          }}
        >
          toggle
        </button>
        {/* <div>
          caching nodes name: {getCachingNodes().map(node => node.name)}
        </div>
        <button
          onClick={() => {
            drop('Test')
          }}
        >
          drop Test
        </button>
        <div>
          <button onClick={clear}>clear</button>
        </div> */}
      </div>
      <div>
        {/* {showTest2 ? (
          <KeepAlive name="Test2">
            <Test2 />
          </KeepAlive>
        ) : null} */}

        {/* {showTest2 ? (
          <div>
            <KeepAlive name="Test3">
              <Test />
            </KeepAlive>
          </div>
        ) : (
          <KeepAlive name="Test4">
              <Test />
            </KeepAlive>
        )} */}

        {/* <button onClick={() => setShowTest2(!showTest2)}>toggle 2</button> */}
      </div>
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
