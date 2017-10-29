var Fs = {
	data_dir: null,
	store_dir: null,
	downloads_dir: null,
	preupload_dir: null,
	createStoreRoot: function(){
		Fs.getDir('zhbh', function(dir){
			Fs.getDir('data', function(entry){
				Fs.data_dir = entry;
			});
			Fs.getDir('data/downloads', function(entry){
				Fs.downloads_dir = entry;
			});
			Fs.getDir('data/preupload', function(entry){
				Fs.preupload_dir = entry;
			});
			Fs.getDir('store/cache', function(entry){
				Fs.store_dir = entry;
			});
			Fs.getReadFile('data', 'store_offwifi', function(){});
			Fs.getFile('data', 'store_offwifi', function(entry){
			});
			Fs.getReadFile('etc', 'config', function(contents){
				if(contents != ''){
					contents = JSON.parse(contents);
					conf.store_offwifi = contents.store_offwifi;
				}
			});
			Fs.getReadFile('logs', 'log', function(){});
			Fs.getDir('img', function(dir){
				//log('img创建成功');
			});
		});
	},
	reCreateDir: function(path){
		Fs.getDir(path, function(entry){
			entry.removeRecursively();
			Fs.getDir(path, function(entry){
				path = path.split('/');
				Fs[path[0]+'_dir'] = entry;
			});
		});
	},
	getFs: function(callback){
		function errorGetFS(e){}
		if(Data.fs==null){
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 30*1024*1024,function(fs){Data.fs=fs;callback();}, errorGetFS);
		}else{
			callback();
		}
	},
	append: function(file, contents){
		var path = file.split('/');
		file = path.pop();
		path = path.join('/');
		Fs.getReadFile(path, file, function(_contents){
			_contents += '\n'+ contents;
			Fs.getWriteFile(path, file, _contents);
		});
	},
	getRoot: function(callback){
		if(Data.fs != null){
			callback(Data.fs.root);
		}else{
			Fs.getFs(function(){
				callback(Data.fs.root);
			});
		}
	},
	getDir: function(dir, callback){
		Fs.getFs(function(){
			if(dir==='zhbh'){
				Data.fs.root.getDirectory(dir, {create:true, exclusive:false}, callback);
			}else{
				var dirs = ('zhbh/'+dir).split('/');
				var entry = null;
				var func = function(_dir){
					if(dirs.length < 1){callback(entry);return;}
					var dir = _dir+ dirs.shift() +'/';
					var _func = func;
					Data.fs.root.getDirectory(dir.substr(0, dir.length-1), {create:true, exclusive:false}, function(_entry){
						entry = _entry;
						_func(dir);
					});
					// Data.fs.root.getDirectory('zhbh', {create:true, exclusive:false}, function(){
					// 	Data.fs.root.getDirectory('zhbh/'+_dir, {create:true, exclusive:false}, function(){
					// 		func(dir);
					// 	});
					// });
				}
				func('');
			}
		});
	},
	getFileEntry: function(path, callback){
		window.resolveLocalFileSystemURL(path, callback, function(e){});
	},
	getFile: function(path, file, callback){
		if(typeof file == 'function'){
			callback = file;
			path = path.split('/');
			file = path.pop();
			path = path.join('/');
		}
		Fs.getDir(path, function(dir){
			Data.fs.root.getFile('zhbh/'+path+'/'+file, {create:true, exclusive:false}, callback);
		});
	},
	getReadFile: function(path, file, callback){
		Fs.getFs(function(){
			function func(f){
				function got(file){
					var fr=new FileReader();
					var onload = function(e){
						callback(e.target.result);
					}
					fr.onload=onload;
					fr.onerror=function(error){};
					fr.readAsText(file);
				}
				function errorHandler(e){}
				f.file(got, errorHandler);
			}
			Fs.getFile(path, file, func);
		});
	},
	getWriteFile: function(path, file, content){
		Fs.getFs(function(){
			function func(f){
				function getFileWriter(writer){
					writer.onwrite=function(e){};
					(typeof content != 'string') && (content = JSON.stringify(content));
					writer.write(content);
				}
				function errorHandler(e){}
				f.createWriter(getFileWriter, errorHandler);
			}
			Fs.getFile(path, file, func);
		});
	}
};