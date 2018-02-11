const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HasOutput = require('webpack-plugin-hash-output')
const AutoDllPlugin = require('./build/plugins/autodll-webpack-plugin')
const webpack = require('webpack')
const {
  optimize: { CommonsChunkPlugin, UglifyJsPlugin } = {},
  DllReferencePlugin,
  NamedChunksPlugin,
  HashedModuleIdsPlugin,
  NamedModulesPlugin,
  DefinePlugin,
  IgnorePlugin
} = webpack

const HtmlWebpackAutoDependenciesPlugin = require('./build/plugins/HtmlWebpackAutoDependenciesPlugin')

const entries = require('./build/entries')
const {
  project: project_entries,
  vendor: vendor_entries,
  customizedVendor: customized_vendor_entries,
  dll: dll_entries
} = entries
const project_entry_names = Object.keys(project_entries)
const customized_vendor_entry_names = Object.keys(customized_vendor_entries)
const vendor_entry_names = Object.keys(vendor_entries)
const dll_entry_names = Object.keys(dll_entries)

const queryDependencies = (
  { resource = '', sourceRequest = '', reasons = [] } = {},
  vendor
) =>
  ((new RegExp(vendor).test(resource) && /node_modules/.test(resource)) ||
    reasons.some(({ module }) => queryDependencies(module, vendor))) &&
  !/dll-reference/.test(sourceRequest)

module.exports = {
  entry: project_entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'asset/[name].[chunkhash:6].js',
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
      'lodash/fp': path.resolve(__dirname, './build/lib/lodash/fp'),
      ...Object.entries(customized_vendor_entries).reduce(
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
  plugins: [
    /**
     * NamedChunksPlugin 和 HashedModuleIdsPlugin 保证模块 hash 不受编译顺序的影响
     * 民间资料：https://www.imooc.com/article/details/id/21538
     * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-module-identifiers-
     * 可预测的长效缓存（扩展）：https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
     */
    new NamedChunksPlugin(),
    // new HashedModuleIdsPlugin(),
    new NamedModulesPlugin(),

    ...Object.entries(customized_vendor_entries).map(
      ([key, value]) =>
        new CommonsChunkPlugin({
          name: key,
          filename: 'customizedVendor/[name].[chunkhash:6].js',
          chunks: project_entry_names,
          minChunks: ({ resource = '' }) =>
            /customizedVendor/.test(resource) &&
            new RegExp(`${key} #`).test(resource)
        })
    ),
    new CommonsChunkPlugin({
      name: '__customizedVendorShare',
      filename: 'customizedVendor/[name].[chunkhash:6].js',
      chunks: [...project_entry_names, ...customized_vendor_entry_names],
      minChunks: ({ resource = '' }, count) =>
        count >= 2 && /customizedVendor/.test(resource)
    }),

    ...Object.entries(vendor_entries).map(
      ([key, value]) =>
        new CommonsChunkPlugin({
          name: key,
          filename: 'vendor/[name].[chunkhash:6].js',
          chunks: [...project_entry_names, ...customized_vendor_entry_names],
          minChunks(module, count) {
            const {
              isDependentByMultipleChunk: __isDependentByMultipleChunk
            } = module

            /**
             * 是否被当前 Chunk 引用
             */
            let isDependentByCurrentChunk

            /**
             * 是否被多个 Chunk 引用
             */
            let isDependentByMultipleChunk

            switch (__isDependentByMultipleChunk) {
              case true:
              case false:
                isDependentByCurrentChunk = value.some(vendor =>
                  queryDependencies(module, vendor)
                )
                isDependentByMultipleChunk = __isDependentByMultipleChunk
                break
              default:
                isDependentByCurrentChunk = false
                isDependentByMultipleChunk =
                  Object.entries(vendor_entries)
                    .map(([__key, value]) => {
                      const __isDependentByCurrentChunk = value.some(vendor =>
                        queryDependencies(module, vendor)
                      )
                      if (__key === key)
                        isDependentByCurrentChunk = __isDependentByCurrentChunk
                      return __isDependentByCurrentChunk
                    })
                    .filter(res => res).length >= 2

                // 缓存 “是否被多个 Chunk 引用” 统计结果
                Object.assign(module, {
                  isDependentByMultipleChunk
                })
            }

            return !isDependentByMultipleChunk && isDependentByCurrentChunk
          }
        })
    ),
    new CommonsChunkPlugin({
      name: '__vendorShare',
      filename: 'vendor/[name].[chunkhash:6].js',
      chunks: [...project_entry_names, ...vendor_entry_names],
      minChunks: ({ resource = '' }, count) =>
        count >= 2 && /node_modules/.test(resource)
    }),

    /**
     * 这个 CommonsChunkPlugin 的作用是分离 Webpack runtime & manifest
     * 民间资料：https://segmentfault.com/a/1190000010317802
     * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-extracting-boilerplate-
     */
    new CommonsChunkPlugin({
      name: '__runtime',
      filename: '__runtime.[chunkhash:6].js'
    }),

    ...project_entry_names.map(
      project =>
        new HtmlWebpackPlugin({
          inject: false,
          filename: `${project}.html`,
          template: 'template.html',
          chunks: [
            '__runtime',
            '__vendorShare',
            '__customizedVendorShare',
            project
          ],
          chunksSortMode: 'manual',
          /**
           * html-minifier DOC: https://github.com/kangax/html-minifier
           */
          minify: {
            minifyCSS: true,
            minifyJS: true
            // collapseWhitespace: true
          }
        })
    ),

    new HtmlWebpackAutoDependenciesPlugin({
      entries,
      dllPath: 'dll/'
    }),

    // /**
    //  * Webpack Dll 功能：预编译第三方模块以提升业务代码打包速度
    //  * 民间资料：https://segmentfault.com/a/1190000005969643
    //  */
    // ...Object.keys(dll_entries).map(
    //   dll =>
    //     new DllReferencePlugin({
    //       context: path.resolve(__dirname, './webpack/dll'),
    //       manifest: require(`./webpack/dll/manifest/${dll}.json`)
    //       // scope: dll
    //     })
    // ),

    new AutoDllPlugin({
      // inject: true,
      filename: '[name].[chunkhash].js', // No output file in ./dll
      path: 'dll',
      entry: dll_entries,
      plugins: require('./build/dll/plugins').plugins
    }),

    // /**
    //  * 忽略国际化部分以减小 moment.js 体积，参考：https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    //  */
    // new IgnorePlugin(/^\.\/locale$/, /moment$/),

    // /**
    //  *  环境变量设置为生产模式以减小 react 或其他第三方插件体积，参考：https://reactjs.org/docs/add-react-to-an-existing-app.html#development-and-production-versions
    //  */
    // new DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),

    /**
     * Webpack 任务前/后，使用此插件清除旧的编译文件
     */
    new CleanWebpackPlugin(['dist'], {
      verbose: false, // 不输出 log
      beforeEmit: true // 在 Webpack 工作完成、输出文件前夕执行清除操作
    }),

    /**
     * 关于 Tree Shaking，Webpack 只标记未使用的依赖而不清除，需通过 UglifyJsPlugin 达到清除未使用代码的效果
     */
    new UglifyJsPlugin({
      compress: {
        warnings: false
      },
      beautify: false,
      output: {
        comments: false
      },
      sourceMap: false
    })
  ],
  watch: false,
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
