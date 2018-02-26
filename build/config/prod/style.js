const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLibStyle = new ExtractTextPlugin('lib/[name].[chunkhash:6].css')
const extractVendorStyle = new ExtractTextPlugin(
  'vendor/[name].[chunkhash:6].css'
)
const extractProjectStyle = new ExtractTextPlugin(
  'project/[name].[chunkhash:6].css'
)

const publicPath = '../'

const getSassExtracter = (extracter, fallback = 'style-loader') =>
  extracter.extract({
    fallback,
    publicPath,
    use: ['css-loader?minimize', 'postcss-loader', 'sass-loader']
  })
const getLessExtracter = (extracter, fallback = 'style-loader') =>
  extracter.extract({
    fallback,
    publicPath,
    use: ['css-loader?minimize', 'postcss-loader', 'less-loader']
  })
const getCssExtracter = (extracter, fallback = 'style-loader') =>
  extracter.extract({
    fallback,
    publicPath,
    use: ['css-loader?minimize', 'postcss-loader']
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
        use: getCssExtracter(extractVendorStyle)
      },
      {
        test: /.*src.*vendor.*\.less$/,
        use: getLessExtracter(extractVendorStyle)
      },
      {
        test: /.*src.*vendor.*\.(scss|sass)$/,
        use: getSassExtracter(extractVendorStyle)
      },
      // --------------------------- 处理 Vendor 样式文件 --------------------------------
      // --------------------------- 处理 Project 样式文件 -------------------------------
      {
        test: /.*src.*project.*\.css$/,
        use: getCssExtracter(extractProjectStyle)
      },
      {
        test: /.*src.*project.*\.less$/,
        use: getLessExtracter(extractProjectStyle)
      },
      {
        test: /.*src.*project.*\.(scss|sass)$/,
        use: getSassExtracter(extractProjectStyle)
      }
      // --------------------------- 处理 Project 样式文件 --------------------------------
    ]
  },
  vue: {
    loaders: {
      scss: getSassExtracter(extractProjectStyle, 'vue-style-loader'),
      sass: getSassExtracter(extractProjectStyle, 'vue-style-loader'),
      less: getLessExtracter(extractProjectStyle, 'vue-style-loader'),
      postcss: getCssExtracter(extractProjectStyle, 'vue-style-loader'),
      css: getCssExtracter(extractProjectStyle, 'vue-style-loader')
    }
  }
}
