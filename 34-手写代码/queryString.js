let url = 'http://www.inode.club?name=koala&study=js&study=node';

function queryString(url) {
  let params = url.split('?');
  if (!params[1]) {
    return {};
  }
  let obj = {};
  let paramObj = params[1].split('&');
  let temp = null, key = null, value = null;
  paramObj.forEach(v => {
    temp = v.split('=');
    key = temp[0];
    value = temp[1];
    if (obj[key]) {
      obj[key] = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
      obj[key].push(value);
    } else {
      obj[temp[0]] = temp[1];
    }
  })
  return obj;
}

console.log(queryString(url));