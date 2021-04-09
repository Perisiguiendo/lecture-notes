webpack jsx语法配置

依赖

"@babel/plugin-proposal-class-properties": "^7.12.1",

"@babel/preset-env": "^7.12.7",

"@babel/preset-react": "^7.12.10",

"babel-loader": "^8.1.0",



配置

"babel": {

"plugins": [

[

"@babel/plugin-proposal-decorators",

{

"legacy": true

}

]

],

"presets": [

"@babel/preset-react"

]

}





webpack配置{

test: /\.js$/,

exclude: /node_modules/,

use: {

loader: "babel-loader",

options: {

presets: [

"@babel/preset-env",

// @babel/core：是babel的核心模块，可以调用transfor转换方法 

// @babel/preset-env：是babel预设可以将es6/7转成es5（将插件封装成一个包是预设）

{ plugins: ["@babel/plugin-proposal-class-properties"] }, //这句很重要 不然箭头函数出错,默认不支持类语法

],

},

},

},





### Babel处理ES6语法

接下来我们就来配置它👇

```
npm install --save-dev babel-loader @babel/core
// @babel/core 是babel中的一个核心库

npm install --save-dev @babel/preset-env
// preset-env 这个模块就是将语法翻译成es5语法,这个模块包括了所有翻译成es5语法规则

npm install --save @babel/polyfill
// 将Promise,map等低版本中没有实现的语法,用polyfill来实现.

复制代码
```

配置module👇

```
module: {
  rules: [
    {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "useBuiltIns": "usage"
                        }
                    ]
                ]
            }
        }
  ]
}
// exclude参数: node_modules目录下的js文件不需要做转es5语法,也就是排除一些目录
// "useBuiltIns"参数:
复制代码
```

- 有了`preset-env`这个模块后,我们就会发现我们写的**const语法被翻译成成var**
- 但是细心的会发现,对于Promise以及map这些语法,低版本浏览器是不支持的,
- 所以我们需要`@babel/polyfill`模块,对Promise,map进行补充,完成该功能,也就是前面说的`polyfill`

然后我们怎么使用呢?就是在js文件最开始导入👇

```
import "@babel/polyfill";
复制代码
```

但是细心的同学,会发现问题,用完这个以后,打包的文件体积瞬间增加了10多倍之多,这是为什么呢?

这是因为,`@babel/polyfill`为了弥补Promise,map等语法的功能,该模块就需要**自己去实现Promise,map等语法**的功能,这也就是为什么打包后的文件很大的原因.

那我们需要对`@babel/polyfill`参数做一些配置即可,如下👇

```
"useBuiltIns": "usage"
复制代码
```

这个语法作用就是: 只会对我们index.js当前要打包的文件中使用过的语法,比如Promise,map做polyfill,其他es6未出现的语法,我们暂时不去做polyfill,这样子,打包后的文件就减少体积了

**总结**

- 需要按照babel-loader @babel/core这些库,@babel/core是它的核心库
- @babel/preset-env 它包含了es6翻译成es5的语法规则
- @babel/polyfill 解决了低版本浏览器无法实现的一些es6语法,使用polyfill自己来实现
- 通过`import "@babel/polyfill";` 在js文件开头引入,完成对es6语法的polyfill
- 以上的场景都是解决的问题是业务中遇到babel的问题

更多的配置看官方文档,[点这里](https://www.babeljs.cn/)

当你生成第三方模块时,或者是生成UI组件库时,使用polyfill解决问题,就会出现问题了,上面的场景使用babel会污染环境,这个时候,我们需要换一种方案来解决👇

**@babel/plugin-transform-runtime**这个库就能解决我们的问题,那我们先安装需要的库

```
npm install --save-dev @babel/plugin-transform-runtime

npm install --save @babel/runtime
复制代码
```

我们这个时候可以在根目录下建一个`.babelrc`文件,将原本要在options中的配置信息写在`.babelrc`文件👇

```
{
    
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": 2,
          "helpers": true,
          "regenerator": true,
          "useESModules": false
        }
      ]
    ]
  }
复制代码
// 当你的 "corejs": 2,需要安装下面这个
npm install --save @babel/runtime-corejs2
复制代码
```

这样子的话,在使用语法是,就不需要去通过`import "@babel/polyfill";`这样子的语法去完成了,直接正常写就行了,而且从打包的体积来看,其实可以接受的

**总结**

- 从业务场景来看,可以使用`@babel/preset-env`
- 从自己生成第三方库或者时UI时,使用`@babel/plugin-transform-runtime`,它作用是将 helper 和 polyfill 都改为从一个统一的地方引入，并且引入的对象和全局变量是完全隔离的,避免了全局的污染