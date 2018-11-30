const HappyPack = require('happypack')
const marked = require('marked')

const happyThreadPool = require('../__threadPool')
const styleConfig = require('../style')

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
      // {
      //   test: /\.vue$/,
      //   use: [
      //     {
      //       loader: 'vue-loader',
      //       options: {
      //         ...styleConfig.vue,
      //         js: 'happypack/loader?id=vue'
      //       }
      //     },
      //     'eslint-loader'
      //   ]
      // },
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
    // new HappyPack({
    //   id: 'vue',
    //   verbose: false,
    //   threadPool: happyThreadPool,
    //   loaders: ['babel-loader?cacheDirectory']
    // })
  ]
}
