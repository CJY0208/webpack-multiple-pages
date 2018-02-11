import React from 'react'
import ReactDom from 'react-dom'
import md5 from 'md5'
import 'axios'

import fp from 'lodash/fp'
import _ from 'lodash'

Object.assign(window, { _, fp })

import { fn1 } from '@commonDemo'
import { fnB } from '@layoutDemo'
import { test as test1 } from './test'
// import { test as test2 } from '../pageA/test'

console.log('pageB ')

// import(/* webpackChunkName: "my-test2" */ '../pageClassA/pageA #/test2').then(({ test }) => {
//   console.log(test)
// })

fn1()
// fnB()
