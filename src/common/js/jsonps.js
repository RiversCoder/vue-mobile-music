import originJsonp from 'jsonp'


export function jsonp(url, data, option){
  url += (url.indexOf('?') < 0 ? '?' : '') + param(data)

  return new Promise((resolve,reject) => {
    originJsonp(url,option,(err,data) => {
      if(!err){
        resolve(data);
      }else{
        reject(err);
      }
    })
  })
}

export function param(data){

  let url = '';
  let value = '';
  
  for(var k in data)
  {
    value = data[k] !== undefined ? data[k] : '';
    url += ('&' + k + '=' + encodeURIComponent(data[k]));
  }

  return url ? url.substring(1) : '';
}


/*
  ajax({
      method: 'POST',
      url: 'test.php',
      data: {
          name1: 'value1',
          name2: 'value2'
      },
      success: function (response) {
         console.log(response)；
      }
  });
*/

export function ajax(opt)
{

  return new Promise((resolve,reject) => {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {};
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }var params = [];
    for (var key in opt.data){
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    }else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
     
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            resolve(xmlHttp.responseText);
        }
    };
    
  });
}


/*export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
*/