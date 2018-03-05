const path = require('path')

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, './.dist'),
    compress: true,
    port: 10001,
    hot: true,
    quiet: true,
    progress: true,
    inline: true
  }
}
