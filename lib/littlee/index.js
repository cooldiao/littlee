var components = ['data', 'fs', 'validate', 'conf', 'my-require', 'login', 'head', 'err-report', 'menu', 'iscroll', 'template', 'util', 'back', 'cron', 'plugin', 'behavior', 'event', 'view', 'ajax', 'background'];
(function(components){
	var littlee = document.getElementById('littlee');
	var body = document.getElementsByTagName('body')[0];
	if(littlee == null){
		littlee = document.createElement('div');
		littlee.id = 'littlee';
		body.appendChild(littlee);
	}
	var app = document.getElementById('app');
	if(app == null){
		app = document.createElement('div');
		app.id = 'app';
		body.appendChild(app);
		$('#app').addClass('myapp');
	}
	var func = function(){
		if(components.length > 0){
			var script = document.createElement('script');
			script.src = 'lib/littlee/'+components.shift()+'.js';
			script.onload = func;
			littlee.appendChild(script);
		}
	}
	$('html').css('height', $(window).height());
	func();
}(components));
