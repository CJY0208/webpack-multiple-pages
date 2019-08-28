const path = require('path')

const proxyTarget = 'http://www.proxy.com/'
const proxyList = ['/api']

module.exports = {
  devServer: {
    clientLogLevel: 'none',
    contentBase: path.resolve(__dirname, '../__dll/dist'),
    compress: true,
    port: 10001,
    hot: true,
    quiet: true,
    host: '0.0.0.0',
    disableHostCheck: true,
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
    proxy: proxyList.reduce(
      (proxyMap, path) =>
        Object.assign(proxyMap, {
          [path]: {
            target: proxyTarget,
            secure: false,
            cookieDomainRewrite: 'localhost',
            changeOrigin: true
          }
        }),
      {}
    )
  }
}
