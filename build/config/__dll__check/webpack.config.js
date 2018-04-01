const path = require('path')
const { plugins } = require('./plugins')
const { dll, lib } = require('../../entries')
const { DllPlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const getEntries = (obj, prefix = '') =>
  Object.entries(obj).reduce(
    (entries, [key, values]) => ({
      ...entries,
      [`${prefix}${key}`]: values
    }),
    {}
  )

module.exports = {
  entry: {
    ...getEntries(dll, 'd_'),
    ...getEntries(lib, 'l_')
  },
  output: {
    path: path.resolve(__dirname, './files'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]'
  },
  plugins: [
    ...plugins,

    /**
     * Webpack 任务前/后，使用此插件清除旧的编译文件
     */
    new CleanWebpackPlugin(
      [
        path.resolve(__dirname, './files'),
        path.resolve(__dirname, './manifest')
      ],
      {
        verbose: false, // 不输出 log
        allowExternal: true // 允许 CleanWebpackPlugin 清除本配置目录外的文件
        // beforeEmit: true // 在 Webpack 工作完成、输出文件前夕执行清除操作
      }
    ),

    /**
     * Webpack Dll 功能：预编译第三方模块以提升业务代码打包速度
     * 民间资料：https://segmentfault.com/a/1190000005969643
     */
    new DllPlugin({
      path: path.resolve(__dirname, './manifest/[name].json'),
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ],
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
