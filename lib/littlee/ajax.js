var Ajax = {
	to: null,
	locked: false,
	base_url: (typeof base_url == 'undefined')?'http://fhtdt.cooldiao.com/home/':base_url,
	_hash_: '',
	lat: -1,
	lng: -1,
	logout: function(){
		conf.user = {username: null, passwd: null};
		Conf.store(conf);
		setTimeout(function(){
			location.reload();
		}, 500);
	},
	formData: function(data){
		(!data.template && !!data.href) &&
			(data.template = data.href.split('/')[1]);
		if(!Check.empty(data.query)){
			var _validate = MyValidate.validate($('.myapp:visible').find("form:visible"), data.rule || data.href);
			if(_validate !== true && !_validate.form()){
				return false;
			}
			data.query = Ajax.getFormData(data.query);
		}
		return data;
	},
	getFormData: function(query){
		var app = $('.myapp:visible');
		var ret = {};
		var key = '';
		var _q = query.split(",");
		for(var i in _q){
			key = _q[i].split('#');
			key = key[key.length-1];
			ret[key] = app.find("#"+ _q[i]).val();
		}
		return ret;
	},
	get: function(url, data){
		if(url.indexOf('http') == -1){
			url = Ajax.base_url + url;
		}
		var query = {};
		(!!data.page) && (query.page = data.page);
		if((data.addlatlng == null) || (data.addlatlng !== false && data.addlatlng !== 'false')){
			query.lat = Ajax.lat;
			query.lng = Ajax.lng;
		}
		$.ajax({
			url: url,
			data: query,
			success: function(json, status){
				Ajax.callback(data, json, status, data.callback, data.success, data.failure);
			},
			error: function(){
				Tip.failure({content: '请求失败'});
			},
			dataType:'json',
			type: "GET"
		});
		Ajax.setTo(30000);
	},
	post: function(url, data){
		if(url.indexOf('http') == -1){
			url = Ajax.base_url + url;
		}
		// if((typeof(data.query) == 'undefined') || (data.query == '')){
		// 	Tip.failure({content:'请先填写表格'});
		// 	return false;
		// }
		if(data['store-offwifi'] && conf.store_offwifi && !app.iswifi){
			Ajax.store(url, data);
			Tip.tip({content: '表单数据已缓存，当您连接WiFi时，系统将提醒您上传缓存数据'});
			return;
		}
		if((data.addlatlng == null) || (data.addlatlng !== false && data.addlatlng !== 'false')){
			data.query.lat = Ajax.lat;
			data.query.lng = Ajax.lng;
		}
		// data.query._hash_ = Ajax._hash_;
		(!!data.page) && (data.query.page = data.page);
		$.ajax({
			url: url,
			data: data.query,
			success: function(json, status){
				Ajax.callback(data, json, status, data.callback, data.success, data.failure);
			},
			error: function(){
				Tip.failure({content: '请求失败'});
			},
			dataType:'json',
			type: "POST"
		});
		Ajax.setTo(30000);
	},
	store: function(url, data){
		data = {url: url, data: data};
		conf.store_offwifi_num = (conf.store_offwifi_num|0) + 1;
		Fs.append('data/store_offwifi', JSON.stringify(data));
		Conf.store(conf);
		if(!!data.data.afterQuery){
			Ajax._call('afterQuery', data.data);
		}
	},
	popstore: function(){
		if(!app.is_phonegap){
			Tip.tip({content: '请在app中使用本功能！'});
			return;
		}
		Fs.getReadFile('data', 'store_offwifi', function(contents){
			if(contents == ''){
				Tip.tip({content: '暂无缓存数据!'});
				return;
			}
			Ajax.locked = true;
			Tip.tip({content: '正在上传缓存数据。。。'});
			conf.store_offwifi = false;
			setTimeout(Ajax.setTo, 120000);
			Ajax.prePopstore(contents, function(contents){
				var _contents = contents;
				var _content = '';
				var func = function(){
					if(_contents.length<1){
						Ajax.locked = false;
						Ajax.clearTo();
						Conf.restore(function(){
							conf.store_offwifi_num = 0;
							Conf.store(conf);
						});
						Tip.success({content: '缓存数据已上传!'});
						Back.refresh();
						Fs.getWriteFile('data', 'store_offwifi', '');
						Fs.reCreateDir('store/cache');
						return;
					}
					_content = _contents.pop();
					if(typeof _content.url == 'undefined') func();
					_content.data.success = func;
					_content.data.failure = fail;
					Ajax.post(_content.url, _content.data);
				}
				var fail = function(){
					Ajax.locked = false;
					Conf.restore();
					Tip.failure({content: '缓存数据上传失败，请重传!'});
					_contents.push(_content);
					Fs.getWriteFile('data', 'store_offwifi', JSON.stringify(_contents));
				}
				func();
			});
		});
	},
	clearstore: function(){
		Fs.getWriteFile('data', 'store_offwifi', '');
		Conf.restore(function(){
			conf.store_offwifi_num = 0;
			Conf.store(conf);
		});
		Tip.success({content: '缓存已清空！'});
		Back.refresh();
		Fs.reCreateDir('store/cache');
	},
	prePopstore: function(contents, callback){
		var contentsA = contents.split('\n');
		var _callback = callback;
		var attachment,attachments,item;
		var _contents = [];
		var func = function(cnt){
			(typeof cnt.url != 'undefined') && _contents.push(cnt);
			if(contentsA.length<1){
				_callback(_contents);
				return;
			}
			var _func = func;
			var _attachments = [];
			var _contents_ = _contents; // 用于错误处理 
			var __contents = contentsA; // 用于错误处理
			var content = contentsA.pop();
			if(content == ''){
				_func([]);
				return;
			}
			content = JSON.parse(content);
			if(content.data.query.attachments.indexOf('uri::') == -1){
				_func(content);
				return;
			}
			attachments = content.data.query.attachments;
			attachments = attachments.split(';');
			var fail = function(){
				Ajax.locked = false;
				Conf.restore();
				Tip.failure({content: '上传失败'});
				Fs.getWriteFile('data', 'store_offwifi', (_contents_.concat(__contents)).join('\n'));
				return false;
			}
			var done = function(_attachment){
				(_attachment != '') && _attachments.push(_attachment);
				if(attachments.length < 1){
					content.data.query.attachments = _attachments.join(';');
					_func(content);
					return;
				}
				attachment = attachments.pop();
				if(attachment.indexOf('uri::') != -1){
					Ajax.store_media_upload(attachment.split('::')[1], done, fail);
				}else{
					done(attachment);
				}
			}
			done("");
		}
		func([]);
	},
	store_media_upload: function(attachment, callback , fail){
		var _fail = fail;
		myRequire(['upload'], function(){
			var fail = _fail;
			Upload.upload(attachment, function(json){
				var type = 4;
				if(json.data.type.indexOf('image') != -1){
					type = 3;
				}else if(json.data.type.indexOf('audio') != -1){
					type = 2;
				}else if(json.data.type.indexOf('video') != -1){
					type = 1;
				}
				var attachment = 'type:'+type+',data:'+json.data.url+',name:'+json.data.name;
				callback(attachment);
			}, function(json){
				Upload._clearProcess();
				fail(json);
			});
		});
	},
	query: function(args){
		try{
			if(Ajax.locked) return false;
			var data = {};
			if(!!args && !args.target){
				for(var i in args){ data[i] = args[i];}
			}else{
				var _this = $(this);
				if(_this.attr('doSth') == 'false') return;
				if(_this.hasClass("back")){ Back.back();return false;}
				data = _this.getQueryAttr(); data.o = _this;
			}
			if(!!data.click){
				Ajax.call(data.click, data);
				return false;
			}

			Ajax._call('beforeQuery', data);

			if(!!data.islink){
				return;
			}

			if(!!data.download){
				return Ajax.download(data);
			}

			if(!!data.downloads){
				return Ajax.downloads(data);
			}

			!!data.behavior && Behavior.push(data);
			if(!!data.islogin){
				if(!Data.login){
					Login.index(data);
					return false;
				}
			}
			// 默认会pushState
			((data.isback !== 'false' && (!data.render || data.render != 'false')) && !data.refresh ) && Back.push(data, function(){
				Ajax.query(data);
			});
			if(data.method == "render"){
				View.render(data);
				Ajax._call('afterQuery', data);
				return false;
			}
			data = Ajax.formData(data);
			if(data === false) return false;
			(!data.mdata || data.mdata == 'get')?
				(Ajax.get(data.href, data)):
				(Ajax.post(data.href, data));
		}catch(e){Tip.tip({content: '请检查您的网络！'});}
		return false;
	},
	downloads: function(data){
		if(!!data['data-value'] && data['data-value'] != ''){
			data['data-value'] = JSON.parse(data['data-value']);
			Ajax._downloads(data, data['data-value']);
		}else{
			Ajax.get(data['export-source'] , {success: function(json){
				Ajax._downloads(data, json.data.list);
			}});
		}
		return false;
	},
	_downloads: function(data, list){
		if(list.length <= 0){
			Tip.tip({content: '导出成功！'});
			return;
		}
		var item = list.pop();
		var _d = {href: data.href+item['id'], success: function(){Ajax._downloads(data, list);}, 'parent-dir': data['parent-dir']+item['name'], filename: data.filename};
		Ajax.download(_d);
	},
	download: function(data){
		if(data.href.indexOf('http') == -1){
			data.href = Ajax.base_url +data.href+ '?_hash_='+Ajax._hash_;;
		}
		if(!!data['data-value'])
			data.href += '&ids='+data['data-value'];
		if(typeof FileTransfer == 'undefined'){
			Ajax._web_download(data);
			return;
		}
		var ft = new FileTransfer();
		var uri = encodeURI(data.href);
		var _data = data;
		var success = (!!data.success)?(data.success):false;
		Fs.getRoot(function(root){
        	try {
        		var _success = success;
        		var _uri = uri;
        		var data = _data;
				var path = root.toURL() +'littlee/data/downloads/export/'+ data['parent-dir'];
				Fs.getDir('data/downloads/export/'+ data['parent-dir'], function(){
					var fileURL = path +'/'+data.filename;
					var success = _success;
					ft.download(
						_uri,
						fileURL,
						function(entry) {
					  		!success && Tip.success({content: '导出成功！<br/>文件已保存至：'+entry.fullPath});
					  		!!success && success();
						},
						function(error) {
					  		Tip.failure({content: JSON.stringify(error)});
					});
				});
	        }catch(e){
	          Tip.failure({content: JSON.stringify(e)});
	        }
		});
		return false;
	},
	_web_download: function(data){
		window.open(data.href);
		setTimeout(data.success, 50);
	},
	callback: function(data, json, status, callback, success, failure){
		try{
			Ajax.clearTo();
			data.data = (!!json.data)?json.data:{};
			if(status == 'success'){
				data.status = json.status;
 				if(json.status == true){
					if(!!json._hash_){
						Ajax._hash_ = json._hash_;
					}
					if(data.template == 'login'){
						Data.user = json.data;
						Data.isAdmin = Data.user.id == 1;
						conf.user = {username: data.query.username, passwd: data.query.passwd};
						Data.login = true;
						Conf.store(conf);
					}
					if(Data.backup){
						var params = Data.backup;
						Data.backup = null;
						Ajax.query(params);
						Ajax._call('afterQuery', data);
						return;
					}
					if(!callback){
						if(json.msg != null){
							var m = data.href.split('/');
							try{
								var c = conf.message[m[0]][m[1]][(json.msg)|0];
								Tip.success({content:c});
							}catch(e){Tip.success({content:'请求成功'});}
						}
						if(!!success){
							Ajax.call(success, json);
							Ajax._call('afterQuery', data);
							return;
						}
						if(!!data.refresh){
							Back.refresh();
							Ajax._call('afterQuery', data);
							return;
						}
						if(data.isrender != 'false'){
							Ajax._call('beforeRender', data);
							View.render(data);
						}
					}else{
						Ajax.call(callback, json);
					}
					Ajax._call('afterQuery', data);
				}else{
					((data.isback !== 'false' && (!data.render || data.render != 'false')) && !data.refresh ) && Back.pop();
					if(json.msg != null){
						var m = data.href.split('/');
						try{
							var c = conf.message[m[0]][m[1]][(json.msg)|0];
							Tip.failure({content:c});
						}catch(e){Tip.failure({content:JSON.stringify(json.msg)});}
					}else{
						// Tip.failure({content:'请求失败'});
					}
					if(!!failure){
						Ajax.call(failure, json);
					}
					Ajax._call('afterQuery', data);
				}
			}else{
				((data.isback !== 'false' && (!data.render || data.render != 'false')) && !data.refresh ) && Back.pop();
				(!!failure) && Ajax.call(failure, json);
				Tip.failure({content:'请求失败'});
				Ajax._call('afterQuery', data);
			}
		}catch(e){
			if(!!failure){
				Ajax.call(failure, data);
			}
			Ajax._call('afterQuery', data);
			Tip.failure({content:'服务器错误'});
		}
	},
	_call: function(key, data){
		if(!!data[key])
			Ajax.call(data[key], data);
	},
	call: function(calls, data){
		if(typeof calls == 'function'){
			calls(data);
		}else{
			var func,call;
			calls = calls.split(',');
			for(var i in calls){
				call = calls[i];
				func = window;
				call = call.split(".");
				for(var j in call){
					func = func[call[j]];
				}
				if($.isFunction(func)){
					func(data);
				}
			}
		}
		return true;
	},
	setTo: function(t){
		Ajax.clearTo();
		Ajax.to = setTimeout(Ajax.timeout, t);
	},
	clearTo: function(){
		try{
			Ajax.locked = false;
			clearTimeout(Ajax.to);
			Conf.restore(function(){});
		}catch(e){}
	},
	timeout: function(){
		Tip.failure({content:'网络异常，请稍后重试！'});
	}
};