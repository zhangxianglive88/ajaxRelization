window.jQuery = function(nodeOrSelector){
    let nodes = {}
    nodes.addClass = function(){}
    nodes.html = function(){}
    return nodes
}
window.$ = window.jQuery

// 先要创建一个jQuery对象，不然会提示undefined，然后在这个对象上创建一个属性ajax，
// 而这个ajax是一个函数，也就是下面要实现的一个函数
window.jQuery.ajax = function({method, url, requestBody, headers, successFn, failFn}){
    let request = new XMLHttpRequest(); 
    request.open(method, url) 
    for(let key in headers){
        let value = headers[key]
        request.setRequestHeader(key, value)
    }
    request.send(requestBody)  
    request.onreadystatechange = ()=>{  // 捕捉readyState的状态变化
        if(request.readyState === 4){
            if(request.status >= 200){
                successFn.call(undefined, request.responseText)
            }else if(request.status >= 400){
                failFn.callback(undefined, request)
            }
        }
    }
}

myButton.addEventListener('click', (e)=>{
    $.ajax({
        method:'post',
        url:'/xxx',
        requestBody:'a=2&&b=3',
        headers:{'zhangxiang':'18', 'Content-Type':'application/xxx-form-www-urlencoded'},
        successFn: (x)=>{console.log(x)},
        failFn: (x)=>{console.log(x)}
    })
})