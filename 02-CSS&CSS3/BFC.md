##  Box
-  Box 是 CSS 布局的对象和基本单位
- 元素的类型和 display 属性，决定了这个 Box 的类型。不同类型的 Box，会参与不同的 Formatting Context（一个决定如何渲染文档的容器）
- 盒子类型：
   1.  block-level box
   display属性为 block，list-item，table 的元素，会生成 block-level box，并参与 Box Formatting Context
    2.  inline-level box
       display 属性为 inline，inline-block，inline-table 的元素，会生成 inline-level box，并参与 Inline Formatting Context

##  Formatting Context
- Formatting context 是 W3C CSS2.1 规范中的一个概念
- 它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用
- 最常见的 Formatting context 有 Block Formatting Context（BFC）、Inline Formatting Context（IFC）

##  BFC
直译为“块级格式化上下文”。它是一个独立的渲染区域，只有 block-level box 参与，它规定了内部的 block-level box 如何布局，并且与这个区域外部毫不相干

###  BFC 布局规则
1. 内部的 Box 会在垂直方向，一个接一个地放置
2. BFC 的区域不会与 float box 重叠
3. 内部的 Box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
4. 计算 BFC 的高度时，浮动元素也参与计算（清除浮动 haslayout）
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之亦如此

###  哪些元素会生成 BFC
- 根元素
- float 不为 none
- position 为 absolute 或 fixed
- overflow 不为 visible
- display 为 inline-block、table-cell、table-caption、flex、inline-flex