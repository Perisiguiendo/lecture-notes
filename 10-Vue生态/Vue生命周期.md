# Vue生命周期

[vue官方文档---实例生命周期](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)
[vue-router2.3版文档---路由勾子](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)
[vue官方文档---指令及其绑定周期](https://cn.vuejs.org/v2/guide/custom-directive.html)

## 前言

在使用vue开发的过程中，我们经常会接触到生命周期的问题。那么你知道，一个标准的工程项目中，会有多少个生命周期勾子吗？让我们来一起来盘点一下：

1. 根组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)
2. 组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)
3. 全局路由钩子：2个 (beforeEach、afterEach)
4. 组件路由钩子：3个 (beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave)
5. 指令的周期： 5个 (bind、inserted、update、componentUpdated、unbind)
6. beforeRouteEnter的next所对应的周期
7. nextTick所对应的周期

吓到了吗？合计竟然一共有28个周期，是否看得头昏眼花了呢？接下来让我们一起来介绍一下各个周期的通常用途与使用细节吧

## 组件实例周期

这一块vue2的官方文档有一张图示，我们简要提一下用法和注意

### beforeCreate

在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

**注：此时组件的选项还未挂载，因此无法访问methods，data,computed上的方法或数据**

### created

实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

这是一个常用的生命周期，因为你可以调用methods中的方法、改变data中的数据，并且修改可以通过vue的响应式绑定体现在页面上、获取computed中的计算属性等等。

```
tip:

通常我们可以在这里对实例进行预处理。
也有一些童鞋喜欢在这里发ajax请求，值得注意的是，这个周期中是没有什么方法来对实例化过程进行拦截的。
因此假如有某些数据必须获取才允许进入页面的话，并不适合在这个页面发请求。
建议在组件路由勾子beforeRouteEnter中来完成。
```

### beforeMonut

在挂载开始之前被调用：相关的 render 函数首次被调用。

### mounted

el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.*e**l*替换，并挂载到实例上去之后调用该钩子。如果*r**o**o**t*实例挂载了一个文档内元素，当*m**o**u**n**t**e**d*被调用时*v**m*.el 也在文档内。

```
tip:

1.在这个周期内，对data的改变可以生效。但是要进下一轮的dom更新，dom上的数据才会更新。
2.这个周期可以获取 dom。 之前的论断有误，感谢@冯银超 和 @AnHour的提醒
3.beforeRouteEnter的next的勾子比mounted触发还要靠后
4.指令的生效在mounted周期之前
```

### beforeUpdate

数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

### updated

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。

### beforeDestroy

实例销毁之前调用。在这一步，实例仍然完全可用。

```
tip:

1.这一步还可以用this来获取实例。
2.一般在这一步做一些重置的操作。比如清除掉组件中的 定时器 和 监听的dom事件
```

### destroyed

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

## 全局路由钩子

作用于所有路由切换，一般在main.js里面定义

### router.beforeEach

```
示例
router.beforeEach((to, from, next) => {
  console.log('路由全局勾子：beforeEach -- 有next方法')
  next()
})
```

一般在这个勾子的回调中，对路由进行拦截。
比如，未登录的用户，直接进入了需要登录才可见的页面，那么可以用next(false)来拦截，使其跳回原页面。
值得注意的是，如果没有调用next方法，那么页面将卡在那。

```
next的四种用法
1.next() 跳入下一个页面
2.next('/path') 改变路由的跳转方向，使其跳到另一个路由
3.next(false)  返回原来的页面
4.next((vm)=>{})  仅在beforeRouteEnter中可用，vm是组件实例。
```

### router.afterEach

```
示例
router.afterEach((to, from) => {
  console.log('路由全局勾子：afterEach --- 没有next方法')
})
```

在所有路由跳转结束的时候调用，和beforeEach是类似的，但是它没有next方法

## 组件路由勾子

和全局勾子不同的是，它仅仅作用于某个组件，一般在.vue文件中去定义。

### beforeRouteEnter

```
示例
  beforeRouteEnter (to, from, next) {
    console.log(this)  //undefined，不能用this来获取vue实例
    console.log('组件路由勾子：beforeRouteEnter')
    next(vm => {
      console.log(vm)  //vm为vue的实例
      console.log('组件路由勾子beforeRouteEnter的next')
    })
  }
```

这个是一个很不同的勾子。因为beforeRouterEnter在组件创建之前调用，所以它无法直接用this来访问组件实例。
为了弥补这一点，vue-router开发人员，给他的next方法加了特技，可以传一个回调，回调的第一个参数即是组件实例。
一般我们可以利用这点，对实例上的数据进行修改，调用实例上的方法。

我们可以在这个方法去请求数据，在数据获取到之后，再调用next就能保证你进页面的时候，数据已经获取到了。没错，这里next有阻塞的效果。你没调用的话，就会一直卡在那

```
tip:

next(vm=>{console.log('next')  })
这个里面的代码是很晚执行的，在组件mounted周期之后。没错，这是一个坑。你要注意。
beforeRouteEnter的代码时很早执行的，在组件beforeCreate之前；
但是next里面回调的执行，很晚，在mounted之后，可以说是目前我找到的，离dom渲染最近的一个周期。
```

### beforeRouteLeave

```
  beforeRouteLeave (to, from, next) {
    console.log(this)    //可以访问vue实例
    console.log('组件路由勾子：beforeRouteLeave')
    next()
  },
```

在离开路由时调用。可以用this来访问组件实例。但是next中不能传回调。

### beforeRouteUpdate

