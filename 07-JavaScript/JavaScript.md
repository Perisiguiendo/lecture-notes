## try/catch 无法捕获 promise.reject 的问题

try..catch 结构，它只能是同步的，无法用于异步代码模式。



## error 事件的事件处理程序

混合事件 `GlobalEventHandlers` 的 onerror 属性是用于处理 `error` 的事件

`Error`事件的**事件处理程序**，在各种目标对象的不同类型错误被触发：

- 当**JavaScript运行时错误**（包括语法错误）发生时，**window**会触发一个**ErrorEvent**接口的`error`事件，并执行`window.onerror()`。
- 当一项资源（如<img>或<script>）**加载失败**，加载资源的元素会触发一个**Event**接口的`error`事件，并执行该元素上的`onerror()`处理函数。这些error事件不会向上冒泡到window，不过（至少在Firefox中）能被单一的**window.addEventListener**捕获。

加载一个全局的`error`事件处理函数可用于自动收集错误报告。

### 语法

由于历史原因，`window.onerror`和`element.onerror`接受不同的参数。

### window.onerror

```
window.onerror = function(message, source, lineno, colno, error) { ... }
```

函数参数：

- `message`：错误信息（字符串）。可用于HTML `onerror=""`处理程序中的`event`。
- `source`：发生错误的脚本URL（字符串）
- `lineno`：发生错误的行号（数字）
- `colno`：发生错误的列号（数字）
- `error`：Error对象（对象）

若该函数返回`true`，则阻止执行默认事件处理函数。

### window.addEventListener('error')

```
window.addEventListener('error', function(event) { ... })
```

