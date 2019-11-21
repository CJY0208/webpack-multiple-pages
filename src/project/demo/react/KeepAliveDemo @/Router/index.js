import React, { useEffect, Component, Fragment } from 'react'
import { render } from 'react-dom'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'

import KeepAlive, {
  AliveScope,
  withActivation,
  useActivate,
  useUnactivate
} from 'react-activation'
import './style.scss'

@withActivation
class Test extends Component {
  state = {
    count: 0
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

function List(props) {
  useActivate(() => {
    console.log('List useActivate effect 1')
  })

  useActivate(() => {
    console.log('List useActivate effect 2')
  })

  useUnactivate(() => {
    console.log('List useUnactivate effect')
  })

  return (
    <div className="list">
      {/* <Test /> */}
      <ul>
        {Array(50)
          .fill('')
          .map((item, idx) => <li key={idx}>{idx + 1}</li>)}
        <li>
          <Link to="item">To Detail</Link>
        </li>
        <li>51</li>
        <li>52</li>
        <li>53</li>
        <li>54</li>
        <li>55</li>
        <div style={{ overflow: 'auto', width: '100vw' }}>
          123133333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        </div>
        <li>56</li>
        <li>57</li>
        <li>58</li>
        <li>59</li>
        <li>60</li>
        <li>61</li>
        <li>62</li>
        <li>63</li>
        <li>64</li>
        <li>65</li>
        <li>66</li>
        <li>67</li>
        <li>68</li>
        <li>69</li>
        <li>70</li>
      </ul>
    </div>
  )
}

const Item = ({ history }) => (
  <div>
    <button
      onClick={() => {
        history.goBack()
      }}
    >
      Go Back
    </button>
  </div>
)

const RouterApp = () => (
  <HashRouter>
    <AliveScope>
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <KeepAlive name="List" saveScrollPosition="screen">
              <Test />
              <List {...props} />
            </KeepAlive>
          )}
        />
        <Route exact path="/item" component={Item} />
      </Switch>
    </AliveScope>
  </HashRouter>
)

export default RouterApp
