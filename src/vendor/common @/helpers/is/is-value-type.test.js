import { expect } from 'chai'
import {
  isUndefined,
  isNull,
  isFunction,
  isArray,
  isObject,
  isNumber,
  isBoolean,
  isString,
  isExist
} from './index'

describe('is 值类型单元测试', () => {
  it('isUndefined 函数测试', () => {
    expect(isUndefined(undefined)).to.be.equal(true)
    ;[null, {}, [], 0, ''].forEach(value =>
      expect(isUndefined(value)).to.be.equal(false)
    )
  })

  it('isNull 函数测试', () => {
    expect(isNull(null)).to.be.equal(true)
    ;[undefined, {}, [], 0, ''].forEach(value =>
      expect(isNull(value)).to.be.equal(false)
    )
  })

  it('isFunction 函数测试', () => {
    function fn1() {}
    const fn2 = () => {}
    ;[fn1, fn2].forEach(value => expect(isFunction(value)).to.be.equal(true))
    ;[undefined, {}, [], 0, '', null].forEach(value =>
      expect(isFunction(value)).to.be.equal(false)
    )
  })

  it('isArray 函数测试', () => {
    expect(isArray([])).to.be.equal(true)
    ;[undefined, {}, 0, ''].forEach(value =>
      expect(isArray(value)).to.be.equal(false)
    )
  })

  it('isObject 函数测试', () => {
    expect(isObject({})).to.be.equal(true)
    ;[undefined, [], 0, ''].forEach(value =>
      expect(isObject(value)).to.be.equal(false)
    )
  })

  it('isNumber 函数测试', () => {
    expect(isNumber(0)).to.be.equal(true)
    ;[undefined, [], {}, '1'].forEach(value =>
      expect(isNumber(value)).to.be.equal(false)
    )
  })

  it('isBoolean 函数测试', () => {
    expect(isBoolean(false)).to.be.equal(true)
    ;[undefined, [], {}, ''].forEach(value =>
      expect(isBoolean(value)).to.be.equal(false)
    )
  })

  it('isString 函数测试', () => {
    expect(isString('')).to.be.equal(true)
    ;[undefined, [], {}, 0].forEach(value =>
      expect(isString(value)).to.be.equal(false)
    )
  })

  it('isExist 函数测试', () => {
    ;['', 0, false, {}, []].forEach(value =>
      expect(isExist(value)).to.be.equal(true)
    )
    ;[undefined, null].forEach(value =>
      expect(isExist(value)).to.be.equal(false)
    )
  })
})
