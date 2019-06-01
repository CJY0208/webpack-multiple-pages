const { optimize: { CommonsChunkPlugin } = {} } = require('webpack')

const { project, lib, vendor } = require('../../__entries')
const project_names = Object.keys(project)
const vendor_names = Object.keys(vendor)
const lib_names = Object.keys(lib)
const lib_entries = Object.entries(lib)

const {
  isDependentBy,
  checkIsDependentByMultipleProject,
  getLibSplitter
} = require('./helpers')

module.exports = [
  /**
   * 抽离 vendor
   */
  ...Object.entries(vendor).map(
    ([key, value]) =>
      new CommonsChunkPlugin({
        name: `v-${key}`,
        filename: 'vendor/[name].[chunkhash:6].js',
        chunks: project_names,
        minChunks: ({ resource = '' }) =>
          /vendor/.test(resource) && new RegExp(`${key} @`).test(resource)
      })
  ),
  /**
   * 抽离 lib
   */
  ...lib_entries.map(
    ([key, value]) =>
      new CommonsChunkPlugin({
        name: `l-${key}`,
        filename: 'lib/[name].[chunkhash:6].js',
        chunks: [...project_names, ...vendor_names],
        minChunks: getLibSplitter(key, value)
      })
  ),
  /**
   * 抽离 share
   */
  new CommonsChunkPlugin({
    name: 'w_share',
    filename: 'project/[name].[chunkhash:6].js',
    chunks: [...project_names, ...vendor_names, ...lib_names],
    minChunks: ({ resource = '', isDependentByLib = false }, count) =>
      /__prefix__/.test(resource) ||
      // isDependentByLib &&
      (count >= 2 && (/node_modules/.test(resource) || /vendor/.test(resource)))
  }),

  /**
   * 这个 CommonsChunkPlugin 的作用是分离 Webpack runtime & manifest
   * 民间资料：https://segmentfault.com/a/1190000010317802
   * 官方资料（中文版）：https://doc.webpack-china.org/guides/caching#-extracting-boilerplate-
   */
  new CommonsChunkPlugin({
    name: 'w_runtime',
    filename: 'project/[name].[chunkhash:6].js'
  })
]
