class myPromise {
  constructor(fn) {
    this.status = 'pending';
    this.value = null;

  }
}

Promise.prototype._all = function (promises) {
  let count = 0;
  let result = [];
  return new Promise((resolve, reject) => {
    promises.forEach(v => {
      v.then(res => {
        result.push(res);
        count++;
        if (count === promises.length) resolve(res);
      })
    })
  })
    .catch(err => {
      reject(err)
    })
}

Promise.prototype._race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(v => v.then(resolve, reject));
  })
}

Promise.prototype._resolve = function (res) {
  return new Promise((resolve, reject)=>{
    resolve(res)
  })
}

Promise.prototype._reject = function (res) {
  return new Promise((resolve, reject)=>{
    reject(res)
  })
}