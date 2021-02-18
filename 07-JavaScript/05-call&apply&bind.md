# apply、call、bind

##  比较

call，apply 都属于 Function.prototype 的一个方法，它是 JavaScript 引擎内在实现的，因为属于 Function.prototype，所以每个 Function 对象实例(就是每个方法)都有 call，apply 属性

IE5之前不支持call和apply，bind是ES5出来的

call和apply可以调用函数,改变this,实现继承和借用别的对象的方法

语法：

```javascript
foo.call(this, arg1, arg2, arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3);
foo.bind(this, arg1, arg2, arg3...)
```

- 相同点：三者都是用来改变函数的上下文，也就是`this`指向的
- 不同点：
  - `fn.bind`： 不会立即调用，而是返回一个绑定后的新函数，`this`指向第一个参数，第二个参数是个数组
  - `fn.call`：立即调用，返回函数执行结果，`this`指向第一个参数，后面可有多个参数，并且这些都是`fn`函数的参数
  - `fn.apply`：立即调用，返回函数的执行结果，`this`指向第一个参数，第二个参数是个数组，这个数组里内容是`fn`函数的参数
- bind 传参方式跟 call 方法一致



## 应用场景

- 需要立即调用使用`call`/`apply`
- 要传递的参数不多，则可以使用`fn.call(thisObj, arg1, arg2 ...)`
- 要传递的参数很多，则可以用数组将参数整理好调用`fn.apply(thisObj, [arg1, arg2 ...])`
- 不需要立即执行，而是想生成一个新的函数长期绑定某个函数给某个对象使用，使用`bind`



## 原生实现

### call📝

```javascript
Function.prototype.newCall = function(obj = window){
    obj.fn = this                      //此处this是指调用newCall的function
    let arg = [...arguments].slice(1)  // 处理arguments
    let result = obj.fn(...arg)        // 执行该函数
    delete obj.fn
    return result
}
```

### apply📝

```javascript
Function.prototype.newApply = function (context = window, arr){
    context.fn = this
    let result
    if(!arr){
        result = context.fn()
    } else {
        result = context.fn(...arr)
    }
    delete context.fn
    return result
}
```

### bind📝

```javascript
Function.prototype.myBind = function (object) {
    const self = this;             // 记录this，后需返回普通方法后，this指向调用者
    const [, ...arg] = arguments;  // arguments是参数列表，这是es6的解构语法，拿到除第一个参数以外的参数
    return function () {
        // 下面的arguments是返回的这个方法的arguments，这主要是为了模拟【原bind返回方法可传参】
        self.apply(object, [...arg, ...arguments]);
    }
}
```

##  应用

#### 1. 参数都会排在之后

- 如果你想将某个函数绑定新的`this`指向并且固定先传入几个变量可以在绑定的时候就传入
- 之后调用新函数传入的参数都会排在之后

```javascript
const obj = {}
function test(...args) { console.log(args) }
const newFn = test.bind(obj, '静态参数1', '静态参数2')
newFn('动态参数3', '动态参数4')
```

#### 2. 将伪数组转化为数组

- 含有 length 属性的对象，dom 节点, 函数的参数 arguments

```javascript
// case1: dom节点：
<div class="div1">1</div>
<div class="div1">2</div>
<div class="div1">3</div>

let div = document.getElementsByTagName('div');
console.log(div);              // HTMLCollection(3) [div.div1, div.div1, div.div1] 里面包含length属性
let arr2 = Array.prototype.slice.call(div);
console.log(arr2);             // 数组 [div.div1, div.div1, div.div1]


//case2：fn 内的 arguments
function fn10() {
    return Array.prototype.slice.call(arguments);
}
console.log(fn10(1,2,3,4,5));  // [1, 2, 3, 4, 5]


// case3: 含有 length 属性的对象
let obj4 = {
    0: 1,
    1: 'thomas',
    2: 13,
    length: 3                  // 一定要有length属性
};
console.log(Array.prototype.slice.call(obj4));    // [1, "thomas", 13]
```

#### 3. 间接调用函数，改变作用域的this值 

#### 4. 劫持其他对象的方法

```javascript
var foo = {
  name:"张三",
  logName:function(){
    console.log(this.name);
  }
}
var bar={
  name:"李四"
};
foo.logName.call(bar);     //李四
```

#### 5. 两个函数实现继承

```javascript
function Animal(name){   
  this.name = name;   
  this.showName = function(){   
    console.log(this.name);   
  }   
}   
function Cat(name){  
  Animal.call(this, name);  
}    
var cat = new Cat("Black Cat");   
cat.showName();                 //Black Cat
```

#### 6. 为类数组(arguments和nodeList)添加数组方法push,pop

```javascript
(function(){
  Array.prototype.push.call(arguments,'王五');
  console.log(arguments);       //['张三','李四','王五']
})('张三','李四')
```

#### 7. 合并数组

```javascript
let arr1=[1,2,3]; 
let arr2=[4,5,6]; 
Array.prototype.push.apply(arr1,arr2); //将arr2合并到了arr1中
```

#### 8. 求数组最大值

```javascript
Math.max.apply(null,arr)
```

#### 9. 判断字符类型

```javascript
Object.prototype.toString.call({})
```

### 