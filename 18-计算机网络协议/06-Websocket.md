# 零距离接触websocket🚀

### 什么是WebSocket

#### 定义

Websocket是一个持久化的网络通信协议，可以在单个 TCP 连接上进行`全双工通讯`，没有了`Request`和`Response`的概念，两者地位完全平等，连接一旦建立，客户端和服务端之间实时可以进行双向数据传输

#### 关联和区别

- **HTTP**

1. HTTP是非持久的协议，客户端想知道服务端的处理进度只能通过不停地使用 `Ajax`进行轮询或者采用 `long poll` 的方式来，但是前者对服务器压力大，后者则会因为一直等待Response造成阻塞 ![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2308134eee1949129438e15b945792b9~tplv-k3u1fbpfcp-zoom-1.image)
2. 虽然http1.1默认开启了`keep-alive`长连接保持了这个`TCP通道`使得在一个HTTP连接中，可以发送多个Request，接收多个Response，但是一个request只能有一个response。而且这个response也是被动的，不能主动发起。
3. websocket虽然是独立于HTTP的一种协议，但是websocket必须依赖 HTTP 协议进行一次`握手`(在握手阶段是一样的)，握手成功后，数据就直接从 TCP通道传输，与 HTTP 无关了，可以用一张图理解两者有交集，但是并不是全部。 ![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93f1390c965f4bb28f97eeced69652d0~tplv-k3u1fbpfcp-zoom-1.image)

- **socket**

1. socket也被称为`套接字`，与HTTP和WebSocket不一样，socket不是协议，它是在程序层面上对传输层协议（可以主要理解为TCP/IP）的接口封装。可以理解为一个能够提供端对端的通信的调用接口（API）
2. 对于程序员而言，其需要在 A 端创建一个 socket 实例，并为这个实例提供其所要连接的 B 端的 IP 地址和端口号，而在 B 端创建另一个 socket 实例，并且绑定本地端口号来进行监听。当 A 和 B 建立连接后，双方就建立了一个端对端的 TCP 连接，从而可以进行双向通信。WebSocekt借鉴了 socket 的思想，为 client 和 server 之间提供了类似的双向通信机制

#### 应用场景

WebSocket可以做弹幕、消息订阅、多玩家游戏、协同编辑、股票基金实时报价、视频会议、在线教育、聊天室等应用实时监听服务端变化

### Websocket握手

- Websocket握手请求报文：

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
复制代码
```

下面是与传统 HTTP 报文不同的地方：

```
Upgrade: websocket
Connection: Upgrade
复制代码
```

表示发起的是 WebSocket 协议

```
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
复制代码
```

**Sec-WebSocket-Key** 是由浏览器随机生成的，验证是否可以进行Websocket通信，防止恶意或者无意的连接。

**Sec_WebSocket-Protocol** 是用户自定义的字符串，用来标识服务所需要的协议

**Sec-WebSocket-Version** 表示支持的 WebSocket 版本。

- 服务器响应：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
复制代码
```

**101 响应码** 表示要转换协议。

**Connection: Upgrade** 表示升级新协议请求。

**Upgrade: websocket** 表示升级为 WebSocket 协议。

**Sec-WebSocket-Accept** 是经过服务器确认，并且加密过后的 Sec-WebSocket-Key。用来证明客户端和服务器之间能进行通信了。

**Sec-WebSocket-Protocol** 表示最终使用的协议。

至此，客户端和服务器握手成功建立了Websocket连接，HTTP已经完成它所有工作了，接下来就是完全按照Websocket协议进行通信了。

### 关于Websocket

#### WebSocket心跳

可能会有一些未知情况导致SOCKET断开，而客户端和服务端却不知道，需要客户端定时发送一个`心跳 Ping` 让服务端知道自己在线，而服务端也要回复一个`心跳 Pong`告诉客户端自己可用，否则视为断开

#### WebSocket状态

WebSocket 对象中的readyState属性有四种状态：

- 0: 表示正在连接
- 1: 表示连接成功，可以通信了
- 2: 表示连接正在关闭
- 3: 表示连接已经关闭，或者打开连接失败

