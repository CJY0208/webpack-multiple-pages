import React, { Component } from 'react'
import { render } from 'react-dom'
import './style.scss'
class AddTask extends React.Component {
  render() {
    // const fn = ()=> this.props.inputChange()
    return (
      <div className="margin flex-space">
        <label>
          Task{' '}
          <input
            type="text"
            value={this.props.value}
            placeholder="你想做点什么"
            onChange={this.props.onChange}
          />
        </label>
        <BtnComponent />
      </div>
    )
  }
}
function BtnComponent() {
  return <input className="btn" type="submit" value="Add Task" />
}

class Todolist extends React.Component {
  mouseOn(event) {
    let t = event.target.lastChild
    t === null ? '' : (t.className = 'show')
  }
  mouseOut = event => {
    let t = event.target.lastChild
    t === null ? '' : (t.className = 'hide')
  }
  render() {
    let complete = 0
    let itemChecked
    let data = this.props.data

    const checkedCss = { textDecoration: 'line-through', color: 'red' }

    const list = data.map((item, index) => {
      itemChecked = item.complete ? true : false
      complete = item.complete ? complete + 1 : complete

      return (
        <li
          key={index}
          className=""
          onMouseOver={this.mouseOn}
          onMouseOut={this.mouseOut}
        >
          <input
            type="checkbox"
            checked={itemChecked}
            onChange={() => this.props.onChange(index)}
          />
          <span style={itemChecked ? checkedCss : {}}>{item.task}</span>
          <button
            className="hide"
            type="button"
            onClick={() => this.props.onClick(index)}
          >
            删除
          </button>
        </li>
      )
    })
    return (
      <div className="taskItems">
        <ol>{list}</ol>
        <div className="margin">
          {complete}/{list.length} (完成/总数)
        </div>
      </div>
    )
  }
}
class TodoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { id: '0001', task: '吃饭', complete: false },
        { id: '0002', task: '睡觉', complete: false },
        { id: '0003', task: '打豆豆', complete: true },
        { id: '0004', task: 'abc', complete: true }
      ],
      value: ''
    }
    this.toggleComplete = this.toggleComplete.bind(this)
    // this.inputChange = this.inputChange.bind(this);
    // this.submitTask = this.submitTask.bind(this);
    this.deleTask = this.deleTask.bind(this)
  }

  toggleComplete(index) {
    let currData = this.state.data[index]
    let newComplete = currData.complete === true ? false : true
    currData = Object.assign({}, currData, { complete: newComplete })
    this.state.data.splice(index, 1, currData)
    // console.log(this.state.data)

    this.setState({ data: this.state.data })
  }

  inputChange = e => {
    this.setState({ value: e.target.value })
  }

  submitTask = e => {
    e.preventDefault()
    let data = this.state.data
    let id = data[data.length - 1].id + 1
    let complete = false
    data = data.concat([{ id: id, task: this.state.value, complete: false }])
    this.setState({ data: data, value: '' })
  }
  deleTask(index) {
    this.state.data.splice(index, 1)
    console.log(this.state.data)
    this.setState({ data: this.state.data })
  }
  render() {
    return (
      <div className="Page">
        <h2>React Todo Demo</h2>
        <Todolist
          data={this.state.data}
          onChange={this.toggleComplete}
          onClick={this.deleTask}
        />
        <form onSubmit={this.submitTask}>
          <AddTask value={this.state.value} onChange={this.inputChange} />
        </form>
      </div>
    )
  }
}
render(<TodoPage />, document.getElementById('root'))
