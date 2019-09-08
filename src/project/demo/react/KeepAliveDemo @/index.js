import 'babel-polyfill'
import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react'
import { render } from 'react-dom'

import RouterApp from './Router'
import KeepAlive, {
  AliveScope,
  withActivation,
  fixContext,
  useAliveController,
  useActivate,
  useUnactivate,
  createContext
} from './KeepAlive'

window.React = React

const context = createContext()
const { Provider, Consumer } = context

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

@withActivation
class Deep extends Component {
  componentDidMount() {
    console.log('Deep: componentDidMount')
    console.log('deepdeep ref', this.deepdeep)
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
        <KeepAlive>
          <DeepDeep
            ref={ref => {
              this.deepdeep = ref
              // console.log('ref', ref)
            }}
          />
        </KeepAlive>
      </div>
    )
  }
}

@withActivation
class DeepDeep extends Component {
  state = {
    count: 0
  }

  ready = false
  componentDidMount() {
    this.ready = true
    console.log('DeepDeep: componentDidMount')
  }

  componentWillUnmount() {
    console.log('DeepDeep: componentWillUnmount')
  }

  // shouldComponentUpdate() {
  //   if (this.ready && Math.random() > 0.5) {
  //     throw new Error('DeepDeep Error')
  //   }

  //   return true
  // }

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
        <div>
          DeepDeep count: {count}
          <button onClick={() => setCount(count + 1)}>add</button>
        </div>
      </div>
    )
  }
}

@withActivation
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

  // componentDidCatch(error, errorInfo) {
  //   console.error('Test Error', error, errorInfo)
  // }

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

const Main = React.memo(function Main() {
  const [count, setCount] = useState(0)
  const [showTest, setShowTest] = useState(true)
  const [showTest2, setShowTest2] = useState(true)
  const { drop, clear, getCachingNodes } = useAliveController()

  useEffect(() => {
    console.log(getCachingNodes())
    // setInterval(() => {
    //   setShowTest(Math.random() > 0.5)
    // }, 1000)
    // console.log('main update')
  })

  return (
    <Provider value={{ count }}>
      <div data-ka="div-1">
        count: {count}
        <button onClick={() => setCount(count + 1)}>Main add</button>
      </div>
      <div
        data-ka="div-2"
        onClick={() => {
          console.log('Parent Click')
        }}
      >
        {!showTest && <div>random1</div>}
        {/* {showTest && ( */}
        {/* <Consumer>
          {contextValue => ( */}
        {showTest2 && (
          <KeepAlive>
            {/* <div>random2</div> */}
            {!showTest && <div>random2</div>}
            {/* <Test {...contextValue} /> */}
            <div>count in keep alive: {count}</div>
            <Test />
            {/* <Test data-KA={'KA1'} /> */}
            {/* <Consumer>{contextValue => <Test data-KA={'KA2'} {...contextValue} />}</Consumer> */}
            <Consumer>{contextValue => <Test {...contextValue} />}</Consumer>
          </KeepAlive>
        )}
        {/* )}
        </Consumer> */}
        {/* )} */}

        {!showTest && <div>random3</div>}

        <button
          onClick={() => {
            console.log(123)
            setShowTest(!showTest)
          }}
        >
          toggle
        </button>
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

        <button onClick={() => setShowTest2(!showTest2)}>toggle 2</button>
        <br />
        <div>caching node count: {getCachingNodes().length}</div>
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
    </Provider>
  )
})

// const TestChildren = React.memo(function TestChildren({ children }) {
//   // const [children, updateChildren] = useState(propChildren)

//   // useEffect(() => {
//   //   console.log('children update')
//   //   updateChildren(propChildren)
//   // }, [propChildren])

//   useEffect(() => {
//     console.log('update')
//   })

//   return children
// })

class TestChildren extends React.PureComponent {
  componentDidUpdate() {
    console.log('update')
  }

  render() {
    return (
      <Consumer>
        {setCount => (
          <button onClick={() => setCount(count => count + 1)}>add</button>
        )}
      </Consumer>
    )
  }
}

function TestMainProvider({ children }) {
  const [count, setCount] = useState(0)

  return (
    <Provider value={setCount}>
      {children}
      {count}
    </Provider>
  )
}

function TestMain() {
  // const [count, setCount] = useState(0)

  // const getCount = () => count

  // const { current: renderContent } = useRef(() => getCount())

  return (
    <TestMainProvider>
      <TestChildren />
    </TestMainProvider>
  )
}

function App() {
  const [count, setCount] = useState(0)
  console.log('render App')
  return (
    <Fragment>
      {/* <div>
        count: {count}
        <button onClick={() => setCount(count + 1)}>App add</button>
      </div> */}
      <AliveScope>
        {/* count: {count} */}
        <Main />
      </AliveScope>
    </Fragment>
  )
}

render(<App />, document.getElementById('root'))
