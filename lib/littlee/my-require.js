var myRequire = function(arr, callback){
	var script = null;
	var require_dom = document.getElementById('my_require');
	if(require_dom == null){
		$('body').append('<div id="my_require"></div>');
		require_dom = document.getElementById('my_require');
	}
	for(var i in arr){
		script = document.createElement('script');
		if(arr[i][0] != '/'){
			script.src = 'lib/littlee/plugins/' + arr[i] + '.js';
		}else{
			script.src = arr[i] + '.js';
		}
		require_dom.appendChild(script);
	}
	var objs = [];
	var _obj = null;
	for(var j in arr){
		_obj = arr[j];
		_obj = _obj.split('/');
		_obj = _obj[_obj.length - 1].split('-');
		var obj = [];
		for(var j in _obj){
			obj.push(Tools.capitalize(_obj[j]));
		}
		objs.push(obj.join(''));
	}
		
	var func = function(){
		for( var i in objs){
			if(typeof window[objs[i]] == 'undefined'){
				setTimeout(func, 2);
				return;
			}
		}
		callback();
	}
	func();
};