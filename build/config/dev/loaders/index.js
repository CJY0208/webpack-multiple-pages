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
