### 一、Redux、MobX、Vuex的简介

### 1. Redux

Redux 是在 Flux 思想的基础上编写的一个状态容器。Redux 将状态以一个可 JSON 序列化的对象形式存储在单个 store 中，也就是说 redux 将状态集中存储。Redux 遵循 Flux 思想，它也是单向数据流的，如果要修改 store 中的状态，必须通过 store 的 dispatch 方法。调用 store.dispatch 之后，store 中的 rootReducer 会被调用，进而调用**所有的 reducers** 生成一个新的 state。在 redux 中，dispatch 一个 action 的时候不能确定这个 action 被哪个 reducer 响应，它影响的数据范围如何。如果某一次 dispatch 只需要修改 store 中很小一部分状态，但是 dispatch 结束之后 store 中的状态与之前状态相比是一个新的，这在某些时候会是一个性能问题。store 的状态更新之后，store 会通知所有的订阅者它的状态已经更新，使用 Redux 需要手动订阅状态的更新。理想的情况下手动订阅状态会使开发者明确的知道他想做什么，但是随着软件的迭代，手动订阅可能导致订阅不足或者订阅过多的问题，订阅的不足会导致视图不能及时更新，订阅太多会导致视图做无用的更新。

> ```
> // 这是一个 reducer，它是一个无副作用函数，它根据当前的 state 和 action 生成一个新的 state
> // Redux state 应该只包含纯 JS 对象、数组和原始类型
> import { createStore } from 'redux';
> function counterReducer(state = { value: 0 }, action) { 
> switch (action.type) { 
>  case 'counter/incremented':        
>    return { value: state.value + 1 };
>  case 'counter/decremented':
>    return { value: state.value - 1 };
>  default:  
>    return state;
> ```
>
> }
>
> }
>
> ```
> // 创建一个 store 来保存应用程序的状态
> const store = createStore(counterReducer)
> // 订阅 state 的变更
> store.subscribe(() => console.log(store.getState()))
> // 只能通过 dispatch 一个 action 的方式去修改 store 中的状态. 
> store.dispatch({ type: 'counter/incremented' })
> ```


从上图可以看出状态的修改朝着一个特定的方向进行，状态变更必须经过 reducers，状态以一种可预测的方式变化。

总结 Redux 状态管理的特点：

1. 1. 遵循 Flux 思想，单向数据流

   2. 集中存储管理应用的状态

   3. 状态是可 JSON 序列化的对象的形式

   4. 需要手动订阅

      

#### 2.MobX

MobX 是另一个状态管理库，MobX 中有四个核心概念，分别是：Observable state，Computed values，Reactions，Actions。Observable state 是源数据，它可以是任何值。Computed values 由 Observable state 和纯函数计算而来。Reactions 与 Computed values 类似，它们都是衍生数据，但是与 Computed values 不同的是 Reactions 可以是一个 side effect，例如：网络请求，将组件树对应到 DOM 上这都是 Reactions。Actions 用于修改 Observable state。MobX 的灵感来源于电子表格，所有有值的数据单元格都是 Observable state，单元格中的值配合公式可以生成一个 Computed values，将单元格的值绘制到屏幕上是 Reactions，改变单元格中的值是 Actions。

> ```
> // store 类
> class Person {
> @observable firstName = "Michel";
> @observable lastName = "Weststrate";
> @observable nickName;
> @computed get fullName() {
>  return this.firstName + " " + this.lastName;
> ```
>
> }
>
> ```
> }
> const michel = new Person();
> // Reaction
> autorun(() => console.log(michel.nickName ? michel.nickName : michel.fullName)); 
> // Observer
> const profileView = observer(props => { 
> if (props.person.nickName) 
>  return <div>{props.person.nickName}</div>;
> else
>  return <div>{props.person.fullName}</div>; 
> }); 
> // Action
> setTimeout(() => michel.nickName = "mweststrate", 5000);
> React.render(React.createElement(profileView,{ person: michel }), document.body);
> ```

MobX 推荐的数据流图是：


Mobx 与 Redux 差异很大，总结为两点：

1. 1. Mobx 不要求状态的数据结构是可 JSON 序列化的，它可以用对象、数组、类。 循环数据结构、引用来存储状态
   2. MobX 会自动收集并追踪依赖，不需要手动订阅状态的更新，当状态变化之后能够精准更新受影响的内容

