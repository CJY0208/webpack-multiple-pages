const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const {
  // DllPlugin,
  DefinePlugin,
  // IgnorePlugin,
  NamedChunksPlugin,
  NamedModulesPlugin,
  HashedModuleIdsPlugin
} = require('webpack')
const AutoDllPlugin = require('autodll-webpack-plugin')

const { dll } = require('../__entries')
const getCacheDirectory = require('../../../utils/helpers/getCacheDirectory')
const __uglify__cache__directory = getCacheDirectory('parallel-uglify-plugin')

const NamedDllEntryModuleIdsPlugin = require('../../../utils/NamedDllEntryModuleIdsPlugin')

module.exports = [
  /**
   * 自动构建 Dll 库
   */
  new AutoDllPlugin({
    // inject: true,
    filename: '[name].[chunkhash].js',
    path: 'dll',
    entry: dll,
    config: {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory']
          }
        ]
      },
      plugins: [
        /**
         * NamedChunksPlugin 和 HashedModuleIdsPlugin 保证模块 hash 不受编译顺序的影响
         * 民间资料：https://www.imooc.com/article/details/id/21538
         * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-module-identifiers-
         * 可预测的长效缓存（扩展）：https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
         */
        new NamedChunksPlugin(),
        // new NamedModulesPlugin(),
        new HashedModuleIdsPlugin(),
        new NamedDllEntryModuleIdsPlugin(),

        // /**
        //  * 忽略国际化部分以减小 moment.js 体积，参考：https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        //  */
        // new IgnorePlugin(/^\.\/locale$/, /moment$/),

        /**
         *  环境变量设置为生产模式以减小 react 或其他第三方插件体积，参考：https://reactjs.org/docs/add-react-to-an-existing-app.html#development-and-production-versions
         */
        new DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),

        /**
         * 此处与 Tree Shaking 无关，单纯对第三方模块做压缩处理
         */
        new ParallelUglifyPlugin({
          cacheDir: __uglify__cache__directory,
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
        })
      ]
    }
  })

  // /**
  //  * Webpack Dll 功能：预编译第三方模块以提升业务代码打包速度
  //  * 民间资料：https://segmentfault.com/a/1190000005969643
  //  */
  // ...Object.keys(dll).map(
  //   dll =>
  //     new DllReferencePlugin({
  //       context: path.resolve(__dirname, '../../__dll'),
  //       manifest: require(`../../__dll/manifest/${dll}.json`)
  //     })
  // ),
]
