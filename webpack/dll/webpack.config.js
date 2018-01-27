const path = require('path')
const {
  optimize: {
    UglifyJsPlugin
  } = {},
  DllPlugin
} = require('webpack')

module.exports = {
  entry: require('./entry'),
  output: {
    path: path.resolve(__dirname, `../../dist/lib`),
    filename: `[name].[chunkhash:8].js`,
    library: '[name]_[chunkhash:8]'
  },
  plugins: [
    new DllPlugin({
      path: path.resolve(__dirname, `./manifest/[name].json`),
      name: '[name]_[chunkhash:8]',
      context: __dirname,
    }),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ]
}
