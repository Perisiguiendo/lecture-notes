####  10. [JavaScript]() 原型，原型链？ 有什么特点？ 

 在[JavaScript]()中我们使用构造函数创建一个实例对象时，每个构造函数内部都有一个prototype属性，这个属性是一个对象，即原型对象。实例对象内部的 **proto** 属性指向构造函数的原型对象，并且该原型对象也可看成其他构造函数的实例，这个proto属性链就是原型链。当我们要查找实例对象身上的某个属性及方法时，若该实例对象身上没有，可沿着proto属性一级一级向上找，直至Object.prototype。 

 特点：[JavaScript]()中是利用引用来进行传递的，当我们修改了某一原型的属性时，所有继承都会被修改。 

####  11. js 获取原型的方法？ 

 P.constructor.prototype 

 Object.getPrototypeOf(P) 

 P.**proto** 

####  12. 在 js 中不同进制数字的表示方式 

 0X、0x开头的为16进制 

 0O、0o开头的为8进制 

 0B、0b开头的为2进制 

####  13. js 中整数的安全范围是多少？ 

 安全整数指的是该整数转换为二进制时精度不会丢失。最大值指的是2的53次幂-1，超过安全整数范围在计算时会有误差。在ES6中被定义为Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER。当超过整数范围时会返回infinity。 

####  15. isNaN 和 Number.isNaN 函数的区别？ 

 isNaN接收参数时会尝试将其转化为数值型再判断，因此传入的不能转换为数值的会返回true，但非数值型也会返回true，影响了NaN的判断。 

 Number.isNaN会先判断其是否为Number，然后在进行isNaN判断。判断更为准确。 

####  16. Array 构造函数只有一个参数值时的表现？ 

 Array构造函数只有一个参数值时会让其视为创建数组的长度length值，而非充当一个元素。但创建出来的数组依然是个空数组，但有预设长度值。 

####  17. 其他值到字符串的转换规则？ 

 toString（） 

####  18. 其他值到数字值的转换规则？ 

 undefined返回NaN。 

 null返回0. 

 true返回1，false返回0. 

 字符串类型的值转换为数值型如同利用Number()，若字符串中含有非数字型返回NaN，空字符串返回0. 

####  19. 其他值到布尔类型的值的转换规则？ 

 转换为false的有六种： 

 null、undefined、false、""、NaN、+0、-0 

####  20. {} 和 [] 的 valueOf 和 toString 的结果是什么？ 

 {}的valueOf为{}，toString为[Object Object] 

 []的valueOf为[], toString为“” 

####  21. 什么是假值对象？ 

 在某些情况下，浏览器在一些常规的[JavaScript]()基础上自行创建的一些对象，这些对象强制转换为布尔值时为false，例如document.all为一个伪数组，表示页面中所有元素的数组，由DOM提供给[JavaScript]()使用。 

####  22. ~ 操作符的作用？ 

 ~表示按位取反，~~可以用于取整。 

####  23. 解析字符串中的数字和将字符串强制类型转换为数字的返回结果都是数字，它们之间的区别是什么？ 

 解析字符串中的数字允许含有非数字，例如parseInt解析字符串时会返回开头的数值，若第一个字符为非数字，则返回NaN，而Number（）解析字符串时字符中不能含有不合法字符。否则返回NaN. 

####  24. + 操作符什么时候用于字符串的拼接？ 

 当+操作符前后两个变量至少一个为字符串时，两者用+连接为字符串拼接。若两者都为数字，则会数字加法运算。而除了+以外的其他运算符，只要其中一方为数字，另一方就会转换为数字。 

####  25. 什么情况下会发生布尔值的隐式强制类型转换？ 

 例如在if语句中进行判断时会转换为布尔值，还有while语句。三项表达式。for（ ； ； ）中的第二项。逻辑运算符||和&&进行判断时。 

####  26. || 和 && 操作符的返回值？ 

 首先会对第一项进行布尔值强制类型转换。 

 运用||运算符时，当第一项为true，则直接返回true，当第一项为false，则返回第二项的布尔值 

 运动&&运算符时，当第一项为true，则返回第二项的布尔值，当第一项为false，则直接返回false。 

####  27. Symbol 值的强制类型转换？ 

 symbol值可以进行显性类型转换 但不能进行隐形类型转换 会报错。 

 symbol值不能转换为数值型，但可以转化为布尔值，不管是显性还是隐性都是true。 

####  28. == 操作符的强制类型转换规则？ 

1.  字符串和数值型进行==比较时，将字符串转换为数值型再进行比较。 
2.  其他类型跟布尔值进行比较时，先将布尔值转换为数值型，再进行其他比较。 
3.  NaN和本身取==时为false 
4.  null == undefined 为true 
5.  如果两个操作值都是对象，则需比较两者是否为同一个引用对象。 

####  29. 如何将字符串转化为数字，例如 '12.3b'? 

1.  使用Number（）方法，但前提是所包含的字符串不包含不合法字符。 
2.  parseInt（）方法，取整。 
3.  parseFloat（）方法，浮点数 
4.  隐式类型转换 

####  30. 如何将浮点数点左边的数每三位添加一个逗号，如 12000000.11 转化为『12,000,000.11』? 

 使用正则表达式方法 

```
function format(number){  return number && number.replace(/(\d)(?=(\d{3}+\.))/g, function($1, $2, $3){  return $2 + ',';  }) }
```

 ?=pattern 表示匹配到pattern的开始位置的字符，例如window(?=95|98|2000|xp)，可以匹配到window2000中的window。 

####  31. 常用正则表达式 

####  32. 生成随机数的各种方法？ 

 Math.random() 生成[0, 1) 范围内的随机浮点数。 

####  33. 如何实现数组的随机[排序]()？ 

1.  随机抽取数组元素到新数组中： 

   ```
   function randomsort(arr){  var newarr = [];  while(arr.length > 0){   var index = Math.floor(Math.random()*arr.length);   newarr.push(arr[index]);   arr.splice(index, 1);  }  return newarr; }
   ```

2.  随机交换数组内的元素（洗牌法） 

```
function randomsort(arr){  var temp,  leng = arr.length,  tempindex;  for(var i = 0; i < leng; i++){  tempindex = Math.floor(Math.random()*(leng - i) + i);  temp = arr[i];  arr[i] = arr[tempindex];  arr[tempindex] = temp;  }  return arr; }
```

####  34. javascript 创建对象的几种方式？ 

####  35. [JavaScript]() 继承的几种实现方式？ 

1.  原型链继承：将子构造函数的原型对象指向父构造函数的实例对象，那么子构造函数的实例对象可继承父类上的属性及方法。缺点是创建子类时不能向父类传参，并且父类原型上的所有引用类型可应用到所有实例对象上。 

   ```
   function Father(name, age){  this.name = name;  this.age = age; } Father.prototype.getName = function(){  return this.name; } function Child(skill){  this.skill = skill; } Child.prototype = new Father('zhangsan', 20); var child = new Child('dance'); console.log(child.getName());
   ```

2.  构造函数继承：通过在子类中使用对父构造函数使用call方法来调用，并且修改this指针指向子类，同时可以传递参数。优点：避免了引用类型的属性被所有实例共享，也解决了不能传参的问题。缺点是因为方法都在构造函数中定义了，因此每次创建实例时都要创建一遍方法。 

   ```
   function Father(name, age){  this.name = name;  this.age = age;  this.getName = function(){   return this.name;  }  this.getAge = function(){   return this.age;  } } function Child(name, age, skill){  Father.call(this, name, age);  this.skill = skill } var child = new Child('zhangsan', 20, 'dance'); console.log(child.getName())
   ```

3.  组合继承：通过结合了原型链继承和构造函数继承。 

   ```
   function Father(name, age){  this.name = name;  this.age = age; } Father.prototype.money = function(){  console.log('100000'); } function Child(name, age, skill){  Father.call(this, name, age);  this.skill = skill; } Child.prototype = new Father(); Child.prototype.constructor = Child; Child.prototype.exam = function(){  console.log('i want to have an exam'); } var child = new Child('zhangsan', 20, 'dance'); console.log(child.money())
   ```

4.  原型式继承：将以参数形式传入的对象作为创建对象的原型。 

   ```
   function creatObj(o){  function F(){};  F.prototype = o;  return new F(); } var person = {  name: 'zhangsan',  age: 20 } var person1 = creatObj(person); var person2 = creatObj(person); person1.name = 'lisi'; console.log(person1.name, person2.name);
   ```

5.  寄生式继承 

   ```
   function Father(name, age){  this.name = name;  this.age = age; } function Child(name, age){  Father.call(this, name, age); } (function(){  var Super = function(){};  Super.prototype = Father.prototype;  Child.prototype = new Super(); })() Child.prototype.constructor = Child; var child = new Child('Tom', 20); console.log(child.name)
   ```



####  38. 谈谈 This 对象的理解。 

 this是函数执行上下文中的一个属性，它指向最后一次调用该函数的对象。 

1.  函数调用时，若函数不是一个对象的属性，当其调用时this指向全局对象。 

2.  方法调用时，若方法为一个对象中的方法，调用该方法时this指向这个对象。 

3.  当函数通过构造函数用new来创建时，执行前会创建一个实例对象，这个函数的this指向该实例。 

4.  通过运用call、apply、bind方法来改变函数的this指向，call方法第一个参数为改变this指向的对象，后面的参数为传递的参数，apply与call的区别是传递的参数为数组，而bind方法与call和apply的区别是不会立即调用函数，先将函数与this指向绑定，返回改变了this指向的新函数，等到待执行时再调用。这个函数的this指向除了用new构造函数来改变，其余都不会改变。 

    优先级：这四种模式中，使用new构造函数的优先级最高，其次是call、apply、bind调用函数，然后是方法调用模式，最后是函数调用模式。 

####  39. eval 是做什么的？ 

 eval方法是将传递的字符以js语法去解析执行。应该尽量避免使用eval语法，因为是非消耗性能，第一次解析js语法，第二次执行js语句。 

####  40. 什么是 DOM 和 BOM？ 

 DOM是文档对象模型，它是将文档看成一个对象，这个对象主要定义了文档的方法和接口。在DOM中，文档的各个组件可以通过Object.attribute来获取，根对象是document。 

 BOM是浏览器对象模型，它是将浏览器看成是一个对象，这个对象中定义了浏览器的方法和接口。它除了可以访问文档组件以外还可以访问浏览器窗口组件，例如导航条navigator，历史记录history等等。 

####  41. 写一个通用的事件侦听器函数。 

####  42. 事件是什么？IE 与火狐的事件机制有什么区别？ 如何阻止冒泡？ 

 事件是用户操作网页过程中的交互动作，例如鼠标点击事件click，鼠标移动事件mousemove等等，除了用户触发外还可以是文档加载，例如页面滚动事件scroll，事件可以封装成一个event对象，包含了事件对象的所有信息和可以对事件的操作。 

 IE可以支持事件冒泡，火狐可以同时支持两种事件模型，即事件冒泡和事件捕获。 

 event.stopPropogation或者ie下的event.cancelBubble = true。 

####  43. 三种事件模型是什么？ 

 事件是指用户操作页面过程中触发或者是浏览器触发的交互动作，有三种事件模型。 

1.  DOM0事件模型，该事件模型没有事件流的概念，这种模型不会传播，它可以直接定义监听函数也可以通过js属性来定义监听函数。 
2.  IE事件模型，该事件模型涉及两个事件流，执行阶段和冒泡阶段，首先会监听并触发目标事件，然后会依次冒泡到最外层document，所经过的节点依次判断是否绑定了事件，若有则触发。可以通过attachEvent来监听事件，可以监听多个函数并按顺序执行。 
3.  DOM2事件模型，该事件模型涉及三个事件流，捕获阶段、执行阶段和冒泡阶段，捕获阶段为从document依次向下传播，检查每个节点是否绑定了相关事件，若有则触发。后两者与IE两个阶段相同。可以通过addEventListener来监听事件，第三个参数用来判断捕获和冒泡的顺序。 

