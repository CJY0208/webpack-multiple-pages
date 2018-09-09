const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, '../__dll/dist'),
    compress: true,
    port: 10001,
    hot: true,
    quiet: true,
    host: '0.0.0.0',
    progress: true,
    inline: true,
    publicPath: '/wmp/',
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/wmp\/[^\/]+$/,
          to: ({ match }) => `${match.input}.html`
        }
      ]
    }
  }
}
