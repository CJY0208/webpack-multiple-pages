export default class CombJubge {
  constructor(list) {
    this.list = list

    this.attr = Object.entries(list).reduce((attr, [id, item]) => {
      Object.entries(item).forEach(([key, val]) => {
        attr[key] = attr[key] || []
        attr[key] = [...new Set([...attr[key], val])]
      })

      return attr
    }, {})

    this.attrKey = Object.keys(this.attr)
  }

  adaptedAttr = activeAttr =>
    Object.entries(this.attr).reduce(
      (adaptedAttr, [key, values]) =>
        Object.assign(adaptedAttr, {
          [key]: values.filter(val =>
            this.__have(
              Object.assign({}, activeAttr, {
                [key]: val
              })
            )
          )
        }),
      {}
    )

  __have = activeAttr =>
    Object.values(this.list).some(item =>
      Object.entries(activeAttr).every(([key, val]) => item[key] === val)
    )

  find = activeAttr => {
    for (let [id, item] of Object.entries(this.list)) {
      if (
        Object.entries(activeAttr).every(([key, val]) => item[key] === val) &&
        Object.keys(item).every(key => key in activeAttr)
      ) {
        return id
      }
    }
  }
}
