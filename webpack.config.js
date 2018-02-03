const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HasOutput = require('webpack-plugin-hash-output')
const AutoDllPlugin = require('./webpack/plugins/autodll-webpack-plugin')
const webpack = require('webpack')
const {
  optimize: { CommonsChunkPlugin, UglifyJsPlugin } = {},
  DllReferencePlugin,
  NamedChunksPlugin,
  HashedModuleIdsPlugin
} = webpack

const HtmlWebpackAutoDependenciesPlugin = require('./webpack/plugins/HtmlWebpackAutoDependenciesPlugin')

const entries = require('./webpack/entries')
const {
  project: project_entries,
  common: common_entries,
  dll: dll_entries
} = entries
const common_entry_names = Object.keys(common_entries)
const dll_files = glob
  .sync(path.resolve(__dirname, './dist/lib/*.js'))
  .map(filepath => `${filepath.split('/dist/').pop()}`)

module.exports = {
  // watch: true,
  entry: Object.assign({}, project_entries, common_entries),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'asset/[name].[chunkhash:6].js',
    /**
     * chunkFilename 只用来打包 require.ensure 或 import() 方法中引入的异步模块，若无异步模块则不会生成任何 chunk 块文件
     * 民间资料：https://www.cnblogs.com/toward-the-sun/p/6147324.html?utm_source=itdadao&utm_medium=referral
     */
    chunkFilename: 'async/[name].[chunkhash:6].js'
  },
  devtool: 'source-map',
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
    ...Object.keys(project_entries).map(
      project =>
        new HtmlWebpackPlugin({
          inject: false,
          filename: `${project}.html`,
          template: 'template.html',
          chunks: ['__runtime', project],
          chunksSortMode: 'dependency',
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
      dllPath: 'lib/'
    }),

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
      names: common_entry_names,
      filename: 'common/[name].[chunkhash:6].js',
      minChunks: Infinity
    }),
    new CommonsChunkPlugin({
      name: '__runtime',
      filename: 'common/__runtime.[chunkhash:6].js'
    }),

    /**
     * Webpack Dll 功能：预编译第三方模块以提升业务代码打包速度
     * 民间资料：https://segmentfault.com/a/1190000005969643
     */
    // ...Object.keys(dll_entries).map(
    //   dll =>
    //     new DllReferencePlugin({
    //       context: path.resolve(__dirname, './webpack/dll'),
    //       manifest: require(`./webpack/dll/manifest/${dll}.json`)
    //     })
    // ),

    new AutoDllPlugin({
      // inject: true,
      filename: '[name].[chunkhash].js', // No output file in ./lib
      path: 'lib',
      entry: dll_entries,
      plugins: require('./webpack/dll/plugins').plugins
    }),

    /**
     * Webpack 任务前/后，使用此插件清除旧的编译文件
     */
    new CleanWebpackPlugin(
      [
        // 'dist/*.js', 'dist/*.html', 'dist/asset', 'dist/common', 'dist/chunk'
        'dist',
        '!dist/lib'
      ],
      {
        verbose: false, // 不输出 log
        beforeEmit: true // 在 Webpack 工作完成、输出文件前夕执行清除操作
      }
    ),

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
      sourceMap: true
    })
  ]
}