这个方法是vue-router2.2版本加上的。因为原来的版本中，如果一个在两个子路由之间跳转，是不触发beforeRouteLeave的。这会导致某些重置操作，没地方触发。在之前，我们都是用watch $route来hack的。但是通过这个勾子，我们有了更好的方式。

老实讲，我没用过这个勾子，所以各位可以查看一下文章之前的文档，去尝试一下，再和我交流交流。

## 指令周期

绑定自定义指令的时候也会有对应的周期。
这几个周期，我比较常用的，一般是只有bind。

### bind

只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。

### inserted

被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
实际上是插入vnode的时候调用。

### update

被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
慎用，如果在指令里绑定事件，并且用这个周期的，记得把事件注销

### componentUpdated

被绑定元素所在模板完成一次更新周期时调用。

### unbind

只调用一次， 指令与元素解绑时调用。

## Vue.nextTick、vm.$nextTick

```
示例：
  created () {
    this.$nextTick(() => {
      console.log('nextTick')  //回调里的函数一直到真实的dom渲染结束后，才执行
    })
    console.log('组件：created')
  },
```

nextTick方法的回调会在dom更新后再执行，因此可以和一些dom操作搭配一起用，如 ref。
非常好用，可以解决很多疑难杂症。

```
场景：
你用ref获得一个输入框，用v-model绑定。
在某个方法里改变绑定的值，在这个方法里用ref去获取dom并取值，你会发现dom的值并没有改变。
因为此时vue的方法，还没去触发dom的改变。
因此你可以把获取dom值的操作放在vm.$nextTick的回调里，就可以了。
```

上一章我们介绍了vue的组件生命周期和路由勾子，这一章，让我们来看看在vue-cli项目中，各个勾子的顺序是如何的吧。主要聚焦在页面加载的这条时间线。

## 页面加载的时候，vue生命周期的触发顺序是怎样的呢？

那么进入某个路由对应的组件的时候，我们会触发哪些类型的周期呢？

1. 根实例的加载相关的生命周期（beforeCreate、created、beforeMount、mounted）
2. 组件实例的加载相关的生命周期(beforeCreate、created、beforeMount、mounted)
3. 全局路由勾子(router.beforeEach)
4. 组件路由勾子(beforeRouteEnter)
5. 组件路由勾子的next里的回调(beforeRouteEnter)
6. 指令的周期(bind,inserted)
7. nextTick方法的回调

接下来，让我们用vue-cli简单改造后的项目，做一个测试，看看各个声明周期的触发顺序是怎样的

main.js：

```
router.beforeEach((to, from, next) => {
  console.log('路由全局勾子：beforeEach')
  next()
})

router.afterEach((to, from) => {
  console.log('路由全局勾子：afterEach')
})

new Vue({
  beforeCreate () {
    console.log('根组件：beforeCreate')
  },
  created () {
    console.log('根组件：created')
  },
  beforeMount () {
    console.log('根组件：beforeMount')
  },
  mounted () {
    console.log('根组件：mounted')
  }
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
```

test.vue

```
<template>
  <h1 v-ooo @click = "$router.push('/')">test</h1>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log('组件路由勾子：beforeRouteEnter')
    next(vm => {
      console.log('组件路由勾子beforeRouteEnter的next')
    })
  },
  beforeCreate () {
    console.log('组件：beforeCreate')
  },
  created () {
    this.$nextTick(() => {
      console.log('nextTick')
    })
    console.log('组件：created')
  },
  beforeMount () {
    console.log('组件：beforeMount')
  },
  mounted () {
    console.log('组件：mounted')
  },
  directives: {
    ooo: {
      bind (el, binding, vnode) {
        console.log('指令binding')
      },
      inserted (el, binding, vnode) {
        console.log('指令inserted')
      }
    }
  }
}
</script>
```

接下来，直接进入test.vue对应的路由。在控制台，我们看到如下的输出

![clipboard.png](https://segmentfault.com/img/bVLBpk?w=839&h=346)

我们看到执行的顺序为

1. 路由勾子 (beforeEach、beforeRouteEnter、afterEach)
2. 根组件 (beforeCreate、created、beforeMount)
3. 组件 (beforeCreate、created、beforeMount)
4. 指令 (bind、inserted)
5. 组件 mounted
6. 根组件 mounted
7. beforeRouteEnter的next的回调
8. nextTick

## 结论

### 路由勾子执行周期非常早，甚至在根实例的渲染之前

具体的顺序 router.beforeEach > beforeRouteEnter > router.afterEach

```
tip:在进行路由拦截的时候要避免使用实例内部的方法或属性。
在开发项目时候，我们脑门一拍把，具体拦截的程序，写在了根实例的方法上了，到beforeEach去调用。
结果导致整个拦截的周期，推迟到实例渲染的之后。
因此对于一些路由组件的beforeRouteEnter里的请求并无法拦截，页面看上去好像已经拦截下来了。
实际上请求依然发了出去，beforeRouteEnter内的函数依然执行了。
```

### 指令的绑定在组件mounted之前，组件的beforeMount之后

### 不得不提的, beforeRouteEnter的next勾子

beforeRouteEnter的执行顺序是如此靠前，而其中next的回调勾子的函数，执行则非常靠后，在mounted之后！！
我们通常是在beforeRouteEnter中加载一些首屏用数据，待数据收到后，再调用next勾子，通过回调的参数vm将数据绑定到实例上。
因此，请注意next的勾子是非常靠后的。

### nextTick

越早注册的nextTick触发越早