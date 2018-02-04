const path = require('path')
const { plugins } = require('./plugins')
const { dll: entry } = require('../entries')
const { DllPlugin } = require('webpack')

console.log(entry)

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '../../dist/lib'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]'
  },
  plugins: [
    ...plugins,
    /**
     * Webpack Dll 功能：预编译第三方模块以提升业务代码打包速度
     * 民间资料：https://segmentfault.com/a/1190000005969643
     */
    new DllPlugin({
      path: path.resolve(__dirname, './manifest/[name].json'),
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ]
}
