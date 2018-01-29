const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const {
  optimize: { CommonsChunkPlugin, UglifyJsPlugin } = {},
  DllReferencePlugin,
  NamedChunksPlugin,
  HashedModuleIdsPlugin
} = webpack

module.exports = {
  // watch: true,
  entry: {
    pageA: path.resolve(__dirname, './src/module', './pageA'),
    pageB: path.resolve(__dirname, './src/module', './pageB'),
    common: path.resolve(__dirname, './src/common'),
    common2: path.resolve(__dirname, './src/common/index2')
  },
  output: {
    path: path.resolve(__dirname, './dist'),

    publicPath: './asset/',
    filename: '[name].[chunkhash:6].js'
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
  plugins: [
    // new HtmlWebpackPlugin(),
    ...Object.keys(require('./webpack/dll/entry')).map(
      dll =>
        new DllReferencePlugin({
          context: path.resolve(__dirname, './webpack/dll'),
          manifest: require(`./webpack/dll/manifest/${dll}.json`)
        })
    ),
    new NamedChunksPlugin(),
    new HashedModuleIdsPlugin(),
    new CommonsChunkPlugin({
      name: [
        // 'vendor',
        'common',
        'common2'
      ],
      // filename: '[name].[chunkhash:6].js',
      minChunks: Infinity
    }),
    new CommonsChunkPlugin({
      name: 'runtime'
      // filename: 'runtime.[chunkhash:6].js'
    }),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      },
      beautify: true,
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new CleanWebpackPlugin(['dist/*.js', 'dist/*.map'], {
      beforeEmit: true
    })
  ]
}
