// const HappyPack = require('happypack')
// const happyThreadPool = HappyPack.ThreadPool({ size: 2 })
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
        use: ['babel-loader?cacheDirectory', 'eslint-loader'] // 'happypack/loader?id=js'
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: Object.assign(styleConfig.vue, {
              js: ['babel-loader?cacheDirectory'] // 'happypack/loader?id=js'
            })
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
    // new HappyPack({
    //   id: 'js',
    //   // threads: 4,
    //   threadPool: happyThreadPool,
    //   loaders: ['babel-loader?cacheDirectory', 'eslint-loader']
    // }),
    // new HappyPack({
    //   id: 'vue',
    //   // threads: 4,
    //   threadPool: happyThreadPool,
    //   loaders: ['babel-loader?cacheDirectory']
    // })
  ]
}
