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
    customizedVendor: {}
  }
)

module.exports = Object.assign({}, business_entries, {
  vendor: {
    // utils: ['md5', 'axios'],
    /**
     * react-router 与 react-router-dom 异同：https://github.com/ReactTraining/react-router/issues/4648
     * 民间中文资料：http://blog.csdn.net/sinat_17775997/article/details/69218382
     */
    // reactRouter: ['react-router-dom', 'history'],
    // polyfill: ['babel-polyfill'],
    // react: ['react', 'react-dom', 'history'],
    // reactRouter: ['react-router', 'react-router-dom'],
    // moment: ['moment']
  },
  dll: {
    // polyfill: ['core-js', 'regenerator-runtime'],
    utils: ['md5', 'axios'],
    polyfill: ['babel-polyfill'],
    react: ['react', 'react-dom'],
    reactRouter: ['react-router-dom', 'history'],
    moment: ['moment']
  }
})
