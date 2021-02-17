## JS 识别不同浏览器信息

```js
function myBrowser() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {                                      //判断是否Opera浏览器
    return "Opera"     
  };   
  if (userAgent.indexOf("Firefox") > -1) {            //判断是否Firefox浏览器 
    return "Firefox";
  }   
  if (userAgent.indexOf("Chrome") > -1) {             //判断是否Chrome浏览器  
    return "Chrome";
  }   
  if (userAgent.indexOf("Safari") > -1) {             //判断是否Safari浏览器  
    return "Safari";
  } 
  if (userAgent.indexOf("compatible") > -1            //判断是否IE浏览器
      && userAgent.indexOf("MSIE") > -1 
      && !isOpera) {                                                       
    return "IE";
  };  
} 
```
