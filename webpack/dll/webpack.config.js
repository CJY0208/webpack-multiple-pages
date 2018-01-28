const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {
  optimize: {
    UglifyJsPlugin
  } = {},
  DllPlugin, DefinePlugin, IgnorePlugin
} = require('webpack')

module.exports = {
  entry: require('./entry'),
  output: {
    path: path.resolve(__dirname, '../../dist/lib'),
    filename: '[name].[chunkhash:8].js',
    library: '[name]_[chunkhash:8]'
  },
  plugins: [
    new CleanWebpackPlugin([
      'manifest',
      path.resolve(__dirname, '../../dist/lib')
    ], {
      allowExternal: true,
      beforeEmit: true
    }),
    // 忽略国际化部分以减小 moment.js 体积，参考：https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 环境变量设置为生产模式以减小 react 体积，参考：https://reactjs.org/docs/add-react-to-an-existing-app.html#development-and-production-versions
    new DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify('production'),
      }
    }),
    new DllPlugin({
      path: path.resolve(__dirname, './manifest/[name].json'),
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
