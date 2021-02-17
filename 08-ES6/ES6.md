## ES6
####  let
- 与 var 类似，用于声明一个变量
- 特点：
  1. 在块作用域内有效
  2. 不能重复声明
  3. 不会预处理，不存在变量提升
- 应用：循环遍历加监听

####  const
- 作用：定义一个常量
- 特点：
  1. 不能修改
  2. 在块作用域内有效
  3. 不能重复声明
  4. 不会预处理，不存在变量提升
- 应用：保存不用改变的数据

####  变量的解构赋值
- 从对象或数组中提取数据，并赋值给变量（多个）
- 对象的解构赋值

```javascript
let obj = {username: 'danny', age: 20};
let {username, age} = obj;
//或
let {username, age} = {username: 'danny', age: 20};
```

- 数组的解构赋值

```javascript
let arr = [1, 3, 5, 'abc', true];
let [a, b] = arr;
console.log(a, b); //1, 3
let [, , c, d] = arr;
console.log(c, d); //5, 'abc'
```
- 给多个形参赋值

```javascript
function foo({username, age}) { //{username, age} = obj
	console.log(username, age);
}
```

####  模板字符串
- 简化字符串的拼接
- 模板字符串必须用 **\` \`** 包含
- 变化的部分使用 `${xxx}`

```javascript
let obj = {username: 'danny', age: 30};
let str = `名字：${obj.username},年龄：${obj.age}`;
console.log(str); //名字：danny,年龄：30
```

####  简化的对象写法

```javascript
let username = 'danny';
let age = 30;
let obj = {
	username, // 同名的属性可以省略不写
	age,
	getName() { // 可以省略函数的 function
		return this.username;
	}
};
console.log(obj.getName()); // danny
```

####  箭头函数
- 作用：定义匿名函数
- 基本语法：
  1. 没有参数： `() => console.log('xxx');`
  2. 一个参数：`i => i + 2;` （括号可以省略）
  3. 大于一个参数：`(i, j) => i + j;` （括号不能省略）
  4. 函数体不用大括号：默认返回结果
  5. 函数体如果有多个语句，需要用 **{ }** 包围，若有需要返回的内容，需要手动返回
 - 使用场景：多用来定义回调函数 
 - 特点：
   1. 简洁
   2. 箭头函数没有自己的 this ，箭头函数的 this 不是调用的时候决定的，而是在定义的时候所处的对象就是它的 this 
   3. 扩展理解：箭头函数的 this 看外层的是否有函数
   4.  如果有，外层函数的 this 就是内部箭头函数的 this
   5.  如果没有，则 this 是 window

####  三点运算符
- **rest** （可变）参数
  - 用来取代 arguments，但比 arguments 灵活，只能放在最后部分收集形参参数

```javascript
function foo(a, ...value) {
	console.log(arguments);
	console.log(value);
}
foo(2,65,33,44); //value的值是{65， 33， 44}
```

- 扩展运算符：可以分解出数组或对象中的数据

```javascript
let arr = [2,3,4,5];
console.log(...arr); // 2,3,4,5
```

####  形参默认值
- 当不传入参数的时候，默认使用形参里的默认值

```javascript
function Point(x = 1, y = 2){
	this.x = x;
	this.y = y;
}
```

####  Promise 对象
- 理解：
  1. 代表了未来某个将要发生的事件
  2. Promise 对象，可以将异步操作以同步的流程表达出来，避免了层层嵌套的回调函数 
  3. ES6 的 Promise 是一个构造函数，用来生成 promise 实例  
- 使用 promise 基本步骤
  -  [Promise 的具体内容](https://blog.csdn.net/Persiguiendo/article/details/107002563)



####  Symbol
- ES6中添加了一种原始数据类型
- 已有原始数据类型：String、Number、Boolean、null、undefined、对象
- 特点：
  1. Symbol 属性对应的值是唯一的，解决命名冲突问题
  2. Symbol 值不能与其他数据进行计算，包括同字符串拼串
  3. `for in`、`for of` 遍历时，不会遍历 Symbol 属性

- 使用：
  1. 调用 Symbol 函数得到 symbol 值
  2. 传参标识
  3. 内置 Symbol 值（除了定义自己使用的 Symbol 值以外，ES6还提供了11个内置的 Symbol 值，指向语言内部使用的方法。`Symbol.iterator`属性）

```javascript
//1. 
let symbol1 = Symbol();
let obj = {};
obj[symbol] = 'hello';

