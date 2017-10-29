var Plugin = {
	base: ['m-img'],
	plugins: [],
	init: function(plugin){
			var plugin_dom = document.getElementById('plugin');
			if(plugin_dom == null){
				plugin_dom = document.createElement('div');
				plugin_dom.id = 'plugin';
				document.getElementsByTagName('body')[0].appendChild(plugin_dom);
			}
			Plugin.plugins = !!plugin?plugin.split(","):[];
			Plugin.plugins = Plugin.base.concat(Plugin.plugins);
			var _p = null;
			for(var i in Plugin.plugins){
				_p = Plugin.plugins[i].split('/');
				_p = _p[_p.length - 1];
				_p = _p.split('-');
				var _t = [];
				for(var j in _p){
					_t.push(Tools.capitalize(_p[j]));
				}
				plugin = window["plugins"][Tools.capitalize(_t.join(''))];
				if(!plugin){
					var script = document.createElement('script');
					if(Plugin.plugins[i][0] == '/'){
						script.src = 'plugins'+ (Plugin.plugins[i]) +'.js';
					}else{
						script.src = 'lib/littlee/plugins/'+ (Plugin.plugins[i]) +'.js';
					}
					plugin_dom.appendChild(script);
				}else{
					plugin.init();
				}
			}
	},
	destroy: function(){
		var _p = null;
		for(var i in Plugin.plugins){
			_p = Plugin.plugins[i].split('/');
			_p = _p[_p.length - 1];
			_p = _p.split('-');
			var _t = [];
			for(var j in _p){
				_t.push(Tools.capitalize(_p[j]));
			}
			window["plugins"][Tools.capitalize(_t.join(''))].destroy();
		}
	}
}

var plugins = {};