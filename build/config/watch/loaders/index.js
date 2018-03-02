const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 4 })
const styleConfig = require('../style')

module.exports = {
  module: {
    rules: [
      ...styleConfig.module.rules,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory', 'eslint-loader'] // 'happypack/loader?id=js'
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              ...styleConfig.vue,
              js: ['babel-loader?cacheDirectory'] // 'happypack/loader?id=js'
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
          name: 'assest/img/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assest/media/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assest/fonts/[name].[hash:6].[ext]'
        }
      }
    ]
  },
  plugins: [
    // new HappyPack({
    //   id: 'js',
    //   threads: 4,
    //   // threadPool: happyThreadPool,
    //   loaders: ['babel-loader', 'eslint-loader']
    // })
  ]
}
