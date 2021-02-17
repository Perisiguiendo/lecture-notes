## 简述一下 src 与 href 的区别

- href 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。
- src 是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；
- 在请求 src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片和 frame 等元素。 当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将 js 脚本放在底部而不是头部。

##  写一个 div + css 布局，左边图片，右边文字，文字环绕图片，外面容器固定宽度，文字不固定

直接就一个 img，它 float：left，加文字加 p 标签就好了。

##  Doctype 作用 ？标准模式与兼容模式各有什么区别 ?

- 声明位于位于 HTML 文档中的第一行，处于标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。
- 标准模式的排版和 JS 运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

##  HTML5 为什么只需要写 < !DOCTYPE HTML> ？

HTML5 不基于 SGML(标准通用标记语言（以下简称“通用标言”)，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）； 而 HTML4.01 基于 SGML，所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型。

##  行内元素有哪些 ？块级元素有哪些 ？ 空(void)元素有那些 ？

CSS 规范规定，每个元素都有 display 属性，确定该元素的类型，每个元素都有默认的 display 值。 如 div 的 display 默认值为 “block”，则为“块级”元素； span 默认 display 属性值为 “inline”，是“行内”元素。

- 行内元素有：a b span img input select strong（强调的语气）
- 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4 p
- 常见的空元素： img input link meta br hr ，鲜为人知的是：area base col command embed keygen param source track wbr

##  HTML5 有哪些新特性、移除了那些元素 ？如何处理 HTML5 新标签的浏览器兼容问题 ？如何区分 HTML 和 HTML5 ？

HTML5 现在已经不是 SGML（标准通用标记语言）的子集，主要是关于图像，位置，存储，多任务等功能的增加。

**新特性**

- 绘画 canvas
- 用于媒介回放的 video 和 audio 元素
- 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失
- sessionStorage 的数据在浏览器关闭后自动删除
- 语意化更好的内容元素，比如 article、footer、header、nav、section
- 表单控件：calendar、date、time、email、url、search
- 新的技术：webworker, websocket, Geolocation

**移除的元素**

- 纯表现的元素：basefont，big，center，font, s，strike，tt，u
- 对可用性产生负面影响的元素：frame，frameset，noframes

**支持 HTML5 新标签**

- IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签，可以利用这一特性让这些浏览器支持 HTML5 新标签，浏览器支持新标签后，还需要添加标签默认的样式。
- 当然也可以直接使用成熟的框架、比如 html5shim。

```
<!--[if lt IE 9]>
<script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
<![endif]-->
```

##  简述一下你对 HTML5 语义化的理解 ？

- 1、html 语义化让页面的内容结构化，结构更清晰，
- 2、便于对浏览器、搜索引擎解析;
- 3、即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的;
- 4、搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO;
- 5、使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

##  HTML5 的离线储存怎么使用，工作原理能不能解释一下 ？

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

原理

HTML5 的离线存储是基于一个新建的 .appcache 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

如何使用

- 1、页面头部像下面一样加入一个 manifest 的属性；
- 2、在 cache.manifest 文件的编写离线存储的资源；

```
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
resourse/logo.png
FALLBACK:
//offline.html
```

- 3、在离线状态时，操作 window.applicationCache 进行需求实现。

##  浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢 ？

在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。

如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

离线的情况下，浏览器就直接使用离线存储的资源。

##  请描述一下 cookies，sessionStorage 和 localStorage 的区别 ？

- cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
- cookie 数据始终在同源的 http 请求中携带（即使不需要），也会在浏览器和服务器间来回传递。
- sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。

存储大小

- cookie 数据大小不能超过 4k。
- sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

有效时间

- localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
- sessionStorage 数据在当前浏览器窗口关闭后自动删除。
- cookie  设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。

##  iframe 内嵌框架有那些缺点 ？

内联框架 iframe一般用来包含别的页面，例如 我们可以在我们自己的网站页面加载别人网站的内容，为了更好的效果，可能需要使 iframe 透明效果；

- iframe 会阻塞主页面的 onload 事件；
- 搜索引擎的检索程序无法解读这种页面，不利于 SEO 搜索引擎优化（Search Engine Optimization）
- iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

如果需要使用 iframe，最好是通过 javascript 动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。

##  Label 的作用是什么？是怎么用的 ？

label 标签来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```
<label for="Name">Number:</label>
<input type=“text“ name="Name"  id="Name"/>

<label>Date:<input type="text" name="B"/></label>
```

##  HTML5 的 form 如何关闭自动完成功能 ？

给不想要提示的 form 或某个 input 设置为 autocomplete=off

##  如何实现浏览器内多个标签页之间的通信 ? (阿里)

- WebSocket、SharedWorker；
- 也可以调用 localstorge、cookies 等本地存储方式；
- localstorge 在另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信； 注意 quirks：Safari 在无痕模式下设置 localstorge 值时会抛出 QuotaExceededError 的异常；

##  webSocket 如何兼容低浏览器 ？(阿里)

- Adobe Flash Socket 
- ActiveX HTMLFile (IE) 
- 基于 multipart 编码发送 XHR
- 基于长轮询的 XHR

##  页面可见性（Page Visibility API） 可以有哪些用途 ？

- 通过 visibilityState 的值检测页面当前是否可见，以及打开网页的时间等;
- 在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放；

##  网页验证码是干嘛的，是为了解决什么安全问题

- 区分用户是计算机还是人的公共全自动程序；
- 可以防止恶意破解密码、刷票、论坛灌水；
- 有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试。

##  title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别 ？

