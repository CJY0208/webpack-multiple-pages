
const { project, vendor, lib, dll } = require('./__entries')

const isDependentBy = (
  libName,
  module
) => {

  if (!module) {
    return false
  }

  const {
    resource = '',
    sourceRequest = '',
    reasons = [],
    userRequest,
    // ...module
  } = module
  let res

  res =
    !/dll-reference/.test(sourceRequest) &&
    ((new RegExp(libName).test(resource) &&
      /(node_modules|build\/utils|build\\utils)/.test(resource)) ||
      reasons.some(({ module }) => isDependentBy(libName, module)))


  return res
}

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        
        ...Object.entries(lib).reduce((res, [name, modules]) => ({
          ...res,
          [name]: {
            name: `lib/${name}`,
            chunks: 'all',
            reuseExistingChunk: false,
            test: chunk => {
              return new RegExp(modules.map(module => 
                `node_modules\\\\${module}\\\\.*`
              ).join('|')).test(chunk.resource) // || modules.some(module => isDependentBy(module, chunk))
              // console.log(chunk.resource)
              // return modules.some(module => new RegExp(`node_modules.${module}`).test(chunk.resource))
              // return modules.some(module => isDependentBy(module, chunk))
            },
            enforce: true,
            priority: 20
          }
        }), {}),
        ...Object.entries(vendor).reduce((res, [name, modules]) => ({
          ...res,
          [name]: {
            name: `vendor/${name}`,
            chunks: 'all',
            reuseExistingChunk: false,
            test: ({ resource }) => {
              return /vendor/.test(resource) && new RegExp(`${name} @`).test(resource)
            },
            enforce: true,
            priority: 10
          },
          __vendor: {
            name: '__vendor',
            chunks: 'all',
            test: /node_modules|__prefix__/,
            enforce: true,
            priority: 1
          },
        }), {})
      }
    },
    runtimeChunk: false
  }
}

// const { optimize: { CommonsChunkPlugin } = {} } = require('webpack')

// module.exports = [
//   new CommonsChunkPlugin({
//     name: '__vendor',
//     filename: 'dev/[name].js',
//     minChunks: (module, count) =>
//       [/node_modules/, /__prefix__/].some(reg => reg.test(module.resource)) ||
//       count >= 2
//   }),

//   /**
//    * 这个 CommonsChunkPlugin 的作用是分离 Webpack runtime & manifest
//    * 民间资料：https://segmentfault.com/a/1190000010317802
//    * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-extracting-boilerplate-
//    */
//   new CommonsChunkPlugin({
//     name: '__runtime',
//     filename: 'dev/[name].js',
//     minChunks: Infinity
//   })
// ]
