var View = {
	container: $('#app'),
	render: function(data){
		//清除事件
		Event.flush();
		//渲染页面
		Head.set(data.head);
		(!!data) && (Data.view = data);
		data = Data.view;
		var time = (new Date()).getTime()/1000|0;
		if(typeof data.data == 'undefined') data.data = {};
		data.data.time = time;
		data.data._hash_ = Ajax._hash_;
		data.data.user = Data.user;
		data.data.window = window;
		var html = template(data.template, data.data);
		$('.myapp').hide();
		if(!data.cachePage){
			if(Check.empty(data.container)){
				(!data.append) && View.container.empty();
				View.container.append(html);
			}else{
				(!data.append) && $(data.container).empty();
				$(data.container).append(html);
			}
			$('#app').show();
		}else{
			if($('#' + data.cachePage).length<1){
				$('body').append('<div class="myapp" id="'+ data.cachePage +'"></div>');
				var container = $('#' + data.cachePage);
				container.append(html).show();
			}else{
				$('#' + data.cachePage).show();
			}
		}
		((!data.append) && $('.myapp').scrollTop(0)) || ($('.myapp').scrollTop($('.myapp').scrollTop()));
		if(!data.append){
			$(window).scrollTop(0);
		}
		// 防止由于前一个页面scroll大于当前页面而提前触发down-more插件，从而报错
		setTimeout(function(){
			Menu.set(data.menu);

			//监听事件
			Event.run(data);
		}, 20);
	},
	toggleClass: function(d){
		for(var i in d){
			for(var j in d[i]){
				$(d[i][j]).toggleClass(i);
			}
		}
	}
};