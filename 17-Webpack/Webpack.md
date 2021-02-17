## 6. webpack

**说下 webpack 的几大特色 ?**

- code splitting（可以自动完成）(根据代码的分割并对文件进行分块)
- loader 可以处理各种类型的静态文件，并且支持串联操作
- webpack 是以 commonJS 的形式来书写脚本滴，但对 AMD/CMD 的支持也很全面，方便旧项目进行代码迁移
- webpack 具有 requireJs 和 browserify 的功能，但仍有很多自己的新特性：
- 对 CommonJS 、 AMD 、ES6 的语法做了兼容
- 对 js、css、图片等资源文件都支持打包
- 串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如：提供对 CoffeeScript、ES6 的支持
- 有独立的配置文件 webpack.config.js
- 可以将代码切割成不同的 chunk，实现按需加载，降低了初始化时间
- 支持 SourceUrls 和 SourceMaps，易于调试
- 具有强大的 Plugin 接口，大多是内部插件，使用起来比较灵活
- webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快

------

**说说对 webpack 的理解，优点、原理、打包的过程**

优点

- 依赖管理：方便引用第三方模块、让模块更容易复用、避免全局注入导致的冲突、避免重复加载或加载不需要的模块。
- 合并代码：把各个分散的模块集中打包成大文件，减少 HTTP 的请求链接数，配合 UglifyJS 可以减少、优化代码的体积。
- 各路插件：babel 把 ES6+ 转译成 ES5 ，eslint 可以检查编译期的错误……

原理

一切皆为模块，由于 webpack 并不支持除 .js 以外的文件，从而需要使用 loader 转换成 webpack 支持的模块，plugin 用于扩展 webpack 的功能，在 webpack 构建生命周期的过程在合适的时机做了合适的事情。

webpack 从构建到输出文件结果的过程

- 解析配置参数，合并从 shell 传入和 webpack.config.js 文件的配置信息，输出最终的配置信息
- 注册配置中的插件，好让插件监听 webpack 构建生命周期中的事件节点，做出对应的反应
- 解析配置文件中 entry 入口文件，并找出每个文件依赖的文件，递归下去
- 在递归每个文件的过程中，根据文件类型和配置文件中 loader 找出相对应的 loader 对文件进行转换
- 递归结束之后得到每个文件最终的结果，根据 entry 配置生成代码 chunk
- 输出所有 chunk 到文件系统

------

- [webpack 系列--浅析 webpack 的原理](https://www.cnblogs.com/chengxs/p/11022842.html)
- [一看就懂之 webpack 原理解析与实现一个简单的 webpack](https://segmentfault.com/a/1190000020353337)



