
# Webpack Multiple Pages

1. 尽可能自由的代码分割

	- 多页面，每个页面一个js

	- 不同第三方库可定制化打包成某个js

	- 支持多个公共业务库，每个库一个js

2. 还算稳定的模块版本控制，各模块改动时，尽可能不影响其他模块的hash值

3. 支持多框架共存，比如A页面用react，B页面用vue

4. eslint代码校验，prettier格式化（commit时自动格式化）

5. 内置了垫片库，支持es各种新特性（装饰器、async/await等