import * as helpers from '@helpers'

const { random } = helpers

export default class Divider {
  constructor(total, count) {
    Object.assign(this, { total, count })
    this.per = total / count
  }

  judge = amount => Math.floor((amount % this.total) / this.per)

  knock = (index, strict = false) => {
    const __offset = this.per / 2
    const __piece__middle__value = index * this.per + __offset

    if (strict) {
      return __piece__middle__value
    }

    return random(
      __piece__middle__value - __offset,
      __piece__middle__value + __offset
    )
  }
}
