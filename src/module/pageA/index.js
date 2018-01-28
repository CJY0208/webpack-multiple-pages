

import React from 'react'
import ReactDom from 'react-dom'
import moment from 'moment'

import { fn1, fn2 } from '../../common'
import { fnA } from '../../common/index2'
// import { test } from './test'

// import(/* webpackChunkName: "my-test" */ './test').then(a => console.log(a))

const App = () => (
  <div className="test">test</div>
)

const testFn = () => 'pageA 3'

console.log(testFn())

fn1()
// fn2()

fnA()