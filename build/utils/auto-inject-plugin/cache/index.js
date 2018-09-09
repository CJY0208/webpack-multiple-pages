const path = require('path')
const fs = require('fs')

const getCacheDirectory = require('../../helpers/getCacheDirectory')

const __directory = getCacheDirectory('auto-inject-plugin')
const __get__filename = key => path.resolve(__directory, `./${key}.json`)

const write = async (filename, content) => {
  return fs.writeFile(filename, content, err => {
    if (err) return console.error('fs', err)
    // nothing
  })
}

const readSync = filename => {
  try {
    const content = fs.readFileSync(filename)
    return JSON.parse(content)
  } catch (err) {
    return
  }
}

const __cache = {}

const cacheController = {
  find: key => {
    const cache = __cache[key]
    if (cache) {
      return cache
    }

    const filename = __get__filename(key)
    const content = readSync(filename)
    __cache[key] = content

    return content
  },
  save: (key, value) => {
    __cache[key] = value

    write(__get__filename(key), JSON.stringify(value))
  }
}

module.exports = cacheController
