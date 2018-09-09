import '__prefix__'
import React from 'react'
import ReactDOM from 'react-dom'

window.React = React

import {
  Pagination,
  LocaleProvider,
  List,
  DatePicker,
  WhiteSpace,
  InputItem,
  WingBlank,
  SegmentedControl,
  Picker,
  SearchBar
} from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US'

const maxDate = new Date(2018, 11, 3, 22, 0)
const minDate = new Date(2015, 7, 6, 8, 30)

const seasons = [
  [
    {
      label: '2013',
      value: '2013'
    },
    {
      label: '2014',
      value: '2014'
    }
  ],
  [
    {
      label: '春',
      value: '春'
    },
    {
      label: '夏',
      value: '夏'
    }
  ]
]

const Page = () => (
  <div>
    <Pagination total={5} current={1} />
    <WhiteSpace />
    <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
      <DatePicker
        mode="date"
        title="Select date"
        minDate={minDate}
        maxDate={maxDate}
      >
        <List.Item arrow="horizontal">datePicker</List.Item>
      </DatePicker>
      <Picker data={seasons} cascade={false}>
        <List.Item arrow="horizontal">picker</List.Item>
      </Picker>
    </List>
    <WhiteSpace />
    <InputItem type="money" placeholder="money input" />
    <WhiteSpace />
    <SearchBar placeholder="Search" showCancelButton />
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnglish: true
    }
  }

  onChange = e => {
    const index = e.nativeEvent.selectedSegmentIndex
    this.setState({
      isEnglish: index === 0
    })
  }

  render() {
    const locale = this.state.isEnglish ? enUS : undefined
    return (
      <WingBlank>
        <SegmentedControl
          values={['切换到英文', 'Change to Chinese']}
          selectedIndex={this.state.isEnglish ? 0 : 1}
          onChange={this.onChange}
        />
        <WhiteSpace />
        <LocaleProvider locale={locale}>
          <Page />
        </LocaleProvider>
      </WingBlank>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
