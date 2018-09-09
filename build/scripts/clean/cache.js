const { clean } = require('./helpers')

clean({
  directories: [
    './node_modules/.cache',
    './build/config/.cache-loader',
    './build/config/prod/plugins/.uglify_cache'
  ],
  files: [
    './build/config/prod/plugins/code-splitting/.cache',
    './build/utils/auto-inject-plugin/cache/.cache'
  ]
})
