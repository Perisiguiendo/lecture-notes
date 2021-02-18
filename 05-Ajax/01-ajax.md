## Ajax

Ajax即“Asynchronous Javascript And XML”，是指一种创建交互式网页应用的网页开发技术。

Ajax是一种用于创建快速动态网页的技术。它可以令开发者只向服务器获取数据（而不是图片，HTML文档等资源），互联网资源的传输变得前所未有的轻量级和纯粹，这激发了广大开发者的创造力，使各式各样功能强大的网络站点，和互联网应用如雨后春笋一般冒出，不断带给人惊喜。

![img](https://user-gold-cdn.xitu.io/2018/12/24/167e05bddfd8dce9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 什么是Ajax

Ajax是一种异步请求数据的web开发技术，对于改善用户的体验和页面性能很有帮助。

简单地说，在不需要重新刷新页面的情况下，Ajax 通过异步请求加载后台数据，并在网页上呈现出来。

**Ajax的目的是提高用户体验，较少网络数据的传输量。**

同时，由于AJAX请求获取的是**数据**而不是HTML文档，因此它也节省了网络带宽，让互联网用户的网络冲浪体验变得更加顺畅。

### Ajax应用场景

- 页面上拉加载更多数据
- 列表数据无刷新分页
- 表单项离开焦点数据验证
- 搜索框提示文字下拉列表

###  运行环境

- Ajax技术需要运行在**网站环境**中才能生效
- Node创建服务器，实现静态资源访问功能

```javascript
//引入express框架
const express = require('express');
//路径处理模块
const path = require('path');
//创建web服务器
const app = express();
//静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
//监听端口
app.listen(3000);
//控制台提示输出
console.log('服务器启动成功');
```

###  Ajax 运行原理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200701084251889.png)



### Ajax的使用

#### 1. 创建Ajax核心对象XMLHttpRequest(记得考虑兼容性)

```js
var xhr=null;  
if (window.XMLHttpRequest)    // 兼容 IE7+, Firefox, Chrome, Opera, Safari  
{
    xhr=new XMLHttpRequest();  
} else{                       // 兼容 IE6, IE5 
    xhr=new ActiveXObject("Microsoft.XMLHTTP");  
} 
```

#### 2. 向服务器发送请求

```js
xhr.open(method, url, async);  
send(string);                 //post请求时才使用字符串参数，否则不用带参数
```

- method：请求的类型（GET 或 POST）
- url：文件在服务器上的位置
- async：true（异步）或 false（同步） 
  - **注意：post请求一定要设置请求头的格式内容**

```js
xhr.open("POST","test.html",true);  
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
xhr.send("fname=Henry&lname=Ford");    //post请求参数放在send里面，即请求体
```

####  3. 请求参数传递

- GET请求

```javascript
xhr.open('get', 'http://www.example.com?name=XXX&age=20');
```

- POST请求

```javascript
xhr.setRequestHeader('Context-Type', 'application/x-www-form-urlencoded');
xhr.send('name=XXX&age=20');
```

####  4. 运行原理及实现

- 请求报文：在HTTP请求和响应的过程中传递的数据块就是`报文`，包括要传送的数据和一些附加信息，这些数据和信息要遵守规定好的格式

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200701114724286.png)

- 请求参数的格式：`application/x-www-form-urlencoded` 或 `application/json`
- 将JSON对象转换为JSON字符串

#### 5. 服务器响应处理（区分同步跟异步两种情况）

responseText 获得字符串形式的响应数据。

responseXML 获得XML 形式的响应数据。

##### ① 同步处理

```js
xhr.open("GET","info.txt",false);  
xhr.send();  
console.log( xhr.responseText );       //获取数据直接显示在页面上
```

##### ② 异步处理

相对来说比较复杂，要在请求状态改变事件中处理。

```js
xhr.onreadystatechange=function()  { 
    if (xhr.readyState == 4 && xhr.status == 200)  {
        console.log( xhr.responseText );   
    }
} 
```

##### ③ GET和POST请求数据区别

- 使用Get请求时,参数在URL中显示,而使用post方式,则放在send里面
- 使用Get请求发送数据量小,post请求发送数据量大
- 使用Get请求安全性低，会被缓存，而post请求反之 关于第一点区别

