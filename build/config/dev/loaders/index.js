const HappyPack = require('happypack')
const happyThreadPool = require('../__threadPool')
const styleConfig = require('../style')

module.exports = {
  module: {
    rules: [
      ...styleConfig.module.rules,
      {
        test: /\.js$/,
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
              js: 'happypack/loader?id=vue'
            }
          },
          'eslint-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/img/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/media/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/fonts/[name].[hash:6].[ext]'
        }
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
