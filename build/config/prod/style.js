const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSASS = new ExtractTextPlugin('style/[name].[chunkhash:6].css')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: extractSASS.extract([
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ])
      }
    ]
  },
  plugins: [extractSASS],
  vue: {
    loaders: {
      scss: extractSASS.extract({
        fallback: 'vue-style-loader',
        use: [
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  useSCSS: true
                }
              }
            }
          }
        ]
      })
    }
  }
}
