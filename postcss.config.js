module.exports = ({ file = {}, options = {}, env }) => ({
  parser: (() => {
    switch (file.extname) {
      case '.scss':
        return 'postcss-scss'
      case '.sass':
        return 'postcss-sass'
        dafault: return false
    }
  })(),
  plugins: [
    require('postcss-modules-values')(),
    require('postcss-px-to-viewport')({
      viewportWidth: 720, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      // viewportHeight: 1280, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    }),
    require('postcss-cssnext')({
      warnForDuplicates: false
    }),
    require('postcss-write-svg')(),
    require('./build/utils/postcss-viewport-units')(),
    require('postcss-combine-duplicated-selectors')({
      removeDuplicatedProperties: true
    }),
    require('autoprefixer')({
      browsers: ['iOS > 7', 'Android >= 4.0', 'Chrome <= 50']
    }),
    require('cssnano')({
      preset: 'default'
    })
  ]
})
