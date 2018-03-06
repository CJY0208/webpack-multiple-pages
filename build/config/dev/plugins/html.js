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
        chunks: ['__runtime', '__share', projectName],
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

  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['dev/__dll.js'],
    append: false
  })
]