- title 属性没有明确意义只表示是个标题，h1 则表示层次明确的标题，对页面信息的抓取也有很大的影响；
- strong 是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：`strong 会重读，而 b 是展示强调内容`。
- i 内容展示为斜体，em 表示强调的文本；
- Physical Style Elements -- 自然样式标签：b, i, u, s, pre
- Semantic Style Elements -- 语义样式标签：strong, em, ins, del, code
- 应该准确使用语义样式标签, 但不能滥用, 如果不能确定时，首选使用自然样式标签。

##  谈谈以前端的角度出发，做好 SEO ，需要考虑什么 ？

- **了解搜索引擎如何抓取网页和如何索引网页**。 你需要知道一些搜索引擎的基本工作原理，各个搜索引擎之间的区别，搜索机器人（SE robot 或叫 web cra何进行工作，搜索引擎如何对搜索结果进行排序等等。
- **Meta 标签优化** 。主要包括主题（Title)，网站描述(Description)，和关键词（Keywords）。还有一些其它的隐藏文字比如 Au 者），Category（目录），Language（编码语种）等。
- **如何选取关键词并在网页中放置关键词**。 搜索就得用关键词。关键词分析和选择是 SEO 最重要的工作之一。首先要给网站确定主关键词（一般在 5 个上后针对这些关键词进行优化，包括关键词密度（Density），相关度（Relavancy），突出性（Prominency）等等。
- **了解主要的搜索引擎**。 虽然搜索引擎有很多，但是对网站流量起决定作用的就那么几个。比如英文的主要有 Google，Yahoo，Bing 等有百度，搜狗，有道等。 不同的搜索引擎对页面的抓取和索引、排序的规则都不一样。 还要了解各搜索门户和搜索的关系，比如 AOL 网页搜索用的是 Google 的搜索技术，MSN 用的是 Bing 的技术。
- **主要的互联网目录**。 Open Directory 自身不是搜索引擎，而是一个大型的网站目录，他和搜索引擎的主要区别是网站内容的收集方目录是人工编辑的，主要收录网站主页；搜索引擎是自动收集的，除了主页外还抓取大量的内容页面。
- **按点击付费的搜索引擎**。 搜索引擎也需要生存，随着互联网商务的越来越成熟，收费的搜索引擎也开始大行其道。最典型的有 Overture 当然也包括 Google 的广告项目 Google Adwords。越来越多的人通过搜索引擎的点击广告来定位商业网站，这里面化和排名的学问，你得学会用最少的广告投入获得最多的点击。
- **搜索引擎登录**。 网站做完了以后，别躺在那里等着客人从天而降。要让别人找到你，最简单的办法就是将网站提交（submit）擎。如果你的是商业网站，主要的搜索引擎和目录都会要求你付费来获得收录（比如 Yahoo 要 299 美元），但是好消少到目前为止）最大的搜索引擎 Google 目前还是免费，而且它主宰着 60％ 以上的搜索市场。
- **链接交换和链接广泛度**（Link Popularity）。 网页内容都是以超文本（Hypertext）的方式来互相链接的，网站之间也是如此。除了搜索引擎以外，人们也不同网站之间的链接来 Surfing（“冲浪”）。其它网站到你的网站的链接越多，你也就会获得更多的访问量。更重你的网站的外部链接数越多，会被搜索引擎认为它的重要性越大，从而给你更高的排名。
- **标签的合理使用**。

##  前端页面有哪三层构成，分别是什么？作用是什么？

网页分成三个层次，即：结构层、表示层、行为层。

- 网页的结构层（structurallayer）由 HTML 或 XHTML 之类的标记语言负责创建。 标签，也就是那些出现在尖括号里的单词，对网页内容的语义含义做出这些标签不包含任何关于如何显示有关内容的信息。例如，P 标签表达了这样一种语义：“这是一个文本段。”
- 网页的表示层（presentationlayer）由 CSS 负责创建。CSS 对“如何显示有关内容”的问题做出了回答。
- 网页的行为层（behaviorlayer）负责回答 “内容应该如何对事件做出反应” 这一问题。 这是 Javascript 语言和 DOM 主宰的领域。

## meta 元素都有什么



### 知道语义化吗？说说你理解的语义化，如果是你，平时会怎么做来保证语义化？说说你了解的 HTML5 语义化标签？





### a 标签默认事件禁掉之后做了什么才实现了跳转





### Html5 有哪些新特性？如何处理 Html5 新标签的浏览器兼容问题？如何区分 Html 和 Html5?





### 请说明 Html 布局元素的分类有哪些？并描述每种布局元素的应用场景

## meta viewport 是做什么用的，怎么写？

通常viewport是指视窗、视口。浏览器上(也可能是一个app中的webview)用来显示网页的那部分区域。在移动端和pc端视口是不同的，pc端的视口是浏览器窗口区域，而在移动端有三个不同的视口概念：布局视口、视觉视口、理想视口

meta有两个属性name 和 http-equiv

### name

- keywords(关键字)   告诉搜索引擎，你网页的关键字
- description(网站内容描述)   用于告诉搜索引擎，你网站的主要内容。
- viewport(移动端的窗口)  后面介绍
- robots(定义搜索引擎爬虫的索引方式) robots用来告诉爬虫哪些页面需要索引，哪些页面不需要索引
- author(作者)
- generator(网页制作软件）
- copyright(版权)

#### http-equiv

> http-equiv顾名思义，相当于http的文件头作用。

有以下参数：

- content-Type 设定网页字符集

    //旧的HTML，不推荐

   //HTML5设定网页字符集的方式，推荐使用UTF-8

- X-UA-Compatible(浏览器采用哪种版本来渲染页面)

   //指定IE和Chrome使用最新版本渲染当前页面

- cache-control（请求和响应遵循的缓存机制）

- expires(网页到期时间)