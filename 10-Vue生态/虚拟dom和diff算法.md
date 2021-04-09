# 虚拟dom和diff算法

## 虚拟dom

### 出现的原因

浏览器解析一个html大致分为五步：

​	创建DOM tree –> 创建Style Rules -> 构建Render tree -> 布局Layout –> 绘制Painting

每次对真实dom进行操作的时候，浏览器都会从构建dom树开始从头到尾执行一遍流程。

真实的dom操作代价昂贵，操作频繁还会引起页面卡顿影响用户体验，**虚拟dom就是为了解决这个浏览器性能问题才被创造出来**

虚拟dom在执行dom的更新操作后，虚拟dom不会直接操作真实dom，而是将更新的diff内容保存到本地js对象中，然后一次性attach到dom树上，通知浏览器进行dom绘制避免大量无谓的计算。

### 实现

js对象表示dom结构，对象记录了dom节点的标签、属性和子节点

js对象的render函数通过对虚拟dom的属性和子节点的递归构建出真实dom树

虚拟dom是一个纯粹的JS对象，可以通过`document.createDocumentFragment` 创建

Vue中一个虚拟dom包含以下属性

- **tag： 当前节点的标签名**

- **data： 当前节点的数据对象**
- **children： 数组类型，包含了当前节点的子节点**
- **text： 当前节点的文本，一般文本节点或注释节点会有该属性**
- **elm： 当前虚拟节点对应的真实的dom节点**
- **context： 编译作用域**
- functionalContext： 函数化组件的作用域
- **key： 节点的key属性，用于作为节点的标识，有利于patch的优化**
- **sel： 节点的选择器**
- **componentOptions： 创建组件实例时会用到的选项信息**
- child： 当前节点对应的组件实例
- parent： 组件的占位节点
- raw： raw html
- isStatic： 静态节点的标识
- isRootInsert： 是否作为根节点插入，被包裹的节点，该属性的值为false
- isComment： 当前节点是否是注释节点
- isCloned： 当前节点是否为克隆节点
- isOnce： 当前节点是否有v-once指令

简单总结：**虚拟DOM是将真实的DOM节点用JavaScript模拟出来，将DOM变化的对比，放到 Js 层来做**。

### 优势

- 跨平台：Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。
- 提高DOM操作效率：DOM操作的执行速度远不如Javascript的运算速度快，因此，把大量的DOM操作搬运到Javascript中，运用patching算法来计算出真正需要更新的节点，最大限度地减少DOM操作，从而显著提高性能。
- 提升渲染性能：在大量、频繁的数据更新下，依托diff算法，能够对视图进行合理、高效的更新。

### vue中模版转换成视图的过程

![image-20210217154231544](D:\资料\lecture-notes\10-Vue生态\image\image-20210217154231544.png)

- Vue.js通过编译将template 模板转换成渲染函数(render ) ，执行渲染函数就可以得到一个虚拟节点树
- 在对 Model 进行操作的时候，会触发对应 Dep 中的 Watcher 对象。Watcher 对象会调用对应的 update 来修改视图。这个过程主要是将新旧虚拟节点进行差异对比（patch），然后根据对比结果进行DOM操作来更新视图。



diff算法是一种优化手段，将前后两个模块进行差异对比，修补(更新)差异的过程叫做patch

- patch
  - 虚拟DOM最核心的部分，它可以将vnode渲染成真实的DOM，这个过程是**对比新旧虚拟节点之间有哪些不同，然后根据对比结果找出需要更新的的节点进行更新**
  - patch本身就有补丁、修补的意思，其实际作用是在现有DOM上进行修改来实现更新视图的目的
  - Vue的Virtual DOM patching算法是基于**Snabbdom**的实现，并在些基础上作了很多的调整和改进

## diff算法

当数据发生改变时，set方法会让调用`Dep.notify`通知所有订阅者Watcher，订阅者就会调用`patch`给真实的DOM打补丁，更新相应的视图。

![image-20210217154347008](D:\资料\lecture-notes\10-Vue生态\image\image-20210217154347008.png)

Vue的diff算法是**仅在同级的vnode间做diff，递归地进行同级vnode的diff，最终实现整个DOM树的更新**。

因为跨层级的操作是非常少的，忽略不计，这样时间复杂度就从O(n3)变成O(n)。

<img src="https://user-gold-cdn.xitu.io/2020/5/18/17226b51df6d86db?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="img" style="zoom: 50%;" />