####  4***委托是什么？ 

 事件委托的本质是通过事件冒泡使父节点能够监听到子节点的事件，从而产生事件函数。也就是将监听函数绑定在子节点的父节点上，这样不必为每个子节点都绑定监听事件，父节点可以通过事件对象定位到子节点目标上。例如当我们动态创建子节点时，动态创建的子节点也可以有监听事件，可以利用事件委托的形式将监听函数绑定在父节点上，可以减少内存上的消耗。 

####  45. ["1", "2", "3"].map(parseInt) 答案是多少？ 

 parseInt方法是将数值转为整数型，接收两个参数，分别为val和radix，即数值和基数，基数范围为2~36之间，并且数值不能大于基数值，这样才能正确返回整数型。map方法传递了三个参数，分别为value，index，array，默认第三个参数被省略。这样数组传递给parseInt的参数分别为1-0，2-1，3-2，因为数值不能大于基数，所以后两项返回为NaN，第一项由于基数是0，所以默认为10，返回1。因此答案为[1, NaN, NaN]。 



####  47. javascript 代码中的 "use strict"; 是什么意思 ? 使用它区别是什么？ 

 use strict指的是严格模式下执行js语句。主要是消除了一些不规范的语法，提高了解析执行的效率，保证了代码的安全运行。禁止使用with语句，不允许this指向全局对象，对象不能有重名的属性等。 







####  50. new 操作符具体干了什么呢？如何实现？ 

 对于构造函数通过new创建一个新实例对象，在内存上开辟了一个新空间，同时将实例对象的proto属性指向构造函数的prototype原型对象。并且将构造函数的属性通过this指向new创建出的实例对象。判断函数的返回值类型，如果是值类型就返回创建的对象，如果是引用类型就返回引用类型对象。 

####  51. Javascript 中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是？ 

 hasOwnProperty方法，该方法用于查找对象身上自身特点的属性，而不去查找原型上的属性，会将原型上的属性忽略掉。 

####  52. 对于 JSON 的了解？ 

 JSON是一种基于文本的轻量级的数据交换格式，它可以被任何编程语言读取并交换数据格式。 

 在[项目]()开发中我们常用JSON来进行前后端数据的传递，我们在[前端]()将数据转换为JSON字符串的格式传递给后端，后端接收到数据后通过将其转换为特定的数据结构来进行处理。 

 因为JSON是基于js语法的，但两者有很大差别，JSON格式更为严格，例如不能使用方法属性，且属性用双引号。 

 js中提供了两种方法来对JSON格式进行处理，一是JSON.stringify将JSON数据结构转变为JSON字符串的模式。 

 二是JSON.parse方法将JSON字符串格式转变为js数据结构，若接收到的数据不是JSON字符串格式就会报错，例如我们在后端接收到JSON字符串格式的数据，可以通过JSON.parse将其转变为js数据结构再进行数据处理。 

####  53. [].forEach.call(("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)}) 能解释一下这段代码的意思吗？ 

 我们可以在控制台中通过()来获取相应的元素，类似于document.querySelectorAll()方法。这行代码的意思就是对页面中所有元素进行遍历，对每个元素设置一个outline样式，样式的颜色为一个随机颜色，Math.random()(1<<24)表示0~2^24-1之间的随机数，~表示取反，~~表示两次取反表示为取整操作，toSting(16)为转换为16进制的整数。 

####  54. js 延迟加载的方式有哪些？ 

 js代码在解析和执行时会阻塞页面的渲染，阻碍dom向下执行，因此我们希望能够延迟js加载，从而使页面性能更好更加流畅。 

1.  可以通过在script标签添加defer属性，表面页面自上而下执行时若遇到js脚本时不会阻塞页面向下执行，而是加载js脚本和页面解析同时进行，当页面元素全部解析完毕时再按照js脚本的顺序执行js语句。 
2.  可以通过在script标签添加async属性，它和defer属性的不同是等到js脚本加载完毕就回过头去执行js代码，而不会等到所有页面元素加载完毕，是异步进行的，js脚步不会按照顺序执行，哪个先加载完毕就先执行哪个js代码。 
3.  可以利用定时器延迟js脚本的加载。 
4.  将js脚本放在html页面的底部。 
5.  可以使用动态创建script标签的方式，我们可以对文档的加载事件进行监听，当页面元素全部加载完毕时再动态创建script标签，进行外部js脚本的外链。 

####  55. Ajax 是什么? 如何创建一个 Ajax？ 

 Ajax属于异步通信，通过XMLHTTPRequest创建xhr，从服务器xml文档中获取数据，并更新到页面局部，不必刷新整个页面。 

```
function ajax(options){
   //设置默认对象 
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function(){},
        error: function(){}
    };
    //将传入参数对象与默认对象合并
    Object.assign(defaults, options);
    var params = '';
    for(var attr in defaults.data){
        params += attr + '=' + defaults.data[attr] + '&';
    }
    params = params.substr(0, params.length);
    if(defaults.type == 'get'){
        default.url = default.url + '?' + params;
    }
    var xhr = new XMLHTTPRequest();
    xhr.open(defaults.type, defaults.url);
    if(defaults.type == 'post'){
        var contentType = defaults.headers['Content-Type'];
        xhr.setResquestHeader('Content-Type', contentType);
        if(contentType == 'application/json'){
            xhr.send(JSON.stringify(defaults.data));
        } else {
            xhr.send(params);
        }    
    } else {
        xhr.send();
    }
    xhr.onload = function(){
        var contentType = xhr.getResquestHeader('Content-Type');
        var responseText = xhr.responseText;
        if(contentType.includes('application/json')){
            responseText = JSON.parse(responseText);
        }
        if(xhr.status == 200){
            defaults.success(responseText, xhr);
        } else {
            defaults.error(responseText, xhr);
        }
    }
}
```

####  56. 谈一谈浏览器的缓存机制？ 

 浏览器的缓存机制指的是浏览器能够在一定时间内保存接收到的web资源的副本，当在有效事件内，如果浏览器再次发起相同请求，则直接从缓存中获取数据，不必再向服务器端请求。有效的缓解了服务器端压力以及加快了性能 

 缓存机制可以分为强缓存和协商缓存。如果为强缓存，在缓存有效时间内，可以直接从缓存中获取资源，不必向服务器端发起请求。强缓存有效时间可以通过设置http头部中的expries和cache-control来设置。expries是http1.0中的属性，它通过设置服务器端绝对时间来控制缓存的有效时间，但它的缺点是浏览器端和服务器端可能时间不一致，这就导致了缓存有效时间的误差。可以通过http1.1中的cache-control来控制，它提供了很多不同的控制信息，例如max-age用来指定缓存有效最大时间，这是一个相对时间，相比于第一次浏览器端请求，过了一定时间后缓存失效。还有private用来控制缓存只能被[客户端]()获取，不能被代理服务端获取。还有no-store表示资源不能被缓存，no-cache表示可以被缓存但是会立即失效，每次都要向服务器端发起请求。cache-control的优先级大于expries。 

 协商缓存策略是浏览器首先向服务器端发送请求，若请求内容和条件自上次请求以来没有发生修改则返回304状态码，如果发生了修改则返回最新修改的资源。协商缓存也可以通过两种方式来设置，第一个是通过设置响应头中的last-modify属性，返回了资源最后一次修改时间，当浏览器再次发起请求时请求头中会带有if-modify-since属性，属性值即为last-modify的值，服务器将获取到的这个头部值与最后一次修改资源的时间进行比较，若发生修改则返回新的资源，若没有修改则告知浏览器使用缓存中的内容。但这个方式有缺陷就是last-modify的值只能精确到秒级，如果某些资源在一秒之内修改多次，那么文件发生了修改而last-modify没有发生改变。因此第二种方式是通过设置响应头中的ETag值，它保存了资源的唯一标识符，当资源发生修改时，ETag也会发生改变。当浏览器端向服务器端发起请求时，会在请求头中添加if-none-match头部，值为返回的ETag值，服务器端会根据这个值与对应文件的ETag值进行对比判断是否发生了修改。当这两个方法同时设置时，ETag的优先级会高于last-modify。 

 强缓存和协商缓存都是当缓存命中时直接使用缓存文件，区别是协商缓存需要先向服务器端发起一次请求。当强缓存命中时会直接使用缓存资源，若未命中则向服务器端发起请求，使用协商缓存，若协商缓存命中则告知浏览器使用缓存资源，若未命中则将最新修改过后的资源返回给浏览器端。 

####  57. Ajax 解决浏览器缓存问题？ 

####  58. 同步和异步的区别？ 

 同步指的是代码自上而下按顺序执行，并且等待当前代码返回值或消息之后再继续执行下一条语句，此时程序是处于阻塞状态的，只有当前代码返回值后才能继续向下执行。 

 异步指的是代码不会按照同步的方式等待当前向系统请求后返回消息之后再向下执行，它会在代码请求的时候直接执行之后的语句，不会等待消息的返回，不会造成程序阻塞。等到消息返回后再处理之前异步的程序。 

 

####  61. 服务器代理转发时，该如何处理 cookie？ 

####  62. 简单谈一下 cookie ？ 

 我理解的是cookie是服务器端创建的用于维护会话状态信息的数据，当[客户端]()向服务器发起请求时，服务器端创建cookie并且将sessionid储存于cookies中发送给[客户端]()，等到之后每次[客户端]()向服务器端发起请求时，都会携带cookies用于服务器进行验证，用户是否为登录状态。cookies不能用于跨域请求。 

 服务器端可以使用set-cookies来设置cookies信息，其中expries用于设置cookies过期时间，httponly用于禁止js脚本获取到cookies，只能被服务器访问。除此之外还有domain、path、secure。 



####  64. js 的几种模块规范？ 

1.  commonJS：主要应用于服务器端，通过module.exports将模块进行导出，暴露出模块接口，通过require引入模块，实现模块的导入。commonJS是同步执行的，因为涉及到的文件方法缓存在本地磁盘中因此读取时不会发生阻碍，同步执行不会产生代码的拥堵现象。 
2.  ES6模块规范：使用import和export方式来输出和导入模块。 
3.  [AMD]()：RequireJS实现的异步加载模块。 
4.  CMD： 

####  65. [AMD]() 和 CMD 规范的区别？ 

####  66. ES6 模块与 CommonJS 模块、[AMD]()、CMD 的差异。 

 CommonJS输出的是一个值的拷贝，而ES6输出的是值的引用。CommonJS正因为输出的是值的拷贝，所以模块在进行输出后，若模块内部发生改变便影响不到这个值，需对其重新拷贝。ES6的运行机制和CommonJS不同，js引擎遇到模块加载命令import时会生成一个只读引用，当脚本真正执行时，再根据这个只读引用到模块中去加载。 

 CommonJS是运行时加载，ES6是编译时输出接口，CommonJS输出的是整个对象，它将模块看成是一个对象，当需要某个方法时就到该对象中去查找。ES6是编译时输出一个静态接口，在代码静态解析时就会生成。 

####  67. requireJS 的核心原理是什么？（如何动态加载的？如何避免多次加载的？如何 缓存的？） 

 requireJS的核心是通过动态创建script标签的src来引入模块，同时对每个脚本的load事件进行监听，如果每个脚本都加载完成了再执行回调函数。 

####  68. JS 模块加载器的轮子怎么造，也就是如何实现一个模块加载器？ 

