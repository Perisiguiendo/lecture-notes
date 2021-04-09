Function.prototype.new_call = function (context = window) {
  context.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.new_apply = function (context = window) {
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
}

Function.prototype.new_bind = function () {
  if (typeof this !== 'function') throw 'caller must be a function';
  const fn = this;
  return function () {
    return fn.call(context, ...args, ...arguments)
  }
}

let obj = {
  a: 111,
  d: {
    e: '3344'
  },
  func: function (arr) {
    console.log(arr);
    console.log(this.a);
  }
}

obj.func([22]);
let fun = obj.func;
fun.new_apply(obj, [1,2,3]);
