let arr = [2, 4, [4, 7], 6, [4, 6, "7"]];

// 1. flat
let flatArr1 = arr.flat(Infinity)
console.log("=====================");
console.log(flatArr1);

// 2. concat
let flatArr2 = [].concat(...arr);
console.log("=====================");
console.log(flatArr2);

// 3. 正则 + JSON.stringify     输出后的内容全为字符
let flatArr3 = JSON.stringify(arr).replace(/\[|\]/g, '').split(',');
console.log("=====================");
console.log(flatArr3);

// 4. toString                  输出后的内容全为字符
let flatArr4 = arr.toString().split(',');
console.log("=====================");
console.log(flatArr4);

// 5. join + split              输出后的内容全为字符
let flatArr5 = arr.join().split(',');
console.log("=====================");
console.log(flatArr5);

// 6. reduce
function flatten(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, [])
}
let flatArr6 = flatten(arr);
console.log("=====================");
console.log(flatArr6);


// 7. 递归的方式
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
function flat(arr) {
  let temp = [];
  arr.forEach(v => {
    if (Array.isArray(v)) {
      temp = temp.concat(flat(v))
    } else {
      temp.push(v)
    }
  })
  return temp;
}
let flatArr7 = flat(arr);
console.log("=====================");
console.log(flatArr7);