//2. 
let symbol1 = Symbol('one');
let symbol2 = Symbol('two');
console.log(symbol1, symbol2); //Symbol(one) Symbol(two)
```

####  Iterator 遍历器
- 概念：iterator 是一种接口机制，为各种不同的数据结构提供统一的访问机制
- 作用：
  1. 为各种数据结构提供统一的、简便的访问接口
  2. 使得数据结构的成员能够按某种次序排列
  3.  ES6创造了一种新的遍历命令 `for ... of` 循环，Iterator 接口主要供 `for...of` 消费

- 工作原理：
  1. 创建一个指针对象（遍历器对象），指向数据结构的起始位置
  2. 通过不断调用 next 方法，指针会一直往后移动，直到指向最后一个成员
  3.  每调用 next 方法，返回的是一个包含 value 和 done 的对象：`{value:当前成员的值, done: 布尔值}`
  4. done 对应的布尔值表示当前的数据结构是否遍历结束
  5. 当遍历结束时，value 的值是 `undefined`， done 的值为 `false`	

- 原生具备 iterator接口的数据可用 `value of` 遍历
- 扩展理解：
  1. 当数据结构上部署了 `Symbol.iterator` 接口，该数据就可以用 for of 遍历
  2. 当使用 for of 去遍历目标数据的时候，该数据会自动去找 `Symbol.iterator` 属性
  3. 数组、字符串、arguments、set 容器、map 容器

```javascript
//模拟指针对象（遍历器对象）
function myIterator() { //iterator接口
	let nextIndex = 0; 
	return {
		next: function () {
			return nextIndex < arr.length ? {
				value: arr[nextIndex++], done: false}:{	
				value: undefined, done: true }
		}
	}
}

let arr = [1, 4, 65, 'abc'];
let iteratorObj = myIterator(arr);
iteratorObj.next();
```

```javascript
for (let key of arr){
	console.log(key);
}
```
- 部署 iterator 接口

```javascript
//当使用 for of 去遍历某一个数据结构的时候
//首先去找 Symbol.iterator ，找到了就去遍历，没有找到不能遍历，'xxx is not iterable'
let targetData = {
	[Symbol.iterator]: function () {
		let nextIndex = 0; 
		return {
			next: function () {
				return nextIndex < arr.length ? {
					value: arr[nextIndex++],done: false}:{
					value: undefined,done: true }
		}
	}
}
```

- 使用三点运算符、解构赋值，默认调用 iterator 接口

####  Generator 函数
- 概念
  1. ES6 提供的解决异步编程的方案之一
  2. Generator 函数是一个状态机，内部封装了不同状态的数据
  3. 用来生成遍历器对象
  4. 可暂停函数（惰性求值）。yield 可暂停，next 方法可启动，每次返回的是 yield 后的表达式结果

- 特点
   1. function 与函数名之间有一个星号
   2. 内部用 yield 表达式来定义不同的状态
   3. 例如：
   
```javascript
function* myGenertor() {
	console.log('开始执行');
	yield 'hello';
	console.log('暂停后，再次执行');
	yield 'generator';
	console.log('遍历完毕');
	return '返回的结果'; // 如果不写return，会返回默认的 undefined
}

let MG = myGenerator();
console.log(MG.next()); // 开始执行 {value: 'hello', done: false}
console.log(MG.next()); // 暂停后，再次执行 {value: 'generator', done: false}
console.log(MG.next()); // 遍历完毕 {value: '返回的结果', done: true}
```

```javascript
function* myGenertor() {
	console.log('开始执行');
	let result = yield 'hello';
	console.log(result);
	console.log('暂停后，再次执行');
	yield 'generator';
	console.log('遍历完毕');
	return '返回的结果'; // 如果不写return，会返回默认的 undefined
}

let MG = myGenerator();
console.log(MG.next()); // 开始执行 {value: 'hello', done: false}
						
console.log(MG.next()); // undefined  注: 该返回值result默认为undefined，若该next函数中传入参数，则该参数会作为上一次yield的返回值进行返回
						// 暂停后，再次执行 {value: 'generator', done: false}
console.log(MG.next()); // 遍历完毕 {value: '返回的结果', done: true}
```

- 对象的 Symbol.iterator 属性指向遍历器对象

```javascript
let obj = {usernaem: 'kobe', age: 30};

obj[Symbol.iterator] = function* myTest() {
	yield 1
	yield 2
	yield 3
}

for(let i of obj) {
console.log(i);  //1   2   3
}
```
######  练习
- 需求
  1. 发送 Ajax 请求获取新闻内容
  2. 新闻内容获取成功之后再次发送请求，获取对应的新闻评论内容
  3. 新闻内容获取失败则不需要再次发送请求

```javascript
function getNews(url) {
	$.get(url, function (data) {
    	console.log(data);
        let url = "http://localhost:3000" + data.commentsUrl;
        SX.next(url);
	})
}       
function* sendXml() {
	let url = yield getNews("http://localhost:3000/news?id=3")
    yield getNews(url)
}

let SX = sendXml(); //拿到遍历器对象
SX.next();
```

####  async 函数（源自 ES7）
- 概念：真正意义上去解决异步回调的问题，同步流程表达异步操作
- 本质：Generator 的语法糖
- 语法：

```javascript
async function foo() {
	await 异步操作;
	await 异步操作;
}
```

- 特点：
  1. 不需要像 Generator 去调用 next 方法，遇到 await 等待当前的异步操作完成就往下执行
  2. 返回的总是 Promise 对象，可以用 then 方法进行下一步的操作
  3. async 取代 Generator 函数的星号 `*` ,await 取代 Generator 的 `yield`
  4. 语意上更为明确，使用简单

- 基本使用
```javascript
async function foo() {
	return new Promise(resolve => {
		setTimeout(resolve, 2000);
	})
}
```

- async 里 await 返回值

```javascript
//1. 普通函数,await的返回值就是当前函数的返回值
function test2() {
	return 'xxx';
}

async function asyncPrint() {
	let result = await test2();
	console.log(result);
}

asyncPrint(); //xxx

//2. Promise 对象,await的返回值是resolve()中传入的参数
async function asyncPromisePrint() {
	let result = await Promise.resolve('promise');
	console.log(result);
}

asyncPromisePrint(); //promise
```

- 练习采用 await 进行编写

```javascript
async function getNews(url) {
	return new Promise(resolve, reject) => {
		$.ajax({
			method: 'GET',
			url,
			sucess: data => resolve(data),
			error: error => reject(false)
		})
	})
}

