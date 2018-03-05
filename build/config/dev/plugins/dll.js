const path = require('path')
const { DllReferencePlugin } = require('webpack')

module.exports = [
  new DllReferencePlugin({
    context: path.resolve(__dirname, '../../__dll'),
    manifest: require('../../__dll/manifest/__dll.json')
  })
]