### diff算法的假设

- Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
- 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
- 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

### patch过程

当新旧虚拟节点的**key**和**sel（选择器）**都相同时，则进行节点的深度patch，若不相同则整个替换虚拟节点，同时创建真实DOM，实现视图更新。

如何判定新旧节点是否为同一节点：

- 当两个VNode的tag、key、isComment（是否为注释节点）都相同，并且同时定义或未定义data的时候，且如果标签为input则type必须相同。这时候这两个VNode则算sameVnode，可以直接进行patchVnode操作。

```js
function patch (oldVnode, vnode) {
    if (sameVnode(oldVnode, vnode)) { // 有必要进行patch, key和sel都相同时才进行patch
        patchVnode(oldVnode, vnode)
    } else {  // 没有必要进行patch, 整个替换
        const oEl = oldVnode.el
        let parentEle = api.parentNode(oEl)
        createEle(vnode) // vnode创建它的真实dom，令vnode.el =真实dom
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 插入整个新节点树
            api.removeChild(parentEle, oldVnode.el) // 移出整个旧的虚拟DOM
            oldVnode = null
        }
    }
    return vnode
}
```

深度patch：

```js
 function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    /*两个VNode节点相同则直接返回*/
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    /*
      如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），
      并且新的VNode是clone或者是标记了once（标记v-once属性，只渲染一次），
      那么只需要替换elm以及componentInstance即可。
    */
    if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.elm = oldVnode.elm
      vnode.componentInstance = oldVnode.componentInstance
      return
    }
    let i
    const data = vnode.data
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      /*i = data.hook.prepatch，如果存在的话，见"./create-component componentVNodeHooks"。*/
      i(oldVnode, vnode)
    }
    const elm = vnode.elm = oldVnode.elm
    const oldCh = oldVnode.children
    const ch = vnode.children
    if (isDef(data) && isPatchable(vnode)) {
      /*调用update回调以及update钩子*/
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
    }
    /*如果这个VNode节点没有text文本时*/
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        /*新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren*/
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) {
        /*如果老节点没有子节点而新节点存在子节点，先清空elm的文本内容，然后为当前节点加入子节点*/
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        /*当新节点没有子节点而老节点有子节点的时候，则移除所有ele的子节点*/
        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        /*当新老节点都无子节点的时候，只是文本的替换，因为这个逻辑中新节点text不存在，所以直接去除ele的文本*/
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      /*当新老节点text不一样时，直接替换这段文本*/
      nodeOps.setTextContent(elm, vnode.text)
    }
    /*调用postpatch钩子*/
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
    }
  }
```

#### patchVnode的规则

1. 如果新旧VNode都是静态的，同时它们的key相同（代表同一节点），那么只需要替换elm以及componentInstance即可（原地复用）。

2. 新老节点均有children子节点且不同，则对子节点进行diff操作，调用updateChildren，这个**updateChildren也是diff的核心**。

3. 如果只有新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。

4. 如果只有老节点有子节点，直接删除老节点的子节点。

5. 当新老节点都无子节点的时候，只是文本的替换。

### updateChildren

接下来就是最复杂的diff算法的理解

```js
updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {   // 对于vnode.key的比较，会把oldVnode = null
            oldStartVnode = oldCh[++oldStartIdx] 
        }else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx]
        }else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        }else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode)
            api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode)
            api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else {
           // 使用key时的比较
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
            }
            idxInOld = oldKeyToIdx[newStartVnode.key]
            if (!idxInOld) {
                api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                newStartVnode = newCh[++newStartIdx]
            }
            else {
                elmToMove = oldCh[idxInOld]
                if (elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                }else {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = null
                    api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null ： newCh[newEndIdx + 1].el
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
    }else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
```

#### 过程概述

- 将`Vnode`的子节点`Vch`和`oldVnode`的子节点`oldCh`提取出来
- `oldCh`和`vCh`各有两个头尾的变量`StartIdx`和`EndIdx`，它们的2个变量相互比较，一共有4种比较方式，当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置。如果4种比较都没匹配，如果设置了`key`，就会用`key`进行比较，在比较的过程中，变量会往中间靠，一旦`StartIdx>EndIdx`表明`oldCh`和`vCh`至少有一个已经遍历完了，就会结束比较。

<img src="D:\资料\lecture-notes\10-Vue生态\image\image-20210217154553784.png" alt="image-20210217154553784" style="zoom:67%;" />