####  69. ECMAScript6 怎么写 class，为什么会出现 class 这种东西? 

 es6中新增的class我觉得应该是为了补充一些js中缺少的面向对象的特性，它作为一种语法糖，起始还是基于原型继承的思想，为class添加方法就等于是在构造函数的原型对象上添加方法。通过class我们可以更好的阻止代码。 

####  70. documen.write 和 innerHTML 的区别？ 

 document.write是改写页面结构，会代替整个文档重写整个页面。 

 innerHTML只是替代页面某个元素中的内容，只会重写部分元素的内容。 

####  71. DOM 操作——怎样添加、移除、移动、复制、创建和查找节点？ 

1.  创建新节点：createElement()、createTextNode() 
2.  添加、移除、替换、插入节点：Parent.appendChild(node)、Parent.removeChild(node)、Parent.replaceChild(new, old)、Parent.insertBefore(new, old) 
3.  查找节点：getElementById, getElementsByName, getElementsByTagName, getElementsByClassName, querySelector, querySelectorAll 
4.  属性操作：getAttribute, setAttribute, hasAttribute, removeAttribute 

####  72. innerHTML 与 outerHTML 的区别？ 

 例如对于这样一个html： 

```
<div>我是文本<br/></div>
```

 innerHTML内部html：我是文本  

 outerHTML外部html：<div>我是文本 </div> 



####  74. [JavaScript]() 类数组对象的定义？ 

 类数组指的是拥有数组的length属性和索引下标，类数组与数组类似，但不能使用数组的方法。 

 可以通过以下几种方式来使类数组拥有数组的方法： 

1.  通过call调用数组的slice方法来实现转换： 

   ```
   Array.prototype.slice.call(arrayLike);
   ```

2.  通过call调用数组的splice方法来实现转换： 

   ```
   Array.prototype.splice.call(arrayLike, 0);
   ```

3.  通过apply调用函数的concat方法来实现转换： 

   ```
   Array.prototype.concat.apply([], arrayLike);
   ```

4.  通过Array.from来实现转换： 

   ```
   Array.from(arrayLike);
   ```

####  75. 数组和对象有哪些原生方法，列举一下？ 

1.  数组和字符串的转换方法：toString()、join() 
2.  数组尾部操作方法：push()，pop()，push参数可以为多个 
3.  数组头部操作方法：shift()，unshift() 
4.  数组重[排序]()的方法: reverser() sort() 
5.  数组连接的方法：concat() 返回的是拼接好的数组，不影响原数组 
6.  数组截取方法：slice(start, end) 用于截取数组中的一部分进行返回 不影响原数组 
7.  数组删除方法：splice(start, number) 用于删除数组中的指定项 返回被删除的数组，影响原数组 
8.  every() some() forEach() filter() map() 
9.  reduce()  

####  76. 数组的 fill 方法？ 

 数组的fill方法可以用一个固定值填充数组从起始索引到终止索引的全部元素。fill接收三个参数，固定值，起始索引，终止索引。其中起始索引和终止索引可省略，默认为0和this对象的length值。 



####  78. [JavaScript]() 中的作用域与变量声明提升？ 

 变量声明提升是指对变量的声明仿佛提升到了当前作用域的顶部。这是js中的作用域相关，当代码在执行前会有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象，当访问到一个变量时会到当前作用域的执行上下文中去查找变量对象，作用域的首部就是当前执行上下文中的变量对象，包括函数的形参、所有函数和声明的变量。 



####  82. 需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？ 

 popStatus + ajax。 

####  83. 如何判断当前脚本运行在浏览器还是 node 环境中？（阿里） 

 this === 'window' ? 'brower' : 'node'; 

####  84. 把 script 标签放在页面的最底部的 body 封闭之前和封闭之后有什么区别？浏览器会如何解析它们？ 

####  85. 移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？ 

 移动端的点击事件有300ms的延迟，这是因为移动端有双击放大功能，有300ms的延迟是为了等待是否有第二次点击来进行屏幕放大，若300ms内没有第二次点击再认为是点击事件。解决：可以再view标签内设置禁止缩放属性，也可以设置屏幕为理想尺寸大小，同时还可以使用fastClick库。 

 点击穿透：是因为移动端的点击事件有300ms的延迟，touch之后300ms内响应click，这样可能会误点到元素底部的某个元素。解决方案：只用touch，若只用click的话每次点击都会有延迟现象。 

####  86. 什么是“[前端]()路由”？什么时候适合使用“[前端]()路由”？“[前端]()路由”有哪些优点和缺点？ 

 [前端]()路由指的是不同路由对应的不同功能的页面交给[前端]()来做，之前是服务器通过url的不同来返回不同的页面。 

 一般单页面应用时候适合[前端]()路由，大部分页面结构不改变，只改变部分结构。 

 [前端]()路由优点：不必向服务器端请求，缓解了服务器端压力，用户体验好，页面流畅。 

 [前端]()路由缺点：单页面应用无法记住之前滚动过得位置，也无法在前进后退过程中记住滚动的位置。 

 [前端]()路由有两种实现方式，一种是hash，另一种是history.pushState。pushState为浏览器添加一条历史记录，添加完后可以使用history.state获取。并且在history模式下，[前端]()的url必须与向后端传递的url保持一致。 

####  87. 如何测试[前端]()代码么？ 知道 BDD, TDD, Unit Test 么？ 知道怎么测试你的[前端]()工程么(mocha, sinon, jasmin, qUnit..)？ 

####  88. 检测浏览器版本版本有哪些方式？ 

 第一种是window.navigator.userAgent方式来获取，但这种方式不准确因为可能会被改写。 

 第二种是功能检测，也是每个浏览器独有的特性来检测，例如ie下的ActiveXObject。 

####  89. 什么是 Polyfill ？ 

 Polyfill用于实现浏览器并不支持的原生API代码。 

####  90. 使用 JS 实现获取文件扩展名？ 



####  92. Object.is() 与原来的比较操作符 “===”、“==” 的区别？ 

 ==表示在比较前可以进行类型转换，===表示严格比较，若类型不同会直接返回false 

 Object.is()与===类似，但处理了一些特殊情况，比如+0和-0不再相对，NaN和自身是相等的。 

####  93. escape,encodeURI,encodeURIComponent 有什么区别？ 

####  94. Unicode 和 UTF-8 之间的关系？ 

 



####  97. 手写 call、apply 及 bind 函数 

```
//手写call
Function.prototype.myCall = function(context){
    if(typeof this !== 'function'){
        console.error('type error')
    };
    //获取参数
    let args = [...arguments].slice(1),
        result = null;
    //判断context是否传入 若没传入则设为window
    context = context || window;
    //将调用函数设为对象的方法
    context.fn = this;
    result = context.fn(...args);
    delete context.fn;
    return result;
}
//手写apply
Function.prototype.myApply = function(context){
    if(typeof this !== 'function') {
        console.error('type error');
    }
    let result = null;
    context = context || window;
    context.fn = this;
    if(arguments[1]){
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn()
    }
    delete context.fn;
    return result;
}
//手写bind
Function.prototype.myBind = function(newObject){
    if( typeof this !== 'function'){
        console.error('type error');
    }
    var args = [...arguments].slice(1);
    var that = this;
    return function(){
       return that.apply(newObject, args.concat([...arguments]))
    }
}
```

####  98. 函数柯里化的实现 

 函数柯里化是指将一种使用多个参数的函数转换为一系列单个参数函数的调用。 

```
//手写函数柯里化
function curry(fn, args){
    //获取函数需要的总参数长度
    let leng = fn.length;
    args = args || [];
    return function(){
        let subargs = args.slice(0);
        for( let i = 0; i < arguments.length; i++){
            subargs.push(arguments[i]);
        }
        //判断此时subargs是否已经满足函数需要的参数长度需求
        if(subargs.length >= leng){
            return fn.apply(this, subargs)
        } else {
            return curry.call(this, fn, subargs);
        }
    }
}
function fn(a,b,c){
    return a+b+c;
}
var newCurry = curry(fn, 1);
newCurry(2);
newCurry(3);
```

####  99. 为什么 0.1 + 0.2 != 0.3？如何解决这个问题？ 

 在计算机中，运算是转换为二进制再进行计算的，js是以64位双精度格式来进行计算的，只有53位有效数字，之后的数字会被截掉，因此产生了误差。 

####  100. 原码、反码和补码的介绍 

 原码是计算机中对数字的二进制的定点表示方法，首位为符号位，其余为数值位。 

 正数的反码和补码都和原码一样，负数的反码首位为1，数值位为原码取反，补码为反码加1 

####  101. toPrecision 和 toFixed 和 Math.round 的区别？ 

 toPrecision用于处理精度，从左至右第一个不为0的数开始数起。 

 toFixed用于处理小数点后精度的个数，从小数点处开始数起，末尾精度四舍五入计算。结果为字符型。 

 Math.round进行四舍五入取整。 



####  103. 什么是 CSP？ 

 CPS指的是内容安全策略，它的本质是建立一个白名单，告诉浏览器哪些外部资源可以访问和获取。我们只需要配置规则，然后由浏览器去获取。 

 可以通过两种方式配置CSP，一种是通过http头部设置'Content-Security-Policy'，另一种是meta标签设置http-equiv='Content-Security-Policy'。 

####  104. 什么是 CSRF 攻击？如何防范 CSRF 攻击？ 

 CSRF指的是跨站请求伪造，攻击者利用相关网站对用户身份的信任来窃取用户信息甚至涉及用户安全。例如用户登录网站A，由于已通过网站A的用户身份验证，因此在没退出的情况下可访问，当用户无意通过恶意网站再次访问网站A时，恶意网站会欺骗网站A，让其误以为是用户本意登录，实质上是恶意网站的一种欺骗行为。 

 防范： 

1.  验证refener信息，查看登录来源，但这种方式容易被篡改。 
2.  采用token验证身份信息。服务器端会向[客户端]()返回一个随机数，作为身份令牌，当再次访问时[客户端]()将这个随机数存请求参数中，服务器端会检验这个身份令牌是否符合，但这种方式的缺点是我们需要为每个服务端都储存一个token，这样会比较繁琐，同时一般不会只对应一个服务器当我们进行负载平衡时，请求会被转移到其他服务器上，这样就要重新生成token。 
3.  双重cookies方式，服务器端会将cookies返回给[客户端]()，当[客户端]()再次发起请求时，会将cookies的信息存放在url参数中，服务器会将cookies中的数据和url中的参数进行对比，来判断是否请求来自于恶意网站，这是利用了攻击者只能访问cookies而不能获取cookies的特点。 
4.  可以对cookies设置Samesite属性，限制cookies不能被第三方所获取。 

####  105. 什么是 Samesite Cookie 属性？ 

 Samesite Cookies表示同站Cookies，表示cookies不能被第三方所获取。 

 将Samesite设置为strict时，表示严格模式下，cookis不能被任何第三方所利用。 

 将Samesite设置为lax时，表示款式模式下，当请求为get请求时，并且这个请求改变了当前页面或者打开了新的页面，则cookies可以被第三方获取。 

 这种方式的缺点是它不支持子域，当从主域跳转到子域时，用户需要重新登录，且兼容性不够好。 

####  106. 什么是点击劫持？如何防范点击劫持？ 

 点击劫持指的是攻击者将恶意网站通过iframe放置于页面当中，并且将其外观设置为透明，在底部创建一个按钮之类的引诱用户去点击，随后跳转到恶意网站。 

 防范：使用X-FRAME-OPTIONS机制，该机制有两个选项，分别为DENY和SOMEORIGIN，DENY表示任何网页都不能使用iframe载入网页，SOMEORIGIN表示符合同源策略的网站可以使用iframe载入网页，如果浏览器使用了这个机制，当用户访问网站时会提示当前网页存在安全隐患，应打开新网页去浏览。 