### WebSocket实践

#### 服务端接收发送消息

WebSocket的服务端部分，本文会以Node.js搭建

安装`express`和负责处理WebSocket协议的`ws`：

```
npm install express ws
复制代码
```

安装成功后的package.json:

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6d06563f597411698f354acd4eda279~tplv-k3u1fbpfcp-zoom-1.image)

接着在根目录创建server.js文件:

```
//引入express 和 ws
const express = require('express');
const SocketServer = require('ws').Server;

//指定开启的端口号
const PORT = 3000;

// 创建express，绑定监听3000端口，且设定开启后在consol中提示
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));

// 将express交给SocketServer开启WebSocket的服务
const wss = new SocketServer({ server });

//当 WebSocket 从外部连接时执行
wss.on('connection', (ws) => {
  //连接时执行此 console 提示
  console.log('Client connected');

  // 对message设置监听，接收从客户端发送的消息
  ws.on('message', (data) => {
    //data为客户端发送的消息，将消息原封不动返回回去
    ws.send(data);
  });

  // 当WebSocket的连接关闭时执行
  ws.on('close', () => {
    console.log('Close connected');
  });
});
复制代码
```

执行node server.js启动服务，端口打开后会执行监听时间打印提示，说明服务启动成功

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c183ba66addf4e05ac592959ed9f88c6~tplv-k3u1fbpfcp-zoom-1.image)

在开启WebSocket后，服务端会在message中监听，接收参数data捕获客户端发送的消息，然后使用send发送消息

#### 客户端接收发送消息

分别在根目录创建index.html和index.js文件

- index.html

```
<html>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
复制代码
```

- index.js

```
// 使用WebSocket的地址向服务端开启连接
let ws = new WebSocket('ws://localhost:3000');

// 开启后的动作，指定在连接后执行的事件
ws.onopen = () => {
  console.log('open connection');
};

// 接收服务端发送的消息
ws.onmessage = (event) => {
  console.log(event);
};

// 指定在关闭后执行的事件
ws.onclose = () => {
  console.log('close connection');
};
复制代码
```

上面的`url`就是本机`node`开启的服务地址，分别指定连接（onopen），关闭（onclose）和消息接收（onmessage）的执行事件，访问html，打印ws信息

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cb22cc2e46c43a4bdf87f6095cb8d54~tplv-k3u1fbpfcp-zoom-1.image)

打印了`open connection`说明连接成功，客户端会使用`onmessage`处理接收

其中`event`参数包含这次沟通的详细信息，从服务端回传的消息会在event的data属性中。

手动在控制台调用`send`发送消息，打印event回传信息:

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c7d7bbb10d0464cbe37ddb4e5b36d21~tplv-k3u1fbpfcp-zoom-1.image)

#### 服务端定时发送

上面是从客户端发送消息，服务端回传。我们也可以通过`setInterval`让服务端在固定时间发送消息给客户端:

server.js修改如下:

```
//当WebSocket从外部连接时执行
wss.on('connection', (ws) => {
  //连接时执行此 console 提示
  console.log('Client connected');

+  //固定发送最新消息给客户端
+  const sendNowTime = setInterval(() => {
+    ws.send(String(new Date()));
+  }, 1000);

-  //对message设置监听，接收从客户端发送的消息
-  ws.on('message', (data) => {
-    //data为客户端发送的消息，将消息原封不动返回回去
-    ws.send(data);
-  });

  //当 WebSocket的连接关闭时执行
  ws.on('close', () => {
    console.log('Close connected');
  });
});
复制代码
```

客户端连接后就会定时接收，直至我们关闭websocket服务

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d17c7333f0a4c428b22e9bf85ab3781~tplv-k3u1fbpfcp-zoom-1.image)

#### 多人聊天

如果多个客户端连接按照上面的方式只会返回各自发送的消息，先注释服务端定时发送，开启两个窗口模拟：

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c770e9d0ebd415abeb5686bcfc31d0b~tplv-k3u1fbpfcp-zoom-1.image)