async function sendXml() {
	let result = await getNews('http://localhost:3000/new?id=3');
	if(!result){alert('暂时没有新闻推送');return;}
	result = await getNews('http://localhost:3000' + result.commentsUrl);
	
	console.log(result);
}
```

####  class
- 通过 class 定义类/实现类的继承
- 在类中通过 constructor 定义构造方法
- 通过 new 来创建类的实例
- 通过 extends 来实现类的继承
- 通过 super 调用父类的构造方法
- 重写从父类中继承的一般方法

```javascript
//定义一个人物类
class Person {
	// 类的构造方法
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	//类的一般方法(注：必须用对象的简写方式，省略function)
	showName() {
		console.log(this.name);
	}
}

let person = new Person('kobe', 30);
console.log(person);
person.showName();

//子类
class StarPerson extends Person {
	constructor(name, age, salary) {
		super(name, age); //调用父类的构造方法
		this.salary = salary;
	}
	//父类方法重写
	showName() {
		console.log(this.name, this.age, this.salary);
	}
}

let person1 = new StarPerson('bob', 20, 1000);
console.log(person1);
person1.showName();
```

####  字符串扩展
- `includes(str)`：判断是否包含指定的字符串
- `startWith(str)`：判断是否以指定的字符串开头
- `endWith(str)`：判断是否以指定的字符串结尾
- `repeat(count)`：重复指定次数

####  数值的扩展
- 二进制与八进制的数值表示法：二进制用 `0b`，八进制用 `0o`
- `Number.isFinite(i)`：判断是否是有限大的数
- `Number.isNaN(i)`：判断时候是NaN
- `Number.isInteger(i)`：判断时候是整数
- `Number.parseInt(str)`：将字符串转换为对应的数值
- `Math.trunc(i)`：直接去除小数部分

```javascript
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isInteger(123.0)); // true
console.log(Number.parseInt('a123sdjhd')); // NaN
console.log(Number.parseInt('123sdjhdsd3')); // 123
console.log(Math.trunc(123.123)); //123
```

####  数组的扩展
- `Array.from(v)`：将伪数组对象或可遍历对象转换为真数组
- `Array.of(v1, v2, v3)`：将一系列值转换为数组
- `find(function(value, index, arr){return true})`：找出第一个满足条件返回 true 的元素
- `findIndex(function(value, index, arr){return true})`：找出第一个满足条件返回 true 的元素下标

```javascript
let arr = [2,3,4,5,4,3];
let result = arr.find(function (item, index) {
	return item > 4; 
}
console.log(result); // 5
```

####  对象的扩展
- `Object.is(v1, v2)`：判断两个数据是否完全相等（以字符串进行判断）
- `Object.assign(target, source1, source2, ...)`：将源对象的属性复制到目标对象上
- 直接操作 `__proto__` 属性 

```javascript
console.log(0 == -0); // true
console.log(NaN == NaN); //false
console.log(Object.is(0, -0)); // false
console.log(Object.is(NaN, NaN)); true

let obj = {};
let obj1 = {username: 'bob', age: 23};
let obj2 = {sex: 'boy'};
Object.assign(obj, obj1, obj2);
console.log(obj); // {username: 'bob', age: 23, sex: 'boy'}

let obj3 = {};
let obj4 = {key: 2};
obj3.__proto__ = obj4;
console.log(obj3.key); // 2
```

####  深度克隆
- 拷贝数据
  1. 基本数据类型：拷贝后生成一份新的数据，修改拷贝以后的数据不会影响原数据
  2. 对象/数组：拷贝后不会生成新的数据，而是拷贝引用，修改拷贝以后的数据会影响原有的数据

- 拷贝数据的方法
  1.  直接赋值给一个变量：浅拷贝
  2. `Object.assign()`：浅拷贝
  3. `Array.prototype.concat()`：浅拷贝
  4. `Array.prototype.splice()`：浅拷贝
  5. `JSON.parse(JSON.stringify)`：深拷贝（深度克隆），拷贝的数据里边不能有函数

- 浅拷贝（对象/数组）：拷贝引用，修改拷贝以后的数据会修改原数据
- 深拷贝（深度克隆）：拷贝的时候生成新的数据，修改拷贝以后的数据不会影响原数据

> 1. 如何让判断数据类型：arr ---> Array、null ---> Null
> typeof 返回的数据类型：String、Number、Boolean、Undefined、Object、Function
> `Object.prototype.toString.call(obj)`
> 2. for in 循环中，循环对象返回的是属性名，循环数组返回的是下标

```javascript
// 定义检测数据类型的功能函数
function checkedType(target) {
	return Object.prototype.toString.call(target).slice(8, -1);
}

// 实现深度克隆 ---> 对象/数组
function clone(target) {
	//判断拷贝的数据类型
	//初始化变量result成为最终克隆的数据
	let result, targetType = checkedType(target);
	if(targetType === 'Object'){
		result = {};
	} else if (targetType === 'Array') {
		result = [];
	} else {
		return target;
	}
	
	// 遍历目标数据
	for(let i in target) {
		// 获取遍历数据结构的每一项值 
		let value = target[i];
		// 判断目标结构里的每一个值是否存在对象/数组
		if(checkedType(value) === 'Object' || checkedType(value) === 'Array'){
			result[i] = clone(value);
		} else {
			result[i] = value;
		}
		
	}
	return result;
}

let arr3 = [1, 2, {username: 'bo', age: 33}];
let arr4 = clone(arr3);
arr4[2].username = 'wea';
console.log(arr3, arr4);
```

####  set、map
- set 容器：无序不可重复的多个 value 的集合体
  1. `Set()`
  2. `Set(Array)`
  3. `add(value)、delete(value)、has(value)、clear()、size`

- map 容器：无序的 key 不重复的多个 key-value 的集合体
  1. `Map()`
  2. `Map(Array)`
  3. `set([[key, value],[key, value]])、get(key)、delete(key)、has(key)、clear()、size`

####  for of
- 遍历数组
- 遍历 Set
- 遍历 Map
- 遍历字符串
- 遍历伪数组

##  ES7
- `**`：指数运算符
- `Array.prototype.includes(value)`：判断数组中是否包含指定 value