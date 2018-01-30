const path = require('path')
const glob = require('glob')

const srcDir = path.resolve(__dirname, '../src')
const business_entries = glob.sync(`${srcDir}/**/* #`).reduce(
  (entries, filepath) => {
    const type = path
      .resolve(filepath)
      .replace(srcDir, '')
      .split('\\')[1]
    return Object.assign(entries, {
      [type]: Object.assign({}, entries[type], {
        [filepath
          .split('/')
          .pop()
          .replace(' #', '')]: filepath
      })
    })
  },
  {
    project: {},
    common: {
      utils: ['md5', 'axios']
    }
  }
)

module.exports = Object.assign({}, business_entries, {
  dll: {
    polyfill: ['core-js', 'regenerator-runtime'],
    react: ['react', 'react-dom'],
    moment: ['moment']
    // utils: ['md5', 'moment']
  }
})
