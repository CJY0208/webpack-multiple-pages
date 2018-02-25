
# Webpack Multiple Pages

### 特性介绍

1. 尽可能自由的代码分割

	- 多页面，每个页面一个js

	- 不同第三方库可定制化打包成某个js

	- 支持多个公共业务库，每个库一个js

2. 还算稳定的模块版本控制，各模块改动时，尽可能不影响其他模块的hash值

3. 支持多框架共存（目前仅内置react、vue），如A页面用react，B页面用vue，并引入了常用的工具，如下

	- react-router

	- antd-mobile（按需打包）

	- vue-router

	- vuex

	- mint-ui（按需打包）

4. eslint代码校验，prettier格式化（commit时自动格式化）

5. 内置了垫片库，支持es各种新特性（装饰器、async/await等）

6. 支持sass、less、css，打包文件有以下特点

	- sass编写的业务代码将抽取为单独的css文件
	
	- css、less不做抽取，集成在js文件中

7. 引入了postcss，支持autoprefixer及doiuse功能，兼容浏览器为 `[iOS > 7, Android >= 4.0]`

8. 集成如下工具

	- lodash、lodash/fp

	- axios

	- date-fn

	- md5

	- faskclick

- - -

### 业务入口说明

- 业务代码存放在`src`目录中，每个入口文件夹名称必须有`空格#` 标识，入口文件必须为`index.js`

- `src/project`中为多页面入口代码

- `src/vendor`中为业务公共部分代码