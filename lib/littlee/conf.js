var Conf = {
	store: function(json){
		if(app.is_phonegap){
			mwait('Fs', function(){
				try{
					Fs.getWriteFile('etc', 'config', json);
				}catch(e){}
			});
		}
	},
	set_store_offwifi: function(){
		setTimeout(function(){
			conf.store_offwifi = $('.store-offwifi').hasClass('mui-active');
			Conf.store(conf);
		}, 50);
	},
	get: function(callback){
		if(app.is_phonegap){
			var func = function(){
				if(typeof Fs == 'undefined'){
					setTimeout(func, 10);
					return;
				}
				Fs.getReadFile('etc', 'config', callback);
			};
			func();
		}else{
			callback(conf);
		}
	},
	restore: function(callback){
		Conf.get(function(_conf){
			if(typeof _conf == 'string') _conf = JSON.parse(_conf);
			conf = _conf;
			callback();
		});
	}
};