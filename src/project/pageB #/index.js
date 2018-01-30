import React from 'react'
import ReactDom from 'react-dom'
import md5 from 'md5'

import { fn1 } from '@tools'
import { fnB } from '@layout'
import { test as test1 } from './test'
// import { test as test2 } from '../pageA/test'

console.log('pageB')

// import(/* webpackChunkName: "my-test2" */ '../pageClassA/pageA #/test2').then(({ test }) => {
//   console.log(test)
// })

fn1()
fnB()
