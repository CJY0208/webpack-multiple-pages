const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, '../__dll/dist'),
    compress: true,
    port: 10001,
    hot: true,
    quiet: true,
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
    },
    proxy: {
      '/installment': {
        target: 'https://test.mall.akulaku.com/',
        secure: false,
        cookieDomainRewrite: 'localhost',
        changeOrigin: true
      },
      '/macaron': {
        target: 'https://test.mall.akulaku.com/',
        secure: false,
        cookieDomainRewrite: 'localhost',
        changeOrigin: true
      },
      '/risk': {
        target: 'https://test.mall.akulaku.com/',
        secure: false,
        cookieDomainRewrite: 'localhost',
        changeOrigin: true
      }
    }
  }
}
