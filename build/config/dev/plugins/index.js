const path = require('path')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
// const HasOutput = require('webpack-plugin-hash-output')
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const {
  NamedChunksPlugin,
  HashedModuleIdsPlugin,
  NamedModulesPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin
} = require('webpack')

module.exports = {
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HotModuleReplacementPlugin(),

    ...require('../loaders').plugins,
    ...require('../style').plugins,
    ...require('./dll'),
    ...require('./code-splitting'),
    ...require('./html'),

    /**
     * NamedChunksPlugin 和 HashedModuleIdsPlugin 保证模块 hash 不受编译顺序的影响
     * 民间资料：https://www.imooc.com/article/details/id/21538
     * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-module-identifiers-
     * 可预测的长效缓存（扩展）：https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
     */
    new NamedChunksPlugin(),
    // new HashedModuleIdsPlugin(),
    new NamedModulesPlugin(),

    /**
     *  环境变量设置为生产模式以减小 react 或其他第三方插件体积，参考：https://reactjs.org/docs/add-react-to-an-existing-app.html#development-and-production-versions
     */
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('develop')
      }
    })
  ]
}
