import React from 'react'
import ReactDOM from 'react-dom'
import { List, Switch, Calendar } from 'antd-mobile'
import enUS from 'antd-mobile/lib/calendar/locale/en_US'
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN'

const locale = {
  title: '日期选择',
  today: '今天',
  month: '月',
  year: '年',
  am: '上午',
  pm: '下午',
  dateTimeFormat: 'yyyy年MM月dd日 星期w hh:mm',
  dateFormat: 'yyyy年MM月dd日 星期w',
  noChoose: '未选择',
  week: ['日', '一', '二', '三', '四', '五', '六'],
  clear: '清除',
  selectTime: '选择时间',
  selectStartTime: '选择开始时间',
  selectEndTime: '选择结束时间',
  start: '开始',
  end: '结束',
  begin: '起',
  over: '止',
  begin_over: '起/止',
  confirm: '确认',
  monthTitle: 'yyyy年MM月',
  loadPrevMonth: '加载上一个月',
  yesterday: '昨天',
  lastWeek: '近一周',
  lastMonth: '近一个月'
}

const extra = {
  '2017/07/15': { info: 'Disable', disable: true }
}

const now = new Date()
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = {
  info: 'Disable',
  disable: true
}
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = {
  info: 'Disable',
  disable: true
}
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = {
  info: 'Disable',
  disable: true
}
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = {
  info: 'Disable',
  disable: true
}

Object.keys(extra).forEach(key => {
  const info = extra[key]
  const date = new Date(key)
  if (!Number.isNaN(+date) && !extra[+date]) {
    extra[+date] = info
  }
})

class Test extends React.Component {
  originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY

  constructor(props) {
    super(props)
    this.state = {
      en: false,
      show: false,
      config: {}
    }
  }

  renderBtn(zh, en, config = {}) {
    config.locale = this.state.en ? enUS : zhCN

    return (
      <List.Item
        arrow="horizontal"
        onClick={() => {
          document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
          this.setState({
            show: true,
            config
          })
        }}
      >
        {this.state.en ? en : zh}
      </List.Item>
    )
  }

  changeLanguage = () => {
    this.setState({
      en: !this.state.en
    })
  }

  onSelectHasDisableDate = dates => {
    console.warn('onSelectHasDisableDate', dates)
  }

  onConfirm = (startTime, endTime) => {
    document.getElementsByTagName(
      'body'
    )[0].style.overflowY = this.originbodyScrollY
    this.setState({
      show: false,
      startTime,
      endTime
    })
  }

  onCancel = () => {
    document.getElementsByTagName(
      'body'
    )[0].style.overflowY = this.originbodyScrollY
    this.setState({
      show: false,
      startTime: undefined,
      endTime: undefined
    })
  }

  getDateExtra = date => extra[+date]

  render() {
    return (
      <div>
        <List className="calendar-list" style={{ backgroundColor: 'white' }}>
          <List.Item
            className="item"
            extra={
              <Switch
                className="right"
                checked={!this.state.en}
                onChange={this.changeLanguage}
              />
            }
          >
            {this.state.en ? 'Chinese' : '中文'}
          </List.Item>
          {this.renderBtn('选择日期区间', 'Select Date Range')}
          {this.renderBtn('选择日期时间区间', 'Select DateTime Range', {
            pickTime: true
          })}
          {this.renderBtn('选择日期', 'Select Date', { type: 'one' })}
          {this.renderBtn('选择日期时间', 'Select DateTime', {
            type: 'one',
            pickTime: true
          })}
          {this.renderBtn(
            '选择日期区间(快捷)',
            'Select Date Range (Shortcut)',
            { showShortcut: true }
          )}
          {this.renderBtn(
            '选择日期时间区间(快捷)',
            'Select DateTime Range (Shortcut)',
            { pickTime: true, showShortcut: true }
          )}
          {this.renderBtn('大行距', 'XL row size', { rowSize: 'xl' })}
          {this.renderBtn('不无限滚动', 'infinite: false', { infinite: false })}
          {this.renderBtn('水平进入', 'Horizontal enter', {
            enterDirection: 'horizontal'
          })}
          {this.renderBtn('默认选择范围', 'Selected Date Range', {
            defaultValue: [
              new Date(+now - 86400000),
              new Date(+now - 345600000)
            ]
          })}
          {this.renderBtn('onSelect API', 'onSelect API', {
            onSelect: (date, state) => {
              console.log('onSelect', date, state)
              return [date, new Date(+now - 604800000)]
            }
          })}
          {this.state.startTime && (
            <List.Item>
              Time1: {this.state.startTime.toLocaleString()}
            </List.Item>
          )}
          {this.state.endTime && (
            <List.Item>Time2: {this.state.endTime.toLocaleString()}</List.Item>
          )}
        </List>
        <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onSelectHasDisableDate={this.onSelectHasDisableDate}
          getDateExtra={this.getDateExtra}
          defaultDate={now}
          minDate={new Date(+now - 5184000000)}
          maxDate={new Date(+now + 31536000000)}
        />
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('app'))
