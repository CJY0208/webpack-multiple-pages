import '__prefix__'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Mock = require('mockjs'),
  data = Mock.mock({
    'array|50': [
      {
        'id|+1': 1,
        title: '@title',
        value: 456
      }
    ]
  })
export default class List extends Component {
  handleClick(title) {
    const { history } = this.props
    history.push('about')
  }

  componentWillUnmount = (...args) => {
    let dom = ReactDOM.findDOMNode(this)
    console.log(dom.scrollTop)
    debugger
  }
  render() {
    return (
      <div
        className="list-wrap"
        style={{ height: '100vh', overflow: 'scroll' }}
      >
        {data.array.map((item, idx) => {
          return (
            <div
              key={idx}
              className="list"
              onClick={() => this.handleClick(item.title)}
            >
              {item.title} - {item.id}
            </div>
          )
        })}
      </div>
    )
  }
}
