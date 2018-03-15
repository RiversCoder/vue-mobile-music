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