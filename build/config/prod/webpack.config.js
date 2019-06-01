const path = require('path')

// 分析 webpack 打包速度
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const smp = new SpeedMeasurePlugin()
const { project, vendor } = require('./__entries')

const webpackConfig = Object.assign(
  require('./loaders'),
  require('./log-config'),
  require('./plugins'),
  {
    // ...require('./loaders'),
    // ...require('./log-config'),
    // ...require('./plugins'),

    devtool: false, // 'source-map',
    entry: project,
    output: {
      path: path.resolve(__dirname, '../../../dist'),
      filename: 'project/[name].[chunkhash:6].js',
      /**
       * chunkFilename 只用来打包 require.ensure 或 import() 方法中引入的异步模块，若无异步模块则不会生成任何 chunk 块文件
       * 民间资料：https://www.cnblogs.com/toward-the-sun/p/6147324.html?utm_source=itdadao&utm_medium=referral
       */
      chunkFilename: 'async/[name].[chunkhash:6].js'
    },
    resolve: {
      symlinks: false,
      cacheWithContext: false,
      extensions: [
        '.js',
        '.jsx',
        '.vue',
        '.json',
        '.css',
        '.scss',
        '.sass',
        '.less'
      ],
      alias: Object.assign(
        {
          // 'vue': 'vue/dist/vue.esm.js',
          'lodash/fp': path.resolve(__dirname, '../../utils/lodash/fp'),
          __src__: path.resolve(__dirname, '../../../src'),
          __prefix__: path.resolve(__dirname, '../../../src/__prefix__'),
          __assets__: path.resolve(__dirname, '../../../src/assets')
        },
        Object.entries(vendor).reduce(
          (alias, [key, value]) =>
            Object.assign(
              {
                [`@${key}`]: value
              },
              alias
            ),
          {}
        )
      )
    },
    context: path.resolve(__dirname, '../../../')
  }
)

module.exports = smp.wrap(webpackConfig)
