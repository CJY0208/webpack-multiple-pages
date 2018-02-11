const path = require('path')

const entries = require('./entries')
const {
  project: project_entries,
  lib: lib_entries,
  vendor: vendor_entries,
  dll: dll_entries
} = entries
const project_entry_names = Object.keys(project_entries)
const vendor_entry_names = Object.keys(vendor_entries)
const lib_entry_names = Object.keys(lib_entries)
const dll_entry_names = Object.keys(dll_entries)

module.exports = {
  context: path.resolve(__dirname, '../../../'),
  entry: project_entries,
  output: {
    path: path.resolve(__dirname, '../../../dist'),
    filename: 'project/[name].[chunkhash:6].js',
    /**
     * chunkFilename 只用来打包 require.ensure 或 import() 方法中引入的异步模块，若无异步模块则不会生成任何 chunk 块文件
     * 民间资料：https://www.cnblogs.com/toward-the-sun/p/6147324.html?utm_source=itdadao&utm_medium=referral
     */
    chunkFilename: 'async/[name].[chunkhash:6].js'
  },
  devtool: false, // 'source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue': 'vue/dist/vue.esm.js',
      'lodash/fp': path.resolve(__dirname, '../../utils/lodash/fp'),
      ...Object.entries(vendor_entries).reduce(
        (alias, [key, value]) =>
          typeof value !== 'string'
            ? alias
            : Object.assign(alias, {
                [`@${key}`]: value
              }),
        {}
      )
    }
  },
  plugins: require('./plugins'),
  watch: false,
  /**
   * 定制 webpack 的日志输出，文档参考：https://webpack.js.org/configuration/stats/
   */
  stats: {
    assets: true,
    chunks: false,
    modules: false,
    children: false,
    errors: true,
    errorDetails: true,
    warnings: true
  }
}