从上图可以看出 MobX 推荐使用 Action 去修改 state，但是这只是在严格模式下做的限制，如果不是严格模式下，那么可以在很多地方去直接修改 state。随意修改 store 中的状态，会导致状态变更安全性降低。Mobx 只关注原始数据到衍生数据之间的变更，你要如何组织代码没有规范遵循，不同经验的开发人员写出来的代码差异很大，这在重业务逻辑的项目中很不利。

#### 3. Vuex

Vuex 是 Vue 的一个插件，可以说它是专门为 Vue 应用程序做状态管理而生的。与 Redux 一样，Vuex 它集中存储管理应用的状态，要改变 store 中的 state 只能通过 commit mutation，从这点来看 Vuex 也遵循 Flux 思想。由于 Vue 在渲染的时候会自动收集并追踪依赖，所以 Vuex 的状态是响应式的。如果 Vue 组件从 store 中读取状态，当 store 中的状态发生变化时，相应的组件也会得到更新。

> ```
> const store = new Vuex.Store({  
> state: { count: 1 }, 
> mutations: { increment (state){ state.count++ } },
> actions: {  
>  incrementAsync ({ commit }) { setTimeout(() => { commit('increment') }, 1000) }
> }
> ```
>
> } )
>
> ```
> store.commit('increment') 
> store.dispatch('incrementAsync')
> ```


在 Redux 和 MobX 中的 action 是一个虚拟的概念，Vuex 中的 action 是 store 中的一部分，它是专门用来做异步操作的，它可以返回一个 promise。

#### 4. 比较

|      | Redux                                                        | MobX                                                         | Vuex                                                         |
| :--- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 特点 | 数据流流动很自然，因为任何 dispatch 都会导致广播，需要依据对象引用是否变化来控制更新粒度如果充分利用时间回溯的特征，可以增强业务的可预测性与错误定位能力时间回溯代价很高，因为每次都要更新引用，除非增加代码复杂度，或使用 immutable时间回溯的另一个代价是 action 与 reducer 完全脱节，数据流过程需要自行脑补，原因是可回溯必然不能保证引用关系引入中间件，其实主要为了解决异步带来的副作用，业务逻辑或多或少参杂着 magic但是灵活利用中间件，可以通过约定完成许多复杂的工作对 typescript 支持困难 | 代码量少基于数据劫持来实现精准定位（真正意义上的局部更新）多store抽离业务逻辑（Model View分离）响应式性能良好（频繁的交互依然可以胜任）完全可以替代react自身的状态管理支持typescript没有状态回溯能力：mobx是直接修改对象引用，所以很难去做状态回溯（这点redux的优势就瞬间体现出来了）没有中间件：和redux一样，mobx 也没有很好地办法处理异步数据流，没办法更精细地去控制数据流动（redux虽然自己不做，但是它提供了applyMiddleware！）store太多：随着store数的增多，维护成本也会增加，而且多store之间的数据共享以及相互引用也会容易出错副作用：mobx直接修改数据，和函数式编程模式强调的纯函数相反，这也导致了数据的很多未知性 | 单向数据流。View 通过 store.dispatch() 调用 Action ，在 Action 执行完异步操作之后通过 store.commit() 调用 Mutation 更新 State ，通过 vue 的响应式机制进行视图更新单一数据源，和 Redux 一样全局只有一个 Store 实例可直接对 State 进行修改只能用于 Vue |

### 二. 在编辑器中开启装饰器

####    1. 安装

> ```js
> npm install customize-cra react-app-rewired @babel/plugin-proposal-decorators --save
> ```

####    2. 在项目根目录新建 config-overrides.js 文件加入以下代码:

> ```js
> const { override, addDecoratorsLegacy } = require('customize-cra');
> module.exports = override(
> addDecoratorsLegacy()
> );
> ```

####    3. 修改 package.json 文件如下：

> ```js
> "scripts": {
> "start": "react-app-rewired start",
> "build": "react-app-rewired build",
> "test": "react-app-rewired test",
> "eject": "react-app-rewired eject"
> }
> ```

####    4. VSCode 解决 experimentalDecorators warning

