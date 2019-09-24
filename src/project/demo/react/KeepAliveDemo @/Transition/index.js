import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import KeepAlive, { AliveScope as Provider } from '@KeepAlive'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import 'animate.css/animate.min.css'

class Test extends React.Component {
  state = {
    number: 0
  }

  handleClick = () => {
    this.setState(({ number }) => ({
      number: number + 1
    }))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Click the button to increase the number
        </button>
        <div>Number: {this.state.number}</div>
      </div>
    )
  }
}

function RouterConfig() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/one">one</Link>
        </li>
        <li>
          <Link to="/two">two</Link>
        </li>
      </ul>

      <Route
        render={({ location }) => {
          console.log(location)

          return (
            <TransitionGroup>
              <CSSTransition
                // 此处不能使用 location.key
                // 因为 KeepAlive 会根据渲染路径中各个节点是否之前的节点来确定是否同一份缓存
                // location.key 每一次都会变化，故 KeepAlive 失效，需要使用可控的 key 值
                key={Math.random()}
                classNames={{
                  enter: 'animated',
                  enterActive: 'fadeInDown',
                  exit: 'animated',
                  exitActive: 'fadeOutDown'
                }}
                timeout={1000}
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <div>
                  <Switch location={location}>
                    <Route
                      path="/one"
                      render={props => (
                        <KeepAlive>
                          <Test {...props} />
                        </KeepAlive>
                      )}
                    />
                    <Route path="/two" render={() => 'This is two'} />
                  </Switch>
                </div>
              </CSSTransition>
            </TransitionGroup>
          )
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Provider>
        <RouterConfig />
      </Provider>
    </Router>
  )
}

// const rootElement = document.getElementById('root')
// ReactDOM.render(
//   <Router>
//     <Provider>
//       <App />
//     </Provider>
//   </Router>,
//   rootElement
// )
