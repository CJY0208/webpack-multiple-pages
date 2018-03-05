const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const { project } = require('../__entries')

module.exports = [
  /**
   * 为每个入口生成 html 文件
   */
  ...Object.keys(project).map(
    projectName =>
      new HtmlWebpackPlugin({
        inject: false,
        filename: `${projectName}.html`,
        template: 'template.html',
        chunks: ['__runtime', '__vendor', projectName],
        chunksSortMode: 'dependency'
      })
  ),

  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['__dll.js'],
    append: false
  })
]
