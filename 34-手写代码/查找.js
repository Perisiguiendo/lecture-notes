/**
 * 二分查找
 * @param {Array} arr 
 * @param {*} val 
 * @param {Number} start  
 * @returns 
 */
function binarySearch(arr, val, start = 0, end = arr.length) {
  if (start > end) {
    return -1;
  }
  let midIndex = Math.floor((start + end) / 2);
  let mid = arr[midIndex];
  if (mid === val) {
    return midIndex;
  }
  if (val < mid) {
    return binarySearch(arr, val, 0, midIndex - 1);
  }
  if (val > mid) {
    return binarySearch(arr, val, midIndex + 1, end);
  }
  return -1;
}

// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(binarySearch(arr, 7, 3)); // 6

function repeatSearch(arr) {
  let result = arr.filter(v => arr.indexOf(v) !== arr.lastIndexOf(v));
  return [...new Set(result)];
}
let arr = [1, 2, 4, 4, 3, 3, 1, 5, 3];
console.log(repeatSearch(arr))

function quickSort() {

}