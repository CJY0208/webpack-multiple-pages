const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSASS = new ExtractTextPlugin('css/[name].[chunkhash:6].css')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
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
        use: extractSASS.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [extractSASS]
}
