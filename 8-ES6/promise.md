#### ES6的箭头函数

```javascript
var func = function(a, b) {
	reutrn a + b;
}
//箭头函数
var func = (a, b) => {
	return a + b;
}
```
#### ES6异步解决方案

- JS中经常遇到异步任务，如：`dom`事件、`Ajax`通信、计时器
- 异步任务通常会使用回调模式（callback）处理
- 回调模式至少会遇到两个问题：没有统一的标准、容易陷入回调地狱
- promise A+规范，形成了统一的异步处理模型，它的目的不是消除回调，而是让异步任务中的回调函数规范化，消除回调地狱

#### ES6的异步处理模型

- 两种阶段：`unsettled`（未决）、`settled`（已决）
- 三种状态：`pending`（挂起）、`resolved`（完成）、`rejected`（失败）
- 关系图
![关系图](https://img-blog.csdnimg.cn/20200628165025174.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BlcnNpZ3VpZW5kbw==,size_16,color_FFFFFF,t_70)
####  阶段和状态的关系
1. 未决阶段

- 任务处于 `pending` 挂起状态
- 未决阶段表示任务正在进行中，但还未完成

2. 已决阶段

- `resolved` 表示任务正常完成
- `rejected` 表示任务出现了错误的情况

####  阶段的转换
- 任务开始时，始终是未决阶段
- 状态和阶段的变化是不可逆的
- 转换图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628165755158.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BlcnNpZ3VpZW5kbw==,size_16,color_FFFFFF,t_70)
####  任务完成后附带的数据
- 任务从未决到已决，可能会附带一些数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628170214503.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BlcnNpZ3VpZW5kbw==,size_16,color_FFFFFF,t_70)
#### 任务的后续处理
- 针对 `resolved` 的后续处理称为` thenable`
- 针对`rejected` 的后续处理称为 `catchable`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628170631112.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1BlcnNpZ3VpZW5kbw==,size_16,color_FFFFFF,t_70)
####  Promise的基本使用
- promise 是一个构造函数，通过 `new Promise()` 可以创建一个任务对象，构造函数的参数是一个函数，用于处理未决阶段的事务，该函数的执行是立即同步执行的。在函数中，可以通过两个参数自主的在合适的时候将任务推向已决阶段
```javascript
var pro = new Promise((resolve, reject) => {
	//未决阶段的代码，将立即执行
	//在合适的时候，将任务推向已决
	//resolve(数据): 将任务推向resolved状态，并附加一些数据
	//reject(数据): 将任务推向rejected状态，并附加一些数据
});
```
###### 注：
- 任务一旦进入已决后，所有企图改变任务状态的代码都将失效

```javascript
var pro = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('finish');  //任务成功
		console.log(123);
		reject('over');     //任务失败
		console.log(0);
	}, 3000);
});
//任务进入已决后，reject无法改变任务状态，是无效的，接下来的代码还是按顺序执行
```
`输出结果：123 0`

- 导致任务到达 `rejected` 状态：调用 `reject` 、代码执行报错、抛出错误

- 拿到 `Promise` 对象之后，可以通过 `then` 方法指定后续处理

```javascript
pro.then(thenable, catchable)
//或
pro.then(thenable)
pro.catch(catchable)
```

- 处理后续函数一定是异步调用函数，任务成功之后将后续处理函数放到微队列中
- 执行栈为空时，`微队列`优先进入执行栈

######  例题：
```javascript
var pro = new Promise((resolve, reject) => {
	console.log(1);
	setTimeout(() => {
		console.log(3);
	}, 0);
});
console.log(2);

pro.then(() => {
	console.log(4);
});

console.log(5);
```
`输出结果： 1 2 5 3`

- 由于任务没有执行成功，所以微队列中没有不会有后续处理函数，故没有`4`

```javascript
var pro = new Promise((resolve, reject) => {
	console.log(1);
	setTimeout(() => {
		resolve();
		console.log(3);
	}, 0);
});
console.log(2);

pro.then(() => {
	console.log(4);
});

console.log(5);
```
`输出结果：1 2 5 3 4`

######  解题步骤

|         | 第一步                     | 第二步               | 第三步                       | 第四步                            | 第五步              | 第六步              | 第七步           |
| ------- | -------------------------- | -------------------- | ---------------------------- | --------------------------------- | ------------------- | ------------------- | ---------------- |
| 执行栈  | 全局上下文                 | 全局上下文           | 全局上下文                   | 全局上下文                        | `setTimeout()` 回调 | `setTimeout()` 回调 | `then()`         |
| web api |                            | `setTimeout()` 0秒后 |                              |                                   |                     |                     |                  |
| 宏队列  |                            |                      | `resolve()` `console.log(3)` |                                   |                     |                     |                  |
| 微队列  |                            |                      |                              |                                   | 任务完成 `then()`   |                     |                  |
| 控制台  | 任务开始，`console.log(1)` |                      |                              | `console.log(2)` `console.log(5)` |                     | `console.log(3)`    | `console.log(4)` |


####  Promise的链式调用
```javascript
var pro1 = ...; // pro1 是一个异步任务，它完成后会得到一个数字3

pro1
  .then(n=>{
  	console.log(n); // 输出：3
  	return n * 2;
	})
	.then(n=>{
  	console.log(n); // 输出：6
  	return n * 2;
	})
	.then(n=>{
  	console.log(n); // 输出：12
	})
```