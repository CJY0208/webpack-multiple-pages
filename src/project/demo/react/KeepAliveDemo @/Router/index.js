import React, { useEffect, Component, Fragment } from 'react'
import { render } from 'react-dom'
import { HashRouter, Link, Route, Switch } from 'react-router-dom'

import KeepAlive, {
  KeepAliveProvider,
  withLifecycles,
  useActivate,
  useUnactivate
} from '../KeepAlive'
import './style.scss'

@withLifecycles
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
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        <li>31</li>
        <li>32</li>
        <li>33</li>
        <li>34</li>
        <li>35</li>
        <li>36</li>
        <li>37</li>
        <li>38</li>
        <li>39</li>
        <li>40</li>
        <li>41</li>
        <li>42</li>
        <li>43</li>
        <li>44</li>
        <li>45</li>
        <li>46</li>
        <li>47</li>
        <li>48</li>
        <li>49</li>
        <li>50</li>
        <li>
          <Link to="item">To Detail</Link>
        </li>
        <li>51</li>
        <li>52</li>
        <li>53</li>
        <li>54</li>
        <li>55</li>
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
    <KeepAliveProvider>
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <KeepAlive name="List">
              <Test />
              <List {...props} />
            </KeepAlive>
          )}
        />
        <Route exact path="/item" component={Item} />
      </Switch>
    </KeepAliveProvider>
  </HashRouter>
)

export default RouterApp