####  服务器端响应的数据格式

- 服务器端大多数情况下会以JSON对象作为响应数据的格式
- 当客户端拿到响应数据时，要将JSO数据和HTML字符进行拼接，然后将拼接的结果展示在页面中
- 在 http 请求与响应的过程中，无论时请求还是响应内容，如果是对象类型，最终都会被转换成对象字符串进行传输
- json 字符串转换为 json 对象

#### readyState

readyState是XMLHttpRequest对象的一个属性，用来标识当前XMLHttpRequest对象处于什么状态。 readyState总共有5个状态值，分别为0~4，每个值代表了不同的含义

- 0：未初始化 -- 尚未调用.open()方法；
- 1：启动 -- 已经调用.open()方法，但尚未调用.send()方法；
- 2：发送 -- 已经调用.send()方法，但尚未接收到响应；
- 3：接收 -- 已经接收到部分响应数据；
- 4：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；

####  获取 Ajax 状态码

- 获取 Ajax 状态码 `xhr.readyState()`
- onreadystatechange 事件：当 `Ajax状态码` 发生变化时将自动触发该事件

####  两种方式的比较

| 区别                     | onload 事件 | onreadystatechange 事件 |
| ------------------------ | ----------- | ----------------------- |
| 是否兼容 IE 低版本       | 不兼容      | 兼容                    |
| 是否需要判断 Ajax 状态码 | 不需要      | 需要                    |
| 被调用次数               | 一次        | 多次                    |
| 执行效率                 | 高          | 不高                    |

####  Ajax 错误处理

1. 网络畅通，服务器端能接收到请求，服务器端返回的结果不是预期结果

>判断服务器端返回的状态码，分别进行处理
>`xhr.status();//获取http状态码`

2. 网络畅通，服务器端没有接收到请求，返回404状态码

>检查请求地址是否错误

3. 网络畅通，服务器端能接收到请求，服务器端返回500状态码

>服务器端错误

4. 网络中断，请求无法发送到服务器端

>不会触发 `xhr.onload` 事件，会触发 `xhr.onerror` 事件，在 onerror 事件处理函数中对错误进行处理

####  低版本IE浏览器的缓存问题

##### 问题：

在低版本的IE浏览器中，Ajax请求有严重的缓存问题，请求的地址不发生变化的情况下，只有第一次请求会真正发送到服务器，后续的请求都会从浏览器的缓存中获取结果。即使服务器端的数据更新了，客户端拿到的依然是缓存中的旧数据

#### 解决方案：

在请求地址的后面加请求参数，保证每一次请求中的请求参数的值不相同
`xhr.open('get', 'http://www.example.com?t=' + Math.random());`
或者
`xhr.open('get', 'http://www.example.com?t=' + Date.now());`

#### status

HTTP状态码(status)由三个十进制数字组成，第一个十进制数字定义了状态码的类型，后两个数字没有分类的作用。HTTP状态码共分为5种类型：



![img](https://user-gold-cdn.xitu.io/2018/12/18/167c1f4b3eb91833?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



#### 常见的状态码

仅记录在 RFC2616 上的 HTTP 状态码就达 40 种，若再加上 WebDAV（RFC4918、5842）和附加 HTTP 状态码 （RFC6585）等扩展，数量就达 60 余种。接下来，我们就介绍一下这些具有代表性的一些状态码。

- 200 表示从客户端发来的请求在服务器端被正常处理了。
- 204 表示请求处理成功，但没有资源返回。
- 301 表示永久性重定向。该状态码表示请求的资源已被分配了新的URI，以后应使用资源现在所指的URI。
- 302 表示临时性重定向。
- 304 表示客户端发送附带条件的请求时（指采用GET方法的请求报文中包含if-matched,if-modified-since,if-none-match,if-range,if-unmodified-since任一个首部）服务器端允许请求访问资源，但因发生请求未满足条件的情况后，直接返回304Modified（服务器端资源未改变，可直接使用客户端未过期的缓存）
- 400 表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。
- 401 表示未授权（Unauthorized)，当前请求需要用户验证
- 403 表示对请求资源的访问被服务器拒绝了
- 404 表示服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。
- 500 表示服务器端在执行请求时发生了错误。也有可能是Web应用存在的bug或某些临时的故障。
- 503 表示服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。

