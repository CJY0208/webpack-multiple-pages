const path = require('path')
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

    new NamedChunksPlugin(),
    new NamedModulesPlugin(),

    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('develop')
      }
    })
  ]
}
