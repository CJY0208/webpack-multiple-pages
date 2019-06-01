const fs = require('fs')
const path = require('path')
const glob = require('glob')

const __root = path.resolve(__dirname, '../../../../')

exports.isDirtyBranch = () =>
  glob.sync(path.join(__root, '.dirty-branch')).length > 0
exports.getCurrentBranch = () =>
  fs
    .readFileSync(path.join(__root, '.git/HEAD'), {
      encoding: 'utf8'
    })
    .trim()
    .split('/')
    .reverse()
    .shift()
