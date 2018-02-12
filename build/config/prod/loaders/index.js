module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader', 'eslint-loader']
      }
    ]
  }
}
