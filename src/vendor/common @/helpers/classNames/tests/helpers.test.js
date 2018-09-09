import { assert } from 'chai'
import {
  __map__object__className,
  __parse__className
} from '../../classNames/helpers'

describe('classNames 辅助函数', () => {
  it('__map__object__className 需从对象中解析出正确的 className', () => {
    assert.equal(
      JSON.stringify(
        __map__object__className({
          // 真值
          a: true,
          b: 1,
          c: {},
          d: [],

          // 假值
          e: false,
          f: null,
          g: undefined,
          h: '',
          i: 0
        })
      ),
      JSON.stringify(['a', 'b', 'c', 'd'])
    )
  })

  it('__parse__className 需正确解析 className', () => {
    assert.equal(__parse__className('simple-class-name'), 'simple-class-name')

    assert.equal(
      JSON.stringify(__parse__className('simple class name')),
      JSON.stringify(['simple', 'class', 'name'])
    )
  })
})
