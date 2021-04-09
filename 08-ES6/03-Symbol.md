## Symbol

### 概念

是一种数据类型; 不能 **new**，因为Symbol是一个**原始类型的值**，不是对象。

### 定义方法

可以传参

```javascript
// 无参数
let s1 = Symbol();
let s2 = Symbol();
console.log(s1 === s2);    // false
// 有参数
let s1 = Symbol("foo");
let s2 = Symbol("foo");
console.log(s1 === s2);    // false
```

### 用法

- 不能与其他类型的值进行运算
- 作为属性名

```javascript
let mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol]     // "Hello!"
```

- 作为对象属性名时，不能用点运算符,可以用`[]`

```javascript
let a = {};
let name = Symbol();
a.name = 'lili';
a[name] = 'lucy';
console.log(a.name,a[name]); 
```

- 遍历不会被`for...in`、`for...of`和`Object.keys()`、`Object.getOwnPropertyNames()`取到该属性

### Symbol.for

- 定义：在全局中搜索有没有以该参数作为名称的Symbol值，如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值

```javascript
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true
```

### Symbol.keyFor

- 定义：返回一个已登记的Symbol类型值的key

```javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1)              // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2)              // undefined 
```

## 