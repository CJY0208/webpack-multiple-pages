
import { fn1, fn2 } from '../../common'
import { fnA } from '../../common/index2'
import React from 'react'
import ReactDom from 'react-dom'

import moment from 'moment'

const App = () => (
  <div className="test">test</div>
)

const test = () => 'pageA 3 '

console.log(test())

fn1()
// fn2()

fnA()