import { assert } from 'chai'
import classnames from '../index'

describe('classnames 单元测试', () => {
  it('classnames 基础用例测试', () => {
    assert.equal(classnames('foo', 'bar'), 'foo bar')

    assert.equal(classnames('foo', { bar: true }), 'foo bar')
    assert.equal(classnames({ 'foo-bar': true }), 'foo-bar')
    assert.equal(classnames({ 'foo-bar': false }), '')
    assert.equal(classnames({ foo: true }, { bar: true }), 'foo bar')
    assert.equal(classnames({ foo: true, bar: true }), 'foo bar')

    // lots of arguments of various types
    assert.equal(
      classnames('foo', { bar: true, duck: false }, 'baz', { quux: true }),
      'foo bar baz quux'
    )

    // other falsy values are just ignored
    assert.equal(
      classnames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''),
      'bar 1'
    )
  })
})
