import 'babel-polyfill'
// import React from 'react'
// import ReactDom from 'react-dom'
// import 'react-router-dom'
// import md5 from 'md5'
// import axios from 'axios'

import { fn1, fn2 } from '@commonDemo'
import { fnA } from '@layoutDemo'
import { test } from './test'
// import { test2 } from './test2'

// import { test } from './test'

// import(/* webpackChunkName: "my-test3" */ './test3').then(({ test3 }) => {
//   console.log(test3)
// })

// import(/* webpackChunkName: "my-test2" */ './test2').then(({ test2 }) => {
//   console.log(test2)
// })

// import(/* webpackChunkName: "my-test" */ './test').then(({ test }) => {
//   console.log(test)
// })

// Object.assign(window, { React, ReactDom, moment })

// const App = () => <div className="test">{`App Text `}</div>

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

  console.warn('1000ms 后加载 my-test2')

  await delay(1000)

  const {
    test: test2
  } = await import(/* webpackChunkName: "my-test2" */ './test2')

  console.log('异步模块 test2')
  console.log(test2)
})()
