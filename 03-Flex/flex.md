## flex基本概念

要想熟练掌握flex布局的话，你需要理解两个概念：`轴`和`容器`👇

![image-20210212225434506](D:\资料\lecture-notes\3-Flex\image\image-20210212225434506.png)

从上面图来看，我们将flex布局分为两部分讲，`轴`和`容器`。

**轴**

- 主轴（mian axis）
- 交叉轴（cross axis）

**容器**

- 父容器（container)
- 子容器（item）

打个预防针，`flex布局`涉及到12个CSS属性，父容器,子容器各6个。

接下来先梳理常见的属性，不常见的放在进阶部分来梳理。

### 轴

我们知道，`轴`包括`主轴`和`交叉轴`,那么它们的方向是如何决定呢？我们直接从一张图看懂它👇

![image-20210212225412239](D:\资料\lecture-notes\3-Flex\image\image-20210212225412239.png)

默认情况下，**主轴**的方向是从左向右的，**交叉轴**垂直于主轴，逆时针方向90度，那么接下来我们看**flex-direction**是如何决定主轴的。讲这个之前，我们需要明白👇

- 交叉轴是由主轴决定的，主轴又是由flex-direction决定的。
- flex-direction属性设置在父容器上，这样子才可以生效。

```css
flex-direction: row | row-reverse | column | column-reverse
```

![image-20210212225523753](D:\资料\lecture-notes\3-Flex\image\image-20210212225523753.png)

首先布局如下👇

```html
<div class="wrapper">
        <div class="flex1">子盒子#flex1: 1 </div>
        <div class="flex2">子盒子#flex2: 1 </div>
</div>
```

接下来，我们看看他们的效果吧👇

------

#### flex-direction: row

```
当你给父盒子(wrapper)设置属性
flex-direction: row
```

效果👇

![image-20210212225607344](D:\资料\lecture-notes\3-Flex\image\image-20210212225607344.png)

**结论**

- flex容器的主轴被定义为与文本方向相同。 主轴起点和主轴终点与内容方向相同。
- 简单理解就是**主轴沿着水平方向向右**

------

#### flex-direction: row-reverse

```
当你给父盒子(wrapper)设置属性
flex-direction: row-reverse
```

效果👇

![image-20210212225638326](D:\资料\lecture-notes\3-Flex\image\image-20210212225638326.png)

我们可以看到这两个盒子的位置发生了变化，这个就是主轴起点和主轴终点位置**置换**的原因。

**结论**

- 表现和row相同，但是置换了主轴起点和主轴终点。
- 简单理解就是**主轴沿着水平方向向左**，与文本方向相反。

------

#### flex-direction: column

```
当你给父盒子(wrapper)设置属性
flex-direction: column
```

效果👇

![image-20210212225703954](D:\资料\lecture-notes\3-Flex\image\image-20210212225703954.png)

可以看到，子盒子的布局发生了变化，形成了在Y轴上的布局方式,并且书写方式跟布局一样。

**结论**

- flex容器的主轴和块轴相同。主轴起点与主轴终点和书写模式的前后点相同
- 简单的理解，就是主轴变成Y轴方向，方向从上到下布局。

------

#### flex-direction: column-reverse

```
当你给父盒子(wrapper)设置属性
flex-direction: column-reverse
```

效果👇

![image-20210212225728912](D:\资料\lecture-notes\3-Flex\image\image-20210212225728912.png)

可以看到，子盒子的布局跟column差不多，唯一不同的是，方向上发生了变化。

**结论**

- 表现和`column`相同，但是置换了主轴起点和主轴终点
- 简单的理解，就是主轴变成Y轴方向，方向从下到上，与书写的方向相反。

------

### 容器

这里就分为**父容器**和**子容器**，我们先来看看父容器👇

#### 父容器

- justify-content:  **设置子元素在主轴方向上的对齐方式**
- align-items： **设置子元素在交叉轴方向上的对齐方式**

![image-20210212225751995](D:\资料\lecture-notes\3-Flex\image\image-20210212225751995.png)

