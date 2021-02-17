# 3.数组

数组基本上考察数组方法多一点,所以这里就单纯介绍常见的场景数组的方法,还有很多场景后续补充;
 本文主要从应用来讲数组api的一些骚操作;
 如一行代码扁平化n维数组、数组去重、求数组最大值、数组求和、排序、对象和数组的转化等；
 上面这些应用场景你可以用一行代码实现？

## 3.1 扁平化n维数组

1.终极篇

```
[1,[2,3]].flat(1) //[1,2,3]
[1,[2,3,[4,5]]].flat(2) //[1,2,3,4,5]
[1,[2,3,[4,5]]].toString()  //'1,2,3,4,5'
[1[2,3,[4,5[...]].flat(Infinity) //[1,2,3,4...n]
复制代码
```

Array.flat(n)是ES10扁平数组的api,n表示维度,n值为Infinity时维度为无限大

2.开始篇

```
function flatten(arr) {
    while(arr.some(item=>Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
flatten([1,[2,3]]) //[1,2,3]
flatten([1,[2,3,[4,5]]) //[1,2,3,4,5]
复制代码
```

实质是利用递归和数组合并方法concat实现扁平

## 3.2 去重

1.终极篇

```
Array.from(new Set([1,2,3,3,4,4])) //[1,2,3,4]
[...new Set([1,2,3,3,4,4])] //[1,2,3,4]
复制代码
```

set是ES6新出来的一种一种定义不重复数组的数据类型 Array.from是将类数组转化为数组 ...是扩展运算符,将set里面的值转化为字符串 2.开始篇

```
Array.prototype.distinct = function() {
    const map = {}
    const result = []
    for (const n of this) {
        if (!(n in map)) {
            map[n] = 1
            result.push(n)
        }
    }
    return result
}
[1,2,3,3,4,4].distinct(); //[1,2,3,4]
复制代码
```

取新数组存值,循环两个数组值相比较

## 3.3排序

1.终极篇

```
[1,2,3,4].sort((a, b) => a - b); // [1, 2,3,4],默认是升序
[1,2,3,4].sort((a, b) => b - a); // [4,3,2,1] 降序
复制代码
```

sort是js内置的排序方法,参数为一个函数 2.开始篇 冒泡排序:

```
Array.prototype.bubleSort=function () {
    let arr=this,
        len = arr.length;
    for (let outer = len; outer >= 2; outer--) {
      for (let inner = 0; inner <= outer - 1; inner++) {
        if (arr[inner] > arr[inner + 1]) {
          //升序
          [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]];
          console.log([arr[inner], arr[inner + 1]]);
        }
      }
    }
    return arr;
  }
[1,2,3,4].bubleSort() //[1,2,3,4]    
复制代码
```

选择排序

```
    Array.prototype.selectSort=function () {
        let arr=this,
            len = arr.length;
        for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i, len = arr.length; j < len; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
    return arr;
  }
  [1,2,3,4].selectSort() //[1,2,3,4] 
复制代码
```

## 3.4最大值

1.终极篇

```
Math.max(...[1,2,3,4]) //4
Math.max.apply(this,[1,2,3,4]) //4
[1,2,3,4].reduce( (prev, cur,curIndex,arr)=> {
 return Math.max(prev,cur);
},0) //4
复制代码
```

Math.max()是Math对象内置的方法,参数是字符串; reduce是ES5的数组api,参数有函数和默认初始值; 函数有四个参数,pre(上一次的返回值),cur(当前值),curIndex(当前值索引),arr(当前数组)

2.开始篇 先排序再取值

## 3.5求和

1.终极篇

```
[1,2,3,4].reduce(function (prev, cur) {
   return prev + cur;
 },0) //10 
复制代码
```

2.开始篇

```
function sum(arr) {
  var len = arr.length;
  if(len == 0){
    return 0;
  } else if (len == 1){
    return arr[0];
  } else {
    return arr[0] + sum(arr.slice(1));
  }
}
sum([1,2,3,4]) //10
复制代码
```

利用slice截取改变数组,再利用递归求和

## 3.6合并

1.终极篇

```
[1,2,3,4].concat([5,6]) //[1,2,3,4,5,6]
[...[1,2,3,4],...[4,5]] //[1,2,3,4,5,6]
let arrA = [1, 2], arrB = [3, 4]
Array.prototype.push.apply(arrA, arrB))//arrA值为[1,2,3,4]
复制代码
```

2.开始篇

```
let arr=[1,2,3,4];
  [5,6].map(item=>{
   arr.push(item)
 })
 //arr值为[1,2,3,4,5,6],注意不能直接return出来,return后只会返回[5,6]
复制代码
```

