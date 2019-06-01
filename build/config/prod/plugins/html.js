const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entries = require('../__entries')
const AutoInjectPlugin = require('../../../utils/auto-inject-plugin')

const { project } = entries

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
        chunks: ['w_runtime', 'w_share', projectName],
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
