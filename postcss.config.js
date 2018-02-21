module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['iOS > 7', 'Android >= 4.0', 'Chrome <= 50']
    },
    cssnano: {
      preset: 'default'
    }
  }
}
