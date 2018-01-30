const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {
  optimize: { UglifyJsPlugin } = {},
  DllPlugin,
  DefinePlugin,
  IgnorePlugin,
  NamedChunksPlugin,
  HashedModuleIdsPlugin
} = require('webpack')

module.exports = {
  entry: require('../entries').dll,
  output: {
    path: path.resolve(__dirname, '../../dist/lib'),
    filename: '[name].[chunkhash:6].js',
    library: '[name]_[chunkhash:6]'
  },
  plugins: [
    /**
     * NamedChunksPlugin 和 HashedModuleIdsPlugin 保证模块 hash 不受编译顺序的影响
     * 民间资料：https://www.imooc.com/article/details/id/21538
     * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-module-identifiers-
     * 可预测的长效缓存（扩展）：https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
     */
    new NamedChunksPlugin(),
    new HashedModuleIdsPlugin(),

    /**
     * Webpack 任务前/后，使用此插件清除旧的编译文件
     */
    new CleanWebpackPlugin(
      ['manifest', path.resolve(__dirname, '../../dist/lib')],
      {
        allowExternal: true, // 允许 CleanWebpackPlugin 清除本配置目录外的文件
        beforeEmit: true // 在 Webpack 工作完成、输出文件前夕执行清除操作
      }
    ),

    /**
     * 忽略国际化部分以减小 moment.js 体积，参考：https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
     */
    new IgnorePlugin(/^\.\/locale$/, /moment$/),

    /**
     *  环境变量设置为生产模式以减小 react 体积，参考：https://reactjs.org/docs/add-react-to-an-existing-app.html#development-and-production-versions
     */
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    /**
     * Webpack Dll 功能：预编译第三方模块以提升业务代码打包速度
     * 民间资料：https://segmentfault.com/a/1190000005969643
     */
    new DllPlugin({
      path: path.resolve(__dirname, './manifest/[name].json'),
      name: '[name]_[chunkhash:6]',
      context: __dirname
    }),

    /**
     * 此处与 Tree Shaking 无关，单纯对第三方模块做压缩处理
     */
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
