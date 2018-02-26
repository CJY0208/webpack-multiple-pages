
# Webpack Multiple Pages

**注：目前仅支持production生产环境构建，目前侧重于移动端支持，调整webpack配置后可支持PC端**

- - -

### 特性介绍

1. 尽可能自由的代码分割，在`build/entries.js`文件中配置代码分割

	- 多页面（*project*），每个页面一个js

	- 不同第三方库（*lib*）可定制化打包成某个js

	- 支持多个公共业务库（*vendor*），每个库一个js

	- 使用了[`AutoDllPlugin`](https://github.com/asfktz/autodll-webpack-plugin)功能加快编译速度，但dll文件可能会对lib文件依赖造成影响，未了解其中原理需慎用

2. 较为稳定的模块版本控制，各模块改动时，尽可能不影响其他模块的hash值

3. 支持多框架共存（目前内置了[`react`](https://reactjs.org/)、[`vue`](https://cn.vuejs.org/)），如A页面用react，B页面用vue，并引入了常用的工具，如下

	- react：[`react-router`](https://github.com/ReactTraining/react-router)、[`antd-mobile（按需打包）`](https://github.com/ant-design/ant-design-mobile)、[`redux`](http://www.redux.org.cn/)、[`immutable`](http://facebook.github.io/immutable-js/docs/#/)、[`mobx`](http://cn.mobx.js.org/)

	- vue：[`vue-router`](https://router.vuejs.org/zh-cn/)、[`mint-ui（按需打包）`](http://mint-ui.github.io/#!/zh-cn)、[`vuex`](https://vuex.vuejs.org/zh-cn/)

4. [`eslint`](http://eslint.cn/)代码校验，[`prettier`](https://prettier.io/)格式化（commit时自动格式化）

5. 内置了[`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/)垫片库，支持es各种新特性（装饰器、async/await等）

6. 支持sass、less、css，样式将抽取成独立的css文件

7. 引入[`postcss`](https://github.com/postcss/postcss/blob/master/README.cn.md)，启用以下插件

	- [`cssnext`](http://cssnext.io/)支持最新css语法，内置了[`autoprefixer`](https://github.com/postcss/autoprefixer)，兼容浏览器为 [`[iOS > 7, Android >= 4.0]`](https://github.com/ai/browserslist#queries)

	- [`cssnano`](http://cssnano.co/)对样式文件进行压缩

	- [`postcss-combine-duplicated-selectors`](https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors)对样式或属性进行合并

8. 集成了部分常用工具：[`lodash`](https://lodash.com/)、[`lodash/fp`](https://github.com/lodash/lodash/wiki/FP-Guide)、[`axios`](https://github.com/axios/axios)、[`date-fns`](https://date-fns.org/)、[`md5`](https://github.com/pvorb/node-md5)、[`fastclick`](https://github.com/ftlabs/fastclick)

- - -

### 业务入口约定

- 业务代码存放在`src`目录中，每个入口文件夹名称必须以`空格#`标识结尾，入口文件必须为`index.js`

- `src/project`中为多页面入口代码

- `src/vendor`中为业务公共部分代码

- - -

### 启动方式

1. 先安装各项依赖，使用`npm`或`yarn`都可以

2. 使用以下命令进行构建

```javascript
npm run build
```

3. 使用以下命令启动dist本地服务器，默认端口号为`10001`，命令可选参数`--port=12345`自定义端口号

```javascript
node server/dist.js
```

4. 启动服务器后，浏览器打开`localhost:10001/wmp/任意页面名` 来进行浏览

	例如 [`localhost:10001/wmp/reduxCouterDemo`](http://localhost:10001/wmp/reduxCouterDemo)
