# react-hooks的实战总结

```js
useState
useEffect
useLayoutEffect
useCallback
useMemo
useRef（useImperativeHandle
useImperativeHandle（useRef）
useReducer
useContext
Context
React.memo
--
useFetch
如何封装一个useFetch
hooks中父组件如何获取子组件中的方法 `useImperativeHandle` `forwardRef`
--
复习：
js中的注释规范
手写call，applay，bind
逻辑运算符 &&     ||
```

# useState

- `function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]`

```
useState

function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

- 参数
  - 参数是一个值或者函数
  - 参数是函数时，返回值作为初始值，（当初始值需要复杂运算时使用）
    - 该函数仅在初始渲染时执行一次，以获得初始状态。在以后的组件渲染中，不会再调用，从而跳过昂贵的操作。！！！！
- 返回值
  - 返回值是一个数组
  - 第一个成员：返回设置过后的state
  - 第二个成员：setter函数(本质上就是一个dispatcher，底层就是useReducer)
    - 该函数的参数可以是一个值，或者是一个签名为 (prevState: S) => S 的函数
  - 即返回一个状态值和一个函数来更新状态
- 注意事项
  - 仅在顶层调用hook，不能在循环，条件，嵌套函数中 useState()，在多个useState()调用中，渲染之间的调用顺序必须相同。
    - 为什么要在顶层顺序调用，而不能在循环，条件，嵌套中调用？？？？？？？
      - 因为内部的各个state都会用一个队列来维护（类似数组）
      - 并且队列中的state和setter函数是一一对应的，在上面三种情况中可以会改变一一对应的关系，造成错误的预期
  - ！！！
  - 过时的状态，闭包是一个从外部作用域捕获变量的函数。（解决办法，通过函数返回值，如setCount(count => count+1)）
  - 闭包（例如事件处理程序，回调）可能会从函数组件作用域中捕获状态变量。 
    由于状态变量在渲染之间变化，因此闭包应捕获具有最新状态值的变量。否则，如果闭包捕获了过时的状态值，则可能会遇到过时的状态问题。
- 复杂的状态
  - 当有多个状态完成同一项任务时，或者状态过多时，建议使用 useReducer
- 关于react组件的重新渲染
  -  class  中重新渲染：是render()和willmout dimount等钩子函数重新执行
  - function中重新渲染：整个组件函数重新执行
- 思考
  - 当函数执行完后，所有内存都会被释放掉，函数中声明的变量也会被释放掉，那useState如何能保存状态呢？？？？？？？
  - 或者说，每次重新渲染，为什么useState能返回记住的状态？？？？
- 答案
  - useState利用闭包，在函数内部创建一个当前函数组件的状态。并提供一个修改该状态的方法。






- 实例
------------------
(1) 例子1
  - 过时的状态
  - setCount参数是值和函数的区别

<div  onClick={() => setTimeout(() => setCount(count+1), 3000)}> ----------- // 在3秒内多次点击，多次渲染，但始终 count =1
  点击执行定时器，set函数参数是一个值的情况
</div>
<div onClick={() => setTimeout(() => setCount(count => count+1), 3000)}> --- // 在3秒内多次点击，时间到后，会记录每次点击的值
  点击执行定时器，set函数参数是一个函数的情况
</div>
<div>{count}</div>





------------------
(2) 例子2
  - 如果是同一个引用，组件不会重新渲染

const [isReRender, setIsReRender] = useState({render: true});
setIsReRender(isReRender) -------------------- 不会重新渲染，内部使用函数记忆，缓存了上一次的值，相同直接使用
-
setIsReRender(() => ({render: true})) -------- 会重新渲染，因为是一个新的不同引用的对象
-
isReRender.render = false;
setIsReRender(isReRender) -------------------- 不会重新渲染，赋值之后再比较，引用没变





------------------
(3) 例子3
- useState返回的state在整个生命周期中保持不变，所以可以用来固定变量的引用，在不使用改变函数的时候
- 当然也可以使用useRef去固定变量
const [a] = useState(0); // 注意，这只使用赋值state，不需要改变函数





------------------
(4) 例子4！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
function CaseOne() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      console.log(count, 'in')
      setCount(count+1)
      // 这里有外层函数CaseOne，里层函数setInterval的回调函数，并且里层使用了外层的count，setCount两个变量，形成闭包
      // 定时器每次执行，都是使用的第一次执行时声明并赋值的count，count是第一次渲染中的闭包中的count，值永远是0 
      // 所以 setCount的参数永远是1，在这个例子中
    }, 1000)
  }, [])
  console.log(count, 'out')
  return (
    <div style={{background: 'yellow'}}>
      <div>经典的use-state</div>
    </div>
  )
}
解析：
1. useState()的初始参数，只会在第一次执行的时候，赋值给count变量，以后的渲染就不再有作用
2. useState()的返回值count，在除了第一次使用useState的初始参数外，以后的渲染将使用上一次的setCount的返回值
具体过程：
第一次渲染
  - useState(0)执行，返回[0, setter函数]赋值给了count和setCount
  - 外层count => 0
  - 1s后定时器执行，形成闭包，闭包中的变量 count是0，setCount(0+1)
第二次渲染：
  - count和setCount从新声明并赋值，count是上一次setCount的返回值，即 1
  - 外层count => 1
  - 注意：定时器再次执行，count还是引用的第一次执行生成的闭包中的count是0，setCount(0+1)
  - 注意：第二次的setCount和第一次的setCount的参数都是0+1，即参数没有发生变化，这种情况，react将不会在重新渲染，即不会有第三次渲染了
         即外层的count将不再打印，保持1





------------------
(5) 例子5
- useState在不用setter函数修改，而是直接修改state时，可以用来缓存引用类型的变量
  - 如果是原始类型的值，由于是const不能被修改，如果用let每次都是新的引用，重渲染会被初始化
function CaseTwo() {
  const [a] = useState({count: 1}) // 引用类型的变量
  let [c] = useState(10) // 原始类型的值，使用的是let
  const [b, setB] = useState(0)
  return (
    <div style={{background: 'yellow'}}>
      <div>CaseTwo</div>
      <div onClick={() => {
        a.count = 22 // 直接修改引用类型的值，注意不是用useState返回的setter函数修改
        c = 33 // 直接修改原始类型的值
        setB(b => b+1) // 重新渲染
      }}>点击重新渲染</div>
      <div>{a.count}</div> // 打印22
      <div>{b}</div> // 打印10，每次被重新初始化，这种情况要固定住值的话，可以使用useRef ！！！！！！！！！！！
      <div>{c}</div>
    </div>
  )
}
复制代码
```

