var Star = {
	init: function(){
		$('span.b_star_1').each(function(i,n){
			var _t = $(n);
			var stars = parseFloat(_t.attr('stars'));
			stars = Math.round(stars*2);
			_t.html('<i class="b_d'+stars+'"></i>');
		});
	},
	destroy: function(){}
}
plugins.Star = Star;
Star.init();
