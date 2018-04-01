import React, { Component, PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { PullToRefresh, ListView, Button } from 'antd-mobile'
import { helpers } from '@common'
import styles from './style.scss'

const className = helpers.classNames.react(styles)

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: '???',
    des: '不是所有的兼职汪都需要风吹日晒'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒'
  }
]
const NUM_ROWS = 20
let pageIndex = 0

function genData(pIndex = 0) {
  const dataArr = []
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${pIndex * NUM_ROWS + i}`)
  }
  return dataArr
}

class App extends React.Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false
    }
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     })
  //   }
  // }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop

    setTimeout(() => {
      this.rData = genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false
      })
    }, 1500)
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true })
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false
      })
    }, 600)
  }

  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    console.log('reach end', event)
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)]
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false
      })
    }, 1000)
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} {...className('separator')} />
    )
    let index = data.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1
      }
      const obj = data[index--]
      return (
        <div key={rowID} {...className('row')}>
          <div {...className('title')}>{obj.title}</div>
          <div {...className('info')}>
            <img src={obj.img} alt="" />
            <div>
              <div {...className('name')}>
                {obj.des}-{rowData}
              </div>
              <div {...className('price')}>
                <span {...className('value')}>{rowID}</span> 元/任务
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <ListView
          {...className('listView test')}
          key={this.state.useBodyScroll ? '0' : '1'}
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderHeader={() => <span>Pull to refresh</span>}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : 'Loaded'}
            </div>
          )}
          renderRow={row}
          renderSeparator={separator}
          useBodyScroll={this.state.useBodyScroll}
          pullToRefresh={
            <PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              distanceToRefresh={
                document.documentElement.clientHeight *
                (100 * 48 / 750 + 6) /
                100
              }
              indicator={{
                activate: (
                  <div {...className('refreshHolder')}>
                    <div>松开即可刷新</div>
                  </div>
                ),
                deactivate: (
                  <div {...className('refreshHolder')}>
                    <div>继续下拉即可刷新</div>
                  </div>
                ),
                release: (
                  <div {...className('refreshHolder')}>
                    <div>刷新中</div>
                  </div>
                ),
                finish: (
                  <div {...className('refreshHolder')}>
                    <div>已完成</div>
                  </div>
                )
              }}
            />
          }
          onEndReached={this.onEndReached}
          pageSize={5}
        />
      </div>
    )
  }
}

export default App
