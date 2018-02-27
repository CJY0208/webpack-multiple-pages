const ExtractTextPlugin = require('extract-text-webpack-plugin')

const emitFilename = '[name].[chunkhash:6].css'
const [extractLibStyle, extractVendorStyle, extractProjectStyle] = [
  new ExtractTextPlugin(`lib/${emitFilename}`),
  new ExtractTextPlugin(`vendor/${emitFilename}`),
  new ExtractTextPlugin(`project/${emitFilename}`)
]

const getExtractLoader = (extracter, type = 'css', fallback = 'style-loader') =>
  extracter.extract({
    fallback,
    publicPath: '../',
    use: [
      'css-loader?minimize',
      'postcss-loader',
      ...{
        sass: ['sass-loader'],
        less: ['less-loader'],
        css: []
      }[type]
    ]
  })

module.exports = {
  plugins: [extractLibStyle, extractVendorStyle, extractProjectStyle],
  module: {
    rules: [
      // --------------------------- 处理 Lib 样式文件 -----------------------------------
      {
        test: /.*node_modules.*\.less$/,
        use: extractLibStyle.extract([
          'css-loader?minimize',
          'less-loader?javascriptEnabled'
        ])
      },
      {
        test: /.*node_modules.*\.css$/,
        use: extractLibStyle.extract(['css-loader?minimize'])
      },
      // --------------------------- 处理 Lib 样式文件 -----------------------------------
      // --------------------------- 处理 Vendor 样式文件 --------------------------------
      {
        test: /.*src.*vendor.*\.css$/,
        use: getExtractLoader(extractVendorStyle)
      },
      {
        test: /.*src.*vendor.*\.less$/,
        use: getExtractLoader(extractVendorStyle, 'less')
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
        test: /.*src.*project.*\.less$/,
        use: getExtractLoader(extractProjectStyle, 'less')
      },
      {
        test: /.*src.*project.*\.(scss|sass)$/,
        use: getExtractLoader(extractProjectStyle, 'sass')
      }
      // --------------------------- 处理 Project 样式文件 --------------------------------
    ]
  },
  vue: {
    loaders: {
      scss: getExtractLoader(extractProjectStyle, 'sass', 'vue-style-loader'),
      sass: getExtractLoader(extractProjectStyle, 'sass', 'vue-style-loader'),
      less: getExtractLoader(extractProjectStyle, 'less', 'vue-style-loader'),
      css: getExtractLoader(extractProjectStyle, 'css', 'vue-style-loader'),
      postcss: getExtractLoader(extractProjectStyle, 'css', 'vue-style-loader')
    }
  }
}
