const ExtractTextPlugin = require('extract-text-webpack-plugin')

const emitFilename = '[name].[chunkhash:6].css'
const [extractLibStyle, extractVendorStyle, extractProjectStyle] = [
  new ExtractTextPlugin(`lib/${emitFilename}`),
  new ExtractTextPlugin(`vendor/${emitFilename}`),
  new ExtractTextPlugin(`project/${emitFilename}`)
]

const getExtractLoader = (
  extracter,
  { type = 'css', fallback = 'style-loader', useCssModule = false } = {}
) =>
  extracter.extract({
    fallback,
    publicPath: '../',
    use: [
      `css-loader?minimize${
        useCssModule ? '&modules&localIdentName=[local]_[hash:base64:4]' : ''
      }`,
      'postcss-loader',
      ...{
        sass: ['sass-loader'],
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
        test: /.*node_modules.*antd-mobile.*\.less$/,
        use: extractLibStyle.extract([
          'css-loader?minimize',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: require('../../utils/antd-mobile/theme')
            }
          }
        ])
      },
      {
        test: /.*node_modules.*\.less$/,
        exclude: [/antd-mobile/],
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
        exclude: /\.m\.css$/,
        use: getExtractLoader(extractVendorStyle)
      },
      {
        test: /.*src.*vendor.*\.(scss|sass)$/,
        exclude: /\.m\.(scss|sass)$/,
        use: getExtractLoader(extractVendorStyle, { type: 'sass' })
      },
      {
        test: /.*src.*vendor.*\.m\.css$/,
        use: getExtractLoader(extractVendorStyle, { useCssModule: true })
      },
      {
        test: /.*src.*vendor.*\.m\.(scss|sass)$/,
        use: getExtractLoader(extractVendorStyle, {
          type: 'sass',
          useCssModule: true
        })
      },
      // --------------------------- 处理 Vendor 样式文件 --------------------------------

      // --------------------------- 处理 Project / Prefix 样式文件 ----------------------
      {
        test: /.*src.*(project|__prefix__).*\.css$/,
        exclude: /\.m\.css$/,
        use: getExtractLoader(extractProjectStyle)
      },
      {
        test: /.*src.*(project|__prefix__).*\.(scss|sass)$/,
        exclude: /\.m\.(scss|sass)$/,
        use: getExtractLoader(extractProjectStyle, { type: 'sass' })
      },
      {
        test: /.*src.*(project|__prefix__).*\.m\.css$/,
        use: getExtractLoader(extractProjectStyle, { useCssModule: true })
      },
      {
        test: /.*src.*(project|__prefix__).*\.m\.(scss|sass)$/,
        use: getExtractLoader(extractProjectStyle, {
          type: 'sass',
          useCssModule: true
        })
      }
      // --------------------------- 处理 Project / Prefix 样式文件 -----------------------
    ]
  },
  vue: {
    loaders: {
      scss: getExtractLoader(extractProjectStyle, {
        type: 'sass',
        fallback: 'vue-style-loader'
      }),
      sass: getExtractLoader(extractProjectStyle, {
        type: 'sass',
        fallback: 'vue-style-loader'
      }),
      css: getExtractLoader(extractProjectStyle, {
        fallback: 'vue-style-loader'
      }),
      postcss: getExtractLoader(extractProjectStyle, {
        fallback: 'vue-style-loader'
      })
    }
  }
}
