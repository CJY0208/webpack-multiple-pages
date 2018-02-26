module.exports = {
  plugins: [
    require('postcss-cssnext')({
      browsers: ['iOS > 7', 'Android >= 4.0']
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
}
