const HappyPack = require('happypack')
const happyThreadPool = require('./__threadPool')

module.exports = {
  module: {
    rules: [
      // --------------------------- 处理 Lib 样式文件 -----------------------------------
      {
        test: /.*node_modules.*antd-mobile.*\.less$/,
        use: [
          'style-loader?sourceMap',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap',
          {
            loader: 'less-loader?sourceMap',
            options: {
              javascriptEnabled: true,
              modifyVars: require('../../utils/antd-mobile/theme')
            }
          }
        ]
      },
      {
        test: /.*node_modules.*\.css$/,
        exclude: /\.m\.css/,
        use: ['style-loader?sourceMap', 'css-loader?sourceMap']
      },
      // --------------------------- 处理 Lib 样式文件 -----------------------------------
      {
        test: /.*src.*\.css$/,
        exclude: /\.m\.css$/,
        use: 'happypack/loader?id=css'
      },
      {
        test: /.*src.*\.(scss|sass)$/,
        exclude: /\.m\.(scss|sass)$/,
        use: 'happypack/loader?id=sass'
      },
      {
        test: /.*src.*\.m\.css$/,
        use: 'happypack/loader?id=cssm'
      },
      {
        test: /.*src.*\.m\.(scss|sass)$/,
        use: 'happypack/loader?id=sassm'
      }
    ]
  },
  vue: {
    loaders: {
      scss: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap&modules&localIdentName=[local]_[hash:base64:4]',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ],
      sass: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap&modules&localIdentName=[local]_[hash:base64:4]',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ],
      css: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap&modules&localIdentName=[local]_[hash:base64:4]',
        'postcss-loader?sourceMap'
      ],
      postcss: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap&modules&localIdentName=[local]_[hash:base64:4]',
        'postcss-loader?sourceMap'
      ]
    }
  },
  plugins: [
    new HappyPack({
      id: 'css',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap'
      ]
    }),
    new HappyPack({
      id: 'sass',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    }),
    new HappyPack({
      id: 'cssm',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap&modules&localIdentName=[local]_[hash:base64:4]',
        'postcss-loader?sourceMap'
      ]
    }),
    new HappyPack({
      id: 'sassm',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap&modules&localIdentName=[local]_[hash:base64:4]',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    })
  ]
}
