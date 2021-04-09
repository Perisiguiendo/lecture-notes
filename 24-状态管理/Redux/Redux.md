##  一. Redux的组成
####  1. state——状态
- DomianData：服务器的数据
- UI state：决定当前 UI 展示的状态
- App state：App 级别的状态

####  2. action——事件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201029102354717.png#pic_center)
####  3. reducer
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201029102712757.png#pic_center)
####  4. store
- 维持应用的 state
- 提供 getState() 方法获取 state
- 提供 dispatch(action) 方法更新 state
- 通过 subscribe(listener) 注册监听器
- 通过 subscribe(listener) 返回的函数注销监听器Redux

####  5. bindActionCreators
- 作用是将一个或多个**action**和**dispatch**组合起来生成**mapDispatchToProps**需要生成的内容

##  二. React-redux
####  1. provider
- `<Provider store={store}>` ：包裹 React 顶层组件，并且为子组件传递 store，目的是让所有组件都能够访问到 Redux 中的数据

####  2. connect 参数说明
- `mapStateToProps(state, ownProps)`：该函数允许将 store 中的数据作为 props 传入到组件。**state**：redux 中的 store，**ownProps**：自己的 props

- `mapdispatchToProps(diapatchm,ownProps)`：将 action 作为 props 绑定到我们自己的函数中。**dispatch**：store.dispatch()，**ownProps**：自己的 props
- `mergeProps(stateProps, dispatchProps, ownProps)`：不管是 stateProps，还是 dispatchProps，都需要和 ownProps 合并之后才会被赋值给我们的组件。通常情况下可以不传，connect 会使用 `Object.assign` 替代该方法
- `options`：可以定制 connector 的行为

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201103102854926.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BlcnNpZ3VpZW5kbw==,size_16,color_FFFFFF,t_70#pic_center)
####  3. UI组件
- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用this.state这个变量）
- 所有数据都由参数（this.props）提供
- 不使用任何 Redux 的 API
- UI 组件负责 UI 的呈现

####  4. 容器组件
- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API
- 容器组件负责管理数据和逻辑。

> 如果一个组件既有 UI 又有业务逻辑，那怎么办？
> 回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图

> React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它