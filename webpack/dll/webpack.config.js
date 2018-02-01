const path = require('path')
const plugins = require('./plugins')

module.exports = {
  entry: require('../entries').dll,
  output: {
    path: path.resolve(__dirname, '../../dist/lib'),
    filename: '[name].[chunkhash:6].js',
    library: '[name]_[chunkhash:6]'
  },
  plugins
}
