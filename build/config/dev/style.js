const HappyPack = require('happypack')
const happyThreadPool = require('./__threadPool')

module.exports = {
  module: {
    rules: [
      // --------------------------- 处理 Lib 样式文件 -----------------------------------
      {
        test: /.*node_modules.*antd-mobile.*\.less$/,
        use: [
          'style-loader?sourceMap',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
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
            loader: 'less-loader?sourceMap',
            options: {
              javascriptEnabled: true,
              modifyVars: require('../../utils/antd-mobile/theme')
            }
          }
        ]
      },
      {
        test: /.*node_modules.*\.css$/,
        exclude: /\.m\.css/,
        use: ['style-loader?sourceMap', 'css-loader?sourceMap']
      },
      // --------------------------- 处理 Lib 样式文件 -----------------------------------
      {
        test: /.*src.*\.css$/,
        exclude: /\.m\.css$/,
        use: 'happypack/loader?id=css'
      },
      {
        test: /.*src.*\.(scss|sass)$/,
        exclude: /\.m\.(scss|sass)$/,
        use: 'happypack/loader?id=sass'
      },
      {
        test: /.*src.*\.m\.css$/,
        use: 'happypack/loader?id=cssm'
      },
      {
        test: /.*src.*\.m\.(scss|sass)$/,
        use: 'happypack/loader?id=sassm'
      }
    ]
  },
  vue: {
    loaders: {
      scss: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ],
      sass: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ],
      css: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap'
      ],
      postcss: [
        'vue-style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap'
      ]
    }
  },
  plugins: [
    new HappyPack({
      id: 'css',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap'
      ]
    }),
    new HappyPack({
      id: 'sass',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    }),
    new HappyPack({
      id: 'cssm',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap&modules&localIdentName=[local]_[hash:base64:4]',
        'postcss-loader?sourceMap'
      ]
    }),
    new HappyPack({
      id: 'sassm',
      verbose: false,
      threadPool: happyThreadPool,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?sourceMap&modules&localIdentName=[local]_[hash:base64:4]',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap'
      ]
    })
  ]
}
