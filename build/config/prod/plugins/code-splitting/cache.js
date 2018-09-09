const path = require('path')
const fs = require('fs')
const { debounce } = require('lodash')

const getCacheDirectory = require('../../../../utils/helpers/getCacheDirectory')

const __cache__loader__directory = getCacheDirectory(
  'webpack-prod__code-splitting'
)

let cache = {}

try {
  cache = JSON.parse(
    fs.readFileSync(path.resolve(__cache__loader__directory, './.cache.json'), {
      encoding: 'utf8'
    })
  )
} catch (error) {
  cache = {}
}

const write = debounce(() => {
  fs.writeFileSync(
    path.resolve(__cache__loader__directory, './.cache.json'),
    JSON.stringify(cache),
    {
      encoding: 'utf8'
    }
  )
}, 1000)

const cacheController = {
  find: key => cache[key],
  save: (key, value) => {
    cache[key] = value
    write()
  }
}

module.exports = cacheController
