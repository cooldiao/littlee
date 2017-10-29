var Cron = {
	queue: ['cNetwork'],
	isStop: false,
	start: function(queue){
		if(typeof queue == 'undefined') queue = Cron.queue;
		Cron.queue = queue;

		var body = document.getElementsByTagName('body')[0];
		var cron_dom = document.getElementById('cron');
		if(cron_dom == null){
			cron_dom = document.createElement('div');
			cron_dom.id = 'cron';
			body.appendChild(cron_dom);
		}

		var script;

		for(var i in queue){
			if(typeof cron[Tools.capitalize(queue[i])] == 'undefined'){
				script = document.createElement('script');
				if(queue[i][0] == '/'){
					script.src = 'cron'+(queue[i])+'.js';
				}else{
					script.src = 'lib/littlee/crons/'+(queue[i])+'.js';
				}
				body.appendChild(script);
			}
		}

		var func = function(){
			if(Cron.queue.isStop) return;
			var _task;
			for(var i in Cron.queue){
				_task = window.cron[Tools.capitalize(Cron.queue[i])];
				if(typeof _task != 'undefined'){
					_task.run();
				}
			}
			setTimeout(func, 1000);
		}
		func();
	},
	stop: function(){
		Cron.isStop = true;
	},
	restart: function(){
		Cron.isStop = true;
		setTimeout(function(){
			Cron.isStop = false;
			Cron.start();
		}, 30);
	}
};
cron = {};
Cron.start();