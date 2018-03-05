const { optimize: { CommonsChunkPlugin } = {} } = require('webpack')

const { project, lib, vendor, dll } = require('../../../entries')
const project_names = Object.keys(project)
const vendor_names = Object.keys(vendor)
const lib_names = Object.keys(lib)
const lib_entries = Object.entries(lib)
const dll_names = Object.keys(dll)

module.exports = [
  new CommonsChunkPlugin({
    name: '__vendor',
    filename: 'dev/[name].js',
    minChunks: (module, count) =>
      [/node_modules/, /__prefix__/].some(reg => reg.test(module.resource)) ||
      count >= 2
  }),

  /**
   * 这个 CommonsChunkPlugin 的作用是分离 Webpack runtime & manifest
   * 民间资料：https://segmentfault.com/a/1190000010317802
   * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-extracting-boilerplate-
   */
  new CommonsChunkPlugin({
    name: '__runtime',
    filename: 'dev/[name].js',
    minChunks: Infinity
  })
]
