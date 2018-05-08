import { assert } from 'chai'
import classNames from '../../helpers/utils/classNames'

describe('classNames 单元测试', () => {
  it('classNames 基础用例测试', () => {
    assert.equal(classNames('foo', 'bar'), 'foo bar')

    assert.equal(classNames('foo', { bar: true }), 'foo bar')
    assert.equal(classNames({ 'foo-bar': true }), 'foo-bar')
    assert.equal(classNames({ 'foo-bar': false }), '')
    assert.equal(classNames({ foo: true }, { bar: true }), 'foo bar')
    assert.equal(classNames({ foo: true, bar: true }), 'foo bar')

    // lots of arguments of various types
    assert.equal(
      classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }),
      'foo bar baz quux'
    )

    // other falsy values are just ignored
    assert.equal(
      classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''),
      'bar 1'
    )
  })
})
