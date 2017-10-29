var DownMore = {
	locked: false,
	callback: null,
	init: function(){
		$('.myapp:visible').unbind('scroll', DownMore.more).bind('scroll', DownMore.more);
	},
	destroy: function(){
		$('.myapp:visible').unbind('scroll', DownMore.more);
	},
	more: function(){
		var app = $('.myapp:visible');
		var down_tag = app.find('#down_tag');
		if(!DownMore.locked){
			if((app.scrollTop() + 5) >= (app[0].scrollHeight - app.height())){
				if(down_tag.attr('data-none') == 'true'){
					Tip.tip({content: '已经是最后一页了！'});
					return;
				}
				DownMore.locked = true;
				Tip.tip({content: '加载中。。。'});
				var page = down_tag.attr('page');
				if(page == null){
					page = 2;
				}else{
					page = (page|0) + 1;
				}
				down_tag.attr('afterQuery', 'plugins.DownMore.after_query');
				down_tag.attr('page', page);
				Ajax.query.call(down_tag);
			}
		}
	},
	after_query: function(data){
		DownMore.locked = false;
		if(!!data && !!data.status && data.status == true){
			var down_tag = $('.myapp:visible').find('#down_tag');
			if(data.data.list.length == 0){
				down_tag.attr('data-none', 'true');
			}
		}
	}
};
plugins.DownMore = DownMore;
DownMore.init();