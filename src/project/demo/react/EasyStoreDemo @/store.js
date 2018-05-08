import EasyStore from '@EasyStore'

@EasyStore
export default class Store {
  next = data => {
    // console.log(this, 'next', data)
    const { name } = this.getState()

    this.getAction('hello')(data)
  }

  init = () => {
    this.setState({
      name: 'CJY'
    })
  }
}

@Store.merge
class ElseStore {
  hello(name) {
    this.setState({
      name: `Hello ${name}`
    })
  }
}
