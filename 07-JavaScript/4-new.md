##  new

- 首先创建一个空的对象，空对象的`__proto__`属性指向构造函数的原型对象
- 把上面创建的空对象赋值构造函数内部的 this，用构造函数内部的方法修改空对象
- 如果构造函数返回一个非基本类型的值，则返回这个值，否则上面创建的对象

```javascript
function _new (func, ...args) {
    let obj = {};
    // 将空对象指向构造函数的原型链
    Object.setPrototypeOf(obj, func.prototype);
    // obj 绑定到构造函数上，便可以访问构造函数中的属性
    let result = func.apply(obj, args);
    // 如果返回的 result 是一个对象则返回该对象，new 方法失效，则返回 obj
    return result instanceof Object ? result : obj;
}
```

![image-20210215210341281](D:\资料\lecture-notes\7-JavaScript\image\image-20210215210341281.png)





