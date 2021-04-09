// 1. 浅拷贝
// Object.assign()
// Array.prototype.slice()
// Array.prototype.concat()
// ... 如果有引用类型就是浅拷贝

// JSON.parse(JSON.stringify())






function deepclone(obj) {
  let temp;
  let typeOfObj = type(obj);
  if (typeOfObj === "Object") {
    temp = {};
    for (let i of Object.keys(obj)) {
      temp[i] = deepclone(obj[i])
    }
  } else if (typeOfObj === "Array") {
    temp = [];
    for (let i in obj) {
      temp[i] = deepclone(obj[i])
    }
  } else if ((typeOfObj !== "Object") || (typeOfObj !== "Array")) {
    return obj;
  }
  return temp; // !!!!
}

// [object Object]
function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

let a = {
  a: 1,
  e: { m: function () { } },
  r: { j: { n: 9 }, p: "llll" },
  c: [1, 2],
  d: Symbol(2),
}

let b = deepclone(a);
console.log(a);
console.log(b);
a.c[0] = "sss";
console.log(a);
console.log(b);
console.log(a == b);
console.log(a === b);
let m = { ...a };
console.dir(m);
a.r.j.n = 10;
console.log(a);
console.log(m);