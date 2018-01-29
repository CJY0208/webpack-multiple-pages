const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HasOutput = require('webpack-plugin-hash-output')
const webpack = require('webpack')
const {
  optimize: { CommonsChunkPlugin, UglifyJsPlugin } = {},
  DllReferencePlugin,
  NamedChunksPlugin,
  HashedModuleIdsPlugin
} = webpack

const common_entries = require('./webpack/common_entries')

module.exports = {
  // watch: true,
  entry: Object.assign(
    glob.sync(path.resolve(__dirname, './src/module/**/* #/')).reduce(
      (entries, filepath) =>
        Object.assign(entries, {
          [filepath
            .split('/')
            .pop()
            .replace(' #', '')]: filepath
        }),
      {}
    ),
    common_entries
  ),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './asset/',
    filename: '[name].[chunkhash:6].js',
    /**
     * chunkFilename 只用来打包 require.ensure 或 import() 方法中引入的异步模块，若无异步模块则不会生成任何 chunk 块文件
     * 民间资料：https://www.cnblogs.com/toward-the-sun/p/6147324.html?utm_source=itdadao&utm_medium=referral
     */
    chunkFilename: 'chunk/[name].[chunkhash:6].js'
  },
  devtool: false, //'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    alias: Object.entries(common_entries).reduce(
      (alias, [key, value]) =>
        typeof value !== 'string'
          ? alias
          : Object.assign(alias, {
              [`@${key}`]: value
            }),
      {}
    )
  },
  plugins: [
    // new HtmlWebpackPlugin(),

    /**
     * NamedChunksPlugin 和 HashedModuleIdsPlugin 保证模块 hash 不受编译顺序的影响
     * 民间资料：https://www.imooc.com/article/details/id/21538
     * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-module-identifiers-
     * 可预测的长效缓存（扩展）：https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
     */
    new NamedChunksPlugin(),
    new HashedModuleIdsPlugin(),

    /**
     * 两个 CommonsChunkPlugin 的作用是分离 Webpack runtime & manifest
     * 民间资料：https://segmentfault.com/a/1190000010317802
     * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-extracting-boilerplate-
     */
    new CommonsChunkPlugin({
      names: Object.keys(common_entries),
      filename: '[name].[chunkhash:6].js',
      minChunks: Infinity
    }),
    new CommonsChunkPlugin({
      name: 'runtime',
      filename: 'runtime.[chunkhash:6].js'
    }),

    /**
     * Webpack Dll 功能：预编译第三方模块以提升业务代码打包速度
     * 民间资料：https://segmentfault.com/a/1190000005969643
     */
    ...Object.keys(require('./webpack/dll/entries')).map(
      dll =>
        new DllReferencePlugin({
          context: path.resolve(__dirname, './webpack/dll'),
          manifest: require(`./webpack/dll/manifest/${dll}.json`)
        })
    ),

    /**
     * Webpack 任务前/后，使用此插件清除旧的编译文件
     */
    new CleanWebpackPlugin(['dist/*.js', 'dist/*.map', 'dist/chunk'], {
      beforeEmit: true // 在 Webpack 工作完成、输出文件前夕执行清除操作
    }),

    /**
     * 关于 Tree Shaking，Webpack 只标记未使用的依赖而不清除，需通过 UglifyJsPlugin 达到清除未使用代码的效果
     */
    new UglifyJsPlugin({
      compress: {
        warnings: false
      },
      beautify: true,
      output: {
        comments: false
      },
      sourceMap: false
    })

    // new HasOutput({
    //   manifestFiles: [
    //     'common',
    //     'common2',
    //     'runtime'
    //   ]
    // })
  ]
}
