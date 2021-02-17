### 什么是虚拟Dom

我们知道我们平时的页面都是有很多Dom组成，那虚拟Dom(virtual dom)到底是什么，简单来讲，就是将真实的dom节点用JavaScript来模拟出来，而Dom变化的对比，放到 Js 层来做。

下面是一个传统的dom节点，大家肯定都不陌生。

![img](https://user-gold-cdn.xitu.io/2019/1/25/16882e3523f8ce5f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

而这个dom对应的虚拟dom，可以表示成下面的样子





![img](https://user-gold-cdn.xitu.io/2019/1/25/16882e5a41e60901?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

很简单，大家都能看懂，`tag`表示标签名，`attrs`就是dom的属性，每个dom如果有children的话，就会在children中以数组的形式展示，数组的每一项就又是一个虚拟dom结构。



> 这里使用 Js 来实现虚拟dom的原因是 Js 在前端领域，是唯一一门**图灵完备**的语言；所谓图灵完备语言，就是指可以进行复杂逻辑操作，实现各种逻辑算法语言。

### 为何使用虚拟Dom

有人会问，dom挺好啊，我们刚学前端的时候肯定会接触JQuery，JQuery就是典型的操作dom的一个框架工具库，我们拿JQuery来设计一个场景，来解释一下虚拟dom的用处及价值。

#### **这有一个需求场景**

```
var data = [
      {
        name: '张三',
        age: '20',
        address: '杭州'
      },
      {
        name: '李四',
        age: '22',
        address: '北京'
      },
      {
        name: '隔壁老王',
        age: '24',
        address: "西溪水岸"
      }
    ]
复制代码
```

我们现在想要将这个数据渲染成一个表格，并点击页面上的按钮更换我们的部分数据，我们使用Jquery来做。

```
  <div id="container"></div>
  <button id="btn-change">change</button>

  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
  <script>
    var data = [
      {
        name: '张三',
        age: '20',
        address: '杭州'
      },
      {
        name: '李四',
        age: '22',
        address: '北京'
      },
      {
        name: '隔壁老王',
        age: '24',
        address: "西溪水岸"
      }
    ]

    function render(data) {
      var $container = $('#container')

      //清空现有内容
      $container.html('')

      // 拼接 table
      var $table = $('<table>')
      $table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'))
      data.forEach(function (item) {
        $table.append($('<tr><td>'+ item.name +'</td><td>'+item.age+'</td><td>'+item.address+'</td></tr>'))
      })
      
      // 渲染到页面
      $container.append($table)
    }

    $('#btn-change').click(function () {
      data[1].age = 30
      data[2].address = '上海'
      render(data)
    })
    
    // 初始化时候渲染
    render(data)
复制代码
```

可以看到，我们将`data`的第2项的`age`和 第3项的`address`数据更换了，点击change按钮：



![img](https://user-gold-cdn.xitu.io/2019/1/25/168830001c51199e?imageslim)



#### vdom解决的问题

我们可以从图中看到，我们只是更改了表格的部分数据，但是整个`tabel`节点就全部闪烁，说明整个`table`都被替换了一遍。

这个合乎常理的JQuery操，及时是web页面性能的巨大杀手。因为它更改了不需要更改的dom节点，如果你还不能事情的严重性，可以继续往下看。

下面的代码的操作很简单，创建一个空的`div`标签，循环遍历其中的属性并将其拼打印出来

```
    var div = document.createElement('div')
    var item ,result = ''
    for (item in div) {
      result += ' | ' + item
    }
    console.log(result)
复制代码
```



![img](https://user-gold-cdn.xitu.io/2019/1/25/168830523c3581ef?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



密密麻麻的属性，更何况这还只是一级属性，可想而知直接操作dom的方式是有多么费时，dom操作是费时的，但是Js作为一门语言，运行速度是非常快的，我们如果在Js层做dom对比，尽量减少不必要的dom操作，而不是每一次都全部翻修，我们的效率就会大大增加。而vdom就可以完美解决这个问题。

### 如何使用虚拟dom

说了这么多虚拟dom的好，有同学会问，如何使用虚拟dom呢？

要了解如何使用vdom，我们可以借助现有的vdom实现库，来了解其API，进而了解如何将vdom运用于开发中。

这里我们选择一个Vue2中使用的虚拟dom库 [snabbdom](https://github.com/snabbdom/snabbdom)，下面图是截得它github主页的示范案例：



![img](https://user-gold-cdn.xitu.io/2019/1/25/168830ee551a1f01?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



仔细观察后我们可以发现，这个snabbdom官方案例中，核心内容就是两个函数 -- `h函数` 和 `patch函数`

#### h函数

可以看到 `h` 函数，有三个参数

- 标签选择器
- 属性
- 子节点

比如说第一个`h函数`生成的vnode，就是一个`div`标签，绑定了click事件为`someFn`,第一个child为带有style的`span`，`sapn`里是一个文本节点`This is bold`,第二个child就直接是一个文本节点，第三个child就是一个带有`herf`的`a`链接

#### patch函数

`patch` 分为两种情况

- 第一种是第一次渲染的时候 

  ```
  patch
  ```

  将vnode丢到

  ```
  container
  ```

  空容器中

  ```
     var vnode = h('ul#list',{},[
      h('li.item',{},'大冰哥'),
      h('li.item',{},'伦哥'),
      h('li.item',{},'阿孔')
    ])
  
    patch(container, vnode) // vnode 将 container 节点替换
  复制代码
  ```

> 第一次patch渲染的时候，是将生成的vnode往空容器里丢 可以对比之前的Jquery第一次渲染表格的时候，将table html append到容器中去

- 第二种是更新节点的时候，

  ```
  newVnode
  ```

  将

  ```
  oldVnode
  ```

  替换

  ```
  btn.addEventListener('click',function() {
    var newVnode = h('ul#list',{},[
      h('li.item',{},'大冰哥'),
      h('li.item',{},'伦哥'),
      h('li.item',{},'孔祥宇'),
      h('li.item',{},'小老弟'),
    ])
    patch(vnode, newVnode)
  })
  复制代码
  ```

> 这里的patch就会将的vonde和之前的vnode进行比对，只修改改动的地方，没动的地方保持不变，这里的核心就是涉及的diff算法



![img](https://user-gold-cdn.xitu.io/2019/1/25/168834f24afc5b4e?imageslim)



我们可以清楚的看到，相对于之前的JQuery整个页面dom全部替换的情况，用vdom的`pathc`函数只修改了我们相对老的vnode变动的地方，没改动的地方就没用动(从页面的闪烁可以看出来)

#### 使用vdom重做之前Jq案例

vdom核心的api `h`函数和`patch`函数我们已经有个基本的了解了，为了巩固对其的认识，我们接下来用`snabbdom`重做我们之前的JQuery案例

直接先上代码

```
<div id="container"></div>
  <button id="btn-change">change</button>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-class.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-props.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-style.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-eventlisteners.js"></script>
  <script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.js"></script>
  <script>
    let container = document.getElementById('container')
    let btn = document.getElementById('btn-change')
    let snabbdom = window.snabbdom
    let patch = snabbdom.init([
      snabbdom_class,
      snabbdom_props,
      snabbdom_style,
      snabbdom_eventlisteners
    ])
    let h = snabbdom.h
    let data = [
      {
        name: '张三',
        age: '20',
        address: '杭州'
      },
      {
        name: '李四',
        age: '22',
        address: '北京'
      },
      {
        name: '隔壁老王',
        age: '24',
        address: "西溪水岸"
      }
    ]
    data.unshift({
      name: '姓名',
      age: '年龄',
      address: '地址'
    })
    let vnode
    function render(data) {
      // 创建虚拟table节点 第三个参数，也就是虚拟table的孩子 应该是虚拟的 行节点
      let newVnode = h('table', {}, data.map(item => {
        let tds = [] // 列，作为虚拟行的子项
        let i
        for(i in item) {
          if (item.hasOwnProperty(i)) {
            tds.push(h('td', {}, item[i]+''))
          }
        }
        return h('tr', {}, tds) // 虚拟行节点的 孩子 应该是虚拟的 列节点
      }))

      if (vnode) {
        patch(vnode,newVnode)
      } else {
        // 初次渲染
        patch(container,newVnode)
      }
      vnode = newVnode
    }

    btn.addEventListener('click', function(){
      data[1].age = 30,
      data[3].name = '一个女孩',
      render(data)
    })
    
    // 初始化时候渲染
    render(data)
  </script>
</body>
复制代码
```

代码有点长，其实内容还是我们之前讲的，代码主要干了下面的事情

- 引入snabbdom核心文件，初始化h函数和patch函数
- 第一次加载的时候render  其实本质就是`patch(container,newVnode)`
- 之后点击`change`的时候，生成新的vnode，再`patch(vnode,newVnode)`

这里的`render`函数重点讲解一下



![img](https://user-gold-cdn.xitu.io/2019/1/25/168835add3ff1d95?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



- newVnode生成的时候，第三个参数是childs

- 而`table`的childs是行节点

- `tr`行节点也是vnode，它再生成的时候也要使用`h`函数，第三个参数是`td`列vnode

- ```
  td
  ```

  列vnode的第三个参数，就直接是文本节点啦，遍历item的每一项push到

  ```
  tds
  ```

  数组中就可以了

  ![img](https://user-gold-cdn.xitu.io/2019/1/25/1688362569450bdc?imageslim)

到了这里，你对vdom应该有个大体的认识了，其实，与其说vdom快，更准确的说是相比于Jquer这种推翻dom的方式等，保证不慢而已。

#### 总结

vdom的核心api

- h('标签名', '属性', [子元素])
- h('标签名', '属性', '文本')
- patch(container, vnode)
- patch(oldVnode,newVnode)

### 简单介绍diff算法

#### 什么是diff算法

我们在平时工作中，其实很多时候都会使用到diff算法

比如你在git提交代码的时候使用的 `git diff` 命令，再或者是网上的一些代码比对工具，而我们的虚拟dom，核心就是diff算法，我们前面讲过，找出有必要更新的节点更新，没有更新的节点就不要动。这其中的核心就是如何找出哪些更新哪些不更新，这个过程就需要diff算法来完成

#### 通过`patch`简单讲diff

我们趁热打铁，还是使用之前的snabbdom库来简单的讲下diff算法的大体思路，在snabbdom中diff主要体现在`patch`中，我们接下来看一下patch的两种情况  `patch(container, vnode)` 和 `patch(vnode, newVnode)`

> 篇幅有限，(其实是能力有限), 这里就简单的讲解，因为涉及到完成的diff算法的话东西实在是太多太多，有兴趣的可以去看一下snabbdom的源码

#### patch(container, vnode)

![img](https://user-gold-cdn.xitu.io/2019/1/25/16883732ede9ba72?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

我们知道这个patch的过程是将一个vnode(vdom)添加到空容器生成真实dom的过程，主要的代码流程如下：

```
function creatElement(vnode) {
  let tag = vnode.tag
  let attrs = vnode.attrs || {}
  let children = vnode.children || []
  // 无标签 直接跳出
  if (!tag) {
    return null
  }
  // 创建元素
  let elem = document.createElement(tag)
  // 添加属性
  for(let attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      elem.setAttribute(arrtName, arrts[attrName])
    }
  }
  // 递归创建子元素
  children.forEach((childVnode) => {
    elem.appendChild(createElement(childVnode))
  })

  return elem
}
复制代码
```

> 简化后的代码很简单，大家也都能够理解，其中的一个重要的点就是 **自递归调用生成孩子节点**，终止条件就是`tag`为`null`的情况

#### patch(vnode, newVnode)

这个patch过程就是比较差异的过程，我们这里就只模拟最简单的场景

![img](https://user-gold-cdn.xitu.io/2019/1/25/168837606a050819?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

第三个item改变，又新增第四个item

```
// 简化流程 假设跟标签相同的两个虚拟dom
function updateChildren (vnode, newVnode) {
  let children = vnode.children || []
  let newChildren = newVnode.children || []

  // 遍历现有的孩子
  children.forEach((oldChild, index) => {
    let newChild = newChildren[index]
    if (newChild === null) {
      return
    }
    // 两者tag一样，值得比较
    if (oldChild.tag === newChild.tag) {
      // 递归继续比较子项
      updateChildren(oldchild, newChild)
    } else {
      // 两者tag不一样
      replaceNode(oldChild, newChild)
    }
  })
}
复制代码
```

> 这里面的点就也递归，这里只是简单的拿`tag`来判断更新条件，其实实际的比这复杂很多很多； 而`replace`函数实际的操作就是将`newVnode`新生成的真实dom将老的dom替换掉，这里涉及更多的是原生dom操作，就不在赘述了。

到这里，基本的diff概念应该大家有个认识了，再次强调，这里为了便于理解，将diff算法的流程简化了很多，实际的diff算法的复杂程度远远高于以上这些，比如说

- 节点的新增和删除
- 重新排序时以及这个过程的优化
- 节点属性样式事件等的变化
- 还有怎么将算法优化到极致等等。。

大家感兴趣可以去深入了解。

### 总结

本文知识抛砖引玉，通过阅读本文，让不了解虚拟dom的同学对虚拟dom有一个很好的认知，对diff算法有一个大体的认识。能达到这个效果，我觉得这篇文章就很有价值了。想要深入了解虚拟dom或者diff算法的同学可以翻阅snabbdom的 `patch.js`的源码，加深学习。

### 番外 Vue的key

> 写文章的时候碰到有vue key绑定的问题，这里就借助这股热劲，结合虚拟dom和diff算法，来了解一下Vue中的key

**Vue 中的 key**

首先Vue官网的解释：

> 当 Vue.js 用 `v-for` 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。

这里的就地复用的策略复用的是没有发生改变的元素，其他的还要依次重排。

> 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` 属性。理想的 `key` 值是每项都有的唯一 id。

我们在使用的使用经常会使用`index`(即数组的下标)来作为`key`,但其实这是不推荐的一种使用方法

如何理解，我们看下面一个例子：

这里有一个数组数据

```
const list = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    },
]
复制代码
```

我们现在想要在其后面追加一条数据

```
const list = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    },
    {
        id: 4,
        name: '添加到最后的一条数据',
    },
]
复制代码
```

这个时候用 `index` 作为 `key`, 是没有问题的，因为`index`在后面累加了1

但是如果插入的数据是插在中间而不是最后，

```
const list = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 4,
        name: '不甘落后跑到第二的的一条数据',
    }
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    },
]
复制代码
```

这个时候就会会出现一个情况：

```
之前的数据                         之后的数据

key: 0  index: 0 name: test1     key: 0  index: 0 name: test1
key: 1  index: 1 name: test2     key: 1  index: 1 name: 不甘落后跑到第二的的一条数据
key: 2  index: 2 name: test3     key: 2  index: 2 name: test2
                                 key: 3  index: 3 name: test3
复制代码
```

这样一来，追加数据以后，除了第一条数据能够`就地复用`，后三条都要重新渲染，这显然不是我们想要的结果。

用**唯一key**来改善：

> 这次我们把每一项的`key` 绑定成唯一标示id

```
之前的数据                         之后的数据

key: 1  id: 1 index: 0 name: test1   key: 1  id: 1 index: 0  name: test1
key: 2  id: 2 index: 1 name: test2   key: 4  id: 4 index: 1  name: 不甘落后的一条数据
key: 3  id: 3 index: 2 name: test3   key: 2  id: 2 index: 2  name: test2
                                     key: 3  id: 3 index: 3  name: test3
复制代码
```

现在除了新增了`id为4的不甘落后的数据`是新加入的，其他的都复用了之前的dom，因为这里通过`唯一key`来进行关联，不会随着顺序的改变而重新渲染。

所以我们需要使用key来给每个节点做一个唯一标识，Vue的Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点，所以一句话，**key的作用主要是为了高效的更新虚拟DOM**

**灵魂画手上线：**

可以看到，当我们老的数据转为新的数据时   [a,b,c,d] --> [a,e,b,c,d]

如果我们没有使用一个正确的`key`，可能除了a数据可以复用以外，后面的四个数据都要重新渲染

而如果使用了一个正确的`key`的时候，就可以实现要更改的只有一处，也就是新增数据 e,其他的就会如箭头所示，继续对应复用。



![vue中的key](https://user-gold-cdn.xitu.io/2019/1/25/1688389cbd7fd7d4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


作者：noobakong
链接：https://juejin.cn/post/6844903767473651720
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。