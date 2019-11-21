import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Test from './Test'
import './style.scss'

import 'animate.css/animate.min.css'

import CacheRoute, {
  CacheSwitch,
  getCachingComponents,
  dropByCacheKey,
  getCachingKeys
} from '@CacheRoute'

window.React = React
console.log('React Version', React.version)

window.getCachingComponents = getCachingComponents
window.dropByCacheKey = dropByCacheKey

const keys = getCachingKeys()
const components = getCachingComponents()

const component = components['test']

const List = () => {
  // useEffect(() => {
  //   console.log('in')
  //   return () => {
  //     console.log('out')
  //   }
  // })
  return (
    <div
      style={{
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <ul>
        {Array(25)
          .fill('')
          .map((item, idx) => (
            <li key={idx}>
              <Link to={`/item/${idx}`}>To Detail {idx}</Link>
            </li>
          ))}
        <div style={{ overflow: 'auto', width: '100vw' }}>
          123133333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        </div>

        {Array(25)
          .fill('')
          .map((item, idx) => (
            <li key={idx + 25}>
              <Link to={`/item/${idx + 25}`}>To Detail {idx + 25}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

const Item = ({ history }) => (
  <div>
    <Test />
    <button
      onClick={() => {
        history.goBack()
      }}
    >
      Go Back
    </button>
  </div>
)

const App = () => (
  <HashRouter>
    {/* <Route
      render={({ location }) => {
        console.log(location)

        return (
          <TransitionGroup>
            <CSSTransition
              // 此处不能使用 location.key
              // 因为 KeepAlive 会根据渲染路径中各个节点是否之前的节点来确定是否同一份缓存
              // location.key 每一次都会变化，故 KeepAlive 失效，需要使用可控的 key 值A
              key={location.pathname}
              classNames={{
                enter: 'animated',
                enterActive: 'fadeInDown',
                exit: 'animated',
                exitActive: 'fadeOutDown'
              }}
              timeout={10000}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <div className="lalala">
                <Switch location={location} which={() => false}>
                  <Route exact path="/" component={List} unmount />
                  <Route exact path="/item" component={Item} />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        )
      }}
    /> */}

    <CacheSwitch>
      <CacheRoute
        exact
        path="/"
        cacheKey="Test"
        component={List}
        when="always"
        // unmount
      />
      <CacheRoute
        exact
        cacheKey="Item"
        path="/item/:id?"
        component={Item}
        when="always"
        multiple
      />
    </CacheSwitch>
  </HashRouter>
)

render(<App />, document.getElementById('root'))