####  Ajax 封装

- 基本封装函数

```javascript
function ajax(options) {
	//创建Ajax对象
	var xhr = new XMLHttpRequest();
	//配置Ajax对象
	xhr.open(options.type, options.url);
	//发送请求
	xhr.send();
	//监听xhr对象的onload事件
	//当xhr对象接收完响应数据后触发
	xhr.onload = function () {
		optipns.success(xhr.reponseText);
	}
}

ajax({
	type:'get',
	url:'http://www.example.com',
	sucess:function(data){
		console.log(data);
	}
});
```

- 带请求参数的封装函数

>1. 请求参数的位置问题：
>   将请求参数传递到 Ajax 函数内部，在函数内部根据请求方式的不同将请求参数放在不同的位置
>   `注` get：放在请求地址的后面
>   &nbsp; &nbsp; &nbsp; &nbsp;post：放在 `send` 方法中
>2. 请求参数的格式问题
>   `application/x-www-form-urlencoded` ：参数名称=参数值&参数名称=参数值
>   `application/json`：{name: 'zhangsan', age:20}

```javascript
function ajax(options) {
	//存储默认值
	var defaults = {
		type: 'get',
		url: '',
		data: {},
		header: {
			'Content-Typr': 'application/x-www-form-urlencoded'
		},
		sucess: function () {],
		error: function () {} 
	};
	
	//使用options对象中的属性覆盖defaults对象中的属性
	Object.assign(defaluts, options);
	
	//创建Ajax对象
	var xhr = new XMLHttpRequest();
	//拼接请求参数的变量
	var params = '';

	for(var attr in defaults.data) {
		params += attr + '=' + defaults.data[attr] + '&';
	}
	//将参数最后面的&截取掉
	params = params.substr(0, params.length - 1);
	//配置Ajax对象
	xhr.open(defaults.type, defaults.url);
	if(defaults.type == 'post') {
		var contentType = defaults.header['Content-Type'];
		xhr.setRequestHeader('Content-Type', 'appllication/x-wwww-form-urlencoded');
		//判断请求参数的类型
		if(ContentType == 'application/json') {
			xhr.send(JSON.stringify(defaults.data));
		} else {
			xhr.send(params);
		}
	} else {
		xhr.send();
	}
	//发送请求
	xhr.send();
	//监听xhr对象的onload事件
	//当xhr对象接收完响应数据后触发
	xhr.onload = function () {
		var contentType = xhr.getPesponseHeader('Content-Type');
		var reponseText = xhr.reponseText;
		
		if(contentType.includes('application/json')) {
			reponseText = JSON.parse(reponseText);
		}
		
		if(xhr.status == 200) {
			defaults.sucess(xhr.responseText, xhr);
		} else {
			v.error(xhr.reponseText, xhr);
		}
	}
}

ajax({
	type:'get',
	url:'http://www.example.com',
	header: {
		'Content-Type':'x-www-form-unlencoded';
	},
	data: {name: 'zhangsan', age: 20},
	sucess:function(data, xhr){
		console.log(data);
	},
	error:function(data, xhr){
		
	}
});
```

####  优缺点

- 优点
  1.   可以无需刷新页面与服务器端进行通信
  2.   允许根据用户事件来更新部分页面内容

- 缺点
  1. 没有浏览历史，不能回退
  2. 存在跨域问题（同源）
  3. SEO 不友好

####  超时与网络异常

```javascript
const xhr = new XMLHttpRequest();
// 超时设置
xhr.timeout = 2000;
// 超时回调
xhr.ontimeout = function () {
	alert("网络异常，请稍后重试！！");
}
// 网络异常回调
xhr.onerror = function () {
	alert("你的网络似乎出现了问题")
}
xhr.open('GET', 'http:127.0.0.1:8000/delay');
xhr.send();
xhr.onreadystatechange = function () {
	if(xhr.readyState === 4) {
		if(xhr.status >= 200 && xhr.status < 300){
			// ....
		}
	}
}
```

####  取消请求

```javascript
// 调用 abort 方法
let xhr = new XMLHttpRequest();
xhr.open('GET', 'http:127.0.0.1:8000/delay');
xhr.send();
xhr.abort();
```

