import React from 'react'
import ReactDom from 'react-dom'
import moment from 'moment'

import { fn1, fn2 } from '@tools'
import { fnA } from '@layout'
import { test } from './test'
// import { test as test2 } from './test2'

Object.assign(window, { React, ReactDom, moment })

const App = () => <div className="test">{`App Text`}</div>

const testFn = () => 'pageA 3'

console.log(testFn())
// console.log(test2)

fn1()
// fn2()

fnA()

const delay = time => new Promise(resolve => setTimeout(resolve, time))
;(async () => {
  console.log('test async/await in pageA')
  await delay(1000)
  console.log('after 1000 ms')
  await delay(2000)
  console.log('after 2000 ms')

  const {
    test: test2
  } = await import(/* webpackChunkName: "my-test2" */ './test2')

  console.log('异步模块 test2')
  console.log(test2)
})()
