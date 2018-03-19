export function addClass(el,className)
{   
    let newClass = el.className;

    if(!hasClass(el,className))
    {
        newClass += ' ' + className;
    }

    el.className = newClass;
}

export function hasClass(el,className)
{
    let regExp = new RegExp('(^|\\s)'+className+'(\\s|$)'); 

    return  regExp.test(el.className);
}

export function getsetData(el,name,val){
	
	const prefix = 'data-'+ name

	if(!!val){
		return el.setAttribute(prefix,val)
	}else{
		return el.getAttribute(prefix)
	}
}

let elemStyke = document.createElement('div').style;

//获取可用浏览器版本属性
var version = (()=>{

  let vers = {
    webkit: 'webkitTransformt',
    moz: 'mozTransform',
    o: 'oTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for(let key in vers){
    if(elemStyke[vers[key]] !== undefined){
      return key
    }
  }
  return false

})()


export function prefixBrowserVersion(style){

  if(version === false){
    return false
  }

  if(version === 'standard'){
    return style
  }

  return version + style.chatAt(0).toUppercase() + style.substr(1)
}