####  107. SQL 注入攻击？ 

 SQL是结构化查询语言，是一种特殊目的的编程语言，是一种数据库查询和结构设计语言，用于存储数据以及查询、修改、添加和删除等操作关系型数据库。 

 SQL注入指的是用户在进行http请求时注入恶意的SQL代码，服务器在使用参数构建数据库SQL命令时，恶意SQL被一起构建，破坏原有SQL结构，并在数据库中执行，达到意料之外的结果的攻击行为。 

####  108. 什么是 MVVM？比之 MVC 有什么区别？什么又是 MVP ？ 

 MVVM中指的是Model、View和ViewMode，用来实现视图与数据分离的状态，View是指视图区域，用于页面渲染，展示数据。Model用于存储数据和数据的逻辑交互功能。ViewModel属于连接两者的纽带，当数据变化时，ViewModel监听到数据变化响应给View更新视图，当页面节点变化时，ViewModel响应给Model进行数据的更新。利用双向数据绑定同步更新View和Model。 

 MVC是分离Model、View和Controller的交互模式，Controller主要用于控制用户与应用的响应操作，当页面节点发生变化时，会通过监听函数执行操作，并对Model进行更改，然后再去通知View层更新。 

 MVP和MVC的不同是MVP使用了presenter，MVC应用的是观察者模式，来实现当Model层发生变化时来更新View，因为View没有暴露给Controller接口，因此不能控制View的更新，这样View和Model层耦合在一起，而MVP实现了两者的解耦，presenter将View和Model绑定在一起实现同步更新，而MVVM将MVP的同步更新给自动化了。 

####  109. vue 双向数据绑定原理？ 

 实现MVVM的双向数据绑定，应用的是数据劫持结合订阅者发布者模式。首先监听者对数据属性进行监听通过Object.defineProperty()来劫持各个属性上的getter和setter，当数据变化时通知给订阅者，并且触发响应的监听回调来更新视图。MVVM作为一个数据接口还会有一个解析器，对每个元素节点的指令进行扫描和解析，并根据模板指令替换数据，进行初始化页面，同时绑定相应的更新函数，订阅数据变化，添加监听数据的订阅者，一旦数据有变化收到通知更新视图，这就实现了数据变化更新视图，视图变化更新数据的双向数据绑定。 

####  110. Object.defineProperty 介绍？ 

 Obect.defineProperty()方法有三个参数，第一个参数为需要定义属性的对象，第二个参数是需要定义的属性，第三个参数是描述符，属性的描述符有四个属性：value（属性的值）、writable（可读写）、enumerable（可枚举）、configurable（属性是否可配置修改）。 

####  111. 使用 Object.defineProperty() 来进行数据劫持有什么缺点？ 

 有些对数据的操作用这种方式无法进行数据劫持，比如对数组数据的修改和给对象新增属性。Vue3.0中可用proxy对对象进行代理实现，从而实现数据劫持，但兼容性不好，因为是ES6的语法。 

####  112. 什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快？ 

 当页面发生更新变化时，原生DOM更新的开销比较大，因此使用JS代码进行生成一个虚拟DOM，当数据发生更新时，会生成新的虚拟DOM，然后和之前的虚拟DOM进行对比，利用diff[算法]()比较出两者的差异，然后将两者对应节点的不同结合到原生DOM树上完成更新。 

 使用虚拟DOM可以节约性能，提升操作效率，节省开销。避免使用原生DOM而带来的变化产生的回流与重绘。提升开发时的可维护性。 

####  113. 如何比较两个 DOM 树的差异？ 

 利用diff[算法]()来比较两个DOM树的差异。两棵DOM树完全比较的时间度为O（n^3），在[前端]()过程中我们一般不跨层级的移动元素，为了将时间度降为最低，比较两棵树的同一层级的节点。首先会对两棵树进行一个深度遍历，并且对每个节点标上序号。当深度遍历一个DOM树的时候，当遍历到一个节点会对比另一个DOM树的节点，如果有差异就保存到一个对象中。 

####  114. 什么是 requestAnimationFrame ？ 

 requestAnimationFrame是专门为浏览器解决js执行动画的api，我们知道动画效果是通过一帧一帧连续变化而形成的效果，如果我们用定时器来执行动画的话，会因为定时器属于异步函数而可能在规定时间之后执行，因为js是单线程的，所以异步队列要等同步任务执行完毕后再执行回调函数，这样就不能保证动画的流畅性。这时可以利用requestAnimationFrame来解决，它接收一个参数为动画执行函数，例如 

```
function animation(){
    var div = document.querySelector('.box');
    div.style.width = parseInt(div.style.width) + 1 + 'px';
    if(div.style.width < 200){
        requestAnimationFrame(animation)
    }
}
requestAnimationFrame(animation);
```



####  116. offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别？ 

 offsetWidth/offsetHeight返回一个只读属性，包含元素的border、padding、content以及scrollbar。 

 offsetLeft/offsetTop返回元素距离其最近的含有定位的祖先元素offsetParent的左侧距离和顶部距离。 

 clientWidth/clientHeight返回一个只读属性，为元素的内部宽度，content+padding。 

 clientLeft/clientTop返回元素顶部边框/左侧边框的宽度。 

 scrollWidth/scrollHeight只读，返回元素实际的宽度和高度，包括被卷起的高度/宽度。 

 scrollLeft/scrollTop返回元素被卷去的上侧距离/左侧距离。 

####  117. 谈一谈你理解的函数式编程？ 

 函数式编程是一种编程规范，主要是通过一系列的函数调用来进行一些页面上内容的实现与操作。 

####  118. 异步编程的实现方式？ 

 异步编程的实现可以分为以下几种： 

1.  回调函数形式：通过回调函数来实现异步编程，让不同的任务按照顺序执行，前一个执行完毕才会执行下一个，但缺点是当任务量比较大时会产生层层嵌套的回调地狱问题，造成代码冗余复杂，难以维护。 
2.  Promise对象：Promise可以解决回调地狱问题，通过new创建一个promise实例对象，接受一个回调函数作为参数，函数中接收两个状态函数分别为resolve和reject，代表状态由等待状态进入执行成功和执行失败状态。返回的promise对象可通过.then进行链式调用来实现后序的函数操作。 
3.  generator，它可以在函数的执行过程中将执行权转移出去，在函数外部还可以将执行权转移回来。当我们遇到异步函数的时候将执行权转移出去，当异步函数执行完毕之后将执行权转移回来。这样我们在函数内部可以将异步语句以同步的方式来书写。 
4.  async和await：普通函数前加上async可以将函数转化为异步函数，返回promise对象，函数内部执行到await语句时，如果语句返回promise对象则等当前语句执行完毕之后再向下执行。 

####  119. Js 动画与 CSS 动画区别及相应实现 

 CSS动画较为简单，浏览器对CSS动画有很好的的处理，但不易于控制，不够灵活，且兼容性不够好。 

 JS动画可以很好的控制动画的灵活性，并且易于控制，并且可以单帧的进行控制操作，功能强大，但代码量大，可用于大型动画[项目]()，若小动画还是css比较适宜。 

####  120. get 请求传参长度的误区 

 其实get请求长度并没有限制参数内容长度的说法，同样post传参也没有长度限制，而是get请求一般是通过将参数加在url地址上，而通过浏览器和服务器对url长度有限制，因此get请求传参长度就会有限制，通常不同的浏览器对url长度限制不同。 

####  121. URL 和 URI 的区别？ 

 URL是统一资源定位符，URI是统一资源标识符，它是一个抽象的概念，是对资源的一个唯一的标识，不管通过什么方式，只要能对资源进行唯一标识，都可称为URI。URL是URI的一种，它是通过地址来对资源进行唯一标识。URN是统一资源名称，同理它也是URI的一种，它是通过名称来对资源进行统一标识。 

####  122. get 和 post 请求在缓存方面的区别 

 get类似于查找的过程，用于获取数据，因此它不用每次都向服务器提交请求，可以使用缓存。 

 post不同，它一般是用于增加和修改功能，因此它必须每次提交都要向服务器请求，必须与数据库交互，不能使用缓存。 

 缓存只适用于那些不会向修改和添加服务器端数据的请求，一般get都是查找请求，不会更新数据库，因此get适宜用缓存数据，而post会更新数据库，因此不能利用缓存。 

####  123. 图片的懒加载和预加载 

 图片的懒加载指的是一个延迟加载的功能，在页面加载的过程中，页面中的所有图片不会一次性全部加载出来，而是当页面滚动到当前位置时图片再加载，这样可以减轻页面加载的压力，使页面更为流畅。 

 图片的预加载指的是在页面加载之前图片就已经加载完毕并保存到本地中，当需要渲染的时候直接从本地获取，节省了图片加载的时间。预加载可利用Image创建一个实例对象，通过为image对象设置src属性来实现图片的预加载。懒加载和预加载都提高了网页的性能，一个是延迟甚至是不加载，一个是提前加载，懒加载对服务器端有一定的缓解压力作用，而预加载增***务器端的压力。 

####  124. mouseover 和 mouseenter 的区别？ 

 两者的区别是是否支持冒泡，两者功能类似，都是鼠标移动到某个元素上时会触发。mouseenter不支持冒泡，因此当鼠标移动到元素的子元素上时，父元素上可触发mouseover和mouseout事件，但不会触发mouseenter和mouseleave事件。 

####  125. js 拖拽功能的实现 

 涉及到三个事件：mousedown、mousemove、mouseup 

 在mousedown事件函数中首先获取鼠标点击时的位置，可通过事件对象来获取，event.clientX和event.clientY，以及被拖拽元素的初始位置，可通过offsetLeft和offsetTop获取，并且创建一个鼠标移动事件mousemove，在这个事件函数中，将鼠标的位置-鼠标的初始位置+元素的初始位置 赋值给元素的位置样式，不断的鼠标移动就会不断的去触发这个事件。然后在创建鼠标抬起事件mouseup，在这个事件函数中取消鼠标摁下事件和鼠标移动事件，清除状态。 

####  126. 为什么使用 setTimeout 实现 setInterval？怎么模拟？ 

 setInterval计时器是每通过一定时间去执行一个函数，但实际上是每经过一定时间将这个事件添加到任务队列中，等待执行栈中的事件执行完毕之后才从任务队列中获取事件压入执行栈，这样就不能保证是每隔一段时间去执行一个事件了。那么可以通过setTimeout方法来执行，原理是利用递归的方式不断的调用函数来执行setTimeout。 

```
function myInterval(fn, wait){
    var timer = {
        flag: true
    };
    function interval(){
        if(timer.flag){
            fn();
            setTimeout(interval, wait);
        }
    }
    setTimeout(interval, wait);
    return timer;
}
```

####  127. let 和 const 的注意点？ 

1.  let和const声明变量时不能变量提升。 
2.  let和const有自己单独的作用域。 
3.  不允许重复声明，重复声明会报错。 
4.  const声明的变量不允许修改其值，const声明的为常量。 

####  128. 什么是 rest 参数？ 

```
rest 参数（形式为...变量名），用于获取函数的多余参数。
```

####  129. 什么是尾调用，使用尾调用有什么好处？ 

 尾调用指的是函数的最后一步调用另一个函数，我们的代码执行是基于执行栈的，所以当我们在函数内调用另一个函数时是保留了当前的执行上下文，当在最后一步调用函数时会将新的执行上下文压入到执行栈中，因为是在最后一步调用因此我们可以不必再保留当前的执行上下文，从而优化了内存，这就是尾调用的好处。 

####  130. Symbol 类型的注意点？ 

 Symbol函数不能使用new命令，否则会报错。 

 Symbol函数可以接受字符串作为参数，表示对实例的描述。 

 Symbol作为属性名不会出现在for..in以及for..of中。 

