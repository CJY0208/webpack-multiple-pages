const path = require('path')
const glob = require('glob')

const srcDir = path.resolve(__dirname, '../src')

/**
 * process 有毒，它的依赖被各个 lib 争夺...导致了各种各样奇葩的依赖问题
 * 其他被共享依赖也有可能导致类似问题，dll 使用要万分小心
 */
module.exports = Object.assign(
  {
    lib: {
      vue: ['vue'],
      utils: ['axios'],
      lodash: ['lodash', 'lodash/fp'],
      antd: ['antd-mobile'],
      mintUI: ['mint-ui'],
      /**
       * react-router 与 react-router-dom 异同：https://github.com/ReactTraining/react-router/issues/4648
       * 民间中文资料：http://blog.csdn.net/sinat_17775997/article/details/69218382
       */
      reactRouter: ['react-router-dom', 'history'],
      mobx: ['mobx', 'mobx-react'],
      redux: [
        'redux',
        'redux-actions',
        'redux-thunk',
        'redux-promise',
        'react-redux'
      ]
    },
    dll: {
      utils: ['md5', 'date-fns', 'fastclick'],
      immutable: ['immutable'],
      polyfill: ['babel-polyfill'],
      react: ['react', 'react-dom', 'prop-types'],
      vueTools: ['vuex', 'vue-router']
    }
  },
  glob.sync(`${srcDir}/**/* #`).reduce(
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
      vendor: {}
    }
  )
)
