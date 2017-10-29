var Menu = {
	flag: true,
	set: function(data){
		$('.menu').remove();
		var app = $('.myapp:visible');
		app.append('<div id="menu" class="menu"></div>');
		var menu = app.find('#menu');
		$(document).unbind('click');
		$(document).click(function(e){
			if($(e.target).attr('id') != app.find('#menu_btn').attr('id'))
				menu.find('.menu-group').fadeOut(200);
		});
		if(data != null){
			var html = template('menu', {isAdmin: Data.isAdmin, _hash_: Ajax._hash_, time: (new Date()).getTime()/1000|0});
			menu.html(html);
			$('body').addClass("hasMenu");
		}else{
			menu.html("");
			$('body').removeClass("hasMenu");
		}
	},
	hide: function(){
		$('.myapp:visible').find('#menu').hide();
	},
	show: function(){
		$('.myapp:visible').find('#menu').show();
	}
};