经典的例子：[juejin.im/post/684490…](https://juejin.im/post/6844903942296436749)

[juejin.im/post/684490…](https://juejin.im/post/6844903999083118606)

[mp.weixin.qq.com/s/Bo0Q6FDn4…](https://mp.weixin.qq.com/s/Bo0Q6FDn4a8QuI1WseRF2g)

解析：[imweb.io/topic/5c7d5…](https://imweb.io/topic/5c7d58b0baf81d795209497e)

useState源码：[juejin.im/post/684490…](https://juejin.im/post/6844903990958784526)

使用介绍：[juejin.im/post/684490…](https://juejin.im/post/6844903957534507021)

# useEffect

- 执行副作用的hook
- 什么是副作用：除了和渲染ui相关的意外的逻辑都是副作用`（当dom渲染完执行的和ui无关的逻辑）`

```
useEffect
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  - type EffectCallback = () => (void | (() => void | undefined));
  - type DependencyList = ReadonlyArray<any>;


参数：
- 第一个参数：函数
  - 每一次render之后，执行副作用，和清除上一次副作用
  - 该函数的返回值就是清除函数（清除上一次的副作用）
- 第二个参数：数组
  - 当这几个依赖有一个要更新，effect里面也会重新生成一个新的副作用并执行副作用
  - 如果没有更新，则不会执行。
  - 如果第二个参数不传，表示没有依赖项，则每次render后都会执行
  - 注意：第二个参数是一个空数组 [ ] 时！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    - 如果传一个空数组，表示useEffect的回调只执行一次，类似于componentDidMount()
    - useEffect每次渲染后都会执行，只是useEffect依赖是空数组，每次对比没有变化，所以Effect的回调不再执行
    - 是useEffect的回调只执行一次，而不是useEffect只执行一次，useEffect每次渲染后都会执行
    - 依赖的比较，只是简单的比较值或者引用是否相等
    - 所以
      - 很明显，useEffect可以模仿（didMount，didUpdate），返回值可以模仿（willUnmount）
- 什么是副作用
  - 和渲染ui无关的逻辑都是副作用
  - 当DOM渲染完成之后，我还要执行一段别的逻辑，这一段别的逻辑就是副作用


useEffect执行的时机：
- 每次渲染完成后，执行useEffect
  - setEffect有点类似于componentDidMount，componentDidUpdate，componentWillUnmount的结合



注意事项：
1. useEffect中用到的状态，官网推荐都应该写到依赖数组中去，不管引用的是基础类型值、还是对象甚至是函数。
2. useEffect的第一个参数函数，如果返回一个函数，该函数就是清理函数

3.清除函数执行的时机：
- useEffect的第一个参数函数，如果返回一个函数，该函数就是清理函数（清除一些副作用，如定时器等）
- 执行的时机：！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
- 第一次渲染，不会执行清除函数，所以 31 -----------------------------------（只不过定时器的缘故，132一起打印了）
- 第二次渲染，在渲染完成后，立即执行清除函数，再执行Effect函数的回调函数，所以 321
- 总结：再每次渲染完成后，立即执行清除函数清除上一次的副作用（第一次渲染除外）

打印顺序为：31 321 321 321
const [count, setCount] = useState(0);
useEffect(() => {
  const timer = setInterval(() => {
    console.log('1=======')
    setCount(count+1)
  }, 1000)
  return () => {
    console.log('2=======')
    clearInterval(timer)
  }
}, [count])
console.log('3=======')
复制代码
```

2021/01/08 useEffect补充知识点总结

# useEffect 补充

- useEffect函数签名

  - `function useEffect(effect: EffectCallback, deps?: DependencyList): void`
    - `type EffectCallback = () => (void | (() => void | undefined))`
    - `type DependencyList = ReadonlyArray<any>`

- 上面签名的意思是

  - useEffect(() => { return Cleanup(){...} }, [...])
  - 第一个参数：是一个函数，该函数还可以返回一个 Cleanup 清除函数
  - 第二个参数：是一个依赖数组

- useEffect的神奇之处！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

  - useEffect第一个参数函数

    - useEffect 在渲染完成之后执行，因此不会阻塞渲染

      - 渲染前执行 ( 

        ```
        useLayoutEffect同步钩子
        ```

         )

        - 那要在渲染执行执行一些任务时怎么办? 可以使用 useLayoutEffect

      - 渲染后执行 ( 

        ```
        useEffecct异步钩子
        ```

         )

        - useEffect在渲染之后执行，不阻塞渲染，提高性能

    - useEffect 执行前，会先执行上一次useEffect的 Cleanup 清除函数 ( 如果有的话)

      - useEffect只执行一次就没有上一次
      - useEffect第一次执行也不会执行 Cleanup 函数，第二次才会执行上一次的
      - 组件卸载时，执行最有一次的 useEffect 的 Cleanup 函数

    - **当组件销毁时，会执行最后一次useEffect的 Cleanup 清除函数**

  - useEffect的第二个参数 - 依赖数组

    - 依赖数组用来控制是否触发 useEffect() 钩子函数
    - useEffect等价于 ( componentDidMount ) ( componentDidUpdate ) ( componentWillUnmount ) 三个生命周期
      - 模拟componentDidMount(只在挂载阶段执行)
        - `useEffect(()=>{}, [])`
        - `在依赖数组为空时，如果存在 Cleanup 取消函数，第一次后都不会执行，直到组件销毁时才执行 Cleanup 清除函数`
      - 模拟componentDidUpate(挂载阶段不执行，在更新阶段执行)
        - 用一个标志位，isDidUpdate默认是false,则第一次useEffect不执行，再设置为true，第二次以后就会执行
        - `useEffect(() => { if(isDidUpdate){ // compenntDidUpdate阶段执行的代码 }; setIsDidUpdate(true) })`
    - 依赖数组是如何比对的？，主要通过 Object.is 来做对比
      - 所以，**如果依赖数组成员是( 数组，对象，函数 )等引用类型的数据时，需要使用useMemo()和useCallbak()来处理**
      - useMemo(() => object, [依赖数组])
      - useCallback(fn, [依赖数组])
      - useMemo用来缓存任意类型的数据，包括函数
      - 即 `useMemo(() => fn, []) 等价于 useCallback(fn, [])`
    - 为什么在 useEffect(() -> { setter() }, [依赖]) 中调用 setter 函数时，没有把state的setter函数作为依赖项？？？
      - `因为react内部已经把setter函数做了memoizaton缓存处理，即每次的setter函数都是同一个函数，所以就不用手动通过useMemo或者useCallback来做memoization了`

  - 还有一个注意点

    - 案例：**useEffect( async() => {}, [依赖]) 这样的写法超级不好**
    - 因为：**由useEffect的函数签名可知，第一个参数函数要么没有返回值，要么返回一个 Cleanup 清除函数，而 aysnc函数返回的却是 promise 对象，强烈不建议这样使用**

### 总结useState和useEffect

- **useState和useEffect每次调用都被添加到 Hook ( `链表` ) 中**
- **useEffect还会额外在一个 ( `队列` ) 中添加一个等待执行的回调函数，即 useEffect的第一个参数函数，在渲染完成后，依次调用队列中的Effect回调函数**
- 关于为什么hooks必须放在组件头部？不能在循环，嵌套，条件语句中使用？
  - **主要是保证每次执行函数组件时，调用hooks的顺序保持一致**
  - **因为 循环，嵌套，条件语句都是动态语句，可能会导致每次函数组件调用hooks的顺序不能保持一致，导致链表记录的数据失效**

[juejin.im/post/684490…](https://juejin.im/post/6844903842547499015)
 [juejin.im/post/684490…](https://juejin.im/post/6844903957425324046)

# useLayoutEffect

- `在所有的 DOM 变更之后同步调用 effect，可以使用它来读取 DOM 布局并同步触发重渲染，在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。`
- useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的，注意只是调用时机一样
- `seLayoutEffect是同步地，而useEffect是异步的`
- useLayoutEffect可以解决屏幕跳动的问题

```
useEffect

function App2 () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (count===0) {
      setCount(count => Math.random())
    }
  }, [count])
  return (
    <div>
      <div onClick={() => setCount(count => 0)}>点击更新</div>
      {count}
    </div>
  )
}
结果：渲染结果是先变成0，后变成随机数
过程：
1.  setCount(count => 0)，从新render，渲染0，执行useEffect，setCount(count => Math.random())，重新渲染得到随机数







----------------------
useLayoutEffect

function App2 () {
  const [count, setCount] = useState(0)
  useLayoutEffect(() => {
    if (count===0) {
      setCount(count => Math.random())
    }
  }, [count])
  return (
    <div>
      <div onClick={() => setCount(count => 0)}>点击更新</div>
      {count}
    </div>
  )
}
结果：不会变成0，而是直接显示随机数字
过程：
1.  setCount(count => 0)，重新render，浏览器并没有渲染完成，
2. useLayoutEffect执行，阻塞渲染，setCount(count => Math.random())，重新render，
3. useLayoutEffect执行，没有逻辑，渲染随机数

复制代码
```

# useCallback

- 缓存函数（或者说缓存住函数变量），（或者说固定函数的引用）

```
useCallback

- 固定函数的引用，即缓存函数
- function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
- 参数：
  - 第一个参数：回调函数
  - 第二个参数：依赖项
- 返回值
  - 返回值是一个T类型的函数


- 说明
  - 一般情况下，组件重新渲染，函数就会被重新声明
  - 但是用useCallback包装的函数，只有在依赖项改变的时候，才'相当于'重新声明，未改变时，是缓存的上一个的函数引用


- 注意点
1. const a = useCallback(() => {...}, [])
  - 这种情况 a 永远不会重新声明，因为它的依赖项是空


- 性能优化 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
  - 配合React.memo优化
  - React.memo
    - React.memo是当props改变时才会重新渲染，仅仅依赖于被传入的props
    - 而当props中包含函数的时候，函数的引用可以用useCallback控制，即useCallback可以控制props中的函数是否改变！！！！！！


案例
(1) 配合React.memo做性能优化
父组件：
function UseCallback() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('yellow')
  const callBackChangeColor = useCallback(() => { 
    // callBackChangeColor 函数的更新仅仅依赖于color改变
    // 如果color不更新的话，callBackChangeColor的引用就不会改变
    // 又因为子组件更新仅仅依赖于callBackChangeColor函数的更新
    const index = Math.floor(Math.random()*4)
    setColor(['black', 'white', 'blue', 'green', 'Purple'][index])
  }, [color])
  return (
    <div style={{background: '#FF4500', padding: '20px', margin: '10px 0'}}>
      <div style={{color}}>USE_CALLBACK</div>
      <div onClick={() => setCount(count => count+1)}>父组件改变count</div> // 当count改变时，子组件并不会重新渲染
      <div>{count}</div>
      <ChildUseCallback setColor={callBackChangeColor} /> // 子组件
    </div>
  )
}
子组件：
const ChildUseCallback = React.memo(({setColor}) => { // React.memo组件的更新仅仅依赖于setColor函数的改变
  const changeColor = () => {
    setColor()
  }
  console.log('子组件执行了')
  return (
    <div style={{background: '#FA8072'}}>
      <div>CHILD_USE_CALLBACK</div>
      <div onClick={changeColor}>改变颜色</div>
    </div>
  )
})
复制代码
```

# useMemo

- 缓存变量，类似于计算属性
- 使用的时候要考虑两点
  - 要记住的函数开销大吗？大才考虑使用useMemo
  - 返回的是原始值吗？不是原始值时才考虑useMemo
- 当useEffect的函数中要使用不会再改变的props，但是不在依赖项时，ESLint Hook会发出警告
  - `解决办法是，用useRef固定住不需要再改变的某些props `=> 具体请点击下面的链接

```
useMemo
- function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
- 参数
  - 第一个参数是一个函数，返回值类型是T类型
    - 通常情况下类似这样 const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
    - 注意函数返回函数，内层函数必须有返回值！！！！！！！！！！！！！
  - 第二个参数是数组或者undefined，即依赖项
- 返回值
  - T类型的变量



案例：
父组件：
function UseCallback() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('yellow')
  const [isBoolean, setIsBoolean] = useState(false)
  const callBackChangeColor = useCallback(() => {
    const index = Math.floor(Math.random()*4)
    setColor(['black', 'white', 'blue', 'green', 'Purple'][index])
  }, [color])
  const aOrBFn = () => {
    return isBoolean ? 'A' : 'B'
  }
  const cacheIsBoolean = useMemo(() => aOrBFn(), [isBoolean])  // useMemo
  // useMemo，当isBoolean改变时重新执行aOrBFn函数，同时在子组件没有依赖的state变化时，不重新渲染
  // 例如：
  //   1. 当count变化时，父组件重新渲染，但是子组件没有依赖cont，不希望重新渲染
  //   2. 子组件重新渲染只依赖两个，一是 cacheIsBoolean 变量，二是callBackChangeColor函数
  //   3. 只希望依赖的两个props改变，才重新渲染子组件，所以使用useCallback固定函数，用useMemo固定变量，同时用React.memo优化子组件
  return (
    <div style={{background: '#FF4500', padding: '20px', margin: '10px 0'}}>
      <div style={{color}}>USE_CALLBACK</div>
      <div onClick={() => setCount(count => count+1)}>父组件改变 => Count</div>
      <div>{count}</div>
      <div onClick={() => setIsBoolean(boo => !boo)}>父组件改变 => Boolean</div> // isBoolean改变，触发useMemo的参数函数重新计算
      <div>{isBoolean + ''}</div>
      <ChildUseCallback setColor={callBackChangeColor} cacheIsBoolean={cacheIsBoolean}/> // 子组件依赖cacheIsBoolean
    </div>
  )
}
子组件：
const ChildUseCallback = React.memo(({setColor, cacheIsBoolean}) => {
  const changeColor = () => {
    setColor()
  }
  console.log('子组件执行了')
  return (
    <div style={{background: '#FA8072'}}>
      <div>CHILD_USE_CALLBACK</div>
      <div onClick={changeColor}>改变颜色</div>
    </div>
  )
})
复制代码
```

哪些情况要避免使用useMemo [www.infoq.cn/article/mM5…](https://www.infoq.cn/article/mM5bTiwipPPNPjhjqGtr)

# useRef

```
useRef

- const refContainer = useRef(initialValue);
- function useRef<T = undefined>(): MutableRefObject<T | undefined>;
- current属性
  - useRef.current属性，被初始化为传入的参数（initialValue）
- 返回值
  - 返回一个可变的ref对象
  - 返回的ref对象，在组件的整个生命周期内保持不变


(1) 作用
- 保存任何可变的值，在组件整个生命周期内保持不变（每次渲染时，返回同一个ref对象）
- 即还可以绑定DOM节点和子组件 （保存任何可变值包括DOM节点，子组件等）
- 相当于class中的普通属性


(2) 注意点
- 改变 useRef.current 属性不会触发组件重新渲染，类似于class组件中声明的属性


(3) 实例
- 主要测试：绑定DOM 和 固定变量
function UseRef() {
  const renderTimes = useRef(0); // 组件渲染的次数测试，useRef.current的初始值时0，（相当于外部的全局变量，能固定住值）
  renderTimes.current++; // 每次render都 +1
  const inputRef = useRef(null) // 绑定dom测试
  console.log('renderTime:', renderTimes.current)  // 1  2
  console.log('useRef.current:', inputRef.current) // null <input />
  const focus = () => {
    inputRef.current.focus()
  }
  return (
    <div style={{background: '#FFBBFF'}}>
      <div>USE_REF</div>
      <input ref={inputRef} />
      <button onClick={focus}>获取input焦点</button>
    </div>
  )
}

复制代码
```

useRef使用场景 [juejin.im/post/684490…](https://juejin.im/post/6844903887845982221)

# useContext

- 注意：在function组件中，必须必须使用useContext才能拿到context实例中的值，而不能像在class组件中那样直接获取

```
useContext
- 注意：在function组件中，必须必须使用useContext才能拿到context实例中的值，而不能像在class组件中那样直接获取

function useContext<T>(context: Context<T>/*, (not public API) observedBits?: number|boolean */): T;
interface Context<T> {
  Provider: Provider<T>;
  Consumer: Consumer<T>;
  displayName?: string;
}


(1)
const value = useContext(MyContext);
- 参数
  - 一个context对象，(React.createContext的返回值)
- 返回值
  - context的当前值
  - 注意：context的值由( 上层组件 )中距离最近的 <MyContext.Provider> 的 value prop 决定
- 原理：
  - 当上层最近的<MyContext.Provider>更新时，该hoos会触发 `重新渲染`，并使用最新的 value 值
- 场景
  - 避免数据的层层传递
- 本质
  - useContext实际上是class中的 <context实例.Consumer> 或者 static contextType = context实例  的语法糖
  - useContext只是让你能够读取context的值，以及订阅context的变化



---------------
例子：

import React, {useContext, useState} from 'react';
const TestContext = React.createContext('100') // React.createContext('100')创建一个context实例，初始值为‘100’
// 父组件
function UseContext() {
  const [fontWeight, setFontWight] = useState('400')
  return (
    <div style={{background: '#1E90FF'}}>
      <div>USE_CONTEXT</div>
      <div onClick={() => setFontWight('700')}>点击改变context</div>
      <TestContext.Provider value={fontWeight}> // context实例提供Provider组件，组件提供value值，当value变化时，组件会重新渲染
        <ContextChildOne />
      </TestContext.Provider>
    </div>
  )
}
// 子组件
function ContextChildOne() {
  return (
    <div>
      <div>ContextChildOne</div>
      <ContextChildTwo />
    </div>
  )
}
// 孙子组件
function ContextChildTwo() {
  const fontWeightTwo = useContext(TestContext) // 使用useContext
  return (
    <div>
      <div style={{fontWeight: fontWeightTwo}}>ContextChildTwo</div>
    </div>
  )
}

export default UseContext;
复制代码
```

class组件中如何使用context：[react.docschina.org/docs/contex…](https://react.docschina.org/docs/context.html) 官网useContext [react.docschina.org/docs/hooks-…](https://react.docschina.org/docs/hooks-reference.html#usecontext)

# Context

- React.createContext
- Class.contextType
- `Context.Provider`
- `Context.Consumer`
- Context.displayName

```
Context
- context提供了一个无需为每层组件手动添加props，就能在组件树之间进行数据传递的方法
- 注意：如果组件的属性需要层层传递，而且只有最后一个组件需要使用到传递的属性，可以使用控制反转
  - 控制反转：直接传递整个在最后需要使用的组件，减少props的个数和传递的层数
- api


1. React.createContext
  - 创建一个context对象，注意是对象
  - 当react渲染一个（ 订阅 ）了这个（ context对象 ）的组件时，这个组件会从离自身最近的（Provider ）中读取到当前的context
  - 只有订阅了这个context对象的组件所在的组件树中没有匹配到 Provider 时，defaultValue才会生效。
  - 注意：将undefined传递给provider的value，消费组件的defaultValue不会生效


2. Context.Provider
- <Context.Provider value={...}>
- 每个Context对象都有一个Provider对象组件，它允许消费组件`订阅context的变化`
- Provider接收一个value属性，传递给消费组件
- 一个Provider可以和多个消费组件有对应关系
- 多个Provider也可以嵌套使用，里层会覆盖外层的数据
- 注意：当Provider的value值发生变化时，它内部的所有消费组件都会从新渲染。！！！！！！！！！！！！！！！！！
- Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。


--------------------
3. Class.contextType     
- `提供给this.context来消费`
- MyClass.contextType = MyContext; // MyContext是context实例对象，MyClass是组件，contextType组件的静态属性
- contextType属性也可以写在组件内部，static ContextType = MyContext
- 说明：
- 挂载在 class 上的 `contextType` 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。
- 这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
 - 如果你正在使用实验性的 public class fields 语法，你可以使用 `static` 这个类属性来初始化你的 `contextType`。
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}




--------------------
4. Context.Consumer
- React 组件也可以订阅到 context 变更。这能让你在 函数式组件 中完成订阅 context
- 代码案例：

const GlobalThem = React.createContext({color: 'red'}) // 创建context对象，初始值参数只是在消费组件没有找到Provider时生效
function App2() {
  return (
    <div>
      <GlobalThem.Provider value={{color: 'blue'}}> 
        // Provider提供给消费组件订阅context，把value传递给消费组件，并在value变化时重新渲染
        <Child />
      </GlobalThem.Provider>
    </div>
  )
}
function Child() {
  return (
    <div>
      <Grandson />
    </div>
  )
}
function Grandson() {
  return (
    <GlobalThem.Consumer> 
      // Consumer主要用于函数式组件，在class组件中可以使用Class.contextType包装，用this.context获取
      // 消费组件订阅context，下面的value参数就是context的值
      {
        value => (
          <div> // 返回一个组件
            {value.color}
          </div>
        )
      }
    </GlobalThem.Consumer>
  )


--------------------
5. Context.displayName
- context 对象接受一个名为 displayName 的 property，类型为字符串。
- React DevTools 使用该字符串来确定 context 要显示的内容。

const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';
<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
复制代码
```

- react官网教程 [react.docschina.org/docs/contex…](https://react.docschina.org/docs/context.html)

# React.memo

```
React.memo

const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});

- React.memo()为高阶组件，与React.pureComponent()相似，但是memo只作用于函数组件，不适用于class组件
- React.memo()在props相同的情况下，并不会重新渲染
  - 即 React 将跳过渲染组件的操作并直接复用最近一次渲染的结果
  - 即 ( 函数记忆 )，缓存结果值
复制代码
```

# useReducer

```
useReducer

const [state, dispatch] = useReducer(reducer, initialArg, init);
- 参数
  - reducer
    - (state, action) => newState，接受一个state和action，返回一个新的state
  - initialArg
    - reducer中的state的初始值，大多数情况下是一个对象作为合理的数据类型
- 返回值
  - 返回当前的 state 和 dispatch 函数
- 使用场景
  - 当组件中state比较多时，useReducer可以聚合各个state
  - 当各个层级组件中的数据需要频繁的共享时

--------------
实例：
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button> // 点击触发dispatch函数，派发一个action
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
复制代码
```

# 如何封装一个useFetch

```
useFetch


(1) 版本1
export function useFetch(fetchFn, fnParams={}) {
  const [data, setData] = useState([])
  const [params, setParams] = useState(fnParams)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true)
      setIsError(false)
      try {
        const res = await fetchFn(params)
        setData(res.data)
      } catch(err) {
        setIsError(true)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [params]) // fetchData依赖params的更新，params改变则重新执行fetchData

  const doFetch = (params) => { // 对外暴露更新params的函数
    setParams(params) // params改变触发useEffect更新
  }

  return {data, isError, isLoading, doFetch}
}




------------------------------------------------------------------------------------
(2)版本2
- 版本1中各个state都是完成同一个副作用，可以将他们聚合在一个state中
- 使用 useReducer 优化

(use-fetch.js)
import {useState, useEffect, useReducer} from 'react';
import {FetchReducer, fetchType} from '../../store/reducers/fetch-reducer';
export function useFetch(fetchFn, fnParams={}) {
  const [params, setParams] = useState(fnParams)
  const [state, dispatch] = useReducer(FetchReducer, {
    data: [],
    isError: false,
    isLoading: false
  })
  useEffect(() => {
    const fetchData = async() => {
      dispatch({type: fetchType.FETCH_INIT}) // 开始，dispatch => action
      try {
        const res = await fetchFn(params)
        dispatch({type: fetchType.FETCH_SUCCESS, payload: res.data}) // 成功，数据payload
      } catch(err) {
        dispatch({type: fetchType.FETCH_FAIL}) // 失败
      }
    }
    fetchData()
  }, [params])
  const doFetch = (params) => {
    setParams(params)
  }
  return {doFetch, ...state} // 展开state，暴露给外部
}

(fetch-reducer.js)
export const fetchType = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL'
}

export const FetchReducer = (state, action) => {
  switch(action.type) {
    case fetchType.FETCH_INIT:
      return {
        ...state,
        isError: false,
        isLoading: true
      }
    case fetchType.FETCH_SUCCESS:
      return {
        ...state,
        isError: false,
        isLoading: false,
        data: action.payload
      }
    case fetchType.FETCH_SUCCESS:
      return {
        ...state,
        isError: true,
        isLoading: false
      }
    default:
      return {
        ...state
      }
  }
}

复制代码
```

# hooks中父组件如何获取子组件中的方法

- `useImperativeHandle`
- `forwardRef`
- imperative：势在必行的，急切，急迫

```
hooks中父组件如何获取子组件中的方法
- useImperativeHandle
- forwardRef


(1) useImperativeHandle
- useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
- imperative：势在必行的，急切，急迫
- `注意：useImperativeHandle需要和forwardRef一起使用`

(2) forwardRef
- `React.forwardRef` 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。
- 即传递转发 ref 属性给子组件，`这样父组件就能直接绑定子组件的子组件或者孙子组件`
- 参数：一个渲染组件
- 渲染组件的参数：props和ref



import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 父组件
const App2 = () => {
  const childRef = useRef(null)
  const getChildFn = () => {
    childRef.current.go() // 在current中直接获取子组件暴露出来的方法
  }
  return (
    <>
      <div>父组件</div>
      <div onClick={getChildFn}>点击获取子组件中的方法</div>
      <Child ref={childRef}></Child> // 通过ref绑定子组件
    </>
  )
}


// 子组件
const Child =  forwardRef((props, ref) => { // 用forwardRef包装的组件，接收props，和ref参数
  useImperativeHandle(ref, () => ({ // 暴露给父组件的方法go
    go: () => {
      console.log('用forwardRef高阶组件包装后,组件能接收props和ref');
      console.log('useImperativeHandle的回调中返回的对象中的方法提供给父组件使用');
    }
  }))
  return (
    <div>
      子组件
    </div>
  )
})
复制代码
```

[zh-hans.reactjs.org/docs/react-…](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref)

复习：

# js中的注释规范

```
@version 16.8.0
@see https://reactjs.org/docs/hooks-reference.html#usecontext


函数相关
@param  {string}  address  地址
@param {number} [num] 中括号表示参数可选
@returns  void
@desc  描述
@deprecated  指示一个函数已经废弃，而且在将来的代码版本中将彻底删除。要避免使用这段代码


@date     2014-04-12
@author   QETHAN<qinbinyang@zuijiao.net>
@copyright代码的版权信息
@overview对当前代码文件的描述。
复制代码
```

[www.jsphp.net/js/show-9-2…](http://www.jsphp.net/js/show-9-26-1.html) [segmentfault.com/a/119000000…](https://segmentfault.com/a/1190000000502593)

复习

# 手写call

```
1. 原生的call
- Function.prototype.call()
- 参数：
  - 第一个参数：this将要绑定的对象，当第一个参数是空，null，undefined，则默认传入全局对象
  - 后面的参数：传入函数的参数
- 主要的作用：
  - 绑定函数中 this 所指定的对象
  - 执行函数(把绑定this的对象以外的参数，传入使用的函数)
  - 注意：fn是可以有返回值的
- 注意点：
  - eval(string)将字符串当作语句来执行，参数是一个字符串


- 实现思路：
- 在对象上添加一个函数
- 在对象上执行这个函数，此时函数中的this指向的就是这个对象（this运行时才能确定，运行时所在的对象）
- 执行完后，删除这个函数属性


简单版：
useEffect(() => {
  const obj = {
    name: 'wu',
    age: 20
  };
  function fn (address) {
    return this.name + this.age + address
  }
  Function.prototype._call = function(obj) {
    if (typeof this !== 'function') { // _call方法必须在函数对象上调用
      throw new Error('the _call method must called with a function object')
    }
    const context = obj ? obj : window; // 如果参数是null，undefined，或者为空，则会默认传入全局对象，比如window
    context.fn = this // 因为下面调用时，this指向了fn
    const res = context.fn(...Array.from(arguments).slice(1)) // 除去第一个参数，执行函数，如果有返回值，需要返回
    delete context.fn // 执行后，删除
    return res
  }
  const res = fn._call(obj, 'hangzhou')
  console.log(res, 'res')
}, [])
复制代码
```

手写 apply

```
apply
- 和call方法大致相同，绑定this，除了绑定的对象之外的参数传入函数，并执行函数
- 和call的区别：传入函数的参数是一个数组，所以理论上call的性能比apply好

useEffect(() => {
  const obj = {name: 'wang', age: 20}
  function fn (name, age) {
    return {
      name: name || this.name,
      age: age || this.age
    }
  }
  Function.prototype._apply = function(obj) {
   if (typeof this !== 'function') { // _call方法必须在函数对象上调用
      throw new Error('the _apply method must called with a function object')
    }
    const context = obj ? obj : window;
    context.fn = this
    const res = context.fn(...[...arguments].slice(1).flat(Infinity))
    // 数组实例.flat(Infinity)表示展开多层数组，最后只剩一层
    // 注意：Infinity首字母要大写
    delete context.fn
    return res
  }
  const res = fn._apply(obj, 'zhang')
  console.log(res, 'res')
}, [])
复制代码
```

# 手写bind

```
bind
- 将函数体内的this绑定到某个对象上，并返回一个新的函数
- 参数：
  - 第一个参数：方法所要绑定的对象
  - 后面的参数：将会作为参数传递给函数
  - 注意：返回的函数仍然可以传参
    - 如果bind方法传递两个参数（传给函数的就是一个），那么返回的函数的第一个参数，将作为第二个参数传递给函数
- bind函数的特点：
  - 绑定this
  - 返回新函数
  - 可以传参(bind函数传参，返回的新函数也可以传参)
  - 返回的是新函数，还可以通过 new 命令调用




- 代码实现：

(1) 简单版
useEffect(() => {
  // bind模拟实现
  const obj = {
    name: 'wang',
    age: 20
  };
  function fn(address, sex) {
    return this.name + this.age + address + sex;
  }
  Function.prototype._bind = function(obj) {
    const context = this; // 这里的this指向 fn 函数（this在调用时确定指向，_bind是供fn调用）
    const bindParams = Array.prototype.slice.call(arguments, 1); 
    // 将类数组对象转成真是的数组，call除了绑定this，还可以向fn传参
    // _bind函数的参数收集
    return function() { 
      // _bind返回一个新函数
      const resParams = Array.prototype.slice(arguments); 
      // 返回的函数接收的参数收集
      return context.apply(obj, bindParams.concat(bindParams)) // 拼接_bind和返回函数的参数，因为是数组，用apply
    }
  }
  const newFn = fn.bind(obj, 'chongqing')
  const res = newFn('man');
  console.log(res, 'res')
}, [])





(2) 完善版 
_bind返回的参数，考虑new命令调用的情况
- 特点：
- 当bind返回的新函数，使用new操作符调用时，bind所指定的this对象会失效，因为构造函数中的this指向的是实例对象
- 虽然this指向失效，但是参数仍然是有效的
useEffect(() => {
  const obj = {
    name: 'wang',
    age: 20
  }
  function fn(address, sex) {
    console.log(this.name, 'this.name')
    return this.name + this.age + address + sex
  }
  Function.prototype._bind = function(obj) {
    // _bind方法只能在函数对象上调用
    if (typeof this !== 'function') {
      throw new Error('bind must be called on the funciton object')
    }
    // 寄生继承,防止实例和原型上重复的属性和方法，和修改 prototype
    // 原理：用中间函数来中转，
      // closure.prototype => ParasiticFn实例
      // ParasiticFn.prototype => fn.prototype
        // 这样 closure的实例可以访问closure函数中的属性，访问ParasiticFn.protype上的属性
        // 而ParasiticFn本身没有任何属性和方法
    // parasitic：寄生
    const ParasiticFn = function(){};
    ParasiticFn.prototype = this.prototype
    closure.prototype = new ParasiticFn()

    const bindParams = Array.prototype.slice.call(arguments, 1)
    const context = this // fn
    function closure() {
      const closureParams = Array.prototype.slice.call(arguments)
      return context.apply(this instanceof ParasiticFn ? this : obj, bindParams.concat(closureParams)) // 组合参数，并调用，返回返回值
      // 注意：
      // 1. closure() 函数中的this，根据调用方式的不同，this的指向会不同, (注意这里的this和closure函数外的this指向也不同)
      // 2. 通过new命令调用时，closure被当作构造函数，this指向实例对象
      // 3. 通过普通函数调用时候，this指向的是传入的需要绑定的对象
      // 4. this instanceof ParasiticFn ? this : obj的意思是：通过new调用，绑定实例对象，其他情况绑定obj对象
      // 5. // 通过什么方式调用新函数，就绑定什么对象
    }

    return closure
  }
  const newFn = fn._bind(obj, 'chongqign')

  const resOrdinary = newFn('man')
  console.log(resOrdinary, 'resOrdinary')
  // wang this.name
  // wang20chongqignman resOrdinary

  const resConstructor = new newFn('woman')
  console.log(resConstructor, 'resConstructor')
  // undefined "this.name"
  // {}
})
复制代码
```

[github.com/mqyqingfeng…](https://github.com/mqyqingfeng/Blog/issues/12)

# 逻辑运算符

&&

```
&&
运算规则：
- 如果第一个运算子的布尔值是true  => 返回第二个运算子的值 
- 如果第一个运算子的布尔值是false => 返回第一个运算子的值，且不对第二个运算子求值
短路：
- 跳过第二个运算子的运算叫做短路
多个连用：
- 返回第一个为false的表达式的值


总结：
- 执行到哪里就返回当前的值
- 判断的是布尔值，返回的是值
false && 2 => false // 执行到false就不执行了，返回布尔值是false的表达式的值 false
'' && 2    => '' // 执行到第一个表达是布尔值是false，不再执行，返回当前表达式的值 ''
true && 1 && [] && 0 && {} => 0 // 执行到 0 时，布尔值时false，不再执行，返回当前的值 0
复制代码
```

&&

```
&&
运算规则
- 如果第一个运算子的布尔值是true，则返回第一个表达式的值，且不再对后面的运算子求值
- 如果第一个运算子的布尔值是false，则返回第二个运算子的值（如果只有两个运算子时）
```