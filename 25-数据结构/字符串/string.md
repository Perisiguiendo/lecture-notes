##  js 字符串两边截取空白的 trim 的原型方法的实现

```
// 删除左右两端的空格
function trim(str){
 return str.replace(/(^\s*)|(\s*$)/g, "");
}
// 删除左边的空格 /(^\s*)/g
// 删除右边的空格 /(\s*$)/g
```