------

#### justify-content

这个属性设置在父容器上，**决定子元素在主轴方向上的对齐方式**，我们看看它们具体表现吧👇

------

#### justify-content: flex-start

```
当你给父盒子(wrapper)设置属性
justify-content: flex-start
```

效果👇

![image-20210212225855730](D:\资料\lecture-notes\3-Flex\image\image-20210212225855730.png)

**结论**，子元素沿着主轴方向开始对齐。

------

#### justify-content: flex-end

```
当你给父盒子(wrapper)设置属性
justify-content: flex-end
```

效果👇

![image-20210212225920761](D:\资料\lecture-notes\3-Flex\image\image-20210212225920761.png)

**结论**，子元素沿着主轴方向终点对齐。

------

#### justify-content: center

```
当你给父盒子(wrapper)设置属性
justify-content: center
```

效果👇

![image-20210212225935895](D:\资料\lecture-notes\3-Flex\image\image-20210212225935895.png)

**结论**，子元素在主轴方向上水平居中。

------

#### justify-content: space-between

```
当你给父盒子(wrapper)设置属性
justify-content: space-between
```

效果👇

![image-20210212225957700](D:\资料\lecture-notes\3-Flex\image\image-20210212225957700.png)

**结论**，子元素在主轴方向上**两端对齐，项目之间间隔相等**。

------

#### justify-content: space-around

```
当你给父盒子(wrapper)设置属性
justify-content: space-around
```

效果👇

![image-20210212230011298](D:\资料\lecture-notes\3-Flex\image\image-20210212230011298.png)

**结论**，子元素在主轴方向上**均匀排列每个元素，每个元素周围分配相同的空间**。

------

#### align-items

这个属性设置在父容器上，**决定子元素在交叉轴方向上的对齐方式**，我们看看它们具体表现吧👇

------

#### align-items: flex-start

```
当你给父盒子(wrapper)设置属性
align-items: flex-start
```

![image-20210212230027617](D:\资料\lecture-notes\3-Flex\image\image-20210212230027617.png)

**结论**，子元素在交叉轴方向上起点对齐。

------

#### align-items: flex-end

```
当你给父盒子(wrapper)设置属性
align-items: flex-end
```

![image-20210212230042871](D:\资料\lecture-notes\3-Flex\image\image-20210212230042871.png)

**结论**，子元素在交叉轴方向上终点对齐。

------

#### align-items: center

```
当你给父盒子(wrapper)设置属性
align-items: center
```

![image-20210212230056165](D:\资料\lecture-notes\3-Flex\image\image-20210212230056165.png)

**结论**，子元素在交叉轴方向上居中对齐。

------

#### align-items: baseline

```
当你给父盒子(wrapper)设置属性
align-items: baseline
```

![image-20210212230153720](D:\资料\lecture-notes\3-Flex\image\image-20210212230153720.png)

**结论**，子元素在交叉轴方向上以文字基线对齐，具体不清楚的，可以自行百度。

------

#### align-items: stretch

```
当你给父盒子(wrapper)设置属性
align-items: stretch
```

![image-20210212230213796](D:\资料\lecture-notes\3-Flex\image\image-20210212230213796.png)

**结论**，这个属性是默认的，如果项目未设置高度或者设为 auto，将占满整个容器的高度。

------

#### 子容器

先看张图片

![image-20210212230620088](D:\资料\lecture-notes\3-Flex\image\image-20210212230620088.png)

子容器的话，这里就介绍两个属性👇

- ```
  flex
  ```

  属性 定义在主轴是如何伸缩的

  - 子容器是有弹性的，它们会自动填充剩余空间，子容器的伸缩比由`flex`属性决定。
  - flex是多个属性的缩写，允许1-3个值的连写，具体参考上面的图。

- ```
  align-self
  ```

  属性 

  单独设置子容器如何沿交叉轴排列

  - 每个子容器都可以单独定义沿交叉轴排列方式。
  - 该属性的取值跟父容器中的align-items属性一致，如果两者相同的话，则以子容器`align-self`属性为主。