####  请求重复发送问题

```javascript
// 调用 abort 方法
const btns = document.querySelectorAll('button');
let isSending = false;
let xhr = null;
btns[0].onclick = function () {
	if(isSending) xhr.abort();
	let xhr = new XMLHttpRequest();
	isSending = true;
	xhr.open('GET', 'http:127.0.0.1:8000/delay');
	xhr.send();
	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4) {
			isSending = false;
			if(xhr.status >= 200 && xhr.status < 300){
				// ....
			}
		}
	}
}
```

####  jQuery 通用方法

```javascript
$.ajax({
	url: 'http:127.0.0.1:8000/delay',
	data: {a:100, b:200},
	type: 'GET',
	dataType: 'json',
	sucess: function (data) {
		console.log(data);
	}
	timeout: 2000,
	error: function () {
		console.log('出错了');
	}
})
```

####  Axios 发送 Ajax 请求

```javascript
// 1.get请求
axios.get('/axios-server', {
	//url参数
	params: {
		id: 100,
		vip: 7
	},
	//请求头信息
	headers: {
		name: 'xxx',
		age: 20
	}	
}).then(value => {
	console.log(value);
})

// 2.post请求
axios.post('/axios-server', {
	username: 'admin',
	password: 'admin'
	}, {
		// url参数
		params: {
			id: 100,
			vip: 9
		},
		// 请求头参数
		headers: {
			name: 'xxx',
			age: 20
		}
	}
})

// 3.通用方法
axios({
	method: 'POST',
	url: 'axios/server',
	// url参数
	params: {
		vip: 10,
		level: 20
	}
	// 请求头
	headers: {
	a: 100,
	b: 200
	},
	// 请求体
	data: {
		uername: 'admin',
		password: 'admin'
	}
}).then(response => {
	// 响应状态码
	console.log(response.status);
	// 响应字符串
	console.log(response.statusText);
	// 响应头信息
	console.log(response.headers);
	// 响应体
	console.log(response.data);
})
```

####  fetch 函数发送 Ajax 请求

```javascript
fetch('http://127.0.0.1:8000/fetch-server?vip=10', {
	method: 'POST',
	headers: {
		name: 'xxx'
	},
	body: 'username=admin&password=admin'
}).then(response => {
	return response.text();
}).then(response => {
	console.log(response);
})
```

####  跨域

#####  1. 同源策略

- 同源： **协议**、**域名**、**端口号**必须完全相同
- 违背同源策略就是跨域

#####  2. 解决方法

- JSONP
- CORS


####  JSONP

- JSONP（JSON with Padding），是一个非官方的跨域解决方案，只支持 get 请求
- 网页中，有一些标签天生具有跨域能力，比如 img、link、iframe、script，JSONP 就是利用 script 标签的跨域能力来发送请求
- 使用
  1. 动态创建一个 script 标签
     `var script = document.createElement("script");`
  2. 设置 script 的 src，设置回调函数
     `script.src = "http://localhost:3000/testAjax?callback=abc";`
  3. 将 script 插入到文档中
     `document.body.appendChild(script);`
  4. 服务器中路由的处理

```javascript
 router.get("/testAJAX" , function (req , res) {
	console.log("收到请求");
	var callback = req.query.callback;
	var obj = { 
		name:"孙悟空", 
		age:18
	}
	res.send(callback+"("+JSON.stringify(obj)+")");
});
```

- jQuery 发送 JSONP 请求

```javascript
$('button').eq(0).click(function () {
	$.getJSON('http://127.0.0.1:8000/jsonp-server?callback=?', function (data) {
		console.log(data);
	})
})
```

####  CORS

- CORS（Cross-Origin Resource Sharing），跨域资源共享
- CORS 是官方的跨域解决方案，特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 请求和 post 请求。跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源
- 工作方式：CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行
- 使用：主要是服务器端的设置

```js
router.get("/testAJAX" , function (req , res) {
	// 通过 res 来设置响应头，来允许跨域请求
	// res.set("Access-Control-Allow-Origin","http://127.0.0.1:3000");
	res.set("Access-Control-Allow-Origin","*");
	res.send("testAJAX 返回的响应");
})
```

