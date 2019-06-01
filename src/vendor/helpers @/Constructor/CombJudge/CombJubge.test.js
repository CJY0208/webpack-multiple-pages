import { assert, expect } from 'chai'
import CombJudge from './index'

describe('CombJudge 基础组合判断测试', () => {
  const judge = new CombJudge([
    {
      A: 1,
      B: 1,
      C: 1
    },
    {
      A: 2,
      B: 2,
      C: 2
    },
    {
      A: 1,
      B: 2,
      C: 3
    },
    {
      A: 2,
      B: 1,
      C: 4
    },
    {
      A: 1,
      B: 2,
      C: 3,
      D: 4
    }
  ])

  it('获取全部属性选项', () => {
    expect(judge.attr['A']).to.include.members([1, 2])
    expect(judge.attr['B']).to.include.members([1, 2])
    expect(judge.attr['C']).to.include.members([1, 2, 3, 4])
    expect(judge.attr['D']).to.include.members([4])
  })

  it('判断属性可用性', () => {
    let adaptedAttr

    adaptedAttr = judge.adaptedAttr({
      A: 2
    })

    // adaptedAttr === {
    //   A: [1, 2],
    //   B: [1, 2],
    //   C: [2, 4],
    //   D: [4]
    // }

    expect(adaptedAttr['A']).to.include.members([1, 2])
    expect(adaptedAttr['B']).to.include.members([1, 2])
    expect(adaptedAttr['C']).to.include.members([2, 4])
    expect(adaptedAttr['D']).to.not.have.members([4])

    adaptedAttr = judge.adaptedAttr({
      A: 1,
      B: 2
    })

    // adaptedAttr === {
    //   A: [1, 2],
    //   B: [1, 2],
    //   C: [3],
    //   D: [4]
    // }

    expect(adaptedAttr['A']).to.include.members([1, 2])
    expect(adaptedAttr['B']).to.include.members([1, 2])
    expect(adaptedAttr['C']).to.deep.equal([3])
    expect(adaptedAttr['D']).to.deep.equal([4])
  })

  it('查找匹配项', () => {
    expect(
      judge.find({
        A: 1,
        B: 1,
        C: 1
      })
    ).to.be.equal('0')

    expect(
      judge.find({
        A: 1,
        B: 2
      })
    ).to.be.undefined

    expect(
      judge.find({
        A: 1,
        B: 2,
        C: 1
      })
    ).to.be.undefined
  })
})

describe('CombJudge 拟真组合判断测试', () => {
  const judge = new CombJudge({
    14: {
      color: 'red',
      size: 'M',
      gender: 'women'
    },
    15: {
      color: 'red',
      size: 'L',
      gender: 'women'
    },
    16: {
      color: 'red',
      size: 'XL',
      gender: 'men'
    },
    17: {
      color: 'blue',
      size: 'M',
      gender: 'men'
    },
    18: {
      color: 'blue',
      size: 'L',
      gender: 'women'
    },
    19: {
      color: 'blue',
      size: 'XL',
      gender: 'men'
    },
    20: {
      color: 'blue',
      size: 'S',
      gender: 'women'
    }
  })

  it('获取全部属性选项', () => {
    expect(judge.attr['color']).to.include.members(['red', 'blue'])
    expect(judge.attr['size']).to.include.members(['S', 'M', 'L', 'XL'])
    expect(judge.attr['gender']).to.include.members(['men', 'women'])
  })

  it('判断属性可用性', () => {
    let adaptedAttr

    adaptedAttr = judge.adaptedAttr({
      color: 'blue',
      size: 'L'
    })

    expect(adaptedAttr['color']).to.include.members(['red', 'blue'])
    expect(adaptedAttr['size']).to.include.members(['S', 'M', 'L', 'XL'])
    expect(adaptedAttr['gender']).to.deep.equal(['women'])

    adaptedAttr = judge.adaptedAttr({
      color: 'red',
      gender: 'women'
    })

    expect(adaptedAttr['color']).to.deep.equal(['red', 'blue'])
    expect(adaptedAttr['size']).to.include.members(['M', 'L'])
    expect(adaptedAttr['gender']).to.include.members(['women', 'men'])
  })

  it('查找匹配项', () => {
    expect(
      judge.find({
        color: 'red',
        size: 'L',
        gender: 'women'
      })
    ).to.be.equal('15')

    expect(
      judge.find({
        color: 'red',
        size: 'XL',
        gender: 'women'
      })
    ).to.be.undefined

    expect(
      judge.find({
        color: 'blue',
        size: 'S',
        gender: 'women'
      })
    ).to.be.equal('20')
  })
})
