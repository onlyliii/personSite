function ajax(options) {
	options = options || {};
	options.data = options.data || {};
	options.timeout = options.timeout || 0;
	options.type = options.type || 'get';

	options.data.t = Math.random();
	var arr = [];
	for(var key in options.data){
		arr.push(key + '=' + encodeURIComponent(options.data[key]));
	}
	var str = arr.join('&');
	var oAjax = null;
	if(window.XMLHttpRequest){
		oAjax = new XMLHttpRequest();
	}else{
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if (options.type=='get') {
		oAjax.open('get',options.url + '?' + str,true);
		oAjax.send();
	} else {
		oAjax.open('post'.options.url,true);
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		oAjax.send(str);
	}
	oAjax.onreadystatechange = function () {
		if(oAjax.readyState == 4){
			clearTimeout(timer);
			if(oAjax.status >= 200 && oAjax.status < 300 || oAjax.status ==304){
				options.success &&options.success(oAjax.responseText);
			}else{
				options.error && options.error(oAjax.status);
			}
		}	
	};
	if(options.timeout){
		var timer = setTimeout(function(){
			alert('超时了！');
			oAjax.abort();
		},options.timeout);
	}
}