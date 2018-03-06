const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const { project } = require('../__entries')

module.exports = [
  /**
   * 为每个入口生成 html 文件
   */
  ...Object.entries(project).map(
    ([projectName, filepath]) =>
      new HtmlWebpackPlugin({
        inject: false,
        filename: `${projectName}.html`,
        template: fs.readdirSync(filepath).includes('index.html')
          ? `${filepath}/index.html`
          : 'template.html',
        chunks: ['__runtime', '__vendor', projectName],
        chunksSortMode: 'dependency'
      })
  ),

  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['dev/__dll.js'],
    append: false
  })
]