如果我们要让客户端间消息共享，也同时接收到服务端回传的消息呢？

我们可以使用`clients`找出当前所有连接中的客户端 ，并通过回传消息发送到每一个客户端 中：

修改server.js如下:

```
...

//当WebSocket从外部连接时执行
wss.on('connection', (ws) => {
  //连接时执行此 console 提示
  console.log('Client connected');

-  //固定发送最新消息给客户端
-  const sendNowTime = setInterval(() => {
-    ws.send(String(new Date()));
- }, 1000);

+  //对message设置监听，接收从客户端发送的消息
+   ws.on('message', (data) => {
+    //取得所有连接中的 客户端
+    let clients = wss.clients;
+    //循环，发送消息至每个客户端
+    clients.forEach((client) => {
+      client.send(data);
+    });
+   });

  //当WebSocket的连接关闭时执行
  ws.on('close', () => {
    console.log('Close connected');
  });
});
复制代码
```

这样一来，不论在哪个客户端发送消息，服务端都能将消息回传到每个客户端 ： ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/007495393def4861a410d314a5b49a4e~tplv-k3u1fbpfcp-zoom-1.image) 可以观察下连接信息: ![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a17ca22d9b1645e7a3f723b082e721fa~tplv-k3u1fbpfcp-zoom-1.image)

![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcb4d122ba4c4445a4814041620a569e~tplv-k3u1fbpfcp-zoom-1.image)

### 总结 🥇

**纸上得来终觉浅，绝知此事要躬行**，希望大家可以把理论配合上面的实例进行消化，搭好服务端也可以直接使用[测试工具](http://www.easyswoole.com/wstool.html)好好玩耍一波

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b05457faf0ba45f38fbc876f4bbc8585~tplv-k3u1fbpfcp-zoom-1.image)

### 参考文章 📜

