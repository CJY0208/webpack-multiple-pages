import { assert } from 'chai'
import { __ } from '../index'

describe('utils 模块 __ 功能测试', () => {
  it('__ 期望能正确工作', () => {
    const fn = (x, y, z) => x + y + z
    const _fn = __(fn)(__, 1, __)

    assert.equal(_fn(3, 4), 8)
  })

  it('__ 第二参数需可控制 this 指向', () => {
    const fn = function(word) {
      return `${word}, ${this.name}`
    }

    const _fn = __(fn, {
      name: 'CJY'
    })(__)

    assert.equal(_fn('Hello'), 'Hello, CJY')
  })

  it('__ 期望能使用 bind 来控制 this 指向', () => {
    const fn = function(word) {
      return `${word}, ${this.name}`
    }

    const _fn = __(fn)(__).bind({
      name: 'CJY'
    })

    assert.equal(_fn('Hello'), 'Hello, CJY')
  })
})
