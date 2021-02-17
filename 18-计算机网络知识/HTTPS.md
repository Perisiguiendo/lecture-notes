## HTTP 是什么?

- HTTP 是基于 TCP/IP（传输控制协议/因特网互联协议，又名网络通讯协议，是 Internet 最基本的协议）的关于数据如何在万维网中如何通信的协议。
- HTTP 的底层是 TCP/IP。

所以 GET 和 POST 的底层也是 TCP/IP，也就是说，GET/POST 都是 TCP 链接。 GET 和 POST 能做的事情是一样一样的。你要给 GET 加上 request body，给 POST 带上 url 参数，技术上是完全行的通的。

- 业界不成文的规定是，(大多数) 浏览器通常都会限制 url 长度在 2K 个字节，而(大多数)服务器最多处理 64K 大小的 url。超过的部分，恕不处理。
- 如果你用 GET 服务，在 request body 偷偷藏了数据，不同服务器的处理方式也是不同的，有些服务器会帮你卸货，读出数据，有些服务器直接忽略，所以，虽然 GET 可以带 request body，也不能保证一定能被接收到哦。
- GET 和 POST 本质上就是 TCP 链接，并无差别。但是由于 HTTP 的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。

------

**HTTP 中 GET 与 POST 的区别**

- GET 在浏览器回退时是无害的，而 POST 会再次提交请求。
- GET 产生的 URL 地址可以被 Bookmark，而 POST 不可以。
- GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置。
- GET 请求只能进行 url 编码，而 POST 支持多种编码方式。
- GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留。
- GET 请求在 URL 中传送的参数是有长度限制的，而 POST 么有。
- 对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制。
- GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息。
- GET 参数通过 URL 传递，POST 放在 Request body 中。

GET 和 POST 还有一个重大区别

简单的说：

- GET 产生一个 TCP 数据包;
- POST 产生两个 TCP 数据包。

长的说：

- 对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 200 (返回数据);
- 而对于 POST，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应 200 ok(返回数据)。

据研究，在网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。 而在网络环境差的情况下，两次包的 TCP 在验证数据包完整性上，有非常大的优点。 并不是所有浏览器都会在 POST 中发送两次包，Firefox 就只发送一次。

------

**浏览器缓存实现原理**

浏览器缓存将文件保存在客户端，好的缓存策略可以减少对网络带宽的占用，可以提高访问速度，提高用户的体验，还可以减轻服务器的负担。

当一个客户端请求 web 服务器, 请求的内容可以从以下几个地方获取：服务器、浏览器缓存中或缓存服务器中。这取决于服务器端输出的页面信息。页面文件有三种缓存状态。

1. 最新的：选择不缓存页面，每次请求时都从服务器获取最新的内容。
2. 未过期的：在给定的时间内缓存，如果用户刷新或页面过期则去服务器请求，否则将读取本地的缓存，这样可以提高浏览速度。
3. 过期的：也就是陈旧的页面，当请求这个页面时，必须进行重新获取。

页面的缓存状态是由 http header 决定的，一个浏览器请求信息，一个是服务器响应信息。

主要包括 Pragma: no-cache、Cache-Control、 Expires、 Last-Modified、If-Modified-Since。

其中 Pragma: no-cache 由 HTTP/1.0 规定，Cache-Control 由 HTTP/1.1 规定。

Cache-Control 的主要参数：

- A、Cache-Control: private/public，Public 响应会被缓存，并且在多用户间共享。 Private 响应只能够作为私有的缓存，不能在用户间共享。
- B、Cache-Control: no-cache，不进行缓存。
- C、Cache-Control: max-age = x，缓存时间，以秒为单位。
- D、Cache-Control: must-revalidate，如果页面是过期的，则去服务器进行获取。

Expires：显示的设置页面过期时间。

Last-Modified：请求对象最后一次的修改时间，用来判断缓存是否过期，通常由文件的时间信息产生。

If-Modified-Since：客户端发送请求附带的信息，指浏览器缓存请求对象的最后修改日期，用来和服务器端的 Last-Modified 做比较。

------

**说一下 HTTP 协议头字段说上来几个，是否尽可能详细的掌握 HTTP 协议。**

HTTP 协议头字段

- HTTP 的头域包括 `通用头，请求头，响应头和实体头` 四个部分。
- 每个头域由一个域名，冒号（:）和域值三部分组成。
- 域名是大小写无关的，域值前可以添加任何数量的空格符，头域可以被扩展为多行，在每行开始处，使用至少一个空格或制表符。

HTTP 协议

- HTTP 是超文本传输协议的缩写，它用于传送 WWW 方式的数据。
- HTTP 协议采用了请求/响应模型。
- 客户端向服务器发送一个请求，请求头包含请求的方法、URI、协议版本、以及包含请求修饰符、客户 信息和内容的类似于 MIME 的消息结构。
- 服务器以一个状态行作为响应，相应的内容包括消息协议的版本，成功或者错误编码加上包含服务器信息、实体元信息以及可能的实体内容。

------

**一次完整的 HTTP 事务是怎样的一个过程 ？**

- 域名解析
- 发起 TCP 的 3 次握手
- 建立 TCP 连接后发起 http 请求
- 服务器响应 http 请求，浏览器得到 html 代码
- 浏览器解析 html 代码，并请求 html 代码中的资源（如 js、css、图片等）
- 浏览器对页面进行渲染呈现给用户

详情过程请看：[面试题之从敲入 URL 到浏览器渲染完成](https://juejin.im/post/5b9ba9c15188255c8320fe27)

------

**HTTP 状态码知道哪些 ？**

- 100 Continue 继续，一般在发送 post 请求时，已发送了 http header 之后服务端将返回此信息，表示确认，之后发送具体参数信息。
- `200` OK 正常返回信息 。
- 201 Created 请求成功并且服务器创建了新的资源 。
- 202 Accepted 服务器已接受请求，但尚未处理 。
- 301 Moved Permanently 请求的网页已永久移动到新位置。
- 302 Found 临时性重定向。
- 303 See Other 临时性重定向，且总是使用 GET 请求新的 URI。
- 304 Not Modified 自从上次请求后，请求的网页未修改过。
- `400` Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
- `401` Unauthorized 请求未授权。
- `403` Forbidden 禁止访问。
- `404` Not Found 找不到如何与 URI 相匹配的资源。
- `500` Internal Server Error 最常见的服务器端错误。
- `503` Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。

------

**axios 的特点有哪些 ？**

- axios 是一个基于 promise 的 HTTP 库，支持 promise 的所有 API
- 它可以拦截请求和响应
- 它可以转换请求数据和响应数据，并对响应回来的内容自动转换为 json 类型的数据
- 它安全性更高，客户端支持防御 XSRF

------

相关文章：

- [TCP 协议和 UDP 协议的特点和区别](https://blog.csdn.net/lzj2504476514/article/details/81454754)
- [(纯干货)HTTP／1.0／1.1／2.0的区别以及http和https的区别](https://www.cnblogs.com/NightTiger/p/11334314.html)
- [http & https & http2.0](https://www.cnblogs.com/colima/p/7295771.html)