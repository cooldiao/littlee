var Event = {
	events: [],
	_init: function(data){
		$('.query').bind('click', Ajax.query);
		$('.mui-switch:not(.off-switch)').bind('click', function(){$(this).toggleClass('mui-active');});
		$('a').bind('click', Ajax.query);
		Plugin.init(data.plugin);
	},
	_destroy: function(){
		Plugin.destroy();
		$('a').unbind('click', Ajax.query);
		$('.mui-switch:not(.off-switch)').unbind('click');
		$('.query').unbind('click', Ajax.query);
	},
	flush: function(){
		//清除不需要的事件
		for(var i in Event.events){
			var _t = Event.events[i]
			$(_t['o']).unbind(_t['e'], _t['f']);
		}
		Event._destroy();
		Event.events = [];
	},
	push: function(o, e, f){
		Event.events.push({o:o, e:e, f:f});
		//解决a标签锚点问题
		return false;
	},
	pushAll: function(d){
		for(var i in d){
			if(i === 0 || parseInt(i)>0)
				Event.events.push(d[i]["o"], d[i]["e"], d[i]["f"]);
		}
		return false;
	},
	bind: function(o, e, f){
		Event.events.push({o:o, e:e, f:f});
		$(o).bind(e, f);
		//解决a标签锚点问题
		return false;
	},
	bindAll: function(d){
		var _event;
		for(var i in d){
			if(i === 0 || parseInt(i)>0){
				_event = d[i];
				Event.events.push({o:_event["o"], e:_event["e"], f:_event["f"]});
				$(_event["o"]).bind(_event["e"], _event["f"]);
			}
		}
		//解决a标签锚点问题
		return false;
	},
	run: function(data){
		Event._init(data);
		var _t;
		for(var i in Event.events){
			_t = Event.events[i];
			if(i === 0 || parseInt(i)>0)
				$(_t['o']).bind(_t['e'], _t['f']);
		}
	}
};
