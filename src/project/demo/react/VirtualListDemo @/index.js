import '__prefix__'
import React, { Component } from 'react'
import { render } from 'react-dom'

import { Column, Table } from 'react-virtualized'
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
    this.setState(
      {
        list: this.state.list.map(item =>
          Object.keys(item).reduce(
            (obj, letter) =>
              Object.assign(obj, {
                [letter]: Math.random().toFixed(2)
              }),
            {}
          )
        )
      },
      () => {
        console.log('done')
      }
    )

    setTimeout(this.randomData, 100)
  }

  render() {
    return (
      <Table
        width={617}
        height={363}
        headerHeight={20}
        rowHeight={30}
        rowCount={this.state.list.length}
        rowGetter={({ index }) => this.state.list[index]}
      >
        {['a', 'b', 'c', 'e', 'f', 'g'].map(letter => (
          <Column label={letter} dataKey={letter} width={100} />
        ))}
      </Table>

      // <div className="wrapper">
      //   <ul>
      //     {
      //       this.state.list.map((item, idx) => (
      //         <li>
      //           {
      //             item.map(data => (
      //               <div>{data}</div>
      //             ))
      //           }
      //         </li>
      //       ))
      //     }
      //   </ul>
      // </div>
    )
  }
}

render(<TestTable />, document.getElementById('app'))
