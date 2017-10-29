var Behavior = {
	s: [],
	lastflushtime: (new Date()).getTime(),
	push: function(data){
		data.time = (new Date()).getTime();
		data.location = Location.location;
		Behavior.s.push(data);
	},
	flush: function(){
		ret = Behavior.s;
		Behavior.s = [];
		return ret;

	}
}