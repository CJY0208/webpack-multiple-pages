const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSASS = new ExtractTextPlugin('style/[name].[chunkhash:6].css')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader?minimize',
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
          'css-loader?minimize',
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
          'css-loader?minimize',
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
