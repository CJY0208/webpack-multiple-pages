const path = require('path')
const glob = require('glob')

const srcDir = path.resolve(__dirname, '../src')
const business_entries = glob.sync(`${srcDir}/**/* #`).reduce(
  (entries, filepath) => {
    const type = path
      .resolve(filepath)
      .replace(srcDir, '')
      .split(path.sep)[1]
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
    vendor: {
      utils: ['md5', 'axios']
    }
  }
)

module.exports = Object.assign({}, business_entries, {
  dll: {
    // polyfill: ['core-js', 'regenerator-runtime'],
    polyfill: ['babel-polyfill'],
    react: ['react', 'react-dom', 'prop-types'],
    reactRouter: ['react-router', 'react-router-dom', 'history'],
    moment: ['moment']
    // utils: ['md5', 'moment']
  }
})
