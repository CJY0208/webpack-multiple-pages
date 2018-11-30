const webpackMerge = require('webpack-merge')
const path = require('path')

const { dll, lib, __dev } = require('../../entries')
const pluginsConfig = require('./plugins')

// console.log(dll)

module.exports = webpackMerge(pluginsConfig, {
  mode: 'development',
  entry: {
    __dll: [
      ...new Set(
        Object.values({
          ...dll,
          // ...lib,
          // ...__dev
        }).reduce((entry, val) => [...entry, ...val], [])
      )
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/wmp/dev'),
    filename: '[name].js',
    library: '[name]_[chunkhash]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize']
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader?minimize',
      //     'less-loader?javascriptEnabled'
      //   ]
      // },
      {
        test: /.*node_modules.*antd-mobile.*\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: require('../../utils/antd-mobile/theme')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss', '.sass', '.less']
  },
  stats: {
    assets: true,
    chunks: false,
    modules: false,
    children: false,
    errors: true,
    errorDetails: true,
    warnings: true
  }
})
