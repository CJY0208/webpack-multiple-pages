import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import {
  AliveScope as Provider,
  KeepAlive,
  useActivate,
  useUnactivate
} from '@KeepAlive'

function Test() {
  const [number, setNumber] = useState(0)
  // useActivate(() => {
  //   console.log('mounted')
  // })
  // useUnactivate(() => {
  //   console.log('unmounted')
  // })
  return (
    <div>
      <button onClick={() => setNumber(number + 1)}>
        Click the button to increase the number
      </button>
      <div>Number: {number}</div>
    </div>
  )
}

function Test1() {
  const [number, setNumber] = useState(0)
  // useActivate(() => {
  //   console.log('mounted')
  // })
  // useUnactivate(() => {
  //   console.log('unmounted')
  // })
  return (
    <div>
      <button onClick={() => setNumber(number + 1)}>
        Click the button to increase the number
      </button>
      <div>Number: {number}</div>
    </div>
  )
}

class App extends React.Component {
  state = {
    disabled: false
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link
              to="/testIssue/one"
              onClick={() => this.setState({ disabled: true })}
            >
              one
            </Link>
          </li>
          <li>
            <Link
              to="/testIssue/two"
              onClick={() => this.setState({ disabled: true })}
            >
              two
            </Link>
          </li>
        </ul>

        <Switch>
          <Route
            path="/testIssue/one"
            render={props => (
              <KeepAlive name="one">
                <Test {...props} />
              </KeepAlive>
            )}
          />
          <Route
            path="/testIssue/two"
            render={props => (
              <KeepAlive name="two">
                <Test1 {...props} />
              </KeepAlive>
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default () => (
  <Router>
    <Provider>
      <App />
    </Provider>
  </Router>
)
