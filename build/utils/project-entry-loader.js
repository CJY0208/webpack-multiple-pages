// 自动给每一个 project 入口增加 __prefix__ 引用
module.exports = function entryLoader(source) {
  return `require('__prefix__');require('css-loader/lib/css-base');require('style-loader/lib/addStyles');${source}`
}
