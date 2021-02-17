# 大厂面试官：请阐述一下你对虚拟DOM和Dom-Diff的理解？

随着前端领域快速发展，越来越多的前端框架不断涌现，当下React、Vue两个前端框架已经是前端开发者必备技能。

曾经我面试经常被问到：你了解虚拟DOM吗？简单说一下diff算法？你研究过React/Vue框架源码它们层次源码Dom-Diff是怎么实现的吗？



![img](https://user-gold-cdn.xitu.io/2020/3/25/1710f9ba4179ff64?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



如今我自己作为面试官也经常问面试者其相应问题，虽说这些问题对真实项目开发没什么用，但了解其中的原理对一个人的技术成长起到很大的关键性的作用！

接下来，我会一步一步的实现一个虚拟DOM，讲解其中核心逻辑以及算法。图文并茂，让需要的小伙伴能够轻而易举的看懂也总结自己对虚拟DOM的理解方便后期复习。

## 什么是虚拟DOM

Virtual dom, 即虚拟DOM节点。它通过`JS`的Object对象模拟DOM中的节点，然后再通过特定的render方法将其渲染成真实的DOM节点。

> 为什么操作 dom 性能开销大



![img](https://user-gold-cdn.xitu.io/2020/3/25/1710f95cc1d82f7a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



从上图可见，真实的 DOM 元素是非常庞大的，因为浏览器的标准就把 DOM 设计的非常复杂。当我们频繁的去做 DOM 更新，会产生一定的性能问题。而 Virtual DOM 就是用一个原生的 JS 对象去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多。

> 真实DOM转换成虚拟DOM

虚拟DOM就是一个普通的JavaScript对象，包含了`tag`、`props`、`children`三个属性。

```
<div id="app">
  <p class="text">TXM to SFM</p>
</div>
复制代码
```

上面的HTML元素转换为虚拟DOM：

```
{
  tag: 'div',
  props: {
    id: 'app'
  },
  chidren: [
    {
      tag: 'p',
      props: {
        className: 'text'
      },
      chidren: [
        'TXM to SFM'
      ]
    }
  ]
}
复制代码
```

接下来，我们详细的介绍一下上面的HTML是如何转换成下面的JS树形结构的虚拟DOM对象。



![img](https://user-gold-cdn.xitu.io/2020/3/25/1710f95cc7330fc0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



## 初始化项目

> 创建项目

我们使用React脚手架创建一个项目，方便调试、编译、开效果...

```
// 全局安装
sudo npm install -g create-react-app
// 生成项目
create-react-app dom-diff
// 进入项目目录
cd dom-diff
// 编译
npm run start
复制代码
```

## 虚拟DOM

### createElement核心方法

createElement 接受`type`, `props`,`children`三个参数创建一个虚拟标签元素DOM的方法。

```
function createElement(type, props, children) {
    return new Element(type, props, children);
}
复制代码
```

为了提高代码高度的复用性，我们将创建虚拟DOM元素的核心逻辑代码放到`Element`类中。

```
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}
复制代码
```

**注意**：将这些参数挂载到该对象的私有属性上，这样在new时也会有这些属性。

### render核心方法

render方法接受一个虚拟节点对象参数，其作用是：将虚拟DOM转换成真实DOM。

```
function render(eleObj) {
    let el = document.createElement(eleObj.type); // 创建元素
    for(let key in eleObj.props) {
        // 设置属性的方法
        setAttr(el, key, eleObj.props[key])
    }
    eleObj.children.forEach(child => {
        // 判断子元素是否是Element类型，是则递归，不是则创建文本节点
        child = (child instanceof Element) ? render(child) : document.createTextNode(child);
        el.appendChild(child);
    });
    return el;
}
复制代码
```

**注意**：在将虚拟DOM转换为真实DOM的时，转换属性时要考虑多种情况。像`value`、`style`等属性需要做特殊处理，具体的处理逻辑请看下方**元素设置属性**小节。

### 元素设置属性

在给元素设置属性的公共方法中接受三个参数：`node`,`key`,`value`分别表示给那个元素设置属性、设置的属性名、以及设置属性的值。

```
function setAttr(node, key, value) {
    switch(key) {
        case 'value': // node是一个input或者textarea
            if(node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value = value;
            } else { // 普通属性
                node.setAttribute(key, value);
            }
        break;
        case 'style':
            node.style.cssText = value;
        break;
        default:
            node.setAttribute(key, value);
        break;
    }
}
复制代码
```

以上我们只考虑了三种情况的属性，当我们设置完属性，还要判断`children`属性的情况，具体的处理逻辑请看下方**递归设置儿子**小节。

### 递归设置儿子

判断子元素是否是`Element`元素类型，是则`递归`，不是则创建文本节点。**注意**：我们只考虑了元素类型和文本类型两种。

```
eleObj.children.forEach(child => {
    // 判断子元素是否是Element类型，是则递归，不是则创建文本节点
    child = (child instanceof Element) ? render(child) : document.createTextNode(child);
    el.appendChild(child);
});
复制代码
```

### 真实DOM渲染到浏览器上

我们都知道，`render`方法的作用就是虚拟DOM转换为真实DOM，但是浏览器上为了看到效果，我们需要将真实DOM添加到浏览器上。我们写一个方法接受`el` 真实DOM和`target` 渲染目标两个参数。

```
function renderDom(el, target) {
    target.appendChild(el);
}
复制代码
```

上诉步骤完成后，就可以将这几个方法导出去供其他使用即可。

```
export {
    createElement,
    render,
    Element,
    renderDom
}
复制代码
```



![img](https://user-gold-cdn.xitu.io/2020/3/25/1710f95cc5a10e2d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



## DOM Diff

Dom diff 则是通过`JS`层面的计算，返回一个patch对象，即补丁对象，在通过特定的操作解析`patch`对象，完成页面的重新渲染。

### Diff 算法

> 规则：同层比较

Diff算法中有很多种情况，接下来我们以常见的几种情况做下讨论：

1. 当节点类型相同时，去看一下属性是否相同 产生一个属性的补丁包 {type:'ATTRS', attrs: {class: 'list-group'}}
2. 新的dom节点不存在 {type: 'REMOVE', index: xxx}
3. 节点类型不相同 直接采用替换模式 {type: 'REPLACE', newNode: newNode}
4. 文本的变化：{type: 'TEXT', text: 1}

比较两颗虚拟DOM树的核心diff方法接受`oldTree`旧DOM树、`newTree`新DOM树两个参数，根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新DOM。该方法的核心在于walk`递归树`,该方法将比较后的差异节点放到补丁包中，具体`递归树`核心逻辑请看下方**walk递归树**小节。

```
function diff(oldTree, newTree) {
    let patches = {};
    let index = 0; // 默认先比较树的第一层
    // 递归树  比较后的节点放到补丁包中
    walk(oldTree, newTree, index, patches);
    return patches;
}
复制代码
```

**注意**：在比较两棵树之间的差异时，默认先比较树的第一层。

### walk 递归树

该递归树方法接受`oldNode`老节点,`newNode`新节点,`index`比较层数,`patches`存放补丁包四个参数，返回多种判断情况的常见差异存放在补丁包中。

情形一：新节点中删除了子节点

```
currentPatch.push({type: REMOVE, index: index});
复制代码
```

情形二：判断两个文本是否一样

```
currentPatch.push({type: TEXT, text: newNode});
复制代码
```

**注意**：目前只判断了文本字符串的情况，也存在数字的情况。

在判断两个文本是否一致时，首先要判断是不是属于文本类型，为了程序的可扩展性，我们封装一个**判断是否是字符串**的公共方法：

```
function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}
复制代码
```

情形三：两个节点数的元素类型相同, 就比较属性

在比较属性是否有更新时，我们需要封装一个`diffAttr`方法，具体核心逻辑请查看下方**diffAttr 属性比较**小节。

```
let attrs = diffAttr(oldNode.props, newNode.props);
// 判断变化的属性结果有没有值
if(Object.keys(attrs).length > 0) { // 属性有更改
    currentPatch.push({type: ATTRS, attrs})
}
复制代码
```

**注意**：在第一层比较完后，若存在儿子节点，需要遍历`递归`儿子，找出两颗节点数中所有的不同的补丁包。我们需要封装一个`diffChildren`方法，具体核心逻辑请查看下方**diffChildren 遍历儿子**小节。

```
diffChildren(oldNode.children, newNode.children, patches);
复制代码
```

情形四：都不相同，节点被替换了

```
currentPatch.push({type: REPLACE, newNode});
复制代码
```

以上情形都判断后，需要判断对应的当前元素确实有补丁，然后返回赋值给自定义的`patches`补丁对象。

### diffAttr 属性比较

该方法接受`oldAttrs`旧节点属性, `newAttrs`新节点属性两个参数，其作用是比较两个节点数的属性是否相同，把不同的存放在patch对象中。

在属性比较中，有两种情况来判新旧节点的属性是否有差异。

1. 判断老的属性中和新的属性的关系

   ```
   for(let key in oldAttrs) {
       if(oldAttrs[key] !== newAttrs[key]) {
          patch[key] = newAttrs[key]; // 将新属性存放在patch对象中, 有可能是undefined(如果新的属性中没有老的属性中的属性)
       }
   }
   复制代码
   ```

2. 老的节点中没有新节点中的属性

   ```
   for(let key in newAttrs) {
      // 老的节点中没有新节点中的属性
      if(!oldAttrs.hasOwnProperty(key)) {
          patch[key] = newAttrs[key];
      }
   }
   复制代码
   ```

### diffChildren 遍历儿子

在`diffChildren`方法中接受`oldChildren`老的儿子节点, `newChildren`新的儿子节点, `patches`补丁对象三个参数。

```
function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((child, idx) => {
        walk(child, newChildren[idx], ++Index, patches);
    });
}
复制代码
```

**注意**：索引递增不是遍历的idx和index，而是需要在全局定义一个`Index = 0`。

## Patch 打补丁

当我们通过Diff算法获取补丁，然后通过`patch`打补丁来进行更新DOM，从而更新页面视图。

打补丁的核心方法就是`patch`，它接受`node`元素节点, `patches`所有的补丁两个参数，其作用就是给元素打补丁，重新更新视图。该方法最核心的逻辑就在`walk`方法，请继续阅读下方**walk 给每个元素打补丁**小节。

```
function patch(node, patches) {
    console.log(node)
    allPatches = patches;
    // 给某个元素打补丁
    walk(node);
}
复制代码
```

### walk 给每个元素打补丁

该方法接受`node`元素节点一个参数，将补丁一次次执行，获取元素的子节点进行递归遍历。若每一层存在补丁，则执行`doPatch`方法。该方法具体核心逻辑请阅读下方**doPatch**小节。

```
function walk(node) {
    let currentPatch = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => walk(child));
    if(currentPatch) {
        doPatch(node, currentPatch);
    }
}
复制代码
```

**注意**：需要全局定义`allPatches`、`index`变量。

### doPatch

doPatch方法接受`node`那个节点、`patches`那个补丁两个参数，**后序遍历**补丁，判断补丁的类型来进行不同的操作：

1. 当补丁的`type`为ATTR属性时，遍历属性attrs对象获取值。若值存在则**setAttr**设置属性值，若值不存在则删除对应的属性。**setAttr**方法具体的核心逻辑请阅读下方**setAttr 设置属性**小节。
2. 当补丁的`type`为TEXT属性时，直接将补丁的text赋值给对应节点的`textContent`。
3. 当补丁的`type`为REMOVE属性时，直接调用父级的`removeChild`删除该节点。
4. 当补丁的`type`为REPLACE属性时，首先需要判断新节点是否为`Element`元素类型，若是，则直接调用`render`方法重新渲染新节点；若不是，则通过`createTextNode`创建一个文本节点。最后调用父级的replaceChild方法替换新的节点即可。

```
function doPatch(node, patches) {
    patches.forEach(patch => {
        switch(patch.type) {
            case 'ATTRS':
                for(let key in patch.attrs) {
                    let value = patch.attrs[key];
                    if(value) {
                        setAttr(node, key, value);
                    } else{
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
                node.textContext = patch.text;
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
            case 'REPLACE':
                let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            default:
                break;
        }
    })
}
复制代码
```

### setAttr 设置属性

setAttr方法设置属性的具体逻辑，请查看上方**元素设置属性**小节。

## 验证

在项目根目录创建`index.js`文件，通过手写修改DOM结构来验证我们上方编写的diff算法逻辑是否正确。

```
import {createElement, render, renderDom} from './element';
import diff from './diff'
import patch from './patch'
let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b'])
]);

let virtualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item'}, ['1']),
    createElement('li', {class: 'item'}, ['a']),
    createElement('div', {class: 'item'}, ['3'])
]);


let dom = render(virtualDom);
// 将虚拟DOM转换成了真实DOM渲染到页面上
renderDom(dom, window.root);
// console.log(dom);
let patches = diff(virtualDom, virtualDom2);
// 给元素打补丁，重新更新视图
patch(dom, patches);
复制代码
```

## 总结

从头看到尾，相信很多小伙伴就会觉得**DOM-Diff**整个过程是很清晰明了的，具体步骤：

1. 用JS对象模拟DOM（虚拟DOM）
2. 把此虚拟DOM转成真实DOM并插入页面中（render）
3. 如果有事件发生修改了虚拟DOM，比较两棵虚拟DOM树的差异，得到差异对象（diff）
4. 把差异对象应用到真正的DOM树上（patch）

若该文章比有需要的小伙伴有帮助的话，请帮忙点个红心加波关注。star~

```
本文项目仓库地址：https://github.com/tangmengcheng/dom-diff.git
```