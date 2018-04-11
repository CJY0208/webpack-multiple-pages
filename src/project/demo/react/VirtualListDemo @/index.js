import '__prefix__'
import React, { Component } from 'react'
import { render } from 'react-dom'

import { Column, Table, defaultTableRowRenderer } from 'react-virtualized'
import 'react-virtualized/styles.css' // only needs to be imported once

import './style.scss'

class TestTable extends Component {
  state = {
    list: Array(5000).fill(
      ['a', 'b', 'c', 'e', 'f', 'g'].reduce(
        (obj, letter) =>
          Object.assign(obj, {
            [letter]: Math.random().toFixed(2)
          }),
        {}
      )
    )
  }

  componentDidMount() {
    this.randomData()
  }

  randomData = () => {
    this.setState({
      list: this.state.list.map(item =>
        Object.keys(item).reduce(
          (obj, letter) =>
            Object.assign(obj, {
              [letter]: Math.random().toFixed(2)
            }),
          {}
        )
      )
    })

    setTimeout(this.randomData, 100)
  }

  render() {
    return (
      // https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
      <Table
        width={document.documentElement.clientWidth}
        height={document.documentElement.clientHeight}
        headerHeight={50}
        rowHeight={50}
        rowCount={this.state.list.length}
        rowGetter={({ index }) => this.state.list[index]}
        rowStyle={({ index }) =>
          index % 2 === 0
            ? {}
            : {
                background: '#eee'
              }
        }
        // https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md#rowrenderer
        rowRenderer={props => <div>{defaultTableRowRenderer(props)}</div>}
      >
        {['a', 'b', 'c', 'e', 'f', 'g'].map(letter => (
          // https://github.com/bvaughn/react-virtualized/blob/master/docs/Column.md
          <Column label={letter} dataKey={letter} width={100} />
        ))}
      </Table>
    )
  }
}

render(<TestTable />, document.getElementById('app'))
