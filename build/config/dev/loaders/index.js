const path = require('path')
const HappyPack = require('happypack')
const happyThreadPool = require('../__threadPool')
const styleConfig = require('../style')
const marked = require('marked')
const markdownRenderer = new marked.Renderer()

module.exports = {
  module: {
    rules: [
      ...styleConfig.module.rules,
      ...require('./assets').module.rules,
      {
        // 猜测 linux 路径分隔符不一致导致 entry-loader 不生效，故此处尝试兼容解决
        test: [
          /src\\project\\.*@[^((?!(\\)).)*$]*\\index\.js$/,
          /src\\\\project\\\\.*@[^((?!(\\\\)).)*$]*\\\\index\.js$/,
          /src\/\/project\/\/.*@[^((?!(\/\/)).)*$]*\/\/index\.js$/,
          /src\/project\/.*@[^((?!(\/)).)*$]*\/index\.js$/
        ],
        // include: Object.values(project).map(path => `${path}.*index.js`),
        // exclude: /node_modules/,
        enforce: 'post',
        loaders: [
          {
            loader: path.resolve(
              __dirname,
              '../../../utils/project-entry-loader.js'
            )
          }
        ]
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js'
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              ...styleConfig.vue,
              js: 'happypack/loader?id=vue',
              // loaders: {
              //   // you need to specify `i18n` loaders key with `vue-i18n-loader` (https://github.com/kazupon/vue-i18n-loader)
              // i18n: '@kazupon/vue-i18n-loader'
              // }
              loaders: {
                i18n: '@kazupon/vue-i18n-loader'
              }
            }
          },
          'eslint-loader'
        ]
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          {
            loader: 'markdown-loader',
            options: {
              pedantic: true,
              renderer: markdownRenderer
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory', 'eslint-loader']
    }),
    new HappyPack({
      id: 'vue',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    })
  ]
}