在新老两个VNode节点的左右头尾两侧都有一个变量标记，在遍历过程中这几个变量都会向中间靠拢。当oldStartIdx <= oldEndIdx或者newStartIdx <= newEndIdx时结束循环。

我们通过一个例子来理解整个对比过程：

真实节点：a，b，d

旧节点：a，b，d

新节点：a，c，d，b

**第一步：**

```
oldS = a, oldE = d；
S = a, E = b;
```

oldS和S，E比较；oldE和S，E比较，得出`oldS`和`S`匹配的结论，于是a节点应该按照新节点的顺序放置在第一个。此时旧节点的a节点也在第一个，故而位置不动；

第一轮对比结束oldS和S为同一节点，向后移动，oldE和E不动；

**第二步**：

旧节点：a，b，d

新节点：a，c，d，b

```
oldS = b, oldE = d；
S = c, E = b;
```

四个变量两辆对比可得`oldS`和`E`匹配，将原本的b节点移动到最后，因为`E`是最后一个节点，他们位置要一致，这就是上面说的：**当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置**；

第二轮对比结束，oldE和E为同一节点，向前移动，oldS和S位置不动；

**第三步**：

旧节点：a，d，b

新节点：a，c，d，b

```
oldS = d, oldE = d；
S = c, E = d;
```

`oldE`和`E`匹配，位置不变;

**第四步**：

旧节点：a，d，b

新节点：a，c，d，b

```
oldS++;
oldE--;
oldS > oldE;
```

遍历结束，说明旧节点先遍历完。就将剩余的新节点c根据自己的的index插入到真实dom中去

旧节点：a，c，d，b

新节点：a，c，d，b

对比完成。

当然也会存在**四个变量无法互相匹配**，分为两种情况

- 如果新旧子节点**都存在key**，那么会根据旧节点的key生成一张hash表，用`S`的key与hash表做匹配，匹配成功就判断`S`和匹配节点是否为`sameNode`，如果是，就在真实dom中将成功的节点移到最前面，否则，将`S`生成对应的节点插入到dom中对应的`oldS`位置，`oldS`和`S`指针向中间移动。
- 如果没有key,则直接将`S`生成新的节点插入`真实DOM` （这里可以解释为什么设置key会让diff更高效

**结束时存在两种具体的情况**：

1. `oldS > oldE`，可以认为旧节点先遍历完。当然也有可能新节点此时也正好完成了遍历，统一都归为此类。此时S和E之间的vnode是新增的，调用addVnodes，把这些虚拟node.elm全部插进before的后边.
2. `S> E`，可以认为新节点先遍历完。此时oldS和oldE之间的节点在新的子节点里已经不存在了，直接删除

在模拟两个例子体会一下

![image-20210217154703902](D:\资料\lecture-notes\10-Vue生态\image\image-20210217154703902.png)

```
eg.1
O b,a,d,f,e
N a,b,e
1. 
oldS = b, oldE = e；
S = a, E = e;
O b,a,d,f,e
N a,b,e
2.
oldS = b, oldE = f；
S = a, E = b;
O a,d,f,b,e
N a,b,e
3.
s>e d,f 删除
O a,b,e
N a,b,e
```

![image-20210217154723296](D:\资料\lecture-notes\10-Vue生态\image\image-20210217154723296.png)

```
eg.2
O b,d,c,a
N a,e,b,f
1. 
oldS = b, oldE = a；
S = a, E = f;
O a,b,d,c
N a,e,b,f
2.
oldS = b, oldE = c；
S = e, E = f;
此时四个参数无法匹配，根据key来对比O中是否有S对应的节点，没有，则在O的S位置插入对应节点
O a,e,b,d,c
N a,e,b,f
3.
oldS = b, oldE = c；
S = b, E = f;
olds与s对应，原地不动
O a,e,b,d,c
N a,e,b,f
4.
oldS = d, oldE = c；
S = f, E = f;
此时四个参数无法匹配,根据key查找是否有S对应的f节点,没有，则在O的S位置插入对应节点
O a,e,b,d,c,f
N a,e,b,f

5.
oldS = d, oldE = c；
s>f
循环结束，oldS与oldE之间的节点删除
```

## 总结

- 尽量不要跨层级的修改dom
- 在开发组件时，保持稳定的 DOM 结构会有助于性能的提升
- 设置key可以让diff更高效