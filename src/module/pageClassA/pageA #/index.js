import React from 'react'
import ReactDom from 'react-dom'
import moment from 'moment'

import { fn1, fn2 } from '@tools'
import { fnA } from '@layout'
import { test } from './test'
import { test2 } from './test2'
// import(/* webpackChunkName: "my-test2" */ './test2').then(a =>
//   console.log('test2')
// )

const App = () => <div className="test">{`App Text`}</div>

const testFn = () => 'pageA 3'

console.log(testFn())

fn1()
// fn2()

fnA()
