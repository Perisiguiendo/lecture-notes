# NodeJS 事件循环（第一部分）- 事件循环机制概述

[![前端平头哥](https://pic1.zhimg.com/v2-c93c40fb5663d6613f7c2e23dd82610d_xs.jpg?source=172ae18b)](https://www.zhihu.com/people/pengfuxiao)

[前端平头哥](https://www.zhihu.com/people/pengfuxiao)

经济，商业，营销，编程

关注他

20 人赞同了该文章

[原文链接](https://link.zhihu.com/?target=https%3A//jsblog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810)

## 文章系列路线图

- [NodeJS 事件循环（第一部分）- 事件循环机制概述](https://zhuanlan.zhihu.com/p/37427130/edit)
- [NodeJS 事件循环（第二部分）- Timers，Immediates，nextTick](https://zhuanlan.zhihu.com/p/37563244)
- [Nodejs 事件循环（第三部分）- Promise，nextTicks，immediate](https://zhuanlan.zhihu.com/p/37714012)
- [NodeJS 事件循环（第四部分）- 处理 IO](https://zhuanlan.zhihu.com/p/37756195)
- [NodeJS 事件循环（第五部分）- 最佳实践](https://zhuanlan.zhihu.com/p/37793218)



处理 I/O 方式的不同使得 Node.js 区别于其他的编程平台。我们一直听过这样的说法，在某人介绍 Node.js 说道 “一个基于 google v8 JavaScript 引擎的非阻塞，事件驱动的平台”。他们要表达的是什么？“非阻塞”和“事件驱动”是什么意思？所有这些问题的答案涉及到 NodeJs 的核心，事件驱动。在这个系列中，我将描述下 什么是事件驱动，它是如何工作的，如何影响我们的应用的，及如何有效的使用等等。为什么是一系列而不是一篇文章？如果它是一篇长篇文章并且肯定会错过某些东西。因此我写了一系列。在这篇文章中，我将会描述下 NodeJs 是如何工作的，如何访问 I/O 的，怎么与其他不同的平台工作的等等。

**反应器模式（Reactor Pattern）**

*译者注：反应器模式与观察者模式在某些方面极为相似：当一个主体发生改变时，所有依属体都得到通知。不过，观察者模式与单个事件源关联，而反应器模式则与多个事件源关联 。*

NodeJs 在一个事件驱动的模型中工作，涉及到一个**事件多路分用器（Event Demultiplexer）** 和一个**事件队列（Event Queue）**。所有的 I/O 请求最终会生成一个成功或失败的事件或其他的触发器，叫做**事件（Event）**。根据下面这些算法处理这些事件。

1. 事件多路分用器接受 I/O 请求并且委托这些请求给适当的硬件。
2. 一旦 I/O 请求处理了（例如：一个文件里里面的数据可以读取，从一个 socket 的数据可以读取等），事件多路分用器为在一个需要处理的队列中的特定行为添加注册的回调处理器。这些回调被称为事件，事件添加的队列被称为**事件队列**。
3. 当在一个事件队列中有可以处理的事件的时候，会按接受它们的顺序循环执行，直到队列为空。
4. 如果在事件队列中没有事件或者事件多路分用器没有即将发生的请求，程序会完成。否则，这个过程会从第一步开始继续。

协调整个机制的程序被称为事件循环（**Event Loop**）。

![img](https://pic2.zhimg.com/80/v2-5466e47b391ba0d53854b8d07042cbb1_720w.jpg)

事件循环是单线程的和半无限循环。因为当没有更多的工作要做的时候会在某些时候退出，这就是为什么称为半无限循环的原因。在开发者的视角，这就是程序退出的地方。

> *注意: 不要对事件循环和 NodeJs 事件触发感到迷惑。事件触发器跟这个机制相比完全是另一个不同的概念。在之后的文章中，我将会解释事件触发器是如何通过事件循环影响事件处理过程的。*

上面的图解是 NodeJs 如何工作的一个抽象的概述，展示了反应器模式的主要组件。但是比这个要复杂的多，到底有多复杂？

> *事件多路分发器不是在所有的系统平台上面处理所有的 I/O 类型的一个单组件。*
> *事件队列并不是像这里展示的那样，所有类型的事件从一个单一的队列入队和出队。并且 I/O 不是唯一正在排队的事件类型。*

因此，让我们更深入些。

## 事件多路分发器

事件多路分发器在真实世界中存在的组件，而是反应器模式中一个抽象的概念。在现实世界中，事件多路分发器在不同的系统中实现，名字不同。比如在 Linux 中 **epoll**，在 BSD（MacOS） 系统中是 **kqueue**，在 Solaris 中 **event ports**，在 windows 系统中是 **IOCP（Input Output Completion Port）**等等。NodeJS 消费被那些实现的低级，非阻塞，异步的硬件 I/O 能力。

## 文件 I/O 的复杂性

但令人困惑的事实，并不是所有类型的 I/O 可以使用这些实现执行。甚至在一样的操作系统平台上，支持不同类型的 I/O 也有着复杂性。典型的，网络 I/O 使用这些 epoll 和 kqueu，events ports 和 IOCP 可以以非阻塞的方式执行。但是文件 I/O 更加复杂。特定的系统，如 Linux 不支持异步完成文件系统访问。并且在 MacOS 系统上面使用 kquue 的文件系统事件通知和信号有很多局限性。很复杂，几乎不可能解决所有这些文件系统的复杂性以提供完整的异步。

## DNS 的复杂性

与文件 I/O 相似，某些被 Node API 提供的 DNS 功能节点也有一定的复杂性。因为 NodeJS DNS 函数如 dns.loogup，访问系统配置文件如 nsswitch.conf，resolve.conf 和 /etc/hosts，上述文件系统的复杂性也适用于 dns.resolve 函数。

## 解决办法？

因此，引入了一个线程池来支持 I/O 功能，不能被硬件异步 I/O 工具直接处理（epoll/kqueue/event ports/IOCP）。现在我们知道并不是所有的 I/O 函数在线程池发生。NodeJS 使用非阻塞和异步硬件 I/O 尽最大的努力做大部分的 I/O 工作，但是对于那些阻塞或者处理起来复杂类型的 I/O，使用线程池。

## 把他们放在一起

正如我们看到的，在实际世界中，支持所有不同操作系统平台的所有的不同类型的 I/O（文件 I/O，网络 I/O，DNS 等）非常困难。一部分 I/O 可以使用本机硬件实现执行，同时保留完整的异步，有一部分类型的 I/O 需要在线程池中执行以便保证异步特性。

*在 Node 开发者中间，一个普遍的误解是 Node 在线程池中处理所有的 I/O。*

管理整个过程同时支持跨平台的 I/O，应该有一个抽象层，封装了 inter-platform 和 intra-platform 的复杂性并且为 Node 上层暴露通用的 API。

那么是谁呢？女士们，先生们，有请...

![img](https://pic4.zhimg.com/80/v2-05b71d17ea4f51327f83d76e97aca25f_720w.jpg)

摘抄于[官方 libuv 文档](https://link.zhihu.com/?target=http%3A//docs.libuv.org/en/v1.x/design.html)

*libuv 最初为 NodeJS 编写的一个跨平台支持的库。围绕着事件驱动和异步 I/O 模型设计的。*

*这个库不仅仅提供了不同的 I/O 轮询机制的简单抽象：'handles' 和 ‘streams’为 sockets 和 其他实体提供了一个高级的抽象；也提供了跨平台的文件 I/O 和线程功能。*

让我们看下 libuv 的组成。下面的图表来自于官方文档，描述了暴露通用的 API 处理不同类型的 I/O。

![img](https://pic2.zhimg.com/80/v2-c231e1991b1663fc1510834d2d91dd29_720w.jpg)

现在我们知道事件多路分发器，不是一个原子的实体，而是一个被 Libuv 抽象的处理 I/O 过程的 APIs 的集合暴露给 NodeJS 的上层。它不仅是一个 libuv 提供给 Node 的事件多路分发器。Libuv 为 NodeJS 提供了完整的事件循环功能，包含事件队列机制。

现在让我们看下 事件队列。

## 事件队列

所有的事件入队的队列应该是一个数据结构，按顺序处理事件循环，直到队列为空。但是在 Node 中是如何发生的，完全不同于反应器模式描述的那样。因此有哪些差异？

> *在 NodeJS 中不止一个队列，不同类型的事件在它们自己的队列中入队。*
> *在处理完一个阶段后，移向下一个阶段之前，事件循环将会处理两个中间队列，直到两个中间队列为空。*

那么这里有多少个队列呢？中间队列是什么？

有 4 个主要类型的队列，被原生的 libuv 事件循环处理。

- **过期计时器和间隔队列（Expired timers and intervals queue）** - 使用 setTimeout 添加的过期计时器的回调或者使用 setInterval 添加的间隔函数。
- **IO 事件队列（IO Events Queue）** - 完成的 I/O 事件
- **立即的队列（Immediate queue）** - 使用 setImmediate 函数添加的回调
- **关闭操作队列（Close Handlers Queue）** - 任何一个 close 事件处理器。

> *注意，尽管我在这里都简单说 “**队列**”，它们中的一些实际上是数据结构的不同类型（timers 被存储在最小堆里）*

除了四个主要的队列，这里另外有两个有意思的队列，我之前提到的 “中间队列”，被 Node 处理。尽管这些队列不是 libuv 的一部分，但是 NodeJS 的一部分。它们是：

- **下一个运转队列（Next Ticks Queue）** - 使用 process.nextTick() 函数添加的回调
- **其他的微队列（other Microtasks Queue）** - 包含其他的微队列如成功的 Promise 回调

## 它是如何工作的？

正如你在下面图表中所见，Node 通过检查 timers 队列中任何一个过期 timers 开始事件循环（译者注：先检查事件循环是否活着），通过每个步骤的每个队列。处理完关闭处理器队列，如果在所有的队列中没有要处理的项，那么循环将会退出。在事件循环中每个队列的处理可以看做事件循环的一个阶段。

![img](https://pic2.zhimg.com/80/v2-6e362132c0fedffe78cdb5ac12a9fb09_720w.jpg)

被描绘成红色的中间队列有趣的是，只要一个阶段结束，事件循环将会检查这两个中间阶段是否有要处理的项。如果有，事件循环会立马开始处理它们直到两个队列为空。一旦为空，事件循环就移到下一个阶段，实际上 next tick queue 比 micro tasks queue 有着更高的优先级。

> *E.g, 事件循环当前处理有着 5 个事件处理器的立即队列（immediate queue）。同时，两个处理器回调被添加到 下一个运转队列。一旦事件处理器完成立即队列中的 5 个事件处理器，事件循环将会在移到 close 事件处理器队列之前检测到在下一个运转队列里面，有两个要处理的项。然后事件处理器会处理完下一个运转队列里面的处理器。然后移到 close 事件队列。*

## 下一个运转队列（next tick queue） VS 其他的微队列（other Micotasks）

下一个运转队列比微队列有着更高的优先级。尽管它们都在事件循环的两个阶段之间处理，在一个阶段的结尾 libuv 回到 Node 的跟高层进行通信。你将会注意到我用暗红色来表示 next tick queue，这意味着在开始处理 promise 的微队列之前，下一个运转队列是空的。

> *下一个运转队列的优先级比 promise 的高仅仅适合于 V8 提供的原生 JS 提供的 promise。如果你使用一个 q 库或者 bluebird, 你将会观察到一个不同的结果，因为它们提早于原生的 promise，有不同的语义。 q 和 bluebird 处理 promise 也有不同的方式，后面的文章我会解释。*

这些所谓的中间队列引入了一个新的问题，IO 饿死。广泛的使用 process.nextTick 填充下一个运转队列将会强迫事件循环处理下一个运转队列而不前进。这将会导致 IO 饿死，因为时间循环不能继续，只有继续清空下一个运转队列。

> *为了防止这种清空,这里有一个下一个运转队的最大限制，可以使用 procsess.maxTickDepth 参数设置，但是已经从 NodeJS v0.12 移除了。*[具体查看原因](https://link.zhihu.com/?target=https%3A//strongloop.com/strongblog/node-js-v0-12-apis-breaking/%23process_maxtickdepth_removed)*。*

我将会在之后的文章中用示例深入讨论这些队列。

最后，你知道了什么是 事件循环，如何实现的和 Node 处理异步的 I/O。让我们看下 Libuv 在 NodeJS 架构中的位置。

![img](https://pic1.zhimg.com/80/v2-41ae0981f6d9604baef726a8feede460_720w.jpg)

我希望你发现这个有用，在之后的文章中，我会讨论，

- 计时器，立即（Immediates）和 process.nextTick
- 解决成功的 Promise 和 process.nextTick
- 处理 I/O
- 使用事件循环的最佳实践

还有更多的细节。如果有什么意见，不要犹豫地评论。