####  131. Set 和 WeakSet 结构？ 

 Set作为一种数据结构，类似于数组，它保证了数组元素的唯一性，没有重复的值。而WeakSet与Set类似，也是不重复的值的集合，但成员只能是对象，不能是其他类型的值，它代表一种弱引用不能被垃圾回收机制回收。 

####  132. Map 和 WeakMap 结构？ 

 Map作为一种数据结构，类似于对象，是键值对形式存在，但是键的范围不仅仅可以是字符串，还可以是任何类型的值都可以当做键。而WeakMap是Map类似，但键只能是对象，不是是其他类型结构，同时键名所指向的对象不能计入垃圾回收机制。 

####  133. 什么是 Proxy ？ 

 Proxy意思是代理，可以修改默认操作的行为，它相当于在目标对象之前设置一层“拦截”，任何对目标对象的操作都要经过过滤和改写，等同于在语言层面上做出修改，即元编程。 

####  134. Reflect 对象创建目的？ 

####  135. require 模块引入的查找方式？ 

 当require引入路径没有引入后缀时，首先查找该路径下是否有同名JS文件，若没有同名JS文件，就去找同名文件夹下的index.js，如果文件夹中没有index.js就会去当前文件夹中的package.json中查找main选项中的入口文件，如果指定入口文件不存在就会报错。 

 当require没有引入路径也没有引入后缀时，首先node.js会默认它引入的是系统模块，就会去node_modules中去查找同名js文件，若没有同名js文件就查找是否有同名的文件夹，找同名文件夹的index.js文件，若没有index.js文件就查看该文件夹中的package.json中的main选项中的入口文件，若都没有的话则会报错。 

####  136. 什么是 Promise 对象，什么是 Promises/A+ 规范？ 

 Promise对象是异步编程的一种解决方法，Promises/A+规范是[JavaScript]() Promise的一种准则规范，规定了Promise的一些编程标准。Promise是一个构造函数，创建promise实例对象，接收一个回调函数作为参数，返回一个promise实例，该实例有三种状态，分别是pending、resolved和rejected，状态只能由pending转变为resolved或者pending转变为rejected，状态改变之后就凝固了不会转变为其他状态。在异步任务之后通过调用resolved或rejected方法来转变状态，返回一个promise对象，通过.then链式调用的方式来定义resolved和rejected的回调函数。 

####  137. 手写一个 Promise 

```
function myPromise(fn){
    var self = this;
    this.state = 'penging';
    this.value = null;
    this.resolvedCallback = [];
    this.rejectedCallback = [];
    function resolve(value){
        if(value instanceof myPromise){
            return value.then(resolved, rejected);
        }
        setTimeout(() => {
            if(self.state == 'pending'){
                self.value = value;
                self.state = 'resolved';
                self.resolvedCallback.forEach(callback => {
                    callback(value);
                })
            }
        }, 0)
    }
    function reject(value){
        setTimeout(() => {
            if(self.state == 'pending'){
                self.value = value;
                self.state = 'rejected';
                self.rejectedCallback.forEach(callback => {
                    callback(value);
                })
            }
        }, 0)
    }
    //将两个方法传入函数执行
    try{
        fn(resolve, reject);
    } catch(e){
        rejecte(e);
    };
}
myPromise.prototype.then = function(onResolved, onRejected){
    //首先判断这两个状态是否为函数，因为这两个参数是可选的
    onResolved = 
        typeof onResolved == 'function' 
        ? onResolved 
        : function(value){
        return value;
    }
    onRejected = 
        typeof onRejected == 'function'
        ? onRejected
        : function(error){
        throw error;
    }
    //如果是等待状态
    if(this.state == 'pending'){
        this.resolvedCallback.push(onResolved);
        this.rejectedCallback.push(onRejected);
    }
    //如果状态已经凝固 则直接进行对应的状态
    if(this.state == 'resolved'){
        onResolved(this.value);
    }
    if(this.state == 'rejected'){
        onRejected(this.value);
    }
}
```

####  138. 如何检测浏览器所支持的最小字体大小？ 

 可以为DOM字体设置为某一个字体大小，然后再将这个字体取出来，如果能够成功，就说明支持。 

####  139. 怎么做 JS 代码 Error 统计？ 

 利用window.error事件 

####  140. 单例模式模式是什么？ 

 单例模式体验了全局中只有一个实例能够被访问，例如弹框组件模式和全局状态模式。 

####  141. 策略模式是什么？ 

####  142. 代理模式是什么？ 

####  143. 中介者模式是什么？ 

####  144. 适配器模式是什么？ 

 适配器模式用来解决当两个接口不兼容情况下，对接口进行包装适配而不需要改变原有接口，一般适用于当接口被应用到太多程序之中修改原有接口很不方便，这样就可以使用适配器来对接口进行包装输出，例如我们需要获取一个格式化后的时间，但不能对原有时间接口进行修改，就可以利用适配器对时间接口进行封装。 

####  145. 观察者模式和发布订阅模式有什么不同？ 

 发布订阅模式属于广义上的观察者模式，观察者模式中观察者需要直接订阅事件，当目标发出内容的改变之后，就会直接通知观察者进行响应。 

 发布订阅模式中有一个调度中心，能够实现发布者和订阅者之间的解耦，即当发布者发布事件之后，调度中心会一方面向发布者处接收事件，然后向订阅者发布事件，订阅者需要向调度中心订阅事件，这样的解耦有利于后期代码的可维护性。 



####  148. Vue 组件间的参数传递方式？ 

 父子组件间的传参方式：子组件中通过props来接收父组件传递的值，子组件接收到的数据可以应用于其组件的任何位置。同时子组件可通过$emit来触发事件向父组件中传递事件，父组件中通过监听事件来接收数据。 

 兄弟组件间的传参方式：可以通过Vue构造函数实例一个新的vue实例作为调度中心，调度中心可以监听和响应不同组件的事件，然后不同组件可以从调度中心接受事件和响应事件，实现兄弟组件之间的传参。 



####  150. vue-router 中的导航钩子函数 

 vue-router中的导航钩子函数可以成为路由守卫。 

1.  全局的导航钩子：beforeEach和afterEach，两者分别是在每个路由前使用和路由后使用，拿beforeEach例子来说，接收三个参数，分别为to，from，next，to表示要进入的路由，from表示离开的路由，next若参数为空则表示直接执行下一个钩子函数，若参数为路径，则导航到对应的路由，若参数为false，就禁止跳转，若为error则导航终于，传入错误的监听函数。 
2.  路由内导航钩子，在路由配置内定义，单独路由拥有的导航钩子。 
3.  组件内导航钩子，在组件内定义，主要有beforeRouteUpdate，beforeRouteEnter, beforeRouteLeave。 

####  151. route和route 和 route和router 的区别？ 

 route是路由信息对象，包括路由的path,params,name,hash,query等信息，route是路由信息对象，包括路由的path, params, name, hash, query等信息，route是路由信息对象，包括路由的path,params,name,hash,query等信息，router是路由实例对象，包括路径的跳转方法，钩子函数等。 

####  152. vue 常用的修饰符？ 

 vue常用的修饰符有.pevent, .stop, .self等，.pevent表示取消该事件的其默认行为，例如a标签取消点击跳转默认行为，.stop表示取消冒泡事件， .self表示该事件发生在这个元素本身而不是其子元素的事件。 

####  153. vue 中 key 值的作用？ 

 vue中的key值可以分为两种情况来调用： 

1.  v-if中用到key值，因为vue为了更好更快速的渲染页面默认使用元素复用的原则，尽可能复用已有的元素而不是从头开始渲染，例如说一个input元素我们在更新切换时会复用同一个元素，那么用户在之前输入的内容可能会被保留下来这是不符合规范的，因此为每一个v-if添加一个key属性用来作为唯一标识，这样使用key的元素不会被复用。 
2.  v-for中用到key值，是因为我们在使用v-for更新迭代渲染过的元素时，为了避免vue默认就地复用的原则，用唯一标识添加key值，当更新渲染时，如果数据列表发生改变，vue是不会采用移动DOM元素来更改位置，而是复用原先的元素，因此为每个列表项添加一个key值来追踪每个元素的身份。 

####  

####  155. [keep]()-alive 组件有什么作用？ 

 如果我们在进行组件切换的时候需要保存一些组件的状态，就可以使用[keep]()-alive组件将需要保存状态的组件包裹起来，防止多次渲染。 

####  156. vue 中 mixin 和 mixins 区别？ 

 mixin为全局混入，也就是说若创建了一个全局混入组件，会影响到所有vue组件创建的实例。 

 mixins提供了一个灵活的方式，可分发vue组件中的可复用功能，一个混入对象可混入任意组件内容。当组件使用混入对象时，所有混合对象的选项将被“混合”进组件内的所有选项。当组件和混入对象有相同选项时，会进行恰当的合并，例如数据对象在内部会进行递归合并，冲突时刻以组件数据优先。混入对象的钩子函数将在组件内钩子函数之前调用。值为对象的一些选项，例如methods，components等会合并为一个对象，两个对象键名冲突时会取组件对象的键值对。 

####  157. 开发中常用的几种 Content-Type ？ 

1.  application/x-www-form-urlencoded：该数据格式主要存放在body中，主要是key1=val1&key2=val2的格式进行编码。 
2.  application/json：该数据格式主要是以json字符串格式进行编码。 
3.  text/xml：该种方式主要是用来提交xml格式的数据。 
4.  multipart/form-data：该种数据格式主要用来提交表单形式的数据。 

####  158. 如何封装一个 javascript 的类型判断函数？ 

```
function typeof(value){
    if(value === null){
        return null + '';
    }
    if(typeof value === 'object'){
        //如果为引用数据类型
        let valueClass = Object.prototype.toString.call(value).split(' ')[1],
            type = valueClass.split('');
        type.pop();
        return type.join('').toLowerCase();
    } else {
        return value;
    }
}
```

####  159. 如何判断一个对象是否为空对象？ 

1.  使用for..in： 

   ```
   for(var k in obj){
       //如果对象非空，则可以执行到此处
       return true;
   }
   return false;
   ```

2.  使用JSON自带的stringify方法，转化为json字符串 

   ```
   if(JSON.stringify(obj) === '{}'){
       return false;
   }
   return true;
   ```

3.  ES6新增的Object.keys()方法，可以返回对象中所有可枚举属性组成的数据 

   ```
   var a = {};
   Object.keys(a);   //[]
   //我们可以利用对象中可枚举数组的长度是否为0来判断是否为空对象
   if(Object.keys(obj).length === 0){
       return false;
   }
   return true;
   ```

####  160. 使用闭包实现每隔一秒打印 1,2,3,4 

```
for(let i = 1; i <= 4; i++){
    setTimeout(function(){
        console.log(i)
    }, i*1000)
}

for(var i = 1; i <=4; i++){
    (function(j){
        setTimeout(function(){
            console.log(j)
        }, j*1000)
    })(i)
}
```

####  161. 手写一个 jsonp 

```
function jsonp(url, params, callback){
    //首先判断url本身是否带有参数 即是否带有？
    queryString = url.indexOf('?') === '-1' ? '?' : '&';
    for(var k in params){
        if(params.hanOwnProperty(k)){
            queryString += k + '=' + params[k];
        }
    }
    //定义一个随机的函数名 添加到参数中
    var randomName = Math.random().toString().replace('.', '');
    var myFunction = 'myFunction' + randomName;
    queryString += 'callback' + '=' + myFunction;
    url += queryString;
    //动态创建script标签
    var myScript = document.createElement('script');
    myScript.src = url;
    window[myFunction] = function(){
        callback(...arguments);
        //删除这个动态脚本
        doucment.getElementsByTagName('head')[0].removeChild(myScript);
    };
    //将脚本插入到head中
    document.getElementsByTagName('head')[0].appendChild(myScript);
}
```

####  162. 手写一个观察者模式？ 

