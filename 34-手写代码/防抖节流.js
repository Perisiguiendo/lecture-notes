// 1. 防抖
// * 频繁点击的最后一次点击后的 delay ms后才会执行
let debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

// * 第一次立即执行，然后，
function debounce(func, delay, immediate){
  let timer = null;
  return function(){
      let context = this;
      let args = arguments;
      if(timer) clearTimeout(timer);
      if(immediate){
          let doNow = !timer;
          timer = setTimeout(function(){
              timer = null;
          },delay);
          if(doNow){
              func.apply(context,args);
          }
      }else{
          timer = setTimeout(function(){
              func.apply(context,args);
          },delay);
      }
  }
}





// 2. 节流
let throttle = function(func, delay){
  let prev = Date.now();
  return function(){
      let context = this;
      let args = arguments;
      let now = Date.now();
      if(now-prev>=delay){
          func.apply(context,args);
          prev = Date.now();
      }
  }
}
