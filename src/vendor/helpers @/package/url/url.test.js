import { assert } from 'chai'
import { JSDOM } from 'jsdom'
import * as url from './index'

const { window, document } = new JSDOM(``, {
  url:
    'https://www.test.com/index.html?testCode=123&encodeURIComponentName=%E4%BD%A0%E5%A5%BD&escapeName=%u4F60%u597D'
})

Object.assign(
  global,
  {
    window,
    document
  },
  {
    location: window.location
  }
)

describe('url 单元测试', () => {
  describe('param 函数功能测试', () => {
    it('使用默认的 location.search 作为查询字段', () => {
      assert.equal(url.param('testCode'), '123')
      assert.equal(url.param('encodeURIComponentName'), '你好')
      assert.equal(url.paramEscape('escapeName'), '你好')
    })

    it('使用自定义查询字段', () => {
      const customSearch =
        '?testCode=456&encodeURIComponentName=%E6%88%91%E4%B8%8D%E5%A5%BD&escapeName=%u6211%u4E0D%u597D'
      assert.equal(url.param('testCode', customSearch), '456')
      assert.equal(url.param('encodeURIComponentName', customSearch), '我不好')
      assert.equal(url.paramEscape('escapeName', customSearch), '我不好')
    })
  })

  describe('allParam 函数功能测试', () => {
    it('使用默认的 location.search 作为查询字段', () => {
      assert.equal(
        JSON.stringify(url.allParam()),
        JSON.stringify({
          testCode: '123',
          encodeURIComponentName: '你好',
          escapeName: '你好'
        })
      )

      // assert.equal(
      //   JSON.stringify(url.allParamEscape()),
      //   JSON.stringify({
      //     testCode: '123',
      //     encodeURIComponentName: "ä½ å¥½",
      //     escapeName: '你好'
      //   })
      // )
    })

    it('使用自定义查询字段', () => {
      const customSearch =
        '?testCode=456&encodeURIComponentName=%E6%88%91%E4%B8%8D%E5%A5%BD&escapeName=%u6211%u4E0D%u597D'
      assert.equal(
        JSON.stringify(url.allParam(customSearch)),
        JSON.stringify({
          testCode: '456',
          encodeURIComponentName: '我不好',
          escapeName: '我不好'
        })
      )

      assert.equal(
        JSON.stringify(url.allParamEscape(customSearch)),
        JSON.stringify({
          testCode: '456',
          encodeURIComponentName: 'æä¸å¥½',
          escapeName: '我不好'
        })
      )
    })
  })
})