```
var event = (function(){
    var topics = {};
    return {
        //发布模式
        publish: function(topic, info){
            console.log('publish a topic:' + topic);
            if(topics.hasOwnProperty(topic)){
                topics[topic].forEach(function(handler){
                    handler(info ? info : {});
                })
            }
        },
        //订阅模式
        subscribe: function(topic, handler){
            console.log('subscribe a topic:' + topic);
            if(!topics.hasOwnProperty(topic)){
                topics[topic] = [];
            }
            topics[topic].push(handler);
        },
        remove: function(topic, handler){
            if(!topics.hasOwnProperty(topic)){
                return;
            }
            var topicIndex = -1;
            topics[topic].forEach(function(element, index){
                if(element === handler){
                    topicIndex = index;
                }
            })
            topics[topic].splice(topicIndex, 1);
        },
        removeAll: function(topic){
            console.log('remove all the handler on the topic');
            if(topics.hasOwnProperty(topic)){
                topics[topic].length = 0;
            }
        }
    }
})()
var handler = function(info){
    console.log(info);
}
//订阅hello主题
event.subscribe('hello', handler);
//发布hello主题
event.publish('hello', 'hello world');
```

####  163. EventEmitter 实现 

```
class eventEmitter {
    constructor(){
        this.events = {}
    }
    on(event, callback){
        let callbacks = this.events[event] || [];
        callbacks.push(callback);
        this.events[event] = callbacks;
        return this;
    }
    emit(event, ...args){
        let callbacks = this.events[event];
        callbacks.forEach(fn => {
            fn(...args);
        })
        return this;
    }
    off(event, callback){
        let callbacks = this.events[event];
        callbacks = callbacks.filter(fn => return fn !== callback);
        this.events[event] = callbacks;
        return this;
    }
    once(event, callback){
        let wrapFun = function(...args){
            callback(...args);
            this.off(wrapFun);
        }
        this.on(event, wrapFun);
        return this;
    }
}
```

####  164. 一道常被人轻视的[前端]() JS 面试题 

```
function Foo() {
  getName = function() {
    alert(1);
  };
  return this;
}
Foo.getName = function() {
  alert(2);
};
Foo.prototype.getName = function() {
  alert(3);
};
var getName = function() {
  alert(4);
};
function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
```

####  165. 如何确定页面的可用性时间，什么是 Performance API？ 

 [JavaScript]()为了解决浏览器时间精度不够小只能精确到毫秒级别的误差以及无法得知向服务器端请求资源的事件，添加了一个performance的api，就是一个精密时间戳，它有两个方法，一个是navigationStart，它代表前一个网页关闭时的时间戳，另一个是loadEventEnd，它是当前网页的load事件的回到函数执行结束时的高精度时间戳。用这两个属性可以计算出网页加载整个的耗时： 

```
var t = performance.timing;
var pageLoadTime = t.loadEventEnd - t.navigationStart;
```

####  166. js 中的命名规则 

 通常变量的命名规则为第一个字符要求是字母、下划线或者是美元符合$。其他字符可以是字母、数字、下划线和美元符号。命名规则通常要求为驼峰命名法，可以与ECMAScript的内置函数和对象配置一致。 

####  167. js 语句末尾分号是否可以省略？ 

 最好不要省略，因为语句末尾添加分号，在代码压缩优化之后不会产生错误，并且方便日后维护， 

####  168. Object.assign() 

 它会将所有可枚举属性从一个或多个源对象复制到另一个目标对象上，并返回目标对象，浅拷贝。 

####  169. Math.ceil 和 Math.floor 

 Math.ceil()为将浮点数值向上取整，Math.floor()为将浮点数值向下取整。 

####  170. js for 循环注意点 

```
for (var i = 0, j = 0; i < 5, j < 9; i++, j++) {
  console.log(i, j);
}
```

 当判断语句为多个语句时，以最后的语句为准，如上代码以j < 9为准。若判断语句为空，则会一直循环下去。 

####  171. 一个列表，假设有 100000 个数据，这个该怎么办？ 

 当我们有大量数据时需要考虑几个问题，首先这些数据是否需要同步显示，其次这些数据是否需要按照顺序显示 

 解决方法： 

1.  我们可以使用分页技术，让这些数据分页显示在浏览器上，每次只显示并加载一页数据，其余数据等浏览器操作不同页数时在向服务器端请求渲染。 
2.  可以使用懒加载方式，让一部分数据先显示出来，然后当浏览器需要显示某部分数据的时候再去加载那一部分数据，可以减轻服务器端压力，使性能优化。 
3.  可以给数据分组显示，比如显示一个定时器，一定时间内显示一部分数据。 

####  172. js 中倒计时的纠偏实现？ 

####  173. 进程间通信的方式？ 

 管道通信、任务队列通信、信号量通信、信号通信、套接字通信、共享内存通信。 

####  174. 如何查找一篇英文文章中出现频率最高的单词？ 

```
function findWord(article){   if(article == null){   return article  }   article = article.trim().toLowerCase();   var wordList = article.match(/[a-z]+/g);   article = ' ' + wordList.join(' ') + ' ';   var max = 0;   var maxWord = '';   var list = [];   wordList.forEach(word => {   if(list.indexof(word) === '-1'){   list.push(word);   var newWord = new RegExp(' ' + word + ' ');    var wordLength = article.match(newWord).length;   if(wordLength > max){   max = wordLength;   maxWord = word;   }   }   })   return maxWord + ' ' + max;  }
```



#  四、性能优化 

###  2. [前端]()需要注意哪些

###  3. webpack中的优化 

 有哪些方式可以减少webpack的打包时间？ 

 有哪些方式可以让webpack打出来的包更小？ 

####  减小打包后的文件体积： 

 当我们将页面所有内容打包进一个JS文件的话，虽然将多个请求合并了，但这样也加载了很多并不需要的代码，耗费了更长时间。为了能够将首页更快地呈现给用户，我们肯定希望首页能加载的文件体积越小越好，这时候我们就可以使用按需加载，将每个路由页面单独打包成一个文件。 

####  Tree Shaking 

 Tree Shaking可以实现删除[项目]()中未被引用的代码，比如某个变量并没有被引入到任何文件中，没有在[项目]()中使用的话，就不会被打包到文件中。 

####  Scope Hoisting 

 scope hoisting会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中。 

####  加快打包速度 

#####  优化Loader 

 对于Loader来说，影响打包效率的首当其冲必属Babel了，因为babel会将代码转为字符串生成抽象语法树，然后抽象语法树转变最后再生成新的代码，[项目]()越大转换代码越多，效率就越低。 

1.  首先可以减少Loader的文件搜索范围：在配置文件中用include属性设置在哪个文件夹下查找，用exclude属性设置不查找的路径。 
2.  还可以将babel编译过的文件缓存起来，下次只需要编译更改过的代码文件即可，这样可以大幅度的加快打包时间。 

#####  HappyPack 

 webpack打包过程中也是单线程的，特别是在执行loader的时候，长时间编译的任务很多，这样就会导致等待的情况。 

 HappyPack可以将loader的同步执行转换为并行的，这样就能充分利用系统资源来加快打包效率了。 

#####  DllPlugin 

 DllPlugin可以将特定的类库提前打包然后引入，这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。 

###  4. 编写高性能的[JavaScript]() 

#####  为什么要将js放在body尾部？ 

1.  JS引擎是独立于渲染引擎存在的。js代码在文档的何处插入，就在何处执行。当html解析器遇到一个script标签时，就会暂停渲染，将控制权交给js引擎，js引擎对内联的js代码会直接执行，对外部js文件还要先获取到脚本再进行执行。等js引擎运行完毕浏览器又会把控制权还给渲染引擎，继续CSSOM和DOM的构建。 
2.  如果js放在header中，浏览器会阻塞并等待js加载完毕并执行。 
3.  如果js在body尾部，浏览器会进行一次提前渲染，从而提前首屏出现时间。 

#####  非核心代码的异步加载？ 

 动态脚本加载：使用js创建一个script标签然后插入到页面中 

 defer属性：整个html解析完之后才执行，如果是多个就按照顺序执行 

 async属性：加载完之后立即执行，如果是多个，执行和加载顺序无关。 

#####  使用节流与防抖 

#####  懒加载 

###  5. 浏览器渲染 

 浏览器的解析过程： 

-  解析HTML构建DOM树，并行请求CSS/image/js 
-  CSS文件下载完毕，开始构建CSSOM树 
-  CSSOM树构建完成后，和DOM一起生成渲染树 
-  布局（layout）：计算出每个节点在屏幕中的位置 
-  显示（painting）：页面渲染到屏幕上 

 DOM树和渲染树的区别： 

 DOM树与HTML标签是一一对应的，包括head和隐藏标签 

 渲染树不包括head和隐藏元素，每个节点都有对应的css属性 

####  css会阻塞DOM解析吗？ 

 对于一个HTML文档来说，不管是内联还是外联的CSS，都会阻碍后序的DOM渲染，但不会阻塞后序的DOM解析。 

 当css文件放在head标签中时，虽然css解析也会阻塞后序dom的渲染，但是在解析css的同时也在解析dom，所以等到css解析完毕就会逐步的渲染页面了。 



####  3. 前后端如何通信 

 Ajax、WebSocket、CORS 

 WebSocket指的是允许服务器主动向[客户端]()推送信息，websocket是一个全双工协议，就是通信双方是平等的，可以相互发送信息。浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，进行双向数据传输。 

 Ajax的readystate值：0：未初始化，即请求还没初始化；1：正在加载，即已建立服务器连接；2：加载成功，即请求已接受；3：正在交互，即正在处理请求；4：完成，即请求已完成且响应已准备好。 

 Ajax会自动带上同源的cookies，跨域时不会带上cookies。 

 若想在跨域时携带cookies，则需要在[前端]()设置withCredentials为true，同时在服务器端header设置Across-Control-Allow-Credentials为true。 。 

####  5. Cookies、Session 

 应用场景：当我们第一次登陆了某个网站之后验证了身份信息，之后再次登陆时不需要验证可以直接登陆，这时候就用到了cookies。例如场景为购物车时，添加了商品之后[客户端]()处就可以知道添加了哪些商品，而服务器如何判别呢，所以也需要储存一些信息就用到了session。 

#####  cookies 

 服务器通过设置set-cookies这个响应头，将cookies信息返回给浏览器，浏览器将响应头中的cookies信息保存在本地中，当下次向服务器发送http请求时，浏览器会自动保存这些cookies信息到请求头中。 

 通过cookies服务器就会识别浏览器，从而保证返回的数据是这个用户的。 

#####  cookies属性 

 max-age：过期时间有多长，默认在浏览器关闭时失效。 

 expires：设置过期时间。 

 secure：表示cookies只会在https的时候才会发送。 

 httponly：表示js脚本不能获取cookies，防止攻击者盗用用户cookies 

 domain：表示该cookies对于哪个域是有效的。 

#####  session 

 存放在服务器的一种用来存放用户数据的结构。浏览器第一次发送请求时服务器自动生成了hashtable和sessionid来唯一表示这个hash表，并将sessionid存放在cookies中通过响应发送到浏览器，浏览器第二次请求时会将前一次服务器响应的sessionid随着cookies发送到服务器端，服务器从请求中提取sessionid，并和保存的所有sessionid进行对比，找到这个用户所对应的hash表。 

 当用户在应用程序的不同web页面间跳转时，存储在session对象中的变量不会丢失而是在整个用户会话中一直存在下去。并且session依赖于cookies，因为sessionid是保存在cookie中的。 

#####  session和cookies的区别 

1.  cookies是保存在[客户端]()的，而session是保存在服务器端的。 
2.  cookies因为在[客户端]()保存，所以容易被窃取，为了保证安全，应将数据存放在session中。 
3.  session因为保存在服务器端，因此会消耗大量服务器资源，而cookies在每次http请求中都会带上，因此影响网络性能。 







