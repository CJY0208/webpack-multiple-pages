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
          {
            loader: 'postcss-loader?sourceMap',
            options: {
              config: {
                ctx: {
                  // usePostcssPxToViewport: true
                }
              }
            }
          },
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
        use: ['style-loader?sourceMap', 'css-loader?sourceMap']
      },
      // --------------------------- 处理 Lib 样式文件 -----------------------------------
      {
        test: /.*src.*\.css$/,
        use: 'happypack/loader?id=css'
      },
      {
        test: /.*src.*\.(scss|sass)$/,
        use: 'happypack/loader?id=sass'
      }
    ]
  },
  vue: {
    loaders: {
      scss: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ],
      sass: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ],
      css: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap'
      ],
      postcss: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap'
      ]
    }
  },
  plugins: [
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap'
      ]
    }),
    new HappyPack({
      id: 'sass',
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    })
  ]
}
