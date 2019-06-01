import { expect } from 'chai'
import { i18n } from './index'

describe('i18n 单元测试', () => {
  const translate = i18n({
    你好: 'Hello',
    '你好，XX，我是YY': "Hello ${XX}, I'm ${YY}"
  })

  it('i18n 接受一个 locale 对象后应返回一个 translate 函数', () => {
    expect(translate).to.be.a('function')
  })

  describe('translate 函数翻译测试', () => {
    it('普通翻译', () => {
      expect(translate('你好')).to.be.equal('Hello')
    })

    it('模板翻译', () => {
      const data = {
        XX: 'mocha',
        YY: 'CJY'
      }

      expect(translate('你好，XX，我是YY', data)).to.be.equal(
        `Hello ${data['XX']}, I'm ${data['YY']}`
      )
    })

    it('异常翻译', () => {
      expect(translate(undefined)).to.be.equal('')
    })
  })
})