> ```
> Experimental support for decorators is a feature that is subject to change in a future release. 
> Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.
> ```

#####     4.1. 新 VSCode 版本 Updated Solution June 2020

```
    setting → 搜索 Experimental Decorators → 
```

    ![彭鹏 > MobX快速上手 > image2020-12-14_16-0-36.png](http://wiki.intra.xiaojukeji.com/download/attachments/493708802/image2020-12-14_16-0-36.png?version=1&modificationDate=1607932836000&api=v2&effects=drop-shadow)

#####     4.2. 旧 VSCode 版本 Old Solution

```
  在根目录创建 tsconfig.json
```

> ```
> {
>  "compilerOptions": {
>      "experimentalDecorators": true,
>      "allowJs": true
>  }
> }
> ```

### 三. 引入 MobX

   注意⚠️：需注意 MobX 的版本，版本不同，写法不同

> ```
> npm install mobx@x.x.x --save
> npm install mobx-react@x.x.x --save
> ```

####   1. MobX 的版本低于6，也会要求 react 版本低于 17

> ```
> "mobx": "^5.13.0",
> "mobx-react": "^6.1.1",
> "react": "^16.11.0",
> "react-dom": "^16.11.0"
> ```

   ![彭鹏 > MobX快速上手 > image2020-12-15_17-4-27.png](http://wiki.intra.xiaojukeji.com/download/attachments/493708802/image2020-12-15_17-4-27.png?version=1&modificationDate=1608023067000&api=v2)    

####   2. MobX6 新写法

   ![彭鹏 > MobX快速上手 > image2020-12-15_17-7-2.png](http://wiki.intra.xiaojukeji.com/download/attachments/493708802/image2020-12-15_17-7-2.png?version=1&modificationDate=1608023222000&api=v2)    

### 四. 常用操作符（MobX6以下）

####    mobx 用来操作 store（也就是数据操作层，model 层）

- observable，将JS基本数据类型、引用类型、普通对象、类实例、数组和映射，转换为可观察数据
- action，用来修改observable的数据的动作，只有action和runInAction才能修改observable
- runInAction，用来在异步的时候执行修改observable的数据的动作。例如网络请求后修改数据
- computed，根据现有的observable的值或其它计算值衍生出的值。只有在view使用了computed的值，computed才会执行计算

####    mobx-react 则是用来操作 view（也就是视图层，Component 层）

- observer，将 React组件 转变成响应式组件
- inject，将组件连接到提供的stores。一般是用来连接到上层组件提供的store或者全局store
- Provider，它是一个react组件，用来向下传递stores。任意子组件可以使用inject来获取Provider的store

### 五. 简单Demo - todoList

####    1. 文件结构

> ｜- component
>
> ｜- - addtodo.js
>
> ｜- - doing.js
>
> ｜- - done.js
>
> ｜- store
>
> ｜- -todoList.js

####    2. todoList.js

> ```
> import { observable, action, computed, toJS } from "mobx";
> class todoList {
> // 定义观察数据
> @observable todos = [];
> 
> // 计算属性，返回没有完成的待办项的个数
> @computed get unfinishedTodoCount() {
> return this.todos.filter((todo) => !todo.isComplete).length;
> }
> 
> // 计算属性，返回已完成的待办项的个数
> @computed get finishedTodoCount() {
> return this.todos.filter((todo) => todo.isComplete).length;
> }
> 
> // 设置为完成任务
> @action
> toggleComplete = (val) => {
> const todos = toJS(this.todos).map((item) => {
>   if (item.id === val) {
>     item.isComplete = true;
>   }
>   return item;
> });
> this.todos = todos;
> };
> 
> // 设置为未完成任务
> @action
> toggleTodo = (val) => {
> const todos = toJS(this.todos).map((item) => {
>   if (item.id === val) {
>     item.isComplete = false;
>   }
>   return item;
> });
> this.todos = todos;
> };
> 
> // 添加任务
> @action
> add = (val) => {
> const todos = toJS(this.todos);
> this.todos = [...todos, val];
> };
> 
> // 删除任务
> @action
> delete = (val) => {
> const todos = toJS(this.todos).filter((item) => item.id !== val);
> this.todos = todos;
> };
> }
> export default new todoList();
> ```