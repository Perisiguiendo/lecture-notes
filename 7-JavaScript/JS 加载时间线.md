##  JS 加载时间线
1. 创建 Document 对象，开始解析 web 页面。解析 HTML 元素和它们的文本内容后添加 ELement 对象和 Text 节点到文档中。这个阶段 document.readyState = 'loading'
2. 遇到 link 外部 css，创建线程加载，并继续解析文档
3. 遇到 script 外部 js 时，并且没有设置 async、defer，浏览器加载，并阻塞，等待 js 加载完成并执行该脚本，然后继续解析文档
4. 遇到 script 外部 js，并且设置有 async、defer，浏览器创建线程加载，并继续解析文档。对于 async 属性的脚本，脚本加载完毕后立即执行（异步禁止使用 document.write()）
5. 遇到 img 等，先正常解析 dom 结构，然后浏览器异步加载 src，并继续解析文档
6. 当文档解析完成，document.readyState = 'interactive'
7. 文档解析完成后，所有设置有 defer 的脚本会按顺序执行（注意与 async 的不同，但同样禁止使用 document.write()）
8. document 对象触发 DOMContentLoaded 事件，这也标志着程序执行从同步脚本执行阶段，转化为事件驱动阶段
9. 当所有 async 的脚本加载完成并执行后、img 等加载完成后，docume.readyState = 'complete'，window 对象触发 load 事件
10. 从此，以异步响应方式处理用户输入、网络事件等 