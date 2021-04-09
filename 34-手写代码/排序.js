// function quickSort(arr) {
//   let len = arr.length;
//   if (len <= 1) {
//     return arr;
//   }
//   let pivotIndex = Math.floor(len / 2);
//   let pivot = arr.splice(pivotIndex, 1)[0];
//   let left = [];
//   let right = [];
//   for (let i = 0; i < len; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }
//   return quickSort(left).concat([pivot], quickSort(right));
// }

function swap(arr, i, j) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}
/**
 *
 * @param {*} arr  数组
 * @param {*} start  起始下标
 * @param {*} end  结束下标 + 1
 */
function divide(arr, start, end) {
  const x = arr[end - 1];
  let i = start - 1;
  for (let j = start; j < end - 1; j++) {
    if (arr[j] <= x) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, end - 1);
  return i + 1;
}

/**
 * @param {*} arr  数组
 * @param {*} start  起始下标
 * @param {*} end  结束下标 + 1
 */
function qsort(arr, start = 0, end) {
  end = end || arr.length;
  if (start < end - 1) {
    const q = divide(arr, start, end);
    qsort(arr, start, q);
    qsort(arr, q + 1, end);
  }
  return arr;
}

let arr = [12, 33, 4, 6, 67, 78678, 2432, 423, 6, 457, 54, 542, 534, 6, 32];
console.log(qsort(arr));