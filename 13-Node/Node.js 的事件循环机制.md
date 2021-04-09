# [Node.js 的事件循环机制](https://www.cnblogs.com/forcheng/p/12723854.html)

**目录**

- 微任务
- 事件循环机制
- setImmediate、setTimeout/setInterval 和 process.nextTick 执行时机对比
- 实例分析
- 后记
- 参考



**1.微任务**

在谈论Node的事件循环机制之前，先补充说明一下 Node 中的“微任务”。这里说的微任务(microtasks)其实是一个统称，包含了两部分：

- process.nextTick() 注册的回调 （nextTick task queue）
- promise.then() 注册的回调 （promise task queue）

Node 在执行微任务时， 会优先执行 nextTick task queue 中的任务，执行完之后会接着执行 promise task queue 中的任务。所以如果 process.nextTick 的回调与 promise.then 的回调都处于主线程或事件循环中的同一阶段， process.nextTick 的回调要优先于 promise.then 的回调执行。



**2.事件循环机制**

![Node事件循环](https://img2020.cnblogs.com/blog/898684/202004/898684-20200418064231061-1148380902.png)

如图，表示Node执行的整个过程。如果执行了任何非阻塞异步代码（创建计时器、读写文件等），则会进入事件循环。其中事件循环分为六个阶段：

由于Pending callbacks、Idle/Prepare 和 Close callbacks 阶段是 Node 内部使用的三个阶段，所以这里主要分析与开发者代码执行更为直接关联的Timers、Poll 和 Check 三个阶段。



**Timers（计时器阶段）**：从图可见，初次进入事件循环，会从计时器阶段开始。此阶段会判断是否存在过期的计时器回调（包含 setTimeout 和 setInterval），如果存在则会执行所有过期的计时器回调，执行完毕后，如果回调中触发了相应的微任务，会接着执行所有微任务，执行完微任务后再进入 Pending callbacks 阶段。

**Pending callbacks**：执行推迟到下一个循环迭代的I / O回调（系统调用相关的回调）。

**Idle/Prepare**：仅供内部使用。（详略）

**Poll（轮询阶段）**：

当回调队列不为空时：

会执行回调，若回调中触发了相应的微任务，这里的微任务执行时机和其他地方有所不同，不会等到所有回调执行完毕后才执行，而是针对每一个回调执行完毕后，就执行相应微任务。执行完所有的回到后，变为下面的情况。

当回调队列为空时（没有回调或所有回调执行完毕）：

但如果存在有计时器（setTimeout、setInterval和setImmediate）没有执行，会结束轮询阶段，进入 Check 阶段。否则会阻塞并等待任何正在执行的I/O操作完成，并马上执行相应的回调，直到所有回调执行完毕。

**Check（查询阶段）**：会检查是否存在 setImmediate 相关的回调，如果存在则执行所有回调，执行完毕后，如果回调中触发了相应的微任务，会接着执行所有微任务，执行完微任务后再进入 Close callbacks 阶段。

**Close callbacks**：执行一些关闭回调，比如 `socket.on('close', ...)`等。



总结&注意：

1. 每一个阶段都会有一个FIFO回调队列，都会尽可能的执行完当前阶段中所有的回调或到达了系统相关限制，才会进入下一个阶段。
2. Poll 阶段执行的微任务的时机和 Timers 阶段 & Check 阶段的时机不一样，前者是在每一个回调执行就会执行相应微任务，而后者是会在所有回调执行完之后，才统一执行相应微任务。



**3.setImmediate、setTimeout/setInterval 和 process.nextTick 执行时机对比**

setImmediate：触发一个异步回调，在事件循环的 Check 阶段立即执行。

setTimeout：触发一个异步回调，当计时器过期后，在事件循环的 Timers 阶段执行，只执行一次（可用 clearTimeout 取消）。

setInterval：触发一个异步回调，每次计时器过期后，都会在事件循环的 Timers 阶段执行一次回调（可用 clearInterval 取消）。

process.nextTick：触发一个微任务（异步）回调，既可以在主线程（mainline）中执行，可以存在事件循序的某一个阶段中执行。



**4.实例分析**

**第一组：**

比较 setTimeout 与 setImmediate：

```js
// test.js
setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});
```

结果：

![setTimeout vs setImmediate](https://img2020.cnblogs.com/blog/898684/202004/898684-20200418064411626-62072431.png)

分析：

从输出结果来看，输出是不确定的，既可能 "setTimeout" 在前，也可能 "setImmediate" 在前。从事件循环的流程来分析，事件循环开始，会先进入 Timers 阶段，虽然 setTimeout 设置的 delay 是 0，但其实是1，因为 Node 中的 setTimeout 的 delay 取值范围必须是在 [1, 2^31-1] 这个范围内，否则默认为1，因此受进程性能的约束，执行到 Timers 阶段时，可能计时器还没有过期，所以继续向下一个流程进行，所以会偶尔出现 "setImmediate" 输出在前的情况。如果适当地调大 setTimeout 的 delay，比如10，则基本上必然是 "setImmediate" 输出在前面。

**第二组：**

比较主线程（mainline）、Timers 阶段、Poll 阶段和 Check 阶段的回调执行以及对应的微任务执行的顺序：

```js
 // test.js
 const fs = require('fs');

 console.log('mainline: start')
 process.nextTick(() => {
   console.log('mainline: ', 'process.nextTick\n')
 })

let counter = 0;
const interval = setInterval(() => {
  console.log('timers: setInterval.start ', counter)
  if(counter < 2) {
    setTimeout(() => {
      console.log('timers: setInterval.setTimeout')
      process.nextTick(() => {
        console.log('timers microtasks: ', 'setInterval.setTimeout.process.nextTick\n')
      })
    }, 0)

    fs.readdir('./', (err, files) => {
      console.log('poll: setInterval.readdir1')
      process.nextTick(() => {
        console.log('poll microtasks: ', 'setInterval.readdir1.process.nextTick')
        process.nextTick(() => {
          console.log('poll microtasks: ', 'setInterval.readdir1.process.nextTick.process.nextTick')
        })
      })
    })

    fs.readdir('./', (err, files) => {
      console.log('poll: setInterval.readdir2')
      process.nextTick(() => {
        console.log('poll microtasks: ', 'setInterval.readdir2.process.nextTick')
        process.nextTick(() => {
          console.log('poll microtasks: ', 'setInterval.readdir2.process.nextTick.process.nextTick\n')
        })
      })
    })

    setImmediate(() => {
      console.log('check: setInterval.setImmediate1')
      process.nextTick(() => {
        console.log('check microtasks: ', 'setInterval.setImmediate1.process.nextTick')
      })
    })

    setImmediate(() => {
      console.log('check: setInterval.setImmediate2')
      process.nextTick(() => {
        console.log('check microtasks: ', 'setInterval.setImmediate2.process.nextTick\n')
      })
    })
  } else {
    console.log('timers: setInterval.clearInterval')
    clearInterval(interval)
  }

  console.log('timers: setInterval.end ', counter)
  counter++;
}, 0);

 console.log('mainline: end')
```

结果（Node v10.18.0）：

![不同阶段的回调执行以及对应的微任务执行的顺序](https://img2020.cnblogs.com/blog/898684/202004/898684-20200418064455032-60988709.png)

分析：

**如图 mainline**：可以看到，主线程中的 process.nextTick 是在同步代码执行完之后以及在事件循环之前执行，符合预期。

**如图 第一次 timers**：此时事件循环第一次到 Timers 阶段，setInterval 的 delay 时间到了，所以执行回调，由于没有触发直接相应的微任务，所以直接进入后面的阶段。

**如图 第一次 poll**：此时事件循环第一次到 Poll 阶段，由于之前 Timers 阶段执行的回调中，触发了两个非阻塞的I/O操作（readdir），在这一阶段时I/O操作执行完毕，直接执行了对应的两个回调。从输出可以看出，针对每一个回调执行完毕后，就执行相应微任务，微任务中再次触发微任务也会继续执行，并不会等到所有回调执行完后再去触发微任务，符合预期。执行完毕所有回调之后，因为还有调度了计时器，所以 Poll 阶段结束，进入 Check 阶段。

**如图 第一次 check**：此时事件循环第一次到 Check 阶段，直接触发对应的两个 setImmediate 执行。从输出可以看出，微任务是在所有的回调执行完毕之后才触发执行的，符合预期。执行完微任务后，进入后面阶段。

**如图 第二次 timers**：此时事件循环第二次到 Timers 阶段，首先输出了 "timers: setInterval.setTimeout" ，这是为什么？不要忘了，之前第一次执行 setInterval 的回调时，其实已经执行了一次其内部的 setTimeout(..., 0)，但由于它并不能触发微任务，所以其回调没有被执行，而是进入到了后面的阶段，而是等到再次来到 Timers 阶段，根据FIFO，优先执行之前的 setTimeout 的回调，再执行 setInterval 的回调，而最后等所有回调执行完毕，再执行 setTimeout 的回调里面触发的微任务，最后输出的是 "timers microtasks: setInterval.setTimeout.process.nextTick"，符合预期（所有回调执行完毕后，再执行相应微任务）。

后面的输出类似，所以不再做过多分析。



**5.后记**

本篇博客所分析的Node.js 的事件循环机制，对于微任务的执行顺序，主要适用于Node 11之前。Node 11及其之后，针对事件循环的每一个阶段，微任务的执行顺序进行了统一，在每次调用回调之后，就执行相应微任务，不会等到所有回调执行完毕后才执行。



**6.参考**

[学习 Node.js，第 5 单元：事件循环](https://www.ibm.com/developerworks/cn/opensource/os-tutorials-learn-nodejs-the-event-loop/index.html)

[事件循环、计时器和 process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

[第 25 题：浏览器和Node 事件循环的区别](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26)