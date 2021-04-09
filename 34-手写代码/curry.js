/**
 * 
 * @param {Function} fn 
 * @param {*} args 
 * @returns 
 */
function curry(fn, args) {
  let length = fn.length;
  args = args || [];
  return function () {
    _args = args.concat(Array.prototype.slice.call(arguments));
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}

function add(a, b, c, d) {
  return a + b * c / d;
}

// let newFunc = curry(add);



const curry1 = (fn, arr = []) => (...args) => (
  arg => arg.length === fn.length ? fn(...arg) : curry(fn, arg)
)([...arr, ...args])

let newFunc = curry1(add);

// console.log(newFunc(2, 3, 4, 5));
// console.log(newFunc(2)(3)(4)(5));
// console.log(newFunc(2, 3)(4, 5));
// console.log(newFunc(2, 3)(4)(5));