## 3.7判断是否包含值

1.终极篇

```
[1,2,3].includes(4) //false
[1,2,3].indexOf(4) //-1 如果存在换回索引
[1, 2, 3].find((item)=>item===3)) //3 如果数组中无值返回undefined
[1, 2, 3].findIndex((item)=>item===3)) //2 如果数组中无值返回-1
复制代码
```

includes(),find(),findIndex()是ES6的api

2.开始篇

```
[1,2,3].some(item=>{
  return item===3
}) //true 如果不包含返回false
复制代码
```

## 3.8类数组转化

1.终极篇

```
Array.prototype.slice.call(arguments) //arguments是类数组(伪数组)
Array.prototype.slice.apply(arguments)
Array.from(arguments)
[...arguments]
复制代码
```

类数组:表示有length属性,但是不具备数组的方法
 call,apply:是改变slice里面的this指向arguments,所以arguments也可调用数组的方法
 Array.from是将类似数组或可迭代对象创建为数组
 ...是将类数组扩展为字符串,再定义为数组

2.开始篇

```
Array.prototype.slice = function(start,end){  
      var result = new Array();  
      start = start || 0;  
      end = end || this.length; //this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键  
      for(var i = start; i < end; i++){  
           result.push(this[i]);  
      }  
      return result;  
 } 
复制代码
```

## 3.9每一项设置值

1.终极篇

```
[1,2,3].fill(false) //[false,false,false] 
复制代码
```

fill是ES6的方法 2.开始篇

```
[1,2,3].map(() => 0)
复制代码
```

## 3.10每一项是否满足

```
[1,2,3].every(item=>{return item>2}) //false
复制代码
```

every是ES5的api,每一项满足返回 true

## 3.11有一项满足

```
[1,2,3].some(item=>{return item>2}) //true
复制代码
```

some是ES5的api,有一项满足返回 true

## 3.12.过滤数组

```
[1,2,3].filter(item=>{return item>2}) //[3]
复制代码
```

filter是ES5的api,返回满足添加的项的数组

## 3.13对象和数组转化

```
Object.keys({name:'张三',age:14}) //['name','age']
Object.values({name:'张三',age:14}) //['张三',14]
Object.entries({name:'张三',age:14}) //[[name,'张三'],[age,14]]
Object.fromEntries([name,'张三'],[age,14]) //ES10的api,Chrome不支持 , firebox输出{name:'张三',age:14}
复制代码
```

## 3.14 对象数组

```
[{count:1},{count:2},{count:3}].reduce((p, e)=>p+(e.count), 0)
```

作者：火狼1
链接：https://juejin.cn/post/6844903976081555470
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

##  JS 格式化数字（每三位加逗号）

从后往前取。

```
function toThousands(num) {  
    var num = (num || 0).toString(), result = '';  
    while (num.length > 3) {  
        result = ',' + num.slice(-3) + result;  
        num = num.slice(0, num.length - 3);  
    }  
    if (num) { result = num + result; }  
    return result;  
}  
```

------

**合并数组**

如果你需要合并两个数组的话，可以使用 Array.concat()

```
var array1 = [1, 2, 3];
var array2 = [4, 5, 6];
console.log(array1.concat(array2)); // [1,2,3,4,5,6];
```

然而，这个函数并不适用于合并大的数组，因为它需要创建一个新的数组，而这会消耗很多内存。

这时，你可以使用 Array.push.apply(arr1, arr2) 来代替创建新的数组，它可以把第二个数组合并到第一个中，从而较少内存消耗。

```
var array1 = [1, 2, 3];
var array2 = [4, 5, 6];
console.log(array1.push.apply(array1, array2)); // [1, 2, 3, 4, 5, 6]
```

------

**把节点列表 (NodeList) 转换为数组**

如果你运行 document.querySelectorAll("p") 方法，它可能会返回一个 DOM 元素的数组 — 节点列表对象。 但这个对象并不具有数组的全部方法，如 sort()，reduce()， map()，filter()。 为了使用数组的那些方法，你需要把它转换为数组。

只需使用 [].slice.call(elements) 即可实现：

```
var elements = document.querySelectorAll("p"); // NodeList
var arrayElements = [].slice.call(elements); // 现在 NodeList 是一个数组

var arrayElements = Array.from(elements); // 这是另一种转换 NodeList 到 Array  的方法
```

------

**打乱数组元素的顺序**

不适用 Lodash 等这些库打乱数组元素顺序，你可以使用这个技巧：

```
var list = [1, 2, 3];
console.log(list.sort(function() { Math.random() - 0.5 })); // [2, 1, 3]
```

------

