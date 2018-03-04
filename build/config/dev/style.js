const ExtractTextPlugin = require('extract-text-webpack-plugin')

const emitFilename = '[name].[hash].css'
const [extractLibStyle, extractVendorStyle, extractProjectStyle] = [
  new ExtractTextPlugin(`lib/${emitFilename}`),
  new ExtractTextPlugin(`vendor/${emitFilename}`),
  new ExtractTextPlugin(`project/${emitFilename}`)
]

const getExtractLoader = (
  extracter,
  type = 'css',
  fallback = 'style-loader?sourceMap'
) =>
  // extracter.extract({
  //   fallback,
  //   publicPath: '../',
  //   use:
  [
    fallback,
    'css-loader?minimize&sourceMap',
    'postcss-loader?sourceMap',
    ...{
      sass: ['sass-loader?sourceMap'],
      css: []
    }[type]
  ]
// })

module.exports = {
  plugins: [
    // extractLibStyle, extractVendorStyle, extractProjectStyle
  ],
  module: {
    rules: [
      // --------------------------- 处理 Lib 样式文件 -----------------------------------
      {
        test: /.*node_modules.*antd-mobile.*\.less$/,
        use: [
          'style-loader?sourceMap',
          'css-loader?minimize&sourceMap',
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
        test: /.*node_modules.*\.less$/,
        exclude: [/antd-mobile/],
        use: [
          'style-loader?sourceMap',
          'css-loader?minimize&sourceMap',
          'less-loader?javascriptEnabled&sourceMap'
        ]
      },
      {
        test: /.*node_modules.*\.css$/,
        use: ['style-loader?sourceMap', 'css-loader?minimize&sourceMap']
      },
      // --------------------------- 处理 Lib 样式文件 -----------------------------------

      // --------------------------- 处理 Vendor 样式文件 --------------------------------
      {
        test: /.*src.*vendor.*\.css$/,
        use: getExtractLoader(extractVendorStyle)
      },
      {
        test: /.*src.*vendor.*\.(scss|sass)$/,
        use: getExtractLoader(extractVendorStyle, 'sass')
      },
      // --------------------------- 处理 Vendor 样式文件 --------------------------------

      // --------------------------- 处理 Project 样式文件 -------------------------------
      {
        test: /.*src.*project.*\.css$/,
        use: getExtractLoader(extractProjectStyle)
      },
      {
        test: /.*src.*project.*\.(scss|sass)$/,
        use: getExtractLoader(extractProjectStyle, 'sass')
      },
      // --------------------------- 处理 Project 样式文件 --------------------------------

      // --------------------------- 处理 Prefix 样式文件 ---------------------------------
      {
        test: /.*src.*__prefix__.*\.css$/,
        use: getExtractLoader(extractProjectStyle)
      },
      {
        test: /.*src.*__prefix__.*\.(scss|sass)$/,
        use: getExtractLoader(extractProjectStyle, 'sass')
      }
      // --------------------------- 处理 Prefix 样式文件 ---------------------------------
    ]
  },
  vue: {
    loaders: {
      scss: getExtractLoader(
        extractProjectStyle,
        'sass',
        'vue-style-loader?sourceMap'
      ),
      sass: getExtractLoader(
        extractProjectStyle,
        'sass',
        'vue-style-loader?sourceMap'
      ),
      css: getExtractLoader(
        extractProjectStyle,
        'css',
        'vue-style-loader?sourceMap'
      ),
      postcss: getExtractLoader(
        extractProjectStyle,
        'css',
        'vue-style-loader?sourceMap'
      )
    }
  }
}
