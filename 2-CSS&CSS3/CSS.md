##  页面导入样式时，使用 link 和 @import 有什么区别 ？

| 区别      | link                                                         | @import                                                  |
| --------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| 从属关系  | link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等 | @import 是 CSS 提供的语法规则，只有导入样式表的作用      |
| 加载顺序  | 加载页面时，link 标签引入的 CSS 被同时加载                   | @import 引入的 CSS 将在页面加载完毕后被加载              |
| 兼容性    | link标签作为 HTML 元素，不存在兼容性问题                     | @import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别     |
| DOM可控性 | 可以通过 JS 操作 DOM ，插入link标签来改变样式                | 由于 DOM 方法是基于文档的，无法使用@import的方式插入样式 |
| 权重      | link引入的样式权重大于@import引入的样式此处内容详解（[link和@import的区别](https://www.cnblogs.com/my--sunshine/p/6872224.html)） |                                                          |

##  常见兼容性问题？

- 浏览器默认的 margin 和 padding 不同。<del>解决方案是加一个全局的 *{margin: 0; padding: 0;}</del> 来统一。（此解决方法比较麻烦，会使所有的标签的该属性全部为0）
- IE下 event 对象有 event.x，event.y 属性，而 Firefox 下没有。Firefox 下有 event.pageX，event.PageY 属性，而 IE 下没有。 解决办法：var mx = event.x?event.x:event.pageX
- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示, 可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决
- 超链接访问过后 hover 样式就不出现了，被点击访问过的超链接样式不在具有 hover 和 active 了，解决方法是改变 CSS 属性的排列顺序: L-V-H-A : a:link {} a:visited {} a:hover {} a:active {}（**l**o**v**e **ha**te定理）

##  清除浮动，什么时候需要清除浮动，清除浮动都有哪些方法 ？

一个块级元素如果没有设置 height，那么其高度就是由里面的子元素撑开，如果子元素使用浮动，脱离了标准的文档流，那么父元素的高度会将其忽略，如果不清除浮动，父元素会出现高度不够，那样如果设置 border 或者 background 都得不到正确的解析。

正是因为浮动的这种特性，导致本属于普通流中的元素浮动之后，包含框内部由于不存在其他普通流元素了，也就表现出高度为 0（`高度塌陷`）。在实际布局中，往往这并不是我们所希望的，所以需要闭合浮动元素，使其包含框表现出正常的高度。

清除浮动的方式

- 父级 div 定义 height，原理：父级 div 手动定义 height，就解决了父级 div 无法自动获取到高度的问题。 
- 结尾处加空 div 标签 clear: both，原理：添加一个空 div，利用 css 提高的 clear: both 清除浮动，让父级 div 能自动获取到高度。
- 父级 div 定义 overflow: hidden，  原理：必须定义 width 或 zoom: 1，同时不能定义 height，使用 overflow: hidden 时，浏览器会自动检查浮动区域的高度。 
- 父级 div 也一起浮动 。
- 父级 div 定义 display: table 。
- 父级 div 定义 伪类 :after 和 zoom 。

总结：比较好的是倒数第 2 种方式，简洁方便。

```css
.clearfix:after { 
    content: "";
    display: block;
    clear: both;
    visibility: hidden; /*可见度设为隐藏。注意它和 display:none; 是有区别的。仍然挂载在渲染树上*/  
    height: 0;
    font-size:0;
}  
```

```css
.clearfix { 
	*zoom:1;
} /*这是针对于IE6的，因为IE6不支持伪类，zoom:1 让IE6的元素可以清除浮动来包裹内部元素*/
```

## CSS3新特性
>更多内容 [CSS3有哪些新特性](https://blog.csdn.net/lxcao/article/details/52797914?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2.channel_param)
1. **选择器**(:last-child，:first-child，:nth-child(n))
2. **@Font-face 特性**
3. **圆角**
4. **多列布局**
5. **背景、边框和渐变**(background-size，background-origin；border-radius/box-shadow，background-image)
6. **文本效果**(文本阴影：text-shadow；换行规则：word-break; )
7. **2D/3D转换**
8. **过渡效果**(transition)/**动画**(animation)
9. 变形(transform)：旋转 rotate，移动 translate，缩放 scale，扭曲 skew，矩阵 matrix

## CSS中 transition 和 animate 有何区别？

1. transition 一般是用来过渡的，没有时间轴的概念，通过事件触发(一次)，没有中间状态(只有开始和结束)
2. animate 是做动效，有时间轴的概念(帧可控)，可以重复触发和有中间状态
3. 过渡的开销比动效小，前者用于交互比较多，后者用于活动页多

## css3 动画效果属性有哪些 ?

- animation-name：规定需要绑定到选择器的 keyframe 名称。。
- animation-duration：规定完成动画所花费的时间，以秒或毫秒计。
- animation-timing-function：规定动画的速度曲线。
- animation-delay：规定在动画开始之前的延迟。
- animation-iteration-count：规定动画应该播放的次数。
- animation-direction：规定是否应该轮流反向播放动画。

## 如果让你来制作一个访问量很高的大型网站，你会如何来管理所有 CSS 文件、JS 与图片？

回答：涉及到人手、分工、同步；

- 先期团队必须确定好全局样式（globe.css），编码模式 (utf-8) 等
- 编写习惯必须一致（例如都是采用继承式的写法，单样式都写成一行）；
- 标注样式编写人，各模块都及时标注（标注关键样式调用的地方）；
- 页面进行标注（例如页面模块开始和结束）；
- CSS 跟 HTML 分文件夹并行存放，命名都得统一（例如 style.css）
- JS 分文件夹存放，命名以该 JS 功能为准
- 图片采用整合的 png8 格式文件使用，尽量整合在一起使用，方便将来的管理。

## 可继承的样式

font-size，font-family，color，ul，li，dl，dd，dt；

## 不可继承的样式

border padding margin width height 事实上，宽度也不是继承的，而是如果你不指定宽度，那么它就是 100%。由于你子 DIV 并没有指定宽度，那它就是 100%，也就是与父 DIV 同宽，但这与继承无关，高度自然也没有继承一说。

## 用 position: absolute 跟用 float 有什么区别吗 ？

- 都是脱离标准流，只是 position: absolute 定位用的时候，位置可以给的更精确(想放哪就放哪)，而 float 用的更简洁，向右，左，两个方向浮动，用起来就一句代码。
- 还有就是 position: absolute 不管在哪个标签里，都可以定位到任意位置，毕竟 top，left，bottom，right 都可以给正值或负值；
- float 只是向左或向右浮动，不如 position: absolute 灵活，浮动后再想改变位置就要加各种 margin，padding 之类的通过间距的改变来改变位置，我自身觉得这样的话用起来不方便，也不太好。
- 但在菜单栏，或者一些图标的横向排列时，用起来特别方便，一个 float 就解决了，而且每个元素之间不会有任何间距(所以可以用 float 消除元素间的距离)；

**何时应当时用 padding 和 margin ？**

何时应当使用 margin

- 需要在 border 外侧添加空白时。
- 空白处不需要背景（色）时。
- 上下相连的两个盒子之间的空白，需要相互抵消时。 如 15px + 20px 的 margin，将得到 20px 的空白。

何时应当使用 padding

- 需要在 border 内测添加空白时。
- 空白处需要背景（色）时。
- 上下相连的两个盒子之间的空白，希望等于两者之和时。 如 15px + 20px 的 padding，将得到 35px 的空白。

个人认为：`margin 是用来隔开元素与元素的间距；padding 是用来隔开元素与内容的间隔，让内容（文字）与（包裹）元素之间有一段 呼吸距离`。



**文字在超出长度时，如何实现用省略号代替 ? 超长长度的文字在省略显示后，如何在鼠标悬停时，以悬浮框的形式显示出全部信息 ?**

注意：设置 width，overflow: hidden, white-space: nowrap (规定段落中的文本不进行换行), text-overflow: ellipsis，四个属性缺一不可。这种写法在所有的浏览器中都能正常显示。

------

**CSS 里的 visibility 属性有个 collapse 属性值 ？在不同浏览器下有什么区别 ？**

collapse

- 当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局，被行或列占据的空间会留给其他内容使用。
- 如果此值被用在其他的元素上，会呈现为 hidden。
- 当一个元素的 visibility 属性被设置成 collapse 值后，对于一般的元素，它的表现跟 hidden 是一样的。
- chrome中，使用 collapse 值和使用 hidden 没有区别。
- firefox，opera 和 IE，使用 collapse 值和使用 display：none 没有什么区别。

------

**position 跟 display、overflow、float 这些特性相互叠加后会怎么样 ？**

- display 属性规定元素应该生成的框的类型；
- position 属性规定元素的定位类型；
- float 属性是一种布局方式，定义元素在哪个方向浮动。
- 类似于优先级机制：position：absolute / fixed 优先级最高，有他们在时，float 不起作用，display 值需要调整。float 或者 absolute 定位的元素，只能是块元素或表格。

------

**对 BFC 规范(块级格式化上下文：block formatting context) 的理解 ？**

BFC 规定了内部的 Block Box 如何布局。

定位方案：

- 内部的 Box 会在垂直方向上一个接一个放置。
- Box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠。
- 每个元素的 margin box 的左边，与包含块 border box 的左边相接触。
- BFC 的区域不会与 float box 重叠。
- BFC 是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。

计算 BFC 的高度时，浮动元素也会参与计算。

满足下列条件之一就可触发 BFC：

- 1、根元素，即 html
- 2、float 的值不为 none（默认）
- 3、overflow 的值不为 visible（默认）
- 4、display 的值为 inline-block、table-cell、table-caption
- 5、position 的值为 absolute 或 fixed

------

**浏览器是怎样解析 CSS 选择器的 ？**

- CSS 选择器的解析是从右向左解析的。
- 若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。
- 若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。
- 两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。
- 而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。
- 在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

------

**元素竖向的百分比设定是相对于容器的高度吗 ？**

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的。

------

**全屏滚动的原理是什么 ？用到了 CSS 的哪些属性 ？**

原理

- 有点类似于轮播，整体的元素一直排列下去，假设有 5 个需要展示的全屏页面，那么高度是 500%，只是展示 100%，剩下的可以通过 transform 进行 y 轴定位，也可以通过 margin-top 实现。
- overflow：hidden；transition：all 1000ms ease；

------

**什么是响应式设计 ？响应式设计的基本原理是什么 ？如何兼容低版本的 IE ？**

- 响应式网站设计( Responsive Web design ) 是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。
- 基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理。
- 页面头部必须有 meta 声明的 viewport。

```
<meta name="viewport" content="” width="device-width" initial-scale="1" maximum-scale="1" user-scalable="no"/>
```

------

**视差滚动效果 ？**

视差滚动（Parallax Scrolling）通过在网页向下滚动的时候，`控制背景的移动速度比前景的移动速度慢`来创建出令人惊叹的 3D 效果。

- CSS3 实现。 优点：开发时间短、性能和开发效率比较好，缺点是不能兼容到低版本的浏览器
- jQuery 实现。 通过控制不同层滚动速度，计算每一层的时间，控制滚动效果。优点：能兼容到各个版本的，效果可控性好。缺点：开发起来对制作者要求高。
- 插件实现方式。 例如：parallax-scrolling，兼容性十分好。

------

**::before 和 :after 中双冒号和单冒号有什么区别 ？解释一下这 2 个伪元素的作用**

- 单冒号 (:) 用于 CSS3 伪类，双冒号 (::) 用于 CSS3 伪元素。
- ::before 就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于 dom 之中，只存在在页面之中。

:before 和 :after 这两个伪元素，是在 CSS2.1 里新出现的。 起初，伪元素的前缀使用的是单冒号语法，但随着 Web 的进化，在 CSS3 的规范里，伪元素的语法被修改成使用双冒号，成为 ::before、 ::after 。

------

**怎么让 Chrome 支持小于 12px 的文字 ？**

```
p {
  font-size: 10px;
  -webkit-transform: scale(0.8);  // 0.8 是缩放比例
} 
```

------

**让页面里的字体变清晰，变细用 CSS 怎么做 ？**

-webkit-font-smoothing 在 window 系统下没有起作用，但是在 IOS 设备上起作用 -webkit-font-smoothing：antialiased 是最佳的，灰度平滑。

------

**如果需要手动写动画，你认为最小时间间隔是多久，为什么 ？**

多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为：1/60＊1000ms ＝ 16.7ms。

------

**有一个高度自适应的 div，里面有两个 div，一个高度 100px，如何让另一个填满剩下的高度 ？**

- 外层 div 使用 position：relative；
- 高度要求自适应的 div 使用 position: absolute; top: 100px; bottom: 0; left: 0

------

**style 标签写在 body 后与 body 前有什么区别？**

页面加载自上而下，当然是先加载样式。

写在 body 标签后，由于浏览器以逐行方式对 HTML 文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在 windows 的 IE 下可能会出现 FOUC 现象（即样式失效导致的页面闪烁问题）

------

**阐述一下CSS Sprites**

将一个页面涉及到的所有图片都包含到一张大图中去，然后利用 CSS 的 background-image，background-repeat，background-position 的组合进行背景定位。

利用 CSS Sprites 能很好地减少网页的 http 请求，从而大大的提高页面的性能； CSS Sprites 能减少图片的字节。

------

**用 css 实现左侧宽度自适应，右侧固定宽度 ？**

1、标准浏览器的方法

当然，以不折腾人为标准的 w3c 标准早就为我们提供了制作这种自适应宽度的标准方法。

- 把 container 设为 display: table 并指定宽度 100%；
- 然后把 main + sidebar 设为 display: table-cell;
- 然后只给 sidebar 指定一个宽度，那么 main 的宽度就变成自适应了。

代码很少，而且不会有额外标签。不过这是 IE7 及以下都无效的方法。

```
.container {
    display: table;
    width: 100%;
}
.main {
    display: table-cell;
}
.sidebar {
    display: table-cell;
    width: 300px;
}
```

[![img](https://camo.githubusercontent.com/552f9378a2fd5752e4bbc9637da6a65a3fc397ad40cb277f2e21b4a3e74eb5a5/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d636534333234626663326334663833392e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)](https://camo.githubusercontent.com/552f9378a2fd5752e4bbc9637da6a65a3fc397ad40cb277f2e21b4a3e74eb5a5/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d636534333234626663326334663833392e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

2、固定区域浮动，自适应区域不设置宽度但设置 margin

```
.container {
    overflow: hidden;
    *zoom: 1;
}
.sidebar {
    float: right;
    width: 300px;
    background: #333;
}
.main {
    margin-right: 320px;
    background: #666;
}
.footer {
    margin-top: 20px;
    background: #ccc;
}
```

其中，sidebar 让它浮动，并设置了一个宽度；而 main 没有设置宽度。

大家要注意 html 中必须使用 div 标签，不要妄图使用什么 p 标签来达到目的。因为 div 有个默认属性，即如果不设置宽度，那它会自动填满它的父标签的宽度。这里的 main 就是例子。

当然我们不能让它填满了，填满了它就不能和 sidebar 保持同一行了。我们给它设置一个 margin。由于 sidebar 在右边，所以我们设置 main 的 margin-right 值，值比 sidebar 的宽度大一点点——以便区分它们的范围，例子中是 320。

假设 main 的默认宽度是 100%，那么它设置了 margin 后，它的宽度就变成了 100% - 320，此时 main 发现自己的宽度可以与 sidebar 挤在同一行了，于是它就上来了。 而宽度 100% 是相对于它的父标签来的，如果我们改变了它父标签的宽度，那 main 的宽度也就会变——比如我们把浏览器窗口缩小，那 container 的宽度就会变小，而 main 的宽度也就变小，但它的实际宽度 100% - 320 始终是不会变的。

这个方法看起来很完美，只要我们记得清除浮动(这里我用了最简单的方法)，那 footer 也不会错位。而且无论 main 和 sidebar 谁更长，都不会对布局造成影响。

但实际上这个方法有个很老火的限制——html 中 sidebar 必须在 main 之前！ 但我需要 sidebar 在 main 之后！因为我的 main 里面才是网页的主要内容，我不想主要内容反而排在次要内容后面。 但如果 sidebar 在 main 之后，那上面的一切都会化为泡影。

[![img](https://camo.githubusercontent.com/40a967d1961989fc49b373cdd77b30ca580a718c0310aa4eb085c46e3101673e/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d343763383732313037666363393361612e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)](https://camo.githubusercontent.com/40a967d1961989fc49b373cdd77b30ca580a718c0310aa4eb085c46e3101673e/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d343763383732313037666363393361612e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

3、固定区域使用定位，自适应区域不设置宽度，但设置 margin

```
.container {
    position: relative;
}
.sidebar {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    background: #333;
}
.main {
    margin-right: 320px;
    background: #666;
}
```

[![img](https://camo.githubusercontent.com/b26096868afb5edd109aa52be6cc88c26d5b2ac582cb40ee19a359132dbb15d7/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d373637323632616531383030323132312e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)](https://camo.githubusercontent.com/b26096868afb5edd109aa52be6cc88c26d5b2ac582cb40ee19a359132dbb15d7/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d373637323632616531383030323132312e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

咦，好像不对，footer 怎么还是在那儿呢？怎么没有自动往下走呢？footer 说——我不给绝对主义者让位！ 其实这与 footer 无关，而是因为 container 对 sidebar 的无视造成的——你再长，我还是没感觉。 看来这种定位方式只能满足 sidebar 自己，但对它的兄弟们却毫无益处。

4、左边浮动，右边 overflow: hidden;

```
*{margin:0; padding: 0;}
html,body{
   height: 100%;/*高度百分百显示*/
}
#left{
    width: 300px;
    height: 100%;
    background-color: #ccc;
    float: left;
}
#right{
    height: 100%;
    overflow: hidden;
    background-color: #eee;
}
```

这个方法，我利用的是创建一个新的 BFC（块级格式化上下文）来防止文字环绕的原理来实现的。

BFC 就是一个相对独立的布局环境，它内部元素的布局不受外面布局的影响。 它可以通过以下任何一种方式来创建： 

- float 的值不为 none 
- position 的值不为 static 或者 relative 
- display 的值为 table-cell , table-caption , inline-block , flex , 或者 inline-flex 中的其中一个 
- overflow 的值不为 visible

关于 BFC，在 w3c 里是这样描述的：在 BFC 中，每个盒子的左外边框紧挨着 包含块 的 左边框 （从右到左的格式化时，则为右边框紧挨）。 即使在浮动里也是这样的（尽管一个包含块的边框会因为浮动而萎缩），除非这个包含块的内部创建了一个新的 BFC。 这样，当我们给右侧的元素单独创建一个 BFC 时，它将不会紧贴在包含块的左边框，而是紧贴在左元素的右边框。

------

**问：浮动的原理和工作方式，会产生什么影响呢，要怎么处理 ？**

工作方式：浮动元素脱离文档流，不占据空间。浮动元素碰到包含它的边框或者浮动元素的边框停留。

影响

- 浮动会导致父元素无法被撑开，影响与父元素同级的元素。
- 与该浮动元素同级的非浮动元素，如果是块级元素，会移动到该元素下方，而块级元素内部的行内元素会环绕浮动元素；而如果是内联元素则会环绕该浮动元素。
- 与该元素同级的浮动元素，对于同一方向的浮动元素(同级)，两个元素将会跟在碰到的浮动元素后；而对于不同方向的浮动元素，在宽度足够时，将分别浮动向不同方向，在宽度不同是将导致一方换行(换行与 HTML 书写顺序有关，后边的将会浮动到下一行)。
- 浮动元素将被视作为块元素。
- 而浮动元素对于其父元素之外的元素，如果是非浮动元素，则相当于忽视该浮动元素，如果是浮动元素，则相当于同级的浮动元素。
- 而常用的清除浮动的方法，则如使用空标签，overflow，伪元素等。

在使用基于浮动设计的 CSS 框架时，自会提供清除的方法，个人并不习惯使用浮动进行布局。

------

**对 CSS Grid 布局的使用**

[5 分钟学会 CSS Grid 布局](http://www.css88.com/archives/8506)

------

**rem、em、px、vh 与 vw 的区别 ？**

一、 rem 的特点

1. rem 的大小是根据 `html` 根目录下的字体大小进行计算的。
2. 当我们改变根目录下的字体大小的时候，下面字体都改变。
3. rem 不仅可以设置字体的大小，也可以设置元素宽、高等属性。
4. rem 是 CSS3 新增的一个相对单位（root em，根em），这个单位与 em 区别在于使用 rem 为元素设定字体大小时，仍然是相对大小，但相对的只是 HTML 根元素。

这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。 目前，除了 IE8 及更早版本外，所有浏览器均已支持 rem。 对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用 rem 设定的字体大小。

二、px 特点

1. px 像素（Pixel）。相对长度单位。像素 px 是相对于显示器屏幕分辨率而言的。

三、em 特点 

1. em 的值并不是固定的；
2. em 会继承父级元素的字体大小。
3. em 是相对长度单位。当前对行内文本的字体尺寸未被人为设置，相对于当前对象内文本的字体尺寸。如则相对于浏览器的默认字体尺寸。
4. 任意浏览器的默认字体高都是 16px。

所有未经调整的浏览器一般都符合: 1em = 16px。那么 12px = 0.75em，10px = 0.625em。 为了简化 font-size 的换算，需要在 css 中的 body 选择器中声明 Fontsize = 62.5%，这就使 em 值变为 16px*62.5%=10px, 这样 12px = 1.2em, 10px = 1em, 也就是说只需要将你的原来的 px 数值除以 10，然后换上 em 作为单位就行了。

四、vh 与 vw

视口

- 在桌面端，指的是浏览器的可视区域；
- 在移动端，它涉及 3个 视口：Layout Viewport（布局视口），Visual Viewport（视觉视口），Ideal Viewport（理想视口）。
- 视口单位中的 “视口”，桌面端指的是浏览器的可视区域；移动端指的就是 Viewport 中的 Layout Viewport。

vh / vw 与 %

| 单位 | 解释                       |
| ---- | -------------------------- |
| vw   | 1vw = 视口宽度的 1%        |
| vh   | 1vh = 视口高度的 1%        |
| vmin | 选取 vw 和 vh 中最小的那个 |
| vmax | 选取 vw 和 vh 中最大的那个 |

比如：浏览器视口尺寸为 370px，那么 1vw = 370px * 1% = 6.5px (浏览器会四舍五入向下取 7)

vh / vw 与 % 区别

| 单位    | 解释           |
| ------- | -------------- |
| %       | 元素的祖先元素 |
| vh / vw | 视口的尺寸     |

不过由于 vw 和 vh 是 css3 才支持的长度单位，所以在不支持 css3 的浏览器中是无效的。

------

**什么叫优雅降级和渐进增强 ？**

- 渐进增强 progressive enhancement：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
- 优雅降级 graceful degradation：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

区别

- 优雅降级是从复杂的现状开始，并试图减少用户体验的供给；
- 渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要；
- 降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带。

------

**width 和 height 的百分比是相对谁讲的 ？margin 和 padding 呢？**

- width 是相对于直接父元素的 width
- height 是相对于直接父元素的 height
- padding 是相对于直接父元素的 width
- margin 是相对于直接父元素的 margin

```
<style>
    #wrapper {
        width: 500px;
        height: 800px;
        background-color: #ccc;
    }
    .parent {
        width: 300px;
        height: 400px;
        background-color: yellow;
    }
    .son {
        /* 90*40 */
        width: 30%;
        height: 10%;
        /* 30 30 */
        padding-left: 10%;
        margin-left: 10%;
        background-color: green;
    }
</style>
<div id="wrapper">
    <div class="parent">
        <div class="son">
        </div>
    </div>
</div>
```

相关文章：

- [transform，transition，animation，keyframes区别](https://segmentfault.com/a/1190000012698032)
- [width 和 height 的百分比是相对谁讲的 ？margin 和 padding 呢？](https://www.jianshu.com/p/075839c8e2f2)
- [彻底搞懂 CSS 层叠上下文、层叠等级、层叠顺序、z-index](https://juejin.im/post/5b876f86518825431079ddd6)