const { optimize: { CommonsChunkPlugin } = {} } = require('webpack')

const { project, lib: lib, vendor: vendor } = require('../entries')
const project_names = Object.keys(project)
const vendor_names = Object.keys(vendor)
const lib_names = Object.keys(lib)
const lib_entries = Object.entries(lib)

const isDependentBy = (
  libName,
  { resource = '', sourceRequest = '', reasons = [] } = {}
) =>
  ((new RegExp(libName).test(resource) &&
    /(node_modules|build\/utils|build\\utils)/.test(resource)) ||
    reasons.some(({ module }) => isDependentBy(libName, module))) &&
  !/dll-reference/.test(sourceRequest)

module.exports = [
  /**
   * 抽离 vendor
   */
  ...Object.entries(vendor).map(
    ([key, value]) =>
      new CommonsChunkPlugin({
        name: key,
        filename: 'vendor/[name].[chunkhash:6].js',
        chunks: project_names,
        minChunks: ({ resource = '' }) =>
          /vendor/.test(resource) && new RegExp(`${key} #`).test(resource)
      })
  ),
  /**
   * 抽离 lib
   */
  ...lib_entries.map(
    ([key, value]) =>
      new CommonsChunkPlugin({
        name: key,
        filename: 'lib/[name].[chunkhash:6].js',
        chunks: [...project_names, ...vendor_names],
        minChunks(module) {
          const {
            isDependentByMultipleChunk: __isDependentByMultipleChunk
          } = module

          /**
           * 是否被当前 Chunk 引用
           */
          let isDependentByCurrentChunk

          /**
           * 是否被多个 Chunk 引用
           */
          let isDependentByMultipleChunk

          switch (__isDependentByMultipleChunk) {
            case true:
            case false:
              isDependentByCurrentChunk = value.some(libName =>
                isDependentBy(libName, module)
              )
              isDependentByMultipleChunk = __isDependentByMultipleChunk
              break
            default:
              isDependentByCurrentChunk = false
              isDependentByMultipleChunk =
                lib_entries
                  .map(([__key, value]) => {
                    const __isDependentByCurrentChunk = value.some(libName =>
                      isDependentBy(libName, module)
                    )
                    if (__key === key)
                      isDependentByCurrentChunk = __isDependentByCurrentChunk
                    return __isDependentByCurrentChunk
                  })
                  .filter(res => res).length >= 2

              // 缓存 “是否被多个 Chunk 引用” 统计结果
              Object.assign(module, {
                isDependentByMultipleChunk
              })
          }

          return !isDependentByMultipleChunk && isDependentByCurrentChunk
        }
      })
  ),
  /**
   * 抽离 share
   */
  new CommonsChunkPlugin({
    name: '__share',
    filename: '[name].[chunkhash:6].js',
    chunks: [...project_names, ...vendor_names, ...lib_names],
    minChunks: ({ resource = '' }, count) =>
      count >= 2 && (/node_modules/.test(resource) || /vendor/.test(resource))
  }),

  /**
   * 这个 CommonsChunkPlugin 的作用是分离 Webpack runtime & manifest
   * 民间资料：https://segmentfault.com/a/1190000010317802
   * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-extracting-boilerplate-
   */
  new CommonsChunkPlugin({
    name: '__runtime',
    filename: '[name].[chunkhash:6].js'
  })
]
