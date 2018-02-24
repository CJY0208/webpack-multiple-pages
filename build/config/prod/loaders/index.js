const styleConfig = require('../style')

module.exports = {
  module: {
    rules: [
      ...styleConfig.module.rules,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              ...styleConfig.vue
            }
          },
          'eslint-loader'
        ]
      }
    ]
  }
}
