var Background = {
	queue: [],
	start: function(queue){
		if(typeof queue == 'undefined') queue = Background.queue;
		Background.queue = queue;

		var body = document.getElementsByTagName('body')[0];
		var bg_dom = document.getElementById('background');
		if(bg_dom == null){
			bg_dom = document.createElement('div');
			bg_dom.id = 'background_run';
			body.appendChild(bg_dom);
		}

		var script;

		for(var i in queue){
			if(typeof background[Tools.capitalize(queue[i])] == 'undefined'){
				script = document.createElement('script');
				if(queue[i][0] == '/'){
					script.src = 'background'+(queue[i])+'.js';
				}else{
					script.src = 'lib/littlee/background/'+(queue[i])+'.js';
				}
				body.appendChild(script);
			}
		}
	}
};
background = {};
Background.start();