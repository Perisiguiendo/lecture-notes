# 范围CSS

当`<style>`标签具有`scoped`属性时，其CSS将仅应用于当前组件的元素。这类似于Shadow DOM中的样式封装。它带有一些警告，但不需要任何polyfill。这是通过使用PostCSS转换以下内容来实现的：

```html
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

分为以下内容：

```html
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

## 混合本地风格和全球风格

您可以在同一组件中同时包含范围样式和非范围样式：

```html
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>
```

## 子组件根元素

使用`scoped`，父组件的样式不会泄漏到子组件中。但是，子组件的根节点将同时受父组件的作用域CSS和子组件的作用域CSS的影响。这是设计使然，以便父级可以为子级根元素设置样式以进行布局。

## 深度选择器

如果您希望`scoped`样式选择器是“较深的”，即影响子组件，则可以使用`>>>`组合器：

```html
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

上面将被编译成：

```css
.a[data-v-f3f3eg9] .b { /* ... */ }
```

某些预处理器（例如Sass）可能无法`>>>`正确解析。在这种情况下，您可以改用`/deep/`或`::v-deep`组合器-两者都是它们的别名，`>>>`并且工作原理完全相同。根据上面的示例，这两个表达式将被编译为相同的输出：

```html
<style scoped>
.a::v-deep .b { /* ... */ }
</style>
<style scoped>
.a /deep/ .b { /* ... */ }
</style>
```

## 动态生成的内容

使用创建的DOM内容`v-html`不受范围样式的影响，但是您仍然可以使用深度选择器设置样式。

## 还请谨记

- **范围样式不能消除对类的需要**。由于浏览器呈现各种CSS选择器的方式，`p { color: red }`确定范围（即与属性选择器结合使用）时，速度会慢很多倍。如果改用类或id，例如in `.example { color: red }`，则实际上消除了性能下降。
- **小心递归组件中的后代选择器！**对于具有选择器的CSS规则`.a .b`，如果匹配的元素`.a`包含递归子组件，则`.b`该规则将匹配该子组件中的所有子组件。



理解vue中less的scoped和/deep/工作原理
scoped
/deep/
实战
总结
scoped
vue项目一般是单页面、多组件，整个项目共用一个css样式表，有时候我们在写组件的过程中并不希望组件的样式污染全局作用域（毕竟不同组件之间重名的class很正常），因此我们会在组件的样式标签上加上scoped，例如下面这个最基本vue组件框架：

<template>
...
</template>

<script>
import ...
export defualt {
	data(){
	...
	}
	...
}
</script>

<style lang="less" scoped>
...
</style>

那么这个scoped是什么意思呢？其实就是给每条样式的 最后面 加上一个属性选择器[哈希值]，这个哈希值在项目里全局唯一，代表了当前这个组件。例如当前组件用到了 haha.vue ， 那么在打包的时候就会编译出一个data-v-5cfc4ef6来唯一代表这个组件。注意一个vue文件里可能有多个哈希值，因为一个组件里还可能嵌套了其他组件。

废话不多说，直接看scoped是怎么工作的。例如：

<style lang="less" scoped>
	.a{
		.b{
			background-color:#bfa
		}
	}
</style>

则打包编译后这个属性会变成这样：

	.a .b[data-v-5cfc4ef6]

注意了，.a和.b之间有空格，表示父子元素；.b和[data-v-5cfc4ef6]无空格，表示并集。那么这条css语句什么意思呢？class为a的元素下的 class为b且具有data-v-5cfc4ef6属性的元素。这样就做到了css样式只针对本组件（哈希值为data-v-5cfc4ef6）的元素

/deep/
那么deep是什么呢？博主找遍全网，找到的信息大意都是：“能够让被scoped限制住的样式属性穿透到子组件”，简直tm在坑爹！这话是不错，但是说了等于没说：为什么平时写项目，同样都是引用自组件，有些地方用/deep/有些地方不用呢？经过我自己的摸索，发现/deep/的工作规律是这样的：
/deep/ === [哈希值]
啥意思呢？还是刚才那个例子，加一个deep：

<style lang="less" scoped>
	.a{
		/deep/.b{
			background-color:#bfa
		}
	}
</style>

那么编译后的结果就会是：

	.a[data-v-5cfc4ef6] .b

注意这个.a和[data-v-5cfc4ef6]之间没有空格，表示并集；.a[data-v-5cfc4ef6]和.b之间是有空格的，表示子元素。
结合less的嵌套语法，我们发现是这样的：
/deep/某个属性前，表示父元素要拥有 哈希值这个属性，而如果没有写/deep/，这个 哈希值是会被scoped到叶子元素上的（最深的子元素，就像上一个例子所演示的那样）。
再举个例子：

/deep/div
1
会被打包编译成

[data-v-5cfc4ef6] div
1
注意有空格，表示父元素有 哈希值这个属性的所有div元素，也就是这个组件下的所有div元素了。

实战
有同学会问了，既然scoped会自己帮我们把哈希值放在叶子元素上，为什么还要自己写/deep/来调整哈希值的位置呢？我曾经也有这样的疑问，直到我用了antd…
话不多说，直接看代码：

<template>
  <div class="user-detail-wrap">
    <a-card :bodyStyle="{padding:'20px'}">
      <a-row
        :gutter="8"
      >
        <a-col :sm="5" :xs="5" class="title">编辑角色
          <a @click="goBack">
            <img
              :src="returnIcon"
              style="height: 18px" />
          </a>
        </a-col>
        <a-col :sm="3" :xs="3" style="float:right;">
          <a-button type="primary" style="width:80px;float:right;" v-action:save @click="goSave">保存</a-button>
          <a-modal
            :visible="confirmVisible"
            @cancel="handleCancel"
          >
            <p class="title">
              <img :src="warningIcon" alt="" class="warning-icon">
              <span class="confirm-title">{{ confirmTitle }}</span>
            </p>
            <p class='confirm-text'>{{ confirmText }}</p>
            <template slot="footer">
              <a-button key="back" @click="handleCancel">取消</a-button>
              <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleConfirm">修改</a-button>
            </template>
          </a-modal>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bodyStyle="{padding:'20px'}" class="table-card">
      <a-row
        :gutter="8"
      >
        <a-col :sm="5" :xs="5" class="title">基础信息</a-col>
      </a-row>
      <a-card-grid
        style="width:25%;padding:10px"
        v-for="(record, index) in roleInfoColums"
        :key="index"
      >{{ record.title }}: {{ roleInfo[record.dataIndex] }}</a-card-grid>
    </a-card>
    <a-card :bodyStyle="{padding:'20px'}" class="table-card">
      <a-row
        :gutter="8"
      >
        <a-col :sm="5" :xs="5" class="title">权限信息</a-col>
      </a-row>
      <permission-tree
        :treeData="treeData"
        :disableAll="false"
        @onSelectChange="onSelectChange"
      ></permission-tree>
    </a-card>
  </div>
</template>

打包之后呈现出的部分DOM树是这样的：


可以看到，父元素ant-modal-root有哈希值，而子元素ant-modal-footer却没有，但是ant-modal-footer的两个button自元素又有哈希值了（可能是因为ant-modal-footer是我插入的另一个template slot的根元素）

 <template slot="footer">
 	<a-button key="back" @click="handleCancel">取消</a-button>
 	<a-button key="submit" type="primary" :loading="confirmLoading" @click="handleConfirm">修改</a-button>
 </template>

这时候，如果不写deep，而是让scoped自己来的话

.ant-modal-root {
  .ant-modal-footer {
    border-top: 0;
    overflow: hidden;
    padding: 32px;
    padding-top:18px;
  }
}

就会编译出这样的css样式：

 .ant-modal-root .ant-modal-footer[data-v-5cfc4ef6]
1
可是我tm上哪里找有data-v-5cfc4ef6属性的ant-modal-footer…

写上deep：

.ant-modal-root {
  /deep/.ant-modal-footer {
    border-top: 0;
    overflow: hidden;
    padding: 32px;
    padding-top:18px;
  }
}

就编译成了：

 .ant-modal-root[data-v-5cfc4ef6] .ant-modal-footer
1
这下就能选中了。

总结
用到第三方组件的时候，经常会自己定义插槽slot来替换原组件里的内容，这时候就很容易遇到要手动用/deep/的问题。遇到这类问题的时候，不要盲目地用!important来提高优先级（这样不管用），甚至不加scoped写样式，或者直接通过import .less 引入外部样式来污染全局了（这样会有副作用）
————————————————
版权声明：本文为CSDN博主「JohnKeatinghhh」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_41604040/article/details/111054616