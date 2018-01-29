const path = require('path')
const glob = require('glob')

module.exports = Object.assign(
  glob.sync(path.resolve(__dirname, '../src/common/**/* #/')).reduce(
    (entries, filepath) =>
      Object.assign(entries, {
        [filepath
          .split('/')
          .pop()
          .replace(' #', '')]: filepath
      }),
    {}
  ),
  {
    // moment: ['moment'],
    // utils: ['md5', 'axios']
  }
)
