var Collect = {
	run: function(){
		var _time = (new Date()).getTime();
		if((_time - Behavior.lastflushtime) > 120000 || Behavior.s.length > 20){
			var logs = Behavior.flush();
			Collect._store(logs);
		}
	},
	_store: function(logs){
		
	}
};
cron.Collect = Collect;