const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HasOutput = require('webpack-plugin-hash-output')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const {
  NamedChunksPlugin,
  HashedModuleIdsPlugin,
  NamedModulesPlugin,
  DefinePlugin
} = require('webpack')

module.exports = {
  plugins: [
    ...require('../style').plugins,
    ...require('../loaders').plugins,
    ...require('./code-splitting'),
    ...require('./dll'),
    ...require('./html'),

    /**
     * NamedChunksPlugin 和 HashedModuleIdsPlugin 保证模块 hash 不受编译顺序的影响
     * 民间资料：https://www.imooc.com/article/details/id/21538
     * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-module-identifiers-
     * 可预测的长效缓存（扩展）：https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
     */
    new NamedChunksPlugin(),
    new HashedModuleIdsPlugin(),
    // new NamedModulesPlugin(),

    /**
     *  环境变量设置为生产模式以减小 react 或其他第三方插件体积，参考：https://reactjs.org/docs/add-react-to-an-existing-app.html#development-and-production-versions
     */
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    /**
     * Webpack 任务前/后，使用此插件清除旧的编译文件
     */
    new CleanWebpackPlugin([path.resolve(__dirname, '../../../../dist')], {
      verbose: false, // 不输出 log
      allowExternal: true, // 允许 CleanWebpackPlugin 清除本配置目录外的文件
      beforeEmit: true // 在 Webpack 工作完成、输出文件前夕执行清除操作
    }),

    /**
     * 关于 Tree Shaking，Webpack 只标记未使用的依赖而不清除，需通过 UglifyJsPlugin 达到清除未使用代码的效果
     * 且 Tree Shaking 特性要求使用 es6 模块语法才能分析无效引用，所以 .babelrc文件中要关闭 babel 对 import 语法的转义
     */
    new ParallelUglifyPlugin({
      cacheDir: path.resolve(__dirname, './.uglify_cache'),
      uglifyJs: {
        compress: {
          warnings: false
        },
        beautify: false,
        output: {
          comments: false
        }
      },
      sourceMap: false
    }),

    new HasOutput()
  ]
}
