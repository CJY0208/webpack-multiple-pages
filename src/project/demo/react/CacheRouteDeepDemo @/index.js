import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'
import Test from './Test'
import './style.scss'

import {
  CacheRoute,
  CacheSwitch,
  getCachingComponents,
  dropByCacheKey,
  getCachingKeys
} from '@CacheRoute'

window.__CacheRoute = CacheRoute

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
    <CacheSwitch>
      <CacheRoute exact path="/" component={List} when="always" />
      <CacheRoute
        exact
        cacheKey="Item"
        path="/item/:id?"
        component={Item}
        when="always"
        multiple
      />
      {/* <CacheRoute path="/item" when="always">
        <CacheRoute path="/item" when="always">
          <CacheSwitch>
            <Route exact path="/item/test">
              Test
            </Route>
            <CacheRoute
              exact
              cacheKey="Item"
              path="/item/:id?"
              component={Item}
              when="always"
              multiple
            />
          </CacheSwitch>
        </CacheRoute>
      </CacheRoute> */}
    </CacheSwitch>
  </HashRouter>
)

render(<App />, document.getElementById('root'))
