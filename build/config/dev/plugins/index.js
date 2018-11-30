const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const {
  NamedChunksPlugin,
  HashedModuleIdsPlugin,
  NamedModulesPlugin,
  // DefinePlugin,
  HotModuleReplacementPlugin
} = require('webpack')
// const { VueLoaderPlugin } = require('vue-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
    ...require('../loaders').plugins,
    ...require('../style').plugins,
    // ...require('./dll'),
    // ...require('./code-splitting'),
    ...require('./html'),

    new NamedChunksPlugin(),
    new NamedModulesPlugin(),
    // new HashedModuleIdsPlugin(),
    // new VueLoaderPlugin(),

    // new DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('development'),
    //     TEST: true
    //   }
    // })
  ]
}
