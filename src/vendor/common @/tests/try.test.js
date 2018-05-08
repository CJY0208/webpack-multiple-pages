import { assert, expect } from 'chai'
import { get, set, run, value } from '../helpers/try'

describe('try 模块单元测试', () => {
  it('get 功能测试', () => {
    const obj = {
      a: {
        b: 1
      },
      c: null
    }

    // 基础
    assert.equal(get(obj, 'a.b'), 1)
    assert.equal(get(obj, ['a', 'b']), 1)
    assert.equal(get(obj, 'c.b'), undefined)

    // 带默认值
    assert.equal(get(obj, 'c.b', 1), 1)
  })

  describe('set 功能测试', () => {
    it('基础功能', () => {
      let obj

      obj = set(obj, 'a.b.c', 1)

      assert.equal(
        JSON.stringify(obj),
        JSON.stringify({
          a: {
            b: {
              c: 1
            }
          }
        })
      )
    })

    it('set 函数处理应无副作用', () => {
      let obj

      set(obj, 'a', 1) // {a: 1}

      expect(obj).to.be.equal(undefined)

      obj = {
        a: {
          b: 1
        }
      }

      let obj2 = set(obj, 'a.b', 2)

      assert.equal(obj === obj2, false)
      assert.equal(obj.a === obj2.a, false)
    })
  })

  describe('run 功能测试', () => {
    let obj = {
      deep: {
        deep: {
          add: (a, b) => a + b
        }
      },

      name: 'CJY',
      greet() {
        return `hello, I'm ${this.name}`
      },

      context: {
        getThis() {
          return this
        }
      }
    }

    it('函数存在时，应正确运行函数', () => {
      assert.equal(run(obj, 'deep.deep.add', 1, 2), 3)
    })

    it('取值不是函数或查找结果不存在时，行为应与 get 函数一致', () => {
      let res1 = run(obj, 'deep.deep.reduce')
      let res2 = run(obj, 'name')

      assert.equal(res1, undefined)
      assert.equal(res1, get(obj, 'deep.deep.reduce'))
      assert.equal(res2, 'CJY')
      assert.equal(res2, get(obj, 'name'))
    })

    it('应保护上下文', () => {
      assert.equal(run(obj, 'greet'), "hello, I'm CJY")
      assert.equal(run(obj, 'context.getThis'), obj.context)
    })
  })

  describe('value 功能测试', () => {
    let v1,
      v2,
      v3 = 'default'
    it('基础行为', () => {
      assert.equal(value(v1, v2, v3), 'default')
      assert.equal(value(v1, 0, v3), 0)
    })

    it('可传递执行函数', () => {
      assert.equal(value(v1, () => v2, () => v3), 'default')
    })
  })
})
