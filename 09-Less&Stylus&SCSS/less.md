####  注释
- 以 **//** 开头的注释，不会被编译到 css 文件中
- 以 **/** * * **/** 包裹的注释会被编译到 css 文件中

####  变量
使用 **@** 来声明一个变量：`@pink:pink;` 

- 作为普通属性值直接使用：例：`background: @pink;`
- 作为选择器和属性名：`#@{selector的值}的形式`
- 作为URL：`@{url}`
- 变量的延迟加载：等作用域中的所有东西解析完，再进行变量加载
- 块级作用域

```javascript
//less
@var: 0;
.class {
@var: 1;
	.brass {
		@var: 2;
		three: @var; // 3
		@var: 3;
	}
	one: @var; // 1
}
//css
.class {
	one: 1;
}

.class .brass {
	three: 3;
}

```

####  嵌套规则
- 基本嵌套规则：父子集关系
- **&** 的使用：平级关系

```javascript
//css
.class{ }
.class .bro:hover { }

//less
.class{
	.bro { }
	&:hover { } 
}
```

####  混合
混合就是将一系列属性从一个规则集引入到另一个规则集的方式

- 普通混合：混合会编译到 css 文件中
- 不带输出的混合：`.class():{}`，该混合不会编译到 css 文件中
- 带参数的混合：`.class(@w, @h, @c):{}`
- 带参数且有默认值的混合：`.class(@w: 10px, @h: 10px, @c: pink):{}`
- 带多个参数的混合
- 命名参数：`.class(@h: 10px, @c: pink):{}`
- 匹配模式

```javascript
//在调用同名混合时，参数为 @_ 的混合会自动被调用
.triangle(@_, @w, @c){
    width: 0px;
    height: 0px;
    overflow: hidden; 
}

.triangle(L,@w,@c){
    border-width: @w;
    border-style:dashed solid dashed dashed;
    border-color:transparent @c transparent transparent ;
}
```

- arguments 变量

####  计算
- 加减乘除，一方带单位即可

####  继承
- 性能比混合高
- 灵活度比混合低

```javascript
//less
.class {
	position: absolute;
	left: 0;
	right: 0;
	top: 0
	bottom: 0;
	margin: auto;
}

#wrap {
	position: relative;
	.inner {
		&:extend(.class);
		&:nth-child(1) {}
		&:nth-child(2) {}
	}
}

//css
.class,
#wrap .inner,
#wrap .inner:nth-child(1),
#wrap .inner:nth-child(2) {
	position: absolute;
	left: 0;
	right: 0;
	top: 0
	bottom: 0;
	margin: auto;
}
#wrap {
	position: relative;
}
.inner:nth-child(1) {}
.inner:nth-child(2) {}
```

- `all`：将继承所有的状态

```javascript
//less
.class {
	position: absolute;
	left: 0;
	right: 0;
	top: 0
	bottom: 0;
	margin: auto;
}
.class:hover {}

#wrap {
	position: relative;
	.inner {
		&:extend(.class all);
		&:nth-child(1) {}
		&:nth-child(2) {}
	}
}

//css
.class,
#wrap .inner,
#wrap .inner:nth-child(1),
#wrap .inner:nth-child(2) {
	position: absolute;
	left: 0;
	right: 0;
	top: 0
	bottom: 0;
	margin: auto;
}

.class:hover,
#wrap .inner:hover {}

#wrap {
	position: relative;
}
.inner:nth-child(1) {}
.inner:nth-child(2) {}
```

####  避免编译
- **~" "**：避免编译，留给浏览器进行计算

```javascript
.class {
	padding: ~"cal(100px + 100)";
}
```