#####  HTTP CSP内容安全策略 

 内容安全策略主要是限制资源获取，并报告资源获取越权。 

 可以再http头部设置Content-Security-Policy: default-src http: https：表示只允许通过http、https的方式加载资源； 

 还可以通过meta标签内设置http-equiv=’Content-Security-Policy'； 

#####  HTTP2 

 相比于http1来说大幅度提高了web的性能。并且采用二进制的格式传输，取代了http1的文本格式，二进制格式解析更高效。多路复用替代了http1中的阻塞机制，所有的相同域名请求都通过同一个TCP连接并发完成。 

 二进制传输： 

 HTTP2中的加强性能的核心点在于此，大幅度提高了web性能。采用二进制格式传输，取代了http1中的文本格式，二进制格式解析更高效。 

 多路复用： 

 在http1中，并发多个请求需要多个TCP连接，浏览器为了控制资源会有6-8个TCP连接限制。 

 在http2中，首先同域名下所有通信都在单个连接上完成，消除了因多个TCP连接而带来的延迟和内存消耗。单个连接上可以并行交错的请求和响应，之间互不干扰。 

 在HTTP2中有两个非常重要的概念，分别是帧和流，帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。多路复用就是在一个TCP连接中可以存在多个流，也就是可以发送多个请求，通过对帧的标识知道属于哪个请求，通过这个技术，可以避免http旧版本中的队头阻塞问题，极大的提高传输性 

 Header压缩： 

 在http1中，我们使用文本的形式传输header，在header携带cookies的情况下，可能每次都要重复传输几百到几千的字节。 

 而在http2中，使用header压缩可以减少每次传输的大小，在两端维护了索引表，用于记录出现过的header，在之后的传输过程中就可以传输已经记录过的header键名，对端收到数据后就可以通过键名找到对应的值。 

 服务器端Push 

 在http2中，服务器可以再[客户端]()某个请求之后主要推送其他资源。 

 例如某些资源[客户端]()是一定会请求的，这时就可以采取服务器端push技术，提前给[客户端]()推送必要的资源，这样就可以节省一些请求时的开销减少一些延迟时间。 

###  7. HTTPS 

 http默认端口为80，对于传输采用不加密的方式，而https默认端口为443，对于传输的数据进行加密传输。 

#####  对称加密： 

 又称私钥加密，即信息的发送方和接收方使用同一个密钥去加密和解密数据，对称加密的特点是[算法]()公开，加密和解密的速度快，适合于大数据量进行加密。加密过程中的私钥与解密过程中的私钥是同一个密钥，因此成为对称加密，由于对称加密的[算法]()公开，因此密钥一旦被泄漏，那么密文就很容易被破解，所以对称加密的缺点是密钥安全管理困难。 

#####  非对称加密： 

 又称为公钥加密，与对称加密相比，安全性更高，非对称加密使用一对密钥，分别为公钥和私钥，且二者成对出现，私钥被自己保存，不能对外泄露，公钥指的是公共的密钥，任何人都可以获取。用公钥和密钥中的任何一个进行加密，用另一个进行解密。缺点是加密和解密的时间长，速度慢，只适合对少量数据进行加密。 

#####  HTTPS通信过程： 

 HTTPS协议=HTTP协议+SSL/TLS协议，HTTPS为了兼顾安全与效率，同时使用了对称加密和非对称加密。具体是数据是利用对称加密进行传输，而对称加密的过程需要[客户端]()的一个密钥，为了确保能把密钥安全传输到服务器端，采用非对称加密的方式去对该密钥再进行加密传输，总的来说，就是对数据进行对称加密，而对称加密所需的密钥通过非对称加密传输。 

#####  HTTPS请求过程：共四次握手 

1.  首先用户向服务器端发送HTTPS请求，请求到服务器端的443端口上。 
2.  服务器端有一对密钥，分别为公钥和私钥，私钥由服务器端自身保存并且不可泄露，公钥可以传递给任何人。 
3.  服务器端向[客户端]()发送公钥 
4.  [客户端]()接收到公钥之后，首先检测公钥是否合法，如果不合法则此次HTTPS传输无效，如果公钥合格，就会生成一个随机值，这个随机值就是用于进行对称加密的密钥，我们成它为[客户端]()密钥，主要是为了和服务器端上的密钥进行区分，然后用服务器端传递过来的公钥对这个[客户端]()密钥进行非对称加密，这样[客户端]()密钥就变成了密文，然后再传递给服务器端。 
5.  服务器端接收到密文之后，用私钥对其进行非对称加密，获取到明文就是[客户端]()密钥，然后用[客户端]()密钥对数据进行对称加密，然后将加密后的密文再传递给[客户端]()。 
6.  [客户端]()接收到服务器端传递过来的密文，用[客户端]()密钥进行对称解密，得到服务器端传递过来的数据。 

###  8. Restful 

 表述性状态转移，一组架构约束条件和原则。如果一个架构符合Rest的约束条件和原则，我们就称它为Restful架构。 

 基本概念：在restful中，一切的内容都被认为是一种资源。每个资源都由URI唯一标识。使用统一的接口处理资源请求（POST/PUT/GET/DELETE/HEAD）。无状态（每次请求之前是无关联，没有session） 

 HEAD：主要用于确认URL的有效性以及资源更新的日期时间等。 

 PATCH：新引入的，对PUT方法的补充，用来对已知资源进行局部更新。 

###  9. 资源表述 

 [客户端]()获取的是资源的表述，资源在外界的具体呈现，可以有多种表述形式，在[客户端]()和服务器端之间传送的也是资源的表述，而不是资源本身。文本资源可以采用html、xml、json等格式，图片可以采用jpg、png展现出来。 

 资源的表述包括数据和描述数据的元数据，例如content-type就是元数据属性。 

 [客户端]()如何知道服务器端提供哪种表述形式呢？ 

 可以通过HTTP内容协商，[客户端]()可以通过在请求头中通过Accept请求一种特定格式的表述，服务器端则通过Content-Type告诉[客户端]()资源的表述形式。 

###  10. TCP 

 TCP又叫传输控制协议，是面向连接的，可靠的，基于字节流的传输协议。在基于TCP进行通信时，通信双方需要先建立一个TCP连接，建立连接需要经过三次握手，断开连接需要经过四次握手。 

 TCP头部一些字段： 

-  序列号（seq）：这个序号保证了TCP传输的报文是有序的，对端可以通过序号来拼接报文字段。 
-  确认号：这个序号表示数据接接收端期望接收的下一个字节的编号是多少， 
-  窗口大小（Window Size）：表示还能接收多少字节的数据，用于流量控制。 
-  标识符： 
  -  ACK=1：该字段为表示确认号字段是有效的，此外TCP还规定在连接建立后传送的所有报文必须将ACK设为1. 
  -  SYN=1：当SYN=1，ACK=0时，表示当前报文段是一个连接请求报文，当SYN=1，ACK=1时，表示当前报文段是一个同意建立连接的应答报文。 
  -  FIN=1：该字段为一表示此报文段是一个释放连接的请求报文。 

####  三次握手： 

1.  第一次握手：SYN=1，seq=x。[客户端]()向服务器端发起连接请求报文段，该报文中包含自身的数据通讯初始序号，请求发送后，[客户端]()进入SYN-SENT状态。 
2.  第二次握手：SYN=1，ACK=1，确认序号=x+1，seq=y。服务器端收到连接请求之后，如果同意连接则会发送一个应答，该应答中也会包含自身的数据通讯初始号，发送完成后便进入SYN-RECEIVED状态。 
3.  第三次握手：ACK=1，确认序号=y+1，seq=x+1。[客户端]()收到连接同意的应答后，还要向服务器端发送一个确认报文，[客户端]()发送完这个报文段后便进入到ESTABLISHED状态，服务器端收到这个应答后也进入ESTABLISHED状态，此时连接建立成功。 

####  为什么不用两次握手？ 

 原因有二： 

1.  如果只有两次握手，那么服务器端不会知道是否[客户端]()能够建立连接，会对网络造成性能上的浪费。 
2.  如果只有两次握手，当第一次[客户端]()向服务器端发送的连接请求若没有丢失而是被阻塞在网络中会产生错误。这样[客户端]()长时间没有接受到服务器端传递过来的连接确认报文会再次发起请求连接报文给服务器，那么等到阻塞的报文畅通后，服务器端会响应给[客户端]()，因为只有两次握手这样就又会建立起连接，但这个请求已经报废了，会重复连接对网络资源的浪费。那若有三次握手，则[客户端]()即使收到服务器的确认报文也会认为这是报废的请求，而不会再次发起确认给服务器就不会建立连接，由于服务器收不到确认，就知道[客户端]()没有请求连接。 

####  四次挥手： 

1.  第一次挥手：如果[客户端]()认为数据发送完成，会向服务器端发送数据发送完成的请求字段。 
2.  第二次挥手：服务器收到连接释放请求，会告诉应用层要释放TCP连接，然后会发送ACK包给[客户端]()，进入CLOSE_WAIT状态，表示[客户端]()到服务器的连接已经释放，不接受[客户端]()发送的数据了。但TCP连接是双向的，所以服务器依旧可以发送数据给[客户端]()。 
3.  第三次挥手：服务器端如果还有数据没发送完毕会继续发送，完毕后会向[客户端]()发送连接释放请求，然服务器端进入LAST-ACK状态。 
4.  第四次挥手：[客户端]()收到释放请求后，会向服务器发送确认应答，此时[客户端]()进入TIME-WAIT阶段，这个状态会持续2MSL（最大生存期，指报文段在网络中生存的时间，超时会被抛弃）时间，若在该时间内没有服务器的重发请求的话，就进入CLOSED状态，当服务器端接收到确认应答后也进入CLOSED状态。 

####  为什么第四次挥手中[客户端]()进入TIME-WAIT状态要持续2MSL时间后再进入CLOSED状态？ 

 为了保证服务器能收到[客户端]()的确认应答，若[客户端]()发完确认应答之后直接进入CLOSED状态，若果[客户端]()的确认应答因为网络问题一直没有到达，那么就会造成服务器端不能正常关闭。若服务器端没有收到应答信息，会向[客户端]()发送超时重传，此时[客户端]()在2MSL时间内再次收到服务器的连接释放请求，便回再向服务器端重新发送应答信息。 

###  超时重传（ARQ）协议 

####  停止等待ARQ： 

 当发送端向接收端发送一个报文之后，都要停止等待接收端返回的确认报文，并启动一个定时器，如果在定时器时间内收到对端应答就取消定时器并发送下一段报文。 

 如果报文传输的过程丢失，这时候超时就会再次发送丢包的数据直到对端响应，所以需要每次都备份发送的数据。传输效率低，在良好的网络环境下每次都要发送报文都得等待对端的ACK 

####  连续ARQ： 

 在连续ARQ中，发送端拥有一个发送窗口，可以在没有收到应答的情况下持续发送窗口内的数据，这样相比停止等待ARQ协议来说减少了等待时间，提高了效率。 

####  滑动窗口： 

 发送端窗口包括已发送但还没收到应答的数据和可以发送但是未发送的数据。发送端窗口是由接收窗口剩余大小决定的，接收方会把当前接收窗口的剩余大小写入应答报文，发送端收到应答后根据该值和当前网络拥塞情况发送窗口的大小，所以发送窗口的大小是不断变化的。当发送端接收到应答报文中，会随之将窗口进行滑动。滑动窗口实现了流量控制机制，接收方通过报文告知发送方还可以发送多少数据，从而保证接收方能够来得及接收数据。 

