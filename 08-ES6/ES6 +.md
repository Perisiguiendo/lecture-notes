## ES6 +

**ES6 函数默认参数和 es5 的实现有什么区别 ？es6 中又有什么需要注意的 ？**

[ES6函数默认参数](https://www.jianshu.com/p/e4ea0d43529c)

防抖与节流**

节流

throttle 的中心思想在于：在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。

```
// fn 是我们需要包装的事件回调, delay 是时间间隔的阈值
function throttle(fn, delay) {
  // last 为上一次触发回调的时间
  let last = 0
  
  // 将 throttle 处理结果当作函数返回
  return function () {
      // 保留调用时的 this 上下文
      let context = this
      // 保留调用时传入的参数
      let args = arguments
      // 记录本次触发回调的时间
      let now = +new Date()
      
      // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
      if (now - last >= delay) {
          // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
          last = now;
          fn.apply(context, args);
      }
    }
}

// 用 throttle 来包装 scroll 的回调
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)

document.addEventListener('scroll', better_scroll)
```

防抖

防抖的中心思想在于：我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次。

```
// fn  是我们需要包装的事件回调, delay 是每次推迟执行的等待时间
function debounce(fn, delay) {
  // 定时器
  let timer = null
  
  // 将 debounce 处理结果当作函数返回
  return function () {
    // 保留调用时的 this 上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments

    // 每次事件被触发时，都去清除之前的旧定时器
    if(timer) {
        clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// 用 debounce 来包装 scroll 的回调
const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000)

document.addEventListener('scroll', better_scroll)
用 Throttle 来优化 Debounce
```

思想：在 delay 时间内，我可以为你重新生成定时器；但只要 delay 的时间到了，我必须要给用户一个响应。

```
// fn 是我们需要包装的事件回调, delay 是时间间隔的阈值
function throttle(fn, delay) {
  // last 为上一次触发回调的时间, timer 是定时器
  let last = 0, timer = null

  // 将 throttle 处理结果当作函数返回
  return function () { 
    // 保留调用时的 this 上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()
    
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
        // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
        clearTimeout(timer)
        timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, delay)
    } else {
        // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
        last = now
        fn.apply(context, args)
    }
  }
}

// 用新的 throttle 包装 scroll 的回调
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)

document.addEventListener('scroll', better_scroll)
```

以上答案来自于：[事件的节流（throttle）与防抖（debounce）](https://juejin.im/book/5b936540f265da0a9624b04b/section/5bb6212be51d451a3f4c3570)

------

#### ES6+ 面试知识文章

- [那些必会用到的 ES6 精粹](https://github.com/biaochenxuying/blog/issues/1)
- [promise、Generator 函数、async 函数的区别与理解](https://blog.csdn.net/deng1456694385/article/details/83831931)
- [Typescript 中的 interface 和 type 到底有什么区别](https://blog.csdn.net/weixin_33724659/article/details/88040828)
- [进大厂必会 20 道 JS 原理题](https://github.com/Geek-James/Blog/issues/27)
- [AST 抽象语法树——最基础的 javascript 重点知识，99% 的人根本不了解](https://segmentfault.com/a/1190000016231512)