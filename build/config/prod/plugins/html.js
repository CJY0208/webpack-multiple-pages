const HtmlWebpackPlugin = require('html-webpack-plugin')
const entries = require('../entries')
const {
  project: project_entries,
  lib: lib_entries,
  vendor: vendor_entries,
  dll: dll_entries
} = entries
const project_entry_names = Object.keys(project_entries)
const vendor_entry_names = Object.keys(vendor_entries)
const lib_entry_names = Object.keys(lib_entries)
const dll_entry_names = Object.keys(dll_entries)

const AutoInjectPlugin = require('../../../utils/auto-inject-plugin')

module.exports = [
  /**
   * 为每个入口生成 html 文件
   */
  ...project_entry_names.map(
    project =>
      new HtmlWebpackPlugin({
        inject: false,
        filename: `${project}.html`,
        template: 'template.html',
        chunks: ['__runtime', '__share', project],
        chunksSortMode: 'manual',
        /**
         * html-minifier DOC: https://github.com/kangax/html-minifier
         */
        minify: {
          minifyCSS: true,
          minifyJS: true
          // collapseWhitespace: true
        }
      })
  ),

  /**
   * 自建组件，分析入口文件引用，引入相关依赖
   */
  new AutoInjectPlugin({
    entries,
    dllPath: 'dll/'
  })
]
