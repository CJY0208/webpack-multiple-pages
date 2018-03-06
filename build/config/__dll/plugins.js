const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const {
  optimize: { CommonsChunkPlugin, UglifyJsPlugin } = {},
  // DllPlugin,
  DefinePlugin,
  IgnorePlugin,
  NamedChunksPlugin,
  NamedModulesPlugin,
  HashedModuleIdsPlugin
} = require('webpack')

module.exports = {
  plugins: [
    new NamedChunksPlugin(),
    new NamedModulesPlugin(),

    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('develop')
      }
    })
  ]
}