#### flex作用规则

- 三个属性的简写，是flex-grow  flex-shrink flex-basis的简写
- 常用简化写法👇
  - flex:1 —>  flex:1 1 0%;
  - flex:3 —> flex:3 1 0%;
  - 注意:flexbox布局和原来的布局是两个概念，部分css属性在flexbox盒子里面不起作用，eg：float， clear， column,vertical-align 等等

```
注意👉flex-grow  flex-shrink flex-basis 这三个属性会在后续介绍
```

具体的flex取值问题，可以参照下面的图👇

![image-20210213112850849](D:\资料\lecture-notes\3-Flex\image\image-20210213112850849.png)

------

#### **align-self作用规则**

```
// 起始端对齐
align-self : flex-start;
```

![image-20210213112534381](D:\资料\lecture-notes\3-Flex\image\image-20210213112534381.png)

------

```
// 末尾段对齐
align-self : flex-end;
```

![image-20210213112616556](D:\资料\lecture-notes\3-Flex\image\image-20210213112616556.png)

------

```
基线对齐// 末尾段对齐
align-self : baseline;
```

![image-20210213112654973](D:\资料\lecture-notes\3-Flex\image\image-20210213112654973.png)

可以看到的话，它们对齐的方式是第一行文字的基线。

------

```
拉伸对齐
align-self : stretch;
```

![image-20210213112759179](D:\资料\lecture-notes\3-Flex\image\image-20210213112759179.png)

------

## flex更深入了解

上面介绍的常见几个属性掌握的话，基本上可以满足日常的开发布局需求，剩下的一些属性，接下来将梳理一遍，这样子的话，早日成为`flex布局进阶者`。

### 父容器

- **flex-wrap**  设置换行方式
  - 绝对子容器是否可以选择换行，一般而言有三种状态，支持换行的话，也支持逆序换行。
- **flex-flow** 设置轴向与换行组合
  - 是 flex-direction 和 flex-wrap 的简写。
  - 所以只要掌握，`flex-direction` 和 `flex-wrap`即可。
- **align-content**  多行沿交叉轴对齐方式
  - 当子容器多行排列时，设置行与行之间的对齐方式。

------

#### flex-wrap

设置子容器的换行方式，通常有三个取值👇

```
flex-wrap: wrap | nowrap | wrap-reverse
```

三种情况👇

------

```
// 允许换行
flex-wrap : wrap
```

效果👇

![image-20210213113040381](D:\资料\lecture-notes\3-Flex\image\image-20210213113040381.png)

------

```
// 不允许换行
flex-wrap : nowrap
```

效果👇

![image-20210213113056050](D:\资料\lecture-notes\3-Flex\image\image-20210213113056050.png)

------

```
// 允许逆向换行
flex-wrap : wrap-reverse
```

效果👇

![image-20210213113111070](D:\资料\lecture-notes\3-Flex\image\image-20210213113111070.png)

------

#### flex-flow

先来一张图👇

![image-20210213113326769](D:\资料\lecture-notes\3-Flex\image\image-20210213113326769.png)

