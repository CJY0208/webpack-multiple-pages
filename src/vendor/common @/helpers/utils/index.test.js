import { assert } from 'chai'
import { flatten } from './index'

describe('common -> utils -> helpers 单元测试', () => {
  it('flatten 需正确拍扁数组', () => {
    assert.equal(
      JSON.stringify(flatten([1, [2, 3], [[4, 5], [6, [7, [8, [9]]]]], 0])),
      JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
    )
  })
})
