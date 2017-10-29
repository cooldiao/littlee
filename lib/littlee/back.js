var Back = {
	store: [],
	flag: true,
	pop: function(){
		Back.store.pop();
	},
	back: function(){
		if(!Back.flag) return;
		Back.flag = false;
		if(Back.store.length <= 0){
			Back.flag = true;
			return;
		}
		try{
			Back.store.pop();
			(Back.store.pop())();
		}catch(e){}
		Back.flag = true;
	},
	flush: function(){
		Back.store = [];
		app.start();
	},
	push: function(data, func){
		history.pushState({back:true}, '', '');
		Back.store.push(func);
	},
	refresh: function(param){
		if(!param){
			(Back.store.pop())();
		}else{
			(Back.store.pop())(param);
		}
	}
};