####  流量控制机制： 

 [客户端]()通过发送速率的调整来保证接收方来得及接收，若发送的速率大于接收的速率，就会造成报文段的丢失。接收方主要是通过接收窗口来告诉发送方自己所能接收的大小，发送方根据接收方的接收窗口的大小来调整发送窗口的大小，以此来达到控制发送速率的目的。 

####  拥塞处理机制： 

 主要是根据网络中的拥塞情况来控制发送方数据的发送速率，如果网络处于拥塞状态，发送方就减小发送的速率，这样一方面可以避免增加网络中的拥塞程度，另一方面也是为了避免网络拥塞可能造成的报文段丢失。 

 TCP的拥塞控制机制主要使用了四个机制，分别是慢启动、拥塞避免、快速重传和快速恢复。 

 慢启动的基本思想是，就是在传输开始时发送方并不知道网络中的拥塞程度，因此先以较低的速率发送，先进性试探性发送请求，当接收到确认报文后就将发送窗口大小×2，以此类推以指数级速率增长，但不能没有限制，所以有一个阈值限制，当窗口的大小超过阈值限制时就会启动拥塞避免[算法]()。 

 拥塞避免[算法]()是每过一个往返时间窗口大小只加一，这样能够避免指数级增长导致网络拥塞，慢慢调整大小到最佳值。若在传输的过程中定时器超时，这时候TCP会认为网络拥塞了，会马上进入以下步骤：将阈值设置为原来的一半，然后将拥塞窗口的值设为减半后的阈值，然后开始执行阻塞避免[算法]()，使得拥塞窗口缓慢地加性增大。 

 快速重传：一旦接受端收到的报文出现失序的情况，接受端只会回复最后一个顺序正确的报文序号，如果收到三个重复的ACK，无需等待定时器超时再重发而是启动快速重传。 

###  11. UDP 

 用户数据报协议，UDP是一个无连接的，不可靠的，基于数据报的传输协议。应用场景：当强调输出性能而非完整性时，如音频和多媒体的实时传输，有个视频流传协议的实时传输就是基于UDP封装而来的。 

####  不可靠性 

1.  UDP是无连接的，也就是说不需要建立和断开连接。 
2.  UDP是不可靠的，它不会去备份数据，也不关心对方是否能收到数据。 
3.  UDP没有拥塞控制，一直以恒定的速度发送数据，即使网络条件不好，也不进行速率调整，这样造成的弊端就是在网络条件不好时可能导致丢包。 

####  高效性 

 因为UDP没有TCP那么复杂，不需要保证数据不丢失且有序到达，所以UDP的头部开销小，因为传输数据报文时是很高效的。 

 传输方式支持一对多，多对一，多对多，一对一的方式，也就是说UDP提供了单播、多播、广播的功能。 

###  从输入URL到页面加载完成的过程 

1.  在浏览器地址栏输入URL 
2.  首先判断是否有永久重定向（301） 
3.  浏览器查看资源是否有强缓存，若命中强缓存就直接从缓存中使用，若协商缓存则需要到服务器进行校验资源是否可用。 
   -  HTTP1.0提供expires，值为一个绝对时间表示缓存过期时间 
   -  HTTP1.1增加了一个cache-control：max-age，值为以秒为单位的最大缓存过期时间。还有no-cache，no-store，分别表示可以缓存但会立即失效和不能缓存。 
4.  浏览器解析URL获取协议，主机，端口，path。 
5.  浏览器组装一个HTTP（GET）请求报文。 
6.  DNS解析，查找过程如下： 
   -  首先查找浏览器缓存； 
   -  第二查找本机缓存 
   -  第三查找hosts文件 
   -  第四路由器缓存 
   -  第五ISP DNS缓存 
   -  第六DNS查询（递归查询、迭代查询） 
7.  端口建立TCP连接，三次握手： 
   1.  [客户端]()发送一个TCP的SYN=1，seq=x的连接请求到服务器端。 
   2.  服务器端返回SYN=1，ACK=x+1，Seq=Y的确认连接字段。 
   3.  [客户端]()收到确认连接字段后发生ACK=Y+1，seq=z 
8.  TCP连接建立后发起HTTP请求 
9.  服务器接收到请求并解析，将请求转发到服务程序。 
10.  服务器检查HTTP请求头部是否有缓存验证信息，如果缓存未过期，返回304状态码 
11.  处理程序读取完整请求并准备HTTP响应，同时可能需要查询数据库等操作 
12.  服务器将相应报文通过TCP连接发送会浏览器。 
13.  浏览器接收到HTTP响应，根据情况选择是否关闭TCP连接，若关闭的话四次挥手。 
    1.  浏览器端首先向服务器端发送数据已发送完毕的报文 
    2.  服务器端接收到之后，返回确认报文同意浏览器停止发送数据，但此时服务器端依旧可以接收未接收完的数据，并且可以返回数据给浏览器端。 
    3.  服务器端将所有数据返回给[客户端]()之后，向[客户端]()发送请求连接释放报文。 
    4.  [客户端]()收到连接释放报文后，向服务器端返回确认连接释放报文。 
14.  浏览器接收到服务端的响应报文后，会检查响应状态码，根据不同的状态码处理不同的情况。 
15.  如果资源可以缓存，进行缓存。 
16.  将响应内容进行解码。 
17.  根据资源类型决定如何处理。 
18.  若资源类型为html类型，解析html文档，构建DOM树，并下载相关资源，构造CSSOM树，执行js脚本。 
19.  首先构造DOM树 
20.  解析过程中如果遇到图片、样式表、js文件便启动下载 
21.  构建CSSOM树 
22.  根据DOM树和CSSOM树构建渲染树： 
    1.  从DOM树的根节点遍历所有可见节点。 
    2.  对每一个节点找到恰当的CSSOM规则并应用 
    3.  发布可视节点的内容和计算样式 
23.  js脚本解析： 
    1.  浏览器创建document对象并解析html，将解析的文本和节点添加到文档中。 
    2.  html解析器遇到没有defer和async属性的script时，将他们添加到文档中，然后去执行脚本语句。在脚本下载和执行时html解析器会暂停。直到script下载和执行完毕 
    3.  当解析器遇到async属性的script时，开始下载脚本但会继续解析文档，当脚本下载完毕时就会立刻回过头去执行该脚本，但是解析器不会停下来等它下载。 
    4.  当解析器遇到defer属性的script时，defer脚本会在文档解析完毕时按照顺序执行，并且可以访问完整文档。 
    5.  浏览器在document对象上触发DOMContentLoaded事件 
    6.  此时文档完全解析完成，浏览器可能还在等待图片等内容加载，等待这些内容完成载入并且所有异步脚本完成载入和执行之后，window会触发loaded事件 
24.  显示页面（html解析过程中会逐步显示页面）。 

###  12. 缓存 

####  1. 强缓存： 

 强缓存就是直接向浏览器缓存中查找结果，并且根据该结果的缓存规则决定是否使用该缓存的过程。主要有三种情况：1. 中不存在该缓存结果和缓存标识，强制缓存失效，则直接向服务器端发起请求。2. 存在该缓存结果和缓存标识，但结果已失效，只返回该缓存标识，强制缓存失效，则使用协商缓存。3. 存在该缓存结果和缓存标识，结果仍有效，使用强制缓存。 

 控制强制缓存的http头部字段为expires和cache-control。 

 Expires：是http1.0[中控]()制缓存的字段，值为服务器返回请求结果缓存的到期时间，是一个绝对值。缺点是假如[客户端]()和服务器端时间不同步，那么就产生误差，则强制缓存有效时间不准确。 

 Cache-Control：是到了http1.1中，Expires被Cache-Control取代，主要取值为： 

 no-cache：[客户端]()缓存内容，但是否使用缓存则需要经过协商缓存来验证决定。 

 no-store：所有内容都不会被缓存。 

 max-age：缓存内容将在多少秒失效。 

 public：所有内容都会被缓存（包括[客户端]()和服务器端） 

 private：所有内容只有[客户端]()可以缓存，是cache-control的默认值。 

####  2. 协商缓存 

 协商缓存就是浏览器缓存中的缓存标识失效，即强制缓存失效后，浏览器携带缓存标识向服务器端发起请求。由服务器根据缓存标识决定是否使用协商缓存，主要有两种情况 

1.  协商缓存生效，返回304状态码，即该自愿无更新。 
2.  协商缓存失效，返回200状态码和请求结果，即该资源更新了返回更新后的资源。 

 协商缓存的标识也是在响应报文的HTTP头部中和请求结果一起返回给浏览器端，主要字段有Last-Modified、If-Modified-Since和Etag、If-None-Match。其中Etag、If-None-Match比Last-Modified、If-Modified-Since优先级高。 

 Last-Modified/If-Modified-Since 

 Last-Modified是服务器响应请求时，返回该资源文件在服务器最后被修改的时间。 

 If-Modified-Since是[客户端]()再次发起该请求时，携带上次请求返回的Last-Modified值，通过此字段值告诉服务器该资源上次请求返回的最后被修改时间。服务器收到这个请求头和该资源在服务器的最后修改时间进行对比，若服务器的资源修改时间大于If-Modified-Since，则说明资源被更新，需要重新返回资源，状态码为200，否则则返回304，代表资源无更新，可继续使用缓存文件。 

 Etag/If-None-Match：Etag是服务器响应请求时，返回当前资源文件的唯一标识并由服务器端产生。If-None-Match是[客户端]()再次发起请求时，携带上次请求返回的唯一标识Etag值，通过此字段告知服务器该资源上次请求返回的唯一标识值，服务器收到后与该资源在服务器的Etag进行对比，若一致则说明资源无更新，返回304状态码，若不一致说明资源更新，返回更新的资源以及200状态码。 

###  13. 跨域 

 同源策略：端口、域名、协议相同。目的是为了保证用户信息的安全，防止恶意网站窃取数据。 

####  限制范围： 

 Cookies、LocalStorage、IndexDB无法读取；DOM无法获取；AJAX请求不能发送。 

####  CORS跨域资源请求 

 浏览器在请求一个跨域资源时，如果是ajax请求会在请求头部添加一个origin字段，但它目前还不知道目标服务器端是否允许跨域请求，浏览器向服务器端发送ajax请求，如果服务器端返回的头中有Access-Control-Allow-Origin字段，并且值为允许访问的网站或者*字符的话，就允许跨域请求，否则会把请求内容忽略掉，并且在控制台报错。 

####  CORS限制 

 允许的请求方法：GET \ POST \ HEAD 

 允许的content-type：text/plain, multipart/form-data, application/x-www-form-urlencoded。其他请求方式和其他content-type需要通过域请求验证后然后才能发送 

####  CORS预请求 

 跨域资源共享标准新增了一组HTTP首部字段，允许服务器声明哪些源站有权访问哪些资源。服务器在HTTP头部加入允许请求的方法和content-type后，其他指定的方法和content-type就可以成功请求了。 

 'Access-control-allow-headers': '允许Content-type' 

 ’Access-Control-Allow-Methods‘：’允许的请求方法‘ 

 ’Access-Control-Max-Age‘：’预请求允许其他方法和类型传输的时间‘ 

####  JSONP跨域 

 浏览器上虽然有同源限制，但是像script标签，link标签，img标签，iframe标签这种在标签上通过src地址来加载一些内容的时候浏览器是允许进行跨域请求的。 

 所以JSONP的原理就是： 

-  创建一个script标签，这个script标签的src就是请求的地址 
-  这个script标签插入到DOM中，浏览器就根据src地址访问服务器资源 
- ​    返回的资源是一个文本，但是因为是在script标签中，浏览器会执行它。   
- ​    而这个文本恰好是函数调用的形式，也就是函数名（数据），浏览器会把它当做JS代码来执行调用这个函数。   
- ​    只要提前约定好这个函数名，并且这个函数存在于window对象中，就可以把数据传递给处理函数。