❤️ [阮一峰-WebSocket 教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

❤️ [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

❤️ [WebSocket 是什么原理？为什么可以实现持久连接？](https://www.zhihu.com/question/20215561/answer/40316953)

### 扩展 🏆

如果你觉得本文对你有帮助，可以查看我的其他文章❤️：

👍 [Web开发应了解的5种设计模式🍊](https://juejin.im/post/6859506910652006414)

👍 [10个简单的技巧让你的 vue.js 代码更优雅🍊](https://juejin.im/post/6854573215969181703)

👍 [Web开发应该知道的数据结构🍊](https://juejin.im/post/6866970001409064967)

👍 [经典面试题！从输入URL到页面展示你还不赶紧学起来？🍊](https://juejin.im/post/6858551640220729351)

👍 [浅谈SSL协议的握手过程🍊](https://juejin.im/post/6856595606677716999)



## 二 前言

> [返回目录](#chapter-one)

`WebSocket` 是 `HTML5` 新增的一种全双工通信协议，客户端和服务器基于 TCP 握手连接成功后，两者之间就可以建立持久性的连接，实现双向数据传输。

## 三 WebSocket 和 HTTP

> [返回目录](#chapter-one)

我们知道 `HTTP` 协议是一种单向的网络协议，在建立连接后，它允许客户端向服务器发送请求资源后，服务器才会返回相应的数据，而服务器不能主动推送数据给客户端。

当时为什么这样设计呢？假设一些不良广告商主动将一些信息强行推送给客户端，这不得不说是一个灾难。

所以现在我们要做股票的实时行情，或者获取火车票的剩余票数等，就需要客户端和服务器之间反复地进行 `HTTP` 通讯，客户端不断地发送 `GET` 请求，去获取当前的实时数据。

下面介绍几种常见的方式。

### 3.1 （短）轮询（Polling）

> [返回目录](#chapter-one)

短轮询模式下，客户端每隔一段时间向服务器发送 `HTTP` 请求。

服务器收到请求后，将最新的数据发回给客户端。

这种情况下的弊端是非常明显的：某个时间段服务器没有更新内容，但是客户端每隔一段时间发送请求来询问，而这段时间内的请求是无效的。

这就导致了网络带宽的浪费。

### 3.2 长轮询

> [返回目录](#chapter-one)

长轮询模式下，客户端向服务器发出请求，服务器并不一定会立即回应客户端，而是查看数据是否有更新。

如果数据更新了的话，那就立即发送数据给客户端；如果没有更新，那就保持这个请求，等待有新的数据到来，才将数据返回给客户端。

如果服务器长时间没有更新，那么一段时间后，请求变会超时，客户端收到消息后，会立即发送一个新的请求给服务器。

当然这种方式也有弊端：当服务器向客户端发送数据后，必须等待下一次请求才能将新的数据发出，这样客户端接收新数据就有一个最短时间间隔。

如果服务器更新频率较快，那么就会出现问题。

### 3.3 WebSocket

> [返回目录](#chapter-one)

基于前面的情况，为了彻底解决服务器主动向客户端发送数据的问题。

`W3C` 在 `HTML5` 中提供了一种让客户端与服务器之间进行全双工通讯的网络技术 `WebSocket`。

`WebSocket` 基于 `TCP` 协议，是一种全新的、独立的协议，与 `HTTP` 协议兼容却不会融入 `HTTP` 协议，仅仅作为 `HTML5` 的一部分。

### 3.4 两者比对

> [返回目录](#chapter-one)

基于上面，小伙伴们大概了解了 `WebSocket` 的缘由了，这里再总结对比一下 `HTTP` 和 `WebSocket`。

- 相同点

1. 都需要建立 `TCP` 连接
2. 都属于七层协议中的应用层协议

- 不同点

1. `HTTP` 是单向数据流，客户端向服务器发送请求，服务器响应并返回数据；`WebSocket` 连接后可以实现客户端和服务器双向数据传递，除非某一端断开连接。
2. `HTTP` 的 `url` 使用 `http//` 或者 `https//` 开头，而 `WebSocket` 的 `url` 使用 `ws//` 开头

## 四 Socket.io

> [返回目录](#chapter-one)

我们先来看 `WebSocket` 的一个使用方式：

```js
const ws = new WebSocket("ws//:xxx.xx", [protocol])

ws.onopen = () => {
  ws.send('hello')
  console.log('send')
}

ws.onmessage = (ev) =>{
  console.log(ev.data)
  ws.close()
}

ws.onclose = (ev) =>{
  console.log('close')
}

ws.onerror = (ev) =>{
  console.log('error')
}
复制代码
```

`WebSocket` 实例化后，前端可以通过上面介绍的方法进行对应的操作，看起来还是蛮简单的。

但是，如果想完全搭建一个 `WebSocket` 服务端比较麻烦，又浪费时间。

所以：`Socket.io` 基于 `WebSocket`，加上轮询机制以及其他的实时通讯方面的内容，实现的一个库，它在服务端实现了实时机制的响应代码。

也就是说，`WebSocket` 仅仅是 `Socket.io` 实现通讯的一个子集。

因此，`WebSocket` 客户端连接不上 `Socket.io` 服务端，`Socket.io` 客户端也连不上 `WebSocket` 服务端。

下面我们讲解下如何实现一个简单的聊天。

### 4.1 服务端代码

> [返回目录](#chapter-one)

> package.json

```json
{
  "devDependencies": {
    "express": "^4.15.2",
    "socket.io": "^2.3.0"
  }
}

复制代码
```

> index.js

```js
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let path = require('path');

app.use('/', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

// 开启 socket.io
io.on('connection', (client) => {

  // 如果有新客户端进来，显示 ID
  console.log(`客户端 ID：${client.id}`);

  // 监听客户端的输入信息
  client.on('channel', (data) => {
    console.log(`客户端 ${client.id} 发送信息 ${data}`);
    io.emit('broadcast', data);
  });

  // 判断客户端是否关闭
  client.on('disconnect', () => {
    console.log(`客户端关闭：${client.id}`);
  });
});

server.listen(3000, () => {
  console.log('服务监听 3000 端口');
});
复制代码
```

如上，我们直接通过 `npm i` 安装依赖包后，直接通过 `node index.js` 可以开启服务。

当然，如果小伙伴们想手动装包，执行下面命令即可：

```shell
npm i express socket.io express -D
复制代码
```

### 4.2 客户端代码

> [返回目录](#chapter-one)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Socket.io</title>
  <script src="https://cdn.bootcss.com/socket.io/2.2.0/socket.io.slim.js"></script>
</head>

<body>

  <input type="text" id="input">
  <button id="btn">send</button>
  <div id="content-wrap"></div>

  <script>
    window.onload = function () {
      let inputValue = null;

      // 连接 socket.io
      let socket = io('http://localhost:3000');
      // 将创建的信息以添加 p 标签的形式展示成列表
      socket.on('broadcast', data => {
        let content = document.createElement('p');
        content.innerHTML = data;
        document.querySelector('#content-wrap').appendChild(content);
      })

      // 设置输入框的内容
      let inputChangeHandle = (ev) => {
        inputValue = ev.target.value;
      }
      // 获取输入框并监听输入
      let inputDom = document.querySelector("#input");
      inputDom.addEventListener('input', inputChangeHandle, false);

      // 当用户点击发送信息的时候，进行数据交互
      let sendHandle = () => {
        socket.emit('channel', inputValue);
      }
      let btnDom = document.querySelector("#btn");
      btnDom.addEventListener('click', sendHandle, false);

      // 打页面卸载的时候，通知服务器关闭
      window.onunload = () => {
        btnDom.removeEventListener('click', sendHandle, false);
        inputDom.removeEventListener('input', inputChangeHandle, false);
      }
    };
  </script>
</body>

</html>
复制代码
```

### 4.3 小结

> [返回目录](#chapter-one)

`Socket.io` 不仅支持 `WebSocket`，还支持许多种轮询机制以及其他实时通信方式，并封装了通用的接口。

这些方式包含 `Adobe Flash Socket`、`Ajax` 长轮询、`Ajax multipart streaming`、持久 `Iframe`、`JSONP` 轮询等。

换句话说，当 `Socket.io` 检测到当前环境不支持 `WebSocket` 时，能够自动地选择最佳的方式来实现网络的实时通信。

这样，我们就对 `WebSocket` 有一定的了解，面试的时候就不慌了。

## 五 参考文献

> [返回目录](#chapter-one)

-  [websocket 与Socket.IO介绍](https://www.cnblogs.com/mazg/p/5467960.html)【阅读建议：10min】
-  [WebSocket 与 Socket.IO](https://zhuanlan.zhihu.com/p/23467317)【阅读建议：10min】
-  [Websocket和Socket.io的区别及应用](https://www.jianshu.com/p/970dcfd174dc)【阅读建议：20min】


作者：jsliang
链接：https://juejin.cn/post/6900433558054109198
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# socket.io 原理详解

> 在[上一篇文章中](https://juejin.im/post/6844903768044077069)，我们了解到 `socket.io` 是 基于`engine.io` 进行封装的库。 所以对`engine.io`不清楚的童鞋可以点击进行了解: [engine.io 详解](https://juejin.im/post/6844903768044077069)

## 1.概述

------

`socket.io` 是基于 [Websocket](https://html.spec.whatwg.org/multipage/web-sockets.html#the-websocket-interface) 的Client-Server 实时通信库。 `socket.io` 底层使用`engine.io` 封装了一层协议。

两者的依赖关系可参考: [package.json](https://github.com/socketio/socket.io-client/blob/master/package.json)

## 2. WebSocket 简介

------

`Websocket 定义` [参考规范 rfc6455](https://tools.ietf.org/html/rfc6455)

**规范解释** `Websocket` 是一种提供客户端(提供不可靠秘钥)与服务端(校验通过该秘钥)进行**双向通信**的协议。

在没有`websocket`协议之前，要提供客户端与服务端实时**双向推送**消息，就会使用`polling`技术，客户端通过`xhr`或`jsonp` **发送**消息给服务端，并通过事件回调来**接收**服务端消息。

这种技术虽然也能保证双向通信，但是有一个不可避免的问题，就是**性能问题**。客户端不断向服务端发送请求，如果客户端并发数过大，无疑导致服务端压力剧增。因此，`websocket`就是解决这一痛点而诞生的。

这里再延伸一些名词:

- **长轮询** 客户端向服务端发送`xhr`请求,服务端接收并`hold`该请求，直到有新消息`push`到客户端，才会主动断开该连接。然后，客户端处理该`response`后再向服务端发起新的请求。以此类推。

> ```
> HTTP1.1`默认使用长连接，使用长连接的`HTTP`协议，会在响应头中加入下面这行信息: `Connection:keep-alive
> ```

- **短轮询**:

客户端不管是否收到服务端的`response`数据，都会定时想服务端发送请求，查询是否有数据更新。

- **长连接** 指在一个`TCP`连接上可以发送多个数据包，在`TCP`连接保持期间，如果没有数据包发送，则双方就需要发送`心跳包`来维持此连接。

> 连接过程: 建立连接——数据传输——...——(发送心跳包，维持连接)——...——数据传输——关闭连接

- **短连接** 指通信双方有数据交互时，建立一个`TCP`连接，数据发送完成之后，则断开此连接。

> 连接过程: 建立连接——数据传输——断开连接——...——建立连接——数据传输——断开连接

**Tips**

> 这里有一个**误解**，长连接和短连接的概念本质上指的是传输层的`TCP`连接，因为`HTTP1.1`协议以后，连接默认都是长连接。没有短连接说法(`HTTP1.0`默认使用短连接)，网上大多数指的长短连接实质上说的就是`TCP`连接。 `http`使用长连接的好处: 当我们请求一个网页资源的时候，会带有很多`js`、`css`等资源文件，如果使用的时短连接的话，就会打开很多`tcp`连接，如果客户端请求数过大，导致`tcp`连接数量过多，对服务端造成压力也就可想而知了。

- **单工** 数据传输的方向唯一，只能由发送方向接收方的单一固定方向传输数据。
- **半双工** 即通信双方既是接收方也是发送方，不过，在某一时刻只能允许向一个方向传输数据。
- **全双工**: 即通信双方既是接收方也是发送方，两端设备可以同时发送和接收数据。

**Tips**

> **单工**、**半双工**和**全双工** 这三者都是建立在 `TCP`协议(传输层上)的概念，不要与应用层进行混淆。

## 3. 什么是Websocket

------

`Websocket` 协议也是基于`TCP`协议的，是一种双全工通信技术、复用`HTTP`握手通道。

`Websocket`默认使用请求协议为:`ws://`,默认端口:`80`。对`TLS`加密请求协议为:`wss://`，端口:`443`。

### 3.1 特点

- **支持浏览器/Nodejs环境**
- **支持双向通信**
- **API简单易用**
- **支持二进制传输**
- **减少传输数据量**

### 3.2 建立连接过程

`Websocket`复用了`HTTP`的握手通道。指的是，客户端发送`HTTP`请求，并在请求头中带上`Connection: Upgrade` 、`Upgrade: websocket`，服务端识别该header之后，进行协议升级，使用`Websocket`协议进行数据通信。



![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/4/6/169f1656159c8519?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



**参数说明**

- `Request URL` 请求服务端地址
- `Request Method` 请求方式 (支持get/post/option)
- `Status Code` 101 Switching Protocols

[RFC 7231 规范定义](https://tools.ietf.org/html/rfc7231#section-6.2.2)

> 规范解释: 当收到101请求状态码时，表明服务端理解并同意客户端请求，更改`Upgrade` header字段。服务端也必须在`response`中，生成对应的`Upgrade`值。

- `Connection` 设置`upgrade` header,通知服务端，该`request`类型需要进行升级为`websocket`。 [upgrade_mechanism 规范](https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism)
- `Host` 服务端 hostname
- `Origin` 客户端 hostname:port
- `Sec-WebSocket-Extensions` 客户端向服务端发起请求扩展列表(list)，供服务端选择并在响应中返回
- `Sec-WebSocket-Key` 秘钥的值是通过规范中定义的算法进行计算得出，因此是不安全的，但是可以阻止一些误操作的websocket请求。
- `Sec-WebSocket-Accept` 计算公式: 1. 获取客户端请求header的值: `Sec-WebSocket-Key` 2. 使用魔数magic = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11' 3. 通过`SHA1`进行加密计算, sha1(Sec-WebSocket-Key + magic) 4. 将值转换为base64
- `Sec-WebSocket-Protocol` 指定有限使用的Websocket协议，可以是一个协议列表(list)。服务端在`response`中返回列表中支持的第一个值。
- `Sec-WebSocket-Version` 指定通信时使用的Websocket协议版本。最新版本:13,[历史版本](https://www.iana.org/assignments/websocket/websocket.xml#version-number)
- `Upgrade` 通知服务端，指定升级协议类型为`websocket`

### 3.3 数据帧格式

数据格式定义参考：[规范 RFC6455](https://tools.ietf.org/html/rfc6455#section-5.2)

```
  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |     Extended payload length continued, if payload len == 127  |
 + - - - - - - - - - - - - - - - +-------------------------------+
 |                               |Masking-key, if MASK set to 1  |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |                     Payload Data continued ...                |
 +---------------------------------------------------------------+
复制代码
```

- `FIN`: 1 bit 如果该位值为1，表示这是`message`的最终片段(`fragment`)，如果为0，表示这是一个`message`的第一个片段。
- `RSV1, RSV2, RSV3`: 各占1 bit 一般默认值是0，除非协商扩展，为非零值进行定义，否则收到非零值，并且没有进行协商扩展定义，则`websocket`连接失败。
- `Opcode`: 4 bits 根据操作码(`Opcode`),解析有效载荷数据(`Payload data`).如果接受到未定义操作码，则应该断开`websocket`连接。
- `Mask`: 1 bit 定义是否需要的载荷数据(``Payload data)，进行掩码操作。如果设置值为1，那么在`Masking-key`中会定义一个掩码key,并用这个key对载荷数据进行反掩码(`unmask`)操作。所有从客户端发送到服务端的数据帧(`frame`),mask都被设置为1.
- `Payload length`: 7 bits, 7+16 bits, or 7+64 bits 载荷数据的长度。
- `Masking-key`: 0 or 4 bytes 所有从客户端传送到服务端的数据帧，数据载荷都进行了掩码操作，Mask为1，且携带了4字节的Masking-key。如果Mask为0，则没有Masking-key。
- `Payload data`: (x+y) bytes

### 3.4 心跳检测

为了确保客户端与服务端的长连接正常，有时即使客户端连接中断，但是服务端未触发`onclose`事件，这就有可能导致无效连接占用。所以需要一种机制，确保两端的连接处于正常状态，**心跳检测**就是这种机制。客户端每隔一段时间，会向服务端发送**心跳**(数据包)，服务端也会返回`response`进行反馈连接正常。

## 4. socket.io 简介

------

`socket.io`与`engine.io`的一大区别在于，`socket.io`并不直接提供连接功能，而是在`engine.io`层提供。

`socket.io`提供了一个**房间**(`Namespace`)概念。当客户端创建一个新的长连接时，就会分配一个新的`Namespace`进行区分。



![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/1/26/1688a7bbbe59d2b5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



根据流程图，可以看出:

- 创建长连接的方式有三种: `websocket`、`xhr`、`jsonp`。其中，后两种使用长轮询的方式进行模拟。
- 所谓的长轮询是指，客户端发送一次`request`，当服务端有消息推送时会push一条`response`给客户端。客户端收到`response`后，会再次发送`request`，重复上述过程，直到其中一端主动断开连接为止。

```
// lookup 源码
var parsed = url(uri)
var source = parsed.source
var id = parsed.id
var path = parsed.path
// 查找相同房间
var sameNamespace = cache[id] && path in cache[id].nsps
// 如果房间号已存在，创建新连接
var newConnection = sameNamespace
// ...
复制代码
```

`socket.io`也提供支持多路复用(`built-in multiplexing`)方式，这表明每一个数据包(`Packet`)都始终属于给定的`namespace`，并有`path`进行标识(例如: `/xxxx`)

`socket.io`可以在 `open` 之前，`emit` 消息，并且该消息会在 `open` 之后发出。而`engine.io`必须等到`open` 之后，才能 `send`消息。

`socket.io`也支持断网重连(`reconnection`)功能。

## 5. socket.io 工作流程

> 当使用`socket.io`创建一个长连接时，到底发生了什么呢?下面我们就来进入本文的正体:

```
const socket = io('http://localhost', {
  path: '/myownpath'
});
复制代码
```

首先，`socket.io`通过一个`http`请求,并且该请求头中带有升级协议(`Connection:Upgrade`、`Upgrade:websocket`)等信息，告诉服务端准备建立连接，此时，后端返回的`response`数据。 **数据格式如下**:

```
0{"sid":"ab4507c4-d947-4deb-92e4-8a9e34a9f0b2","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":60000}
复制代码
```

- **0**: 代表`open`标识
- **sid**: session id
- **upgrades**: 升级协议类型
- **pingInterval**： `ping`的间隔时长
- **pingTimeout**： 判断连接超时时长

当客户端收到响应之后，`scoket.io`会根据当前客户端环境是否支持`Websocket`。如果支持，则建立一个`websocket`连接，否则使用`polling`(`xhr`、`jsonp`)长轮询进行**双向数据通信**。

## 6. socket.io 协议解析

`socket.io`协议中定义的数据格式称之为`Pakcet` ，每一个`Packet`都含有`nsp`的对象值。



![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/4/6/169f165615aad5bc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



**Packet**

编码包可以是**UTF8**或**二进制**数据，编码格式如下:

> <**包类型id**>[<**data**>]

例如:

> 2probe

包类型id(packet type id)是一个整型，具体含义如下:

- **0 open** 当打开一个新传输时，服务端检测并发送
- **1 close** 请求关闭传输，但不是主动断开连接
- **2 ping** 客户端发出，服务端应该返回包含相同数据的`pong` packet进行应答
- **3 pong** 服务端发出，用以响应客户端的`ping` packet
- **4 message** 真实数据，客户端和服务端应该调用回调中的`data`

```
// 服务端发送 
send('4HelloWorld')
// 客户端接收数据并调用回调 
socket.on('message', function (data) { console.log(data); });
// 客户端发送 
send('4HelloWorld')
// 服务端接收数据并调用回调 
socket.on('message', function (data) { console.log(data); })
复制代码
```

- **5 upgrade** 在`engine.io`切换传输之前，它会测试服务器和客户端是否可以通过此传输进行通信。如果此测试成功，客户端将发送升级数据包，请求服务器刷新旧传输上的缓存并切换到新传输。

- 6 noop

   

  ```
  noop
  ```

   

  packet。主要用于在收到传入的

  ```
  websocket
  ```

  连接时强制轮询周期。

  1. 客户端通过新的传输连接
  2. 客户端发送 `2send`
  3. 服务端接收并发送 `3probe`
  4. 客户端结束并发送 `5`
  5. 服务端刷新并关闭旧的传输连接并切换到新传输连接

## 7. socket.io 全家桶

------



![在这里插入图片描述](https://user-gold-cdn.xitu.io/2019/4/6/169f165615fbc8e8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



**区别**

- [engine.io-parser](https://github.com/socketio/engine.io-parser) `engine.io`协议编码的js解析器。[engine.io 协议规范](https://github.com/socketio/engine.io-protocol)
- [socket.io](https://github.com/socketio/socket.io)
- [socket.io-client](https://github.com/socketio/socket.io-client)
- [socket.io-parser](https://github.com/socketio/socket.io-parser)
- [socket.io-adapter](https://github.com/socketio/socket.io-adapter)
- [socket.io-redis](https://github.com/socketio/socket.io-redis)
- [engine.io](https://github.com/socketio/engine.io)
- [engine.io-client](https://github.com/socketio/engine.io-client)