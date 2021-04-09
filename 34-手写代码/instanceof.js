function instanceOf(left, right) {
  let proto = left.__proto__;
  let prototype = right.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}

let a = [];
console.log(instanceOf(a, Array));
function Person() {}
const p1 = new Person();
const n1 = new Number()

console.log(p1 instanceof Person) // true
console.log(n1 instanceof Person) // false

console.log(instanceOf(p1, Person)) // true
console.log(instanceOf(n1, Person)) // false