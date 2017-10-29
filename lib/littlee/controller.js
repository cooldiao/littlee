var Controller = {
	init: function(controllers){
		controllers = controllers.split(',');
		for(var i in controllers){
			controllers[i] = 'controller/c-'+ controllers[i];
		}
		myRequire(controllers, function(){});
	}	
};