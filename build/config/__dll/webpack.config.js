const path = require('path')
const { plugins } = require('./plugins')
const { dll, lib, __dev } = require('../../entries')
const { DllPlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    __dll: [
      ...new Set(
        Object.values({
          ...dll,
          ...lib,
          ...__dev
        }).reduce((entry, val) => [...entry, ...val], [])
      )
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/wmp/dev'),
    filename: '[name].js',
    library: '[name]_[chunkhash]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize']
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader?minimize',
      //     'less-loader?javascriptEnabled'
      //   ]
      // },
      {
        test: /.*node_modules.*antd-mobile.*\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-px-to-viewport')({
                  viewportWidth: 720, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750，此处为720
                  // viewportHeight: 1280, // 视窗的高度，根据720设备的宽度来指定，一般指定1334，也可以不配置
                  unitPrecision: 3, // 指定`[pt]`转换为视窗单位值的小数位数（很多时候无法整除）
                  viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
                  selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                  minPixelValue: 1, // 小于或等于`0[pt]`不转换为视窗单位，你也可以设置为你想要的值
                  mediaQuery: false // 允许在媒体查询中转换`[pt]`
                })
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: require('../../utils/antd-mobile/theme')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss', '.sass', '.less']
  },
  plugins: [
    ...plugins,

    /**
     * Webpack 任务前/后，使用此插件清除旧的编译文件
     */
    new CleanWebpackPlugin(
      [
        path.resolve(__dirname, './dist'),
        path.resolve(__dirname, './manifest')
      ],
      {
        verbose: false, // 不输出 log
        allowExternal: true, // 允许 CleanWebpackPlugin 清除本配置目录外的文件
        beforeEmit: true // 在 Webpack 工作完成、输出文件前夕执行清除操作
      }
    ),

    /**
     * Webpack Dll 功能：预编译第三方模块以提升业务代码打包速度
     * 民间资料：https://segmentfault.com/a/1190000005969643
     */
    new DllPlugin({
      path: path.resolve(__dirname, './manifest/[name].json'),
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ],
  stats: {
    assets: true,
    chunks: false,
    modules: false,
    children: false,
    errors: true,
    errorDetails: true,
    warnings: true
  }
}