`ErrorEvent类型的`event`包含有关事件和错误的所有信息。

### element.onerror

```
element.onerror = function(event) { ... }
```

`element.onerror`使用单一`Event`参数的函数作为其处理函数。

### 注意事项

当加载自[不同域](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)的脚本中发生语法错误时，为避免信息泄露（参见[bug 363897](https://bugzilla.mozilla.org/show_bug.cgi?id=363897)），语法错误的细节将不会报告，而代之简单的`Script error.`。在某些浏览器中，通过在<script>使用`crossorigin`属性并要求服务器发送适当的 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) HTTP 响应头，该行为可被覆盖。一个变通方案是单独处理`Script error.`，告知错误详情仅能通过浏览器控制台查看，无法通过JavaScript访问。

```
window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1){
        alert('Script Error: See Browser Console for Detail');
    } else {
        var message = [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');

        alert(message);
    }

    return false;
};
```

当使用行内HTML标签（`<body onerror="alert('an error occurred')">`）时，HTML规范要求传递给`onerror`的参数命名为`event`、`source`、`lineno`、`colno`、`error`。针对不满足此要求的浏览器，传递的参数仍可使用`arguments[0]`到`arguments[2]`来获取。

### 规范

| 规范                         | 状态            | 注释 |
| :--------------------------- | :-------------- | :--- |
| HTML Living Standard onerror | Living Standard |      |

### 浏览器兼容性

在Firefox 14之前，当<script>加载失败时，`window.onerror`被传入**"Error loading script"**信息。该bug已在[bug 737087](https://bugzilla.mozilla.org/show_bug.cgi?id=737087)修复，取而代之，在这种情况下，`scriptElement.onerror`将被触发。

自Firefox 31始加入最后两个参数（`colno` and `error`），意味着通过提供的`Error`对象，你可以从`window.onerror`访问脚本错误的stack trace（[bug 355430](https://bugzilla.mozilla.org/show_bug.cgi?id=355430)。）



##  mouseenter 和 mouseover 的区别

- 不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件，对应 mouseout。
- 只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件，对应 mouseleave。









## 异步过程的构成要素有哪些？和异步过程是怎样的 ？

总结一下，一个异步过程通常是这样的：

- 主线程发起一个异步请求，相应的工作线程接收请求并告知主线程已收到(异步函数返回)
- 主线程可以继续执行后面的代码，同时工作线程执行异步任务
- 工作线程完成工作后，通知主线程
- 主线程收到通知后，执行一定的动作(调用回调函数)

1. 异步函数通常具有以下的形式：A(args..., callbackFn)
2. 它可以叫做异步过程的发起函数，或者叫做异步任务注册函数。
3. args 和 callbackFn 是这个函数的参数。

所以，从主线程的角度看，一个异步过程包括下面两个要素：

- 发起函数(或叫注册函数) A。
- 回调函数 callbackFn。

它们都是在主线程上调用的，其中注册函数用来发起异步过程，回调函数用来处理结果。

举个具体的例子：

```
setTimeout(fn, 1000);
```

其中的 setTimeout 就是异步过程的发起函数，fn 是回调函数。

注意：前面说的形式 A(args..., callbackFn) 只是一种抽象的表示，并不代表回调函数一定要作为发起函数的参数。

例如：

```
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = xxx; // 添加回调函数
xhr.open('GET', url);
xhr.send(); // 发起函数
```

发起函数和回调函数就是分离的。



##  JavaScript 常见的内置对象

有 Object、Math、String、Array、Number、Function、Boolean、JSON 等，其中 Object 是所有对象的基类，采用了原型继承方式



**编写一个方法，求一个字符串的字节长度**

假设：一个英文字符占用一个字节，一个中文字符占用两个字节

```
function getBytes(str){
    var len = str.length;
    var bytes = len;
    for(var i = 0; i < len; i++){
        if (str.charCodeAt(i) > 255)  bytes++;
    }
    return bytes;
}
alert(getBytes("你好,as"));
```



##  JS 组成

- 核心（ECMAScript） 描述了该语言的语法和基本对象
- 文档对象模型(DOM) 描述了处理网页内容的方法和接口
- 浏览器对象模型(BOM) 描述了与浏览器进行交互的方法和接口



##  JSON 

- JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。
- 它是基于 JavaScript 的一个子集。
- 数据格式简单，易于读写，占用带宽小。
- 格式：采用键值对。例如：{ “age‟: ‟12‟, ”name‟: ‟back‟ }



##  js 的 ready 和 onload 事件的区别

- onload 是等 HTML 的所有资源都加载完成后再执行 onload 里面的内容，所有资源包括 DOM 结构、图片、视频 等资源;
- ready 是当 DOM 结构加载完成后就可以执行了，相当于 jQuery 中的 $(function(){ js 代码 });
- 另外，onload 只能有一个，ready 可以有多个。



- 



------

#### js 经典面试知识文章

- [js 异步执行顺序](https://www.cnblogs.com/xiaozhumaopao/p/11066005.html)
- [JS 是单线程，你了解其运行机制吗 ？](https://github.com/biaochenxuying/blog/issues/8)
- [7 分钟理解 JS 的节流、防抖及使用场景](https://juejin.im/post/5b8de829f265da43623c4261)
- [JavaScript 常见的六种继承方式](https://juejin.im/post/5bb091a7e51d450e8477d9ba)
- [JS 继承的 6 种实现方式](https://www.cnblogs.com/humin/p/4556820.html)
- [九种跨域方式实现原理（完整版）](https://juejin.im/post/5c23993de51d457b8c1f4ee1)
- [常见六大Web安全攻防解析](https://juejin.im/post/5c446eb1e51d45517624f7db)
- [一文读懂 HTTP/2 及 HTTP/3 特性](https://juejin.im/post/5c658309e51d4542331c442e)
- [深入理解 HTTPS 工作原理](https://juejin.im/post/5ca6a109e51d4544e27e3048#heading-0)
- [JavaScript 中的垃圾回收和内存泄漏](https://juejin.im/post/5cb33660e51d456e811d2687)
- [你不知道的浏览器页面渲染机制](https://juejin.im/post/5ca0c0abe51d4553a942c17d)
- [JavaScript设计模式](https://juejin.im/post/59df4f74f265da430f311909)
- [深入 javascript——构造函数和原型对象](https://segmentfault.com/a/1190000000602050)
- [高级函数技巧-函数柯里化](https://segmentfault.com/a/1190000018265172)
- [JavaScript之bind及bind的模拟实现](https://blog.csdn.net/c__dreamer/article/details/79673725)
- [Http Cookie 机制及 Cookie 的实现原理](https://blog.csdn.net/aa5305123/article/details/83247041)
- [一个dom,点击事件触发两个事件是同步还是异步](https://blog.csdn.net/u012129607/article/details/78117483)
- [16种JavaScript设计模式（中）](https://juejin.im/post/5c038df96fb9a04a0378f600)