const path = require('path')
const fs = require('fs')
const { debounce } = require('lodash')

let cache

try {
  cache = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './.cache'), {
      encoding: 'utf8'
    })
  )
} catch (error) {
  cache = {}
}

const write = debounce(() => {
  fs.writeFileSync(path.resolve(__dirname, './.cache'), JSON.stringify(cache), {
    encoding: 'utf8'
  })
}, 1000)

const cacheController = {
  find: key => cache[key],
  save: (key, value) => {
    cache[key] = value
    write()
  }
}

module.exports = cacheController