`更多取值信息请查看` [`flex-direction`](https://developer.mozilla.org/zh-CN/docs/CSS/flex-direction) 和 [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/CSS/flex-wrap)

可以查看MDN上，或者把之前的`flex-direction` 和 `flex-wrap` 两者取值看过一遍，那么使用这个属性就没有问题啦，这里也就不过多的举例子了，取值有三种情况👇

- 单独设置flex-direction取值，比如

  - ```css
    flex-flow: row | column
    ```
  
- 单独设置flex-wrap取值

  - ```css
    flex-flow: wrap | nowrap | wrap-reverse
    ```
  
- 同时设置两者取值

  - ```css
    flex-flow: row wrap
    flex-flow: column nowrap
    ```

------

#### align-content

这个属性是定义子容器在交叉轴的排列方式，也就是对齐方式。

首先上一张图👇

![image-20210213113409139](D:\资料\lecture-notes\3-Flex\image\image-20210213113409139.png)

根据这些取值，我们来看看布局效果吧👇

------

```
// 起始端对齐
align-content: flex-start
```

效果👇

![image-20210213113433984](D:\资料\lecture-notes\3-Flex\image\image-20210213113433984.png)

------

```
// 末尾段对齐
align-content: flex-end
```

效果👇

![image-20210213113452259](D:\资料\lecture-notes\3-Flex\image\image-20210213113452259.png)

------

```
// 居中对齐
align-content: center
```

效果👇

![image-20210213113520445](D:\资料\lecture-notes\3-Flex\image\image-20210213113520445.png)

------

```css
// 等间距均匀分布
align-content: space-between
```

效果👇

![image-20210213113539416](D:\资料\lecture-notes\3-Flex\image\image-20210213113539416.png)

------

```css
// 等边距均匀分布
align-content: space-around
```

效果👇

![image-20210213113620739](D:\资料\lecture-notes\3-Flex\image\image-20210213113620739.png)

------

```css
// 拉伸对齐
align-content: stretch
```

效果👇

![image-20210213113635913](D:\资料\lecture-notes\3-Flex\image\image-20210213113635913.png)

------

```css
// 基线对齐
align-content: baseline
```

效果👇

![image-20210213113820871](D:\资料\lecture-notes\3-Flex\image\image-20210213113820871.png)

------

### 子容器

- **flex-grow** 设置扩展比例
- **flex-shrink** 设置收缩比例
- **flex-basis** 设置基准大小
- **order** 设置排列顺序

------

#### flex-grow

子容器弹性伸展的比例，简单理解，就是把剩余的空间按比例分配给子容器。

我们看个例子

![image-20210213113841373](D:\资料\lecture-notes\3-Flex\image\image-20210213113841373.png)

------

#### flex-shrink

子容器弹性收缩的比例。简单理解，就是当你子容器超出的部分，会按照对应的比例给子容器减去对应的值。

我们来看下效果👇

![image-20210213113912944](D:\资料\lecture-notes\3-Flex\image\image-20210213113912944.png)

当取值为0时，就会溢出，那么我们给它们设置一个值👇

![image-20210213113929585](D:\资料\lecture-notes\3-Flex\image\image-20210213113929585.png)

这样子的超出的部分就会按照比列减去。

------

#### flex-basis

有几个点需要注意的是👇

- 在不伸缩的情况下，`flex-basis`给子容器设置大小才有作用。

- 当主轴为横向时，即👇

  - ```
    flex-direction：row | row-reverse
    ```
    
  - `flex-basis`设置的大小为宽度，并且会覆盖width值

  - **属性优先级关系**：`max-width/min-width > flex-basis > width > box`

- 当主轴为纵向时，即👇

  - ```css
    flex-direction：column | column-reverse
    ```
    
- `flex-basis`设置的大小为高度，并且会覆盖height值

我们来看看两种情况👇

```css
当主轴为横向时
flex-direction：row | row-reverse
```

效果👇

![image-20210213114023234](D:\资料\lecture-notes\3-Flex\image\image-20210213114023234.png)

------

```css
当主轴为纵向时
flex-direction：column | column-reverse
```

效果👇

![image-20210213120459128](D:\资料\lecture-notes\3-Flex\image\image-20210213120459128.png)

------

#### order

- 每个子容器的`order`属性默认为0
- 通过设置`order`属性值，改变子容器的排列顺序。
- 可以是负值，数值越小的话，排的越靠前。

直接看效果图👇

![image-20210213120526948](D:\资料\lecture-notes\3-Flex\image\image-20210213120526948.png)

------

## 总结

这个时候，是不是需要总结一下呢👇

先看看子容器属性👇

![image-20210213120553875](D:\资料\lecture-notes\3-Flex\image\image-20210213120553875.png)

------

再看看父容器属性👇

![flex-父容器属性](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2e9733b84e040f296f827ff4148f235~tplv-k3u1fbpfcp-zoom-1.image)