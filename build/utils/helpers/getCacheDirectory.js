const fs = require('fs')
const path = require('path')

const dir = process.cwd()

try {
  fs.mkdirSync(path.resolve(dir, './node_modules/.cache'))
} catch (err) {
  // nothing
}

module.exports = dirname => {
  const directory = path.resolve(dir, `./node_modules/.cache/${dirname}`)

  try {
    fs.mkdirSync(directory)
  } catch (err) {
    // nothing
  }

  return directory
}
