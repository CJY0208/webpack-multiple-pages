const supportedBrowswers = ['iOS > 7', 'Android >= 4.0']

module.exports = ({ file = {}, options = {}, env }) => ({
  parser: (() => {
    if (options.useSCSS) return 'postcss-scss'
    switch (file.extname) {
      case '.scss':
        return 'postcss-scss'
      case '.sass':
        return 'postcss-sass'
      default:
        return false
    }
  })(),
  plugins: [
    // doiuse 文档：https://github.com/anandthakker/doiuse
    require('doiuse')({
      browsers: supportedBrowswers,
      ignoreFiles: [
        '**/node_modules/**/*.css',
        '**/node_modules/**/*.less',
        '**/normalize.css'
      ]
    }),
    require('autoprefixer')({
      browsers: supportedBrowswers
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
})
