const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')

module.exports = lessToJs(
  fs.readFileSync(path.resolve(__dirname, './default.less'), 'utf8')
)
