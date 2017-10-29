//动态加载图片
var MImg = {
	height: $(window).height(),
	imgs: [],
	timeout:null,
	flag: true,
	init: function(){
		MImg.imgs = [];
		$('img:visible').each(function(i, n){
			var _t = $(n);
			if(_t.attr('src') != null && _t.attr('src') != ''){
				if(_t.attr('data-url') == null &&
					_t.attr('data-src') == null &&
					_t.attr('s') == null)
					return;
			}
			var top = _t.offset().top;
			if(!!_t.attr('square')){
				if(_t.width()<=0)_t.css('width', '100%');
				var width = _t.parent().width();
				width = (width == 0?_t.width():width);
				_t.css('height',width).css('opcity', 0);
			}
			MImg.imgs.push({top:top, img:_t});
		});
		MImg.imgs.sort(function(a, b){
			return a.top - b.top;
		});
		if(MImg.imgs.length>0){
			MImg.show(MImg.imgs.length/2|0, MImg.imgs.length-1);
		}
		$(window).bind('scroll', MImg.scroll);
	},
	scroll: function(){
		if(MImg.flag && MImg.imgs.length>0){
			MImg.flag = false;
			MImg.timeout = setTimeout(function(){
				MImg.height = $(window).height() + $(window).scrollTop();
				MImg.show(MImg.imgs.length/2|0, MImg.imgs.length-1);
			}, 200);
		}
	},
	show: function(i, j){
		if((MImg.imgs[i].top + 1) > MImg.height){
			if(i == j){
				MImg.flag = true;
				return;
			}
			MImg.show(i/2|0, i);
		}else{
			i = (i+1) == j?j:i;
			if(j==i || MImg.imgs[i+1]>MImg.height){
				if(i>=0){
					var src = '';
					for(var k=0;k<=i;k++){
						if((MImg.imgs[0]).img.attr('data-src') != null){
							src = (MImg.imgs[0]).img.attr('data-src');
						}else if((MImg.imgs[0]).img.attr('data-url') != null){
							src = (MImg.imgs[0]).img.attr('data-url');
						}else if((MImg.imgs[0]).img.attr('s') != null){
							src = (MImg.imgs[0]).img.attr('s');
						}
						(MImg.imgs[0]).img.attr('src', src).css('opcity', 1);
						MImg.imgs.splice(0,1);
					}
					MImg.flag = true;
				}
			}else{
				MImg.show(i, (i+j)/2|0);
			}
		}
	},
	destroy: function(){
		MImg.flag = false;
		MImg.imgs = [];
		$(window).unbind('scroll', MImg.scroll);
	}
};
plugins.MImg = MImg;
MImg.init();