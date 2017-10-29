var Search = {
	old_keywords: '',
	page: 0,
	_next: true,
	result: [],
	url: '',
	init: function(){
		$('#search').val('');
		$('.myapp:visible, #head').find('#search').bind('keyup', Search._search).bind('blur', Search.close).bind('focus', Search._search).unbind('keydown').bind('keydown', function(e){
			if(e.which == 13){
				$('.search-in-map').click();
			}
		});
		$(document).bind('click', function(e){
			if($(e.target).closest('.search-group').length == 0){
				Search.close();
			}
		});
		$('.danmu-input').bind('keydown', function(e){
			if(e.which == 13){
				send();
			}
		});
	},
	_search: function(checkOld){
		var search = $('.myapp:visible, #head').find('.search-group');
		var keyword = search.find('input').val();
		if(keyword == Search.old_keywords && checkOld !== false){
			return;
		}
		Search.old_keywords = keyword;
		if(keyword == ''){
			Search.close();
			return;
		}
		// url = 'http://www.zhdt.gov.cn/ProxyHandler.ashx?URL=http%3A%2F%2F192.168.180.60%3A10087%2Fxsearch%3Fpage%3D1%26size%3D7%26district%3D-1%26key%3D' + keyword;
		var url = search.attr('url');
		if(url == null) url = search.attr('href');
		Search.url = url;
		if(url.indexOf('?') != -1){
			url += '&nolatlng=1&keywords='+keyword;
		}else{
			url += '?nolatlng=1&keywords='+keyword;
		}
		url += '&page='+ Search.page;
		var isquery = search.attr('isquery');
		var tpl = search.attr('template');
		if(!!isquery){
			search.attr('href', url);
			Ajax.query.call(search);
		}else{
			Ajax.get(url, {addlatlng: false, success: function(json){
				plugins.Search._result(tpl, json);
			}});
		}
	},
	_result: function(tpl, json){
		try{
			var data = json.data;
			if(typeof json.data == 'string'){
				data = {list: JSON.parse(data).data};
			}
			Search.result = data;
			if(data.list.length < 1) Search._next = false;
			var html = template(tpl, data);
			$('.myapp:visible, #head').find('#search_result').html(html).show();
			// $('.search-in-map').bind('click', Search._result_in_map);
			// $('.search-pre').bind('click', Search.pre);
			// $('.search-next').bind('click', Search.next);
		}catch(e){
			Tip.failure({content: '暂时无法搜索!'});
		}
	},
	_result_in_map: function(){
		Search._pre_map();
		// var result = Search.result.list;
		Ajax.query({method: "render", template: "index", head: "1,\""+$('.myapp:visible, #head').find('.search-group').find('input').val()+'" 的搜索结果',  cachePage: "map_page", plugin: "mmap,map-search", afterQuery: function(){
			// mwait(["Mmap"], function(){
			// 	var list=[],item,extent = {xmin:1000,xmax:0,ymin:1000,ymax:0};
			// 	for(var i in result){
			// 		item = result[i];
			// 		item.x = parseFloat(item.x);
			// 		item.y = parseFloat(item.y);
			// 		if(extent.xmin>item.x) extent.xmin = item.x;
			// 		if(extent.xmax<item.x) extent.xmax = item.x;
			// 		if(extent.ymin>item.y) extent.ymin = item.y;
			// 		if(extent.ymax<item.y) extent.ymax = item.y;
			// 		list.push({x: item.x, y: item.y, addr:item.address, name: Tools.addslashes(item.name), phone: item.phone, photo: item.photo});
			// 	}
			// 	extent.xmin -=0.1;
			// 	extent.xmax +=0.1;
			// 	extent.ymin -=0.1;
			// 	extent.ymiax +=0.1;
			// 	Mmap.common.goto(extent);
			// 	setTimeout(function(){
			// 		Mmap.common.drawGraphic(list);
			// 	}, 100);
			// });
		}});
	},
	_pre_map: function(showresult){
		var search = $('.myapp:visible, #head').find('.search-group');
		$('body').append('<div class="map-search"></div>');
		$('.map-search').attr('keywords', search.find('input').val());
		$('.map-search').attr('page', Search.page);
		$('.map-search').attr('url', Search.url);
		if(typeof showresult == 'undefined' || showresult !== false){
			showresult = true;
		}
		$('.map-search').attr('showresult', ''+showresult);
		$('.map-search').attr('template', 'map_search_result');
		$('.map-search').attr('isquery', search.attr('isquery'));
	},
	pre: function(){
		if(Search.page < 1) return false;
		Search._next = true;
		Search.page -= 1;
		Search._search(false);
	},
	next: function(){
		if(!Search._next) return false;
		Search.page += 1;
		Search._search(false);
	},
	close: function(){
		Search.page = 0;
		Search._next = true;
		Search.old_keywords = '';
		// $('.search-in-map').unbind('click', Search._result_in_map);
		// $('.search-pre').unbind('click', Search.pre);
		// $('.search-next').unbind('click', Search.next);
		setTimeout(function(){
			$('.myapp:visible, #head').find('#search_result').hide();
		}, 50);
	},
	destroy: function(){
		Search.page = 0;
		Search._next = true;
		$('#search').val('');
		$('#map_tools').show();
		Search.old_keywords = '';
		// $('.search-in-map').unbind('click', Search._result_in_map);
		// $('.search-pre').unbind('click', Search.pre);
		// $('.search-next').unbind('click', Search.next);
		$(document).unbind('click');
		$('.myapp:visible, #head').find('#search').unbind('keyup', Search._search).unbind('blur', Search.close).unbind('focus', Search._search);
		$('.myapp:visible, #head').find('#search_result').hide().empty();
	}
};
plugins.Search = Search;
Search.init();