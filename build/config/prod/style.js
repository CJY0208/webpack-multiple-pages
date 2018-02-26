const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLibStyle = new ExtractTextPlugin('lib/[name].[chunkhash:6].css')
const extractVendorStyle = new ExtractTextPlugin(
  'vendor/[name].[chunkhash:6].css'
)
const extractProjectStyle = new ExtractTextPlugin(
  'project/[name].[chunkhash:6].css'
)

const vueSassConfig = extractProjectStyle.extract({
  fallback: 'vue-style-loader',
  use: ['css-loader?minimize', 'postcss-loader', 'sass-loader']
})
const vueCssConfig = extractProjectStyle.extract({
  fallback: 'vue-style-loader',
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
        use: extractVendorStyle.extract([
          'css-loader?minimize',
          'postcss-loader'
        ])
      },
      {
        test: /.*src.*vendor.*\.less$/,
        use: extractVendorStyle.extract([
          'css-loader?minimize',
          'less-loader',
          'postcss-loader'
        ])
      },
      {
        test: /.*src.*vendor.*\.(scss|sass)$/,
        use: extractVendorStyle.extract([
          'css-loader?minimize',
          'sass-loader',
          'postcss-loader'
        ])
      },
      // --------------------------- 处理 Vendor 样式文件 --------------------------------
      // --------------------------- 处理 Project 样式文件 -------------------------------
      {
        test: /.*src.*project.*\.css$/,
        use: extractProjectStyle.extract([
          'css-loader?minimize',
          'postcss-loader'
        ])
      },
      {
        test: /.*src.*project.*\.less$/,
        use: extractProjectStyle.extract([
          'css-loader?minimize',
          'postcss-loader',
          'less-loader'
        ])
      },
      {
        test: /.*src.*project.*\.(scss|sass)$/,
        use: extractProjectStyle.extract([
          'css-loader?minimize',
          'postcss-loader',
          'sass-loader'
        ])
      }
      // --------------------------- 处理 Project 样式文件 --------------------------------
    ]
  },
  vue: {
    loaders: {
      scss: vueSassConfig,
      sass: vueSassConfig,
      less: extractProjectStyle.extract({
        fallback: 'vue-style-loader',
        use: ['css-loader?minimize', 'postcss-loader', 'less-loader']
      }),
      postcss: vueCssConfig,
      css: vueCssConfig
    }
  }
}
