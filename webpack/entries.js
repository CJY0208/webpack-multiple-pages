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

// process 有毒，它的依赖被各个 vendor 争夺...导致了各种各样奇葩的依赖问题
module.exports = Object.assign({}, business_entries, {
  vendor: {
    /**
     * react-router 与 react-router-dom 异同：https://github.com/ReactTraining/react-router/issues/4648
     * 民间中文资料：http://blog.csdn.net/sinat_17775997/article/details/69218382
     */
    reactRouter: ['react-router-dom', 'history'],
    vue: ['vue'],
    utils: ['axios']
    // vue: ['vue', 'vuex', 'vue-router'],
    // react: ['react', 'react-dom'],
    // polyfill: ['babel-polyfill'],
    // react: ['react', 'react-dom', 'history'],
    // reactRouter: ['react-router', 'react-router-dom'],
    // moment: ['moment']
  },
  dll: {
    // polyfill: ['core-js', 'regenerator-runtime'],
    utils: ['md5', 'date-fns'],
    polyfill: ['babel-polyfill'],
    react: ['react', 'react-dom'],
    // vue: ['vue'],
    vueTools: ['vuex', 'vue-router'],
    lodashFp: ['lodash/fp']
    // reactRouter: ['react-router-dom', 'history'],
    // reactRouter: ['react-router-dom'],
  }
})
