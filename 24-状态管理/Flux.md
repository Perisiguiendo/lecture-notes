Flux、Redux、Vuex、MobX 是常用的状态管理模式，本文是对这几个模式的一些总结。

## Flux

Flux 是一种架构思想，类似于 MVC 、MVVM 等。

### Flux 的组成

- **View**: 视图层。

- **Action**: 动作，即数据改变的消息对象（可通过事件触发、测试用例触发等）。

- - **Store 的改变只能通过 Action。**
  - **具体 Action 的处理逻辑一般放在 Store 里。**
  - Action 对象包含 type （类型）与 payload （传递参数）。

- **Dispatcher**: 派发器，接收 Actions ，发给所有的 Store。

- **Store**: 数据层，存放应用状态与更新状态的方法，一旦发生变动，就提醒 Views 更新页面。

![img](https://pic1.zhimg.com/80/v2-79ed4a3780c622f8f4b3656f6903b578_720w.jpg)

Notice: - Action 仅仅是改变 Store 的一个**动作**，一般包含该动作的类型、传递的数据。

### Flux 的特点

- **单向数据流**。视图事件或者外部测试用例发出 Action ，经由 Dispatcher 派发给 Store ，Store 会触发相应的方法更新数据、更新视图。
- **Store 可以有多个**。
- Store 不仅存放数据，还封装了处理数据的方法。

## Redux

### Redux 的组成

- **Store**: 存储应用 `state` 以及用于触发 `state` 更新的 `dispatch` 方法等，整个应用仅有单一的 Store 。Store 中提供了几个 API :

- - `store.getState()`: 获取当前 state。
  - `store.dispatch(action)`: 用于 View 发出 Action。
  - `store.subscribe(listener)`: 设置监听函数，一旦 state 变化则执行该函数（若把视图更新函数作为 listener 传入，则可触发视图自动渲染）。

- **Action**: 同 Flux ，Action 是用于更新 state 的消息对象，由 View 发出。

- - 有专门生成 Action 的 Action Creator

- **Reducer**: 是一个用于改变 state 的**纯函数**（对于相同的参数返回相同的返回结果，不修改参数，不依赖外部变量），即通过应用状态与 Action 推导出新的 state : `(previousState, action) => newState`。Reducer 返回一个新的 state 。

![img](https://pic4.zhimg.com/80/v2-e4537d38f50a3f42be2e432262dffa77_720w.jpg)

### Redux 的特点

- **单向数据流**。View 发出 Action (`store.dispatch(action)`)，Store 调用 Reducer 计算出新的 state ，若 state 产生变化，则调用监听函数重新渲染 View （`store.subscribe(render)`）。
- **单一数据源**，只有一个 Store。
- state 是只读的，每次状态更新之后只能返回一个新的 state。
- 没有 Dispatcher ，而是在 Store 中集成了 dispatch 方法，`store.dispatch()` 是 View 发出 Action 的唯一途径。

### Middleware

Middleware 即中间件，在 Redux 中应用于异步数据流。

Redux 的 Middleware 是对 `store.dispatch()` 进行了封装之后的方法，可以使 `dispatch` 传递 action 以外的函数或者 promise ；通过 `applyMiddleware` 方法应用中间件。（**middleware 链中的最后一个 middleware 开始 dispatch action 时，这个 action 必须是一个普通对象**）

常用库: redux-actions, redux-thunk, redux-promise 。

```js
const store = createStore(
  reducer,
  // 依次执行
  applyMiddleware(thunk, promise, logger)
)
```

## Vuex

Vuex 是 vue.js 的状态管理模式。

### Vuex 的核心概念

- **Store**: Vuex 采用**单一状态树**，每个应用仅有一个 Store 实例，在该实例下包含了 state, actions, mutations, getters, modules 。

- **State**: Vuex 为**单一数据源**。

- - 可以通过 `mapState` 辅助函数将 state 作为计算属性访问，或者将通过 Store 将 state 注入全局之后使用 `this.$store.state` 访问。
  - State 更新视图是通过 vue 的双向绑定机制实现的。

- **Getter**: Getter 的作用与 filters 有一些相似，可以将 State 进行过滤后输出。

- **Mutation**: **Mutaion 是 vuex 中改变 State 的唯一途径**（严格模式下），并且只能是同步操作。Vuex 中通过 `store.commit()` 调用 Mutation 。

- **Action**: 一些对 State 的**异步操作**可以放在 Action 中，并通过在 Action 提交 Mutaion 变更状态。

- - Action 通过 `store.dispatch()` 方法触发。
  - 可以通过 `mapActions` 辅助函数将 vue 组件的 methods 映射成 `store.dispatch` 调用（需要先在根节点注入 store）。

- **Module**: 当 Store 对象过于庞大时，可根据具体的业务需求分为多个 Module ，每个 Module 都具有自己的 state 、mutation 、action 、getter。

![img](https://pic1.zhimg.com/80/v2-3d69811be9fee4d3989d204bf25ab430_720w.jpg)

### Vuex 的特点：

- **单向数据流**。View 通过 `store.dispatch()` 调用 Action ，在 Action 执行完异步操作之后通过 `store.commit()` 调用 Mutation 更新 State ，通过 vue 的响应式机制进行视图更新。
- **单一数据源**，和 Redux 一样全局只有一个 Store 实例。
- 可直接对 State 进行修改。

## MobX

MobX 背后的哲学是:

> 任何源自应用状态的东西都应该自动地获得。

意思就是，当状态改变时，所有应用到状态的地方都会自动更新。

### MobX 的核心概念

- **State**: 驱动应用的数据。
- **Computed values**: 计算值。**如果你想创建一个基于当前状态的值时，请使用 computed**。
- **Reactions**: 反应，当状态改变时自动发生。
- **Actions**: 动作，用于改变 State 。
- **依赖收集（autoRun）**: MobX 中的数据以来基于**观察者模式**，通过 autoRun 方法添加观察者。

![img](https://pic4.zhimg.com/80/v2-9618e7fdcca4b6579ae19e3c1e8a6837_720w.jpg)

举个栗子：

```js
const obj = observable({
  a: 1,
  b: 2
})

autoRun(() => {
  console.log(obj.a)
})

obj.b = 3 // 什么都没有发生
obj.a = 2 // observe 函数的回调触发了，控制台输出：2
```

### MobX 的特点

- 数据流流动不自然，只有用到的数据才会引发绑定，**局部精确更新（细粒度控制）。**
- 没有时间回溯能力，因为数据只有一份引用。
- 基于面向对象。
- 往往是多个 Store。
- 代码侵入性小。
- 简单可扩展。
- 大型项目使用 MobX 会使得代码难以维护。

## 总结

- Flux 、Redux 、Vuex 均为**单向数据流。**
- Redux 和 Vuex 是基于 Flux 的，Redux 较为泛用，Vuex 只能用于 vue。
- Flux 与 MobX 可以有多个 Store ，Redux 、Vuex 全局仅有一个 Store（**单状态树**）。
- Redux 、Vuex 适用于大型项目的状态管理，MobX 在大型项目中应用会使代码可维护性变差。
- Redux 中引入了中间件，主要解决异步带来的副作用，可通过约定完成许多复杂工作。
- MobX 是状态管理库中代码侵入性最小的之一，具有细粒度控制、简单可扩展等优势，但是没有时间回溯能力，一般适合应用于中小型项目中。





参考文章:

- https://zhuanlan.zhihu.com/p/53599723
- [http://www.ruanyifeng.com/blog/2016/01/flux.html](https://link.zhihu.com/?target=http%3A//www.ruanyifeng.com/blog/2016/01/flux.html)
- [http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html](https://link.zhihu.com/?target=http%3A//www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [https://vuex.vuejs.org/zh/](https://link.zhihu.com/?target=https%3A//vuex.vuejs.org/zh/)[https://cn.redux.js.org/](https://link.zhihu.com/?target=https%3A//cn.redux.js.org/)[https://cn.mobx.js.org/](https://link.zhihu.com/?target=https%3A//cn.mobx.js.org/)