var Head = {
	head: $('#head'),
	set: function(data){
		if(Head.head.length == 0){
			$('body').append('<div id="head"></div>');
			Head.head = $('#head');
		}
		Head.head.removeClass('apparent');
		if(data != null){
			data = data.split(',');
			if(data.length < 3){
				data[2] = "";
			}else{
				data[2] = data.slice(2).join(',');
				// data[2] = JSON.parse(data[2]);
			}
			var html = template('head', {data: data});
			Head.head.html(html);
			$('body').addClass('hasHead');
		}else{
			Head.head.html("");
			$('body').removeClass('hasHead');
		}
	}	
};