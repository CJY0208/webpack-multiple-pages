const path = require('path')
const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const webpack = require('webpack')
const {
  optimize: {
    CommonsChunkPlugin,
    UglifyJsPlugin
  } = {},
  DllReferencePlugin
} = webpack

module.exports = {
  entry: {
    pageA: path.resolve(__dirname, `./src/module`, `./pageA/index.js`),
    pageB: path.resolve(__dirname, `./src/module`, `./pageB/index.js`)
  },
  output: {
    path: path.resolve(__dirname, `./dist`),
    publicPath: `./asset/`,
    filename: `[name].[chunkhash:8].js`
  },
  devtool: `cheap-module-source-map`,
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          `babel-loader`
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin(),
    ...Object.keys(require(`./webpack/dll/entry`)).map(dll => new DllReferencePlugin({
      context: path.resolve(__dirname, `./webpack/dll`),
      manifest: require(`./webpack/dll/manifest/${dll}.json`)
    })),
    ...[`common`, `manifest`].map(name => new CommonsChunkPlugin({ name })),
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
  ]
}
