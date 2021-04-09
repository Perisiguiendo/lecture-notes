/**
 * 
 * @param {Function} func 
 */
function _new(func) {
  let obj = {};
  if (func.prototype !== null) {
    obj.__proto__ = func.prototype;
  }
  let ret = func.apply(obj, Array.prototype.slice.call(arguments, 1));
  let type = typeof ret;
  if ((type === "object") || (type === "function") && ret !== null) {
    return ret;
  }
  return obj;
}

function obj(name) {
  this.name = name;
  this.color = "red";
}
let a = _new(obj, "a");
let b = _new(obj, "b");
console.log(a, b);
