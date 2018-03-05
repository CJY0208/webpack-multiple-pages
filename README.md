
# Webpack Multiple Pages

**注：已支持dev开发构建，目前侧重于移动端支持，调整webpack配置后可支持PC端**

- - -

### 特性介绍

1. 自由的代码分割，在`build/entries.js`文件中配置代码分割

	- 多页面（*project*），每个页面一个js

	- 不同第三方库（*lib*）可定制化打包成某个js

	- 支持多个公共业务库（*vendor*），每个库一个js

	- 使用了[`AutoDllPlugin`](https://github.com/asfktz/autodll-webpack-plugin)功能加快编译速度，但dll文件可能会对lib文件依赖造成影响，未了解其中原理需慎用

2. 稳定的模块版本控制，各模块改动时，尽可能不影响其他模块的hash值

3. 支持多框架共存（目前内置了[`react`](https://reactjs.org/)、[`vue`](https://cn.vuejs.org/)），如A页面用react，B页面用vue，并引入了常用的工具，如下

	- react：[`react-router`](https://github.com/ReactTraining/react-router)、[`antd-mobile`](https://github.com/ant-design/ant-design-mobile)（按需打包，支持主题自定义，主题配置文件为`build/utils/antd-mobile/theme.js`，可选支持高清方案）、[`redux`](http://www.redux.org.cn/)（集成了[`redux-thunk`](https://github.com/gaearon/redux-thunk)、[`redux-promise`](https://github.com/redux-utilities/redux-promise)、[`redux-actions`](https://github.com/redux-utilities/redux-actions)）、[`immutable`](http://facebook.github.io/immutable-js/docs/#/)、[`mobx`](http://cn.mobx.js.org/)

	- vue：[`vue-router`](https://router.vuejs.org/zh-cn/)、[`mint-ui`](http://mint-ui.github.io/#!/zh-cn)（按需打包）、[`vuex`](https://vuex.vuejs.org/zh-cn/)

4. [`eslint`](http://eslint.cn/)代码校验，[`prettier`](https://prettier.io/)格式化（commit时自动格式化）

5. 内置了[`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/)垫片库，支持es各种新特性（装饰器、async/await等）

6. 样式支持（抽取成独立的css文件）
	
	- 业务样式支持scss、sass、css
	
	- 第三方样式支持css、less 

7. 引入[`postcss`](https://github.com/postcss/postcss/blob/master/README.cn.md)，启用以下插件

	- [`cssnext`](http://cssnext.io/)支持最新css语法，内置了[`autoprefixer`](https://github.com/postcss/autoprefixer)，兼容浏览器为 [`[iOS > 7, Android >= 4.0]`](https://github.com/ai/browserslist#queries)

	- [`cssnano`](http://cssnano.co/)对样式文件进行压缩

	- [`postcss-combine-duplicated-selectors`](https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors)对样式或属性进行合并

	- [`postcss-viewport-units`](https://github.com/springuper/postcss-viewport-units)配合[`viewport-units-buggyfill`](https://github.com/rodneyrehm/viewport-units-buggyfill)修复浏览器对`vw`、`vh`、`vmin`、`vmax`的兼容性

	- [`postcss-px-to-viewport`](https://github.com/evrone/postcss-px-to-viewport)自动将px转换为vw以支持高清方案（未全局开启）

	- [`postcss-write-svg`](https://github.com/jonathantneal/postcss-write-svg)支持css内编写svg，用以实现[1px-border](https://www.w3cplus.com/css/fix-1px-for-retina.html)

8. 集成了部分常用工具：[`lodash`](https://lodash.com/)、[`lodash/fp`](https://github.com/lodash/lodash/wiki/FP-Guide)、[`axios`](https://github.com/axios/axios)、[`date-fns`](https://date-fns.org/)、[`md5`](https://github.com/pvorb/node-md5)、[`fastclick`](https://github.com/ftlabs/fastclick)

9. 高清方案方面，[`flexible.js`](https://github.com/amfe/lib-flexible)官方推荐使用viewport方案代替rem，参考[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)，目前脚手架中已经可以启用此方案，但未默认开启，原`flexible.js`方案可使用但未开启

- - -

### 业务入口约定

- 业务代码存放在`src`目录中，每个入口文件夹名称必须以`空格@`标识结尾，入口文件必须为`index.js`

- `src/project`中为多页面入口代码

- `src/vendor`中为业务公共部分代码

- - -

### 启动方式

1. 先安装各项依赖，使用`npm`或`yarn`都可以

2. 使用以下命令进行构建

```javascript
npm start
```

3. 启动服务器后，浏览器打开`localhost:10001/任意页面名.html` 来进行浏览

	例如 [`localhost:10001/reduxCouterDemo.html`](http://localhost:10001/reduxCouterDemo.html)
