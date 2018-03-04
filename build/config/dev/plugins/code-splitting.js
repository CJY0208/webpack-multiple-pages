const { optimize: { CommonsChunkPlugin } = {} } = require('webpack')

const { project, lib, vendor, dll } = require('../../../entries')
const project_names = Object.keys(project)
const vendor_names = Object.keys(vendor)
const lib_names = Object.keys(lib)
const lib_entries = Object.entries(lib)
const dll_names = Object.keys(dll)

const isDependentBy = (
  libName,
  { resource = '', sourceRequest = '', reasons = [] } = {}
) =>
  ((new RegExp(libName).test(resource) &&
    /(node_modules|build\/utils|build\\utils)/.test(resource)) ||
    reasons.some(({ module }) => isDependentBy(libName, module))) &&
  !/dll-reference/.test(sourceRequest)

const getLibSplitter = (key, value) => module => {
  const {
    isDependentByMultipleLib: __isDependentByMultipleLib,
    resource = '',
    rawRequest = ''
  } = module

  /**
   * 是否被当前 Lib 引用
   */
  let isDependentByCurrentLib

  /**
   * 是否被多个 Lib 引用
   */
  let isDependentByMultipleLib

  /**
   * 是否当前的 Lib
   */
  const isCurrentLib = value.some(
    libName =>
      libName === rawRequest || new RegExp(`^${libName}\/`).test(rawRequest)
  )

  switch (__isDependentByMultipleLib) {
    case true:
    case false:
      isDependentByCurrentLib = value.some(libName =>
        isDependentBy(libName, module)
      )
      isDependentByMultipleLib = __isDependentByMultipleLib
      break
    default:
      isDependentByCurrentLib = false
      const dependentTimes = lib_entries
        .map(([__key, value]) => {
          const __isDependentByCurrentLib = value.some(libName =>
            isDependentBy(libName, module)
          )
          if (__key === key) isDependentByCurrentLib = __isDependentByCurrentLib
          return __isDependentByCurrentLib
        })
        .filter(res => res).length

      isDependentByMultipleLib = dependentTimes >= 2

      // 缓存 “是否被多个 Lib 引用” 统计结果
      Object.assign(module, {
        isDependentByMultipleLib,
        isDependentByLib: dependentTimes >= 1
      })
  }

  return (
    isCurrentLib ||
    (!/-loader/.test(resource) &&
      !isDependentByMultipleLib &&
      isDependentByCurrentLib)
  )
}

module.exports = [
  // /**
  //  * 抽离 vendor
  //  */
  // ...Object.entries(vendor).map(
  //   ([key, value]) =>
  //     new CommonsChunkPlugin({
  //       name: key,
  //       filename: 'vendor/[name].[hash].js',
  //       chunks: project_names,
  //       minChunks: ({ resource = '' }) =>
  //         /vendor/.test(resource) && new RegExp(`${key} #`).test(resource)
  //     })
  // ),
  // /**
  //  * 抽离 lib
  //  */
  // ...lib_entries.map(
  //   ([key, value]) =>
  //     new CommonsChunkPlugin({
  //       name: key,
  //       filename: 'lib/[name].[hash].js',
  //       chunks: [...project_names, ...vendor_names],
  //       minChunks: getLibSplitter(key, value)
  //     })
  // ),
  // /**
  //  * 抽离 share
  //  */
  // new CommonsChunkPlugin({
  //   name: '__share',
  //   filename: 'project/[name].[hash].js',
  //   chunks: [...project_names, ...vendor_names, ...lib_names],
  //   minChunks: ({ resource = '', isDependentByLib = false }, count) =>
  //     /__prefix__/.test(resource) ||
  //     // isDependentByLib &&
  //     (count >= 2 && (/node_modules/.test(resource) || /vendor/.test(resource)))
  // }),
  new CommonsChunkPlugin({
    name: '__vendor',
    filename: 'dev/[name].[hash].js',
    minChunks: 2
  }),

  /**
   * 这个 CommonsChunkPlugin 的作用是分离 Webpack runtime & manifest
   * 民间资料：https://segmentfault.com/a/1190000010317802
   * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-extracting-boilerplate-
   */
  new CommonsChunkPlugin({
    name: '__runtime',
    filename: 'dev/[name].[hash].js'
  })
]
