$.fn.getQueryAttr = function(q){
	if(typeof q == 'undefined'){
		q = 'click,controller,store-offwifi,data-value,parent-dir,export-source,page,filename,download,downloads,islink,mdata,append,cachePage,plugin,href,template,behavior,beforeQuery,beforeRender,afterQuery,message,rule,refresh,method,query,container,isback,head,menu,callback,success,failure,isrender,islogin,comfirm';
	}
	return this.getAttr(q);
}

$.fn.getAttr = function(s){
	var o = {};
	var t = s.split(',');
	for(var i in t){
		if(i == 0 || i|0>0){
			o[t[i]] = this.attr(t[i]);
			if(typeof o[t[i]] == 'undefined' || o[t[i]] == ''){
				o[t[i]] = null;
			}
		}
	}
	return o;
};

$.fn.setData = function(obj){
	for(var i in obj){
		this.attr(i, obj[i]);
	}
}

$.fn.getData = function(keys){
	keys = keys.split(',');
	var ret = {};
	for(var i in keys){
		ret[keys[i]] = this.attr(keys[i]);
	}
	return ret;
}

var Net = {
	info: function(){
		if(!Tools.defined('navigator.network.connection')){
			Tip.tip({content: '无法获取网络信息'});
			return false;
		}
		var res = '';
		switch(navigator.network.connection.type){
			case Connection.UNKNOWN: res = {des:'未知连接', code:2};break;
			case Connection.ETHERNET: res = {des:'以太网', code:1};break;
			case Connection.WIFI: res = {des:'WiFi', code:1};break;
			case Connection.CELL_2G: res = {des:'2G网络', code:1};break;
			case Connection.CELL_3G: res = {des:'3G网络', code:1};break;
			case Connection.CELL_4G: res = {des:'4G网络', code:1};break;
			case Connection.NONE: res = {des:'无网络连接', code:0};break;
			default : res = {des:'未知', code:-1};break;
		}
		return res;
	},
	//获取网络状态
	status: function(){
		if(!Tools.defined('navigator.network.connection')){
			Tip.tip({content: '无法获取网络信息'});
			return false;
		}
		Data.netStatus = Net.info();
		return true;
	}
};

var mwait = function(list, callback){
	if(!$.isArray(list)){
		list = [list];
	}
	function func(_list){
		for(var i in list){
			var Obj = window;
			var _obj = _list[i].split('.');
			for(var j in _obj){
				Obj = Obj[_obj[j]];
				if(typeof Obj == 'undefined' || Obj == null){
					setTimeout(function(){func(_list)}, 10);
					return;
				}
			}
		}
		callback();
	}
	func(list);
}

var Tools = {
	capitalize: function(str){
		if(typeof str != "string") return false;
		return str.substring(0,1).toUpperCase() + str.substring(1);
	},
	has_dom: function(id){
		return ($(id).length>0)?true:false;
	},
	addslashes: function(str){
		return str.replace('\'', '&prime;').replace('"', '&Prime;');
	},
	defined: function(str){
		str = str.split('.');
		func = window;
		for(var i in str){
			func = func[str[i]];
			if(typeof func == 'undefined' || func == null)
				return false;
		}
		return true;
	},
	formatDate: function (date, format) {
	    if(date == 0 || date == '' || date == null || date == 'null') return '';
	    date = new Date((date|0)*1000);

	    var map = {
	        "M": date.getMonth() + 1, //月份
	        "d": date.getDate(), //日 
	        "h": date.getHours(), //小时 
	        "m": date.getMinutes(), //分 
	        "s": date.getSeconds(), //秒 
	        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
	        var v = map[t];
	        if(v !== undefined){
	            if(all.length > 1){
	                v = '0' + v;
	                v = v.substr(v.length-2);
	            }
	            return v;
	        }
	        else if(t === 'y'){
	            return (date.getFullYear() + '').substr(4 - all.length);
	        }
	        return all;
	    });
	    return format;
	}
};

$.fn.clearAttr = function(s){
	var t = s.split(',');
	for(var i in t){
		if(i == 0 || i|0>0){
			this.attr(t[i], null);
		}
	}
};

$.fn.toCenter = function(time){
	var _t = $(this);
	if(typeof time == 'undefined'){
		time = 0;
	}
	setTimeout(function(){
		var _h = _t.innerHeight();
		_t.css('position', 'absolute');
		if(_h < ($(window).height())){
			_t.css('top', '50%');
			_t.css('left', '5%');
			_t.css('width', '90%');
			_t.css('padding', '0');
			_t.css('margin', '0');
			_t.css('margin-top', '-'+(_h/2)+'px');
		}else{
			_t.css('top', '20px');
			_t.css('left', '5%');
			_t.css('width', '90%');
			_t.css('padding', '0');
			_t.css('margin', '0');
			_t.css('margin-bottom', '20px');
		}
	}, time);
};

var Check = {
	empty: function(o){
		return !o || o == "" || o == null;
	},
	match: function(o, val){
		return !o && o == val;
	},
	nomatch: function(val){
		return !o && o != val;
	}
};

var Tip = {
	alarm: function(data, tpl){
		(function(data, tpl){
			var html = template('tip', {data: data.content, tpl: tpl});
			$('body').append(html);
			var _tip = $('.mtip');
			if($('.modal').is(':visible')){
				_tip.css('top', 0);
			}
			_tip.stop(true,true).fadeIn(1500);
			setTimeout(function(){
				_tip.fadeOut(1500);
				setTimeout(function(){
					$('.mtip').each(function(i,n){
						if(!$(n).is(':visible')){
							n.remove();
						}
					});
				},2000);
			},2000);
		}(data, tpl));
	},
	success: function(data){
		Tip.alarm(data, 'success');
	},
	failure: function(data){
		Tip.alarm(data, 'danger');
	},
	tip: function(data){
		Tip.alarm(data, 'info');
	}
};

(function($){
	//$.validator.autoCreateRanges = true;
	$.getAnsiLength = function(b, ansi) {
		if (!(typeof b == 'string') || !ansi) {
			return b.length;
		}
		var a = b.match(/[^\x00-\x80]/g);
		return b.length + (a ? a.length : 0);
	};
	$.validator.prototype.getLength = function (value, element) {
		var t = $(element);
		var isansi = t.data('isansi') ? true : false;
		switch (element.nodeName.toLowerCase()) {
			case "select":
				return $.getAnsiLength($("option:selected", element), isansi);
				break;
			case "input":
				if (this.checkable(element)) {
					return $.getAnsiLength(this.findByName(element.name).filter(":checked"), isansi);
				}
				break;
			default:
				break;
		}	
		return $.getAnsiLength(value, isansi);
	};
	$.validator.method_regexp = function(value,element,params) {
		if (value.length > 0) {
			var pattern = $(element).data('pattern');
			pattern = pattern.replace(/(\\x\{([a-f0-9]{0,4})\})/gi,'\\u$2'); /*replace php's regexp to javascript*/
			var regexp = new RegExp(/^\/?(.+?)(\/([igm]+?))?$/ig).exec(pattern/*.replace('\\','\\\\')*/);
			var pattern = regexp[1], attributes = regexp[3];
			if (typeof regexp[2] == 'undefined') {pattern = '^'+regexp[1]+'$'; attributes = 'ig';}
			var re = new RegExp(pattern, attributes);
			return  re.test(value);
		}
		return true;
	}
	$.validator.addMethod('timestamp',function(value,element,params){
		return this.optional(element) || (new RegExp('^(1[1-9]\\d{2}|20\\d{2}|2100)-([0-1]?[1-9]|1[0-2])-([0-2]?[1-9]|3[0-1]|[1-2]0)(\\s([0-1]?\\d|2[0-3]):([0-5]?\\d)(:([0-5]?\\d))?)?$','ig')).test(value);
	});
	$.validator.addMethod('timetick',function(value,element,params){
		return this.optional(element) || (new RegExp('^([0-1]?\\d|2[0-3]):([0-5]?\\d)(:([0-5]?\\d))?$','ig')).test(value);
	});
	$.extend(jQuery.validator.messages, {required: "\u5fc5\u586b\u5b57\u6bb5",	remote: "\u5df2\u7ecf\u5b58\u5728\uff0c\u6362\u4e00\u4e2a\u8bd5\u8bd5\uff1f",	email: "\u8bf7\u8f93\u5165\u6b63\u786e\u683c\u5f0f\u7684\u7535\u5b50\u90ae\u4ef6",	url: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u7f51\u5740",	date: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u65e5\u671f",	dateISO: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u65e5\u671f (ISO).",	number: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u6570\u5b57",	digits: "\u53ea\u80fd\u8f93\u5165\u6570\u5b57", timestamp : "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u65e5\u671f(\u6216\u65f6\u95f4)",timetick : "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u65f6\u95f4",	creditcard: "\u8bf7\u8f93\u5165\u5408\u6cd5\u7684\u4fe1\u7528\u5361\u53f7",	equalTo: "\u8bf7\u518d\u6b21\u8f93\u5165\u76f8\u540c\u7684\u503c",	accept: "\u8bf7\u8f93\u5165\u5408\u6cd5\u540e\u7f00\u540d\u7684\u5b57\u7b26\u4e32",	maxlength: jQuery.validator.format("\u5b57\u7b26\u4e32\u957f\u5ea6\u6700\u5927\u4e3a{0}\u4e2a\u5b57"),	minlength: jQuery.validator.format("\u5b57\u7b26\u4e32\u957f\u5ea6\u6700\u5c11\u4e3a{0}\u4e2a\u5b57"),	rangelength: jQuery.validator.format("\u8bf7\u8f93\u5165\u4e00\u4e2a\u957f\u5ea6\u4ecb\u4e8e{0}\u548c{1}\u4e4b\u95f4\u7684\u5b57\u7b26\u4e32"),	range: jQuery.validator.format("\u8bf7\u8f93\u5165\u4e00\u4e2a\u4ecb\u4e8e{0}\u548c{1}\u4e4b\u95f4\u7684\u6570\u5b57"),	max: jQuery.validator.format("\u6570\u503c\u6700\u5927\u4e3a{0}"),	min: jQuery.validator.format("\u6570\u503c\u6700\u5c0f\u4e3a{0}")});
})(jQuery);

var MyValidate = {
	v: [],
	getRule: function(v){
		v = v.split('/');
		if(MyValidate.v.length == 0){
			MyValidate.v = conf.validate;
		}
		var rule = MyValidate.v;
		for(var i in v){
			if(!rule[v[i]]) return true;
			rule = rule[v[i]];
		}
		return rule;
	},
	validate: function(t, v){
		v = MyValidate.getRule(v);
		if(v === true) return true;
		for(var i in v.methods){
			if(typeof ($.validator.methods[i]) == 'undefined'){
				$.validator.addMethod(i, function(value, element) {
				    return this.optional(element) || eval('/^'+ v.methods[i] +'$/').test(value);
				}, '');
			}
		}
		var err = [];
		var f = true;
		v.errorPlacement = function(error, element){
			var e = v.texts[element.attr('name')] +':'+error.html();
			err.push(e);
			if(!!e){
				!element.hasClass('terror') && element.addClass('terror');
			}else{
				element.removeClass('terror');
			}
			if(f){
				f = false;
				setTimeout(function(){
					if(err.length > 0){
						Tip.failure({content: err.join(",")});
						err = [];
						f = true;
					}
				},50);
			}
		}
		return $(t).validate(v);
	}
};

function MCanvas() {
    this.init.apply(this, arguments);
}
MCanvas.prototype = {
    //存储当前表面状态数组-上一步
    preDrawAry: [],
    //存储当前表面状态数组-下一步
    nextDrawAry: [],
    //中间数组
    middleAry: [],
    //配置参数
    confing: {
        lineWidth: '1px',
        lineColor: "blue",
        shadowBlur: '0px'
    },
    rect:{
    	width: 0,
    	height: 0
    },
    init: function (oCanvas, oColor, oBrush, oControl, oDrawImage, imgDiv) {
        this.canvas = oCanvas;
        this.context = oCanvas.getContext('2d');
        this.colorDiv = oColor;
        this.brushDiv = oBrush;
        this.controlDiv = oControl;
        this.drawImageDiv = oDrawImage;
        this.imgDiv = imgDiv;
        this.rect.width = $(oCanvas).attr('width');
        this.rect.height = $(oCanvas).attr('height');
        this._initDraw();
        this._draw(oCanvas);
        this.setColor();
        this.setBrush();
        this.screenshot();
        this.complete();
        this.preClick();
        this.nextClick();
        this.clearClick();
        this.drawImage(oCanvas);
    },
    _initDraw: function () {
    	this.preDrawAry = [];
    	this.nextDrawAry = [];
    	this.middleAry = [];
        var preData = this.context.getImageData(0, 0, this.rect.width, this.rect.height);
        //空绘图表面进栈
        this.middleAry.push(preData);
    },
    //涂鸦主程序
    _draw: function (oCanvas, context) {
        var _this = this;
        var mousedown = function (e) {
            var x = e.clientX,
			y = e.clientY,
			left = this.parentNode.offsetLeft,
			top = this.parentNode.offsetTop,
			canvasX = x - left,
			canvasY = y - top;
            _this._setCanvasStyle();
            //清除子路径
            _this.context.beginPath();
            _this.context.moveTo(canvasX, canvasY);
            //当前绘图表面状态
            var preData = _this.context.getImageData(0, 0, _this.rect.width, _this.rect.height);
            //当前绘图表面进栈
            _this.preDrawAry.push(preData);

	        var mousemove = function (e) {
	            var x2 = e.clientX,
				y2 = e.clientY,
				t = e.target,
				canvasX2 = x2 - left,
				canvasY2 = y2 - top;
				if(x2 == null){
					if(!!e.originalEvent && !!e.originalEvent.touches && !!e.originalEvent.touches[0]){
						x2 = e.originalEvent.touches[0].clientX;
						y2 = e.originalEvent.touches[0].clientY;
						canvasX2 = x2 - left;
						canvasY2 = y2 - top;
					}
				}
	            if (t == oCanvas) {
	            	__context = _this.context;
	                _this.context.lineTo(canvasX2, canvasY2);
	                _this.context.stroke();
	            } else {
	                _this.context.beginPath();
	            }
	        };
	        var mouseup = function (e) {
	            var t = e.target;
	            if (t == oCanvas) {
	                //当前绘图表面状态
	                var preData = _this.context.getImageData(0, 0, _this.rect.width, _this.rect.height);
	                if (_this.nextDrawAry.length == 0) {
	                    //当前绘图表面进栈
	                    _this.middleAry.push(preData);
	                } else {
	                    _this.middleAry = [];
	                    _this.middleAry = _this.middleAry.concat(_this.preDrawAry);
	                    _this.middleAry.push(preData);
	                    _this.nextDrawAry = [];
	                    $('.js-next-control').addClass('next-control');
	                    $('.next-control').removeClass('js-next-control');
	                }

	                if (_this.preDrawAry.length <= 0) {
			            $('.canvas-undo').addClass('no-data');
			        }else{
			        	$('.canvas-undo').removeClass('no-data');
			        }
			        if (_this.nextDrawAry.length <= 0) {
			            $('.canvas-redo').addClass('no-data');
			        }else{
			        	$('.canvas-redo').removeClass('no-data');
			        }
	                _this._isDraw();
	            }
	            if(typeof document.ontouchend == 'undefined'){
	            	$(document).unbind('mousemove').unbind('mouseup');
	            }else{
	            	$(document).unbind('touchmove').unbind('touchend');
	            }
	        };
	        if(typeof document.ontouchend == 'undefined'){
				$(document).bind('mousemove', mousemove).bind('mouseup', mouseup);
	        }else{
            	$(document).bind('touchmove', mousemove).bind('touchend', mouseup);
	        }
        };
        if(typeof document.ontouchend == 'undefined'){
		    oCanvas.removeEventListener('mousedown', mousedown);
        	oCanvas.addEventListener('mousedown', mousedown);
        }else{
		    oCanvas.removeEventListener('touchstart', mousedown);
        	oCanvas.addEventListener('touchstart', mousedown);
        }
    },
    //设置画笔
    _setCanvasStyle: function () {
        this.context.lineWidth = this.confing.lineWidth;
        this.context.shadowBlur = this.confing.shadowBlur;
        this.context.shadowColor = this.confing.lineColor;
        this.context.strokeStyle = this.confing.lineColor;
    },
    //设置颜色
    setColor: function () {
    	var app = $('.myapp:visible');
    	!!this.colorDiv && 
		app.find('#color_btn').bind('click', function(){
			$(this).parent().find('ul').toggleClass('hide');
		});
		var _this = this;
        !!this.colorDiv && (app.find('#canvas_color li').bind('click', function(e){_this._setColor(this, e);}));
    },
    _setColor: function (_t, e) {
        var t = $(_t)[0];
        if (t.nodeName.toLowerCase() == "li") {
        	$(_t).parent().toggleClass('hide');
            this.confing.lineColor = t.style.backgroundColor;
            $('.js-border-color').removeClass('js-border-color');
            $(t).addClass('js-border-color');
        }
    },
    //设置画笔大小
    setBrush: function () {
    	var app = $('.myapp:visible');
    	!!this.brushDiv &&
		app.find('#brush_btn').bind('click', function(){
			$(this).parent().find('ul').toggleClass('hide');
		});
		var _this = this;
        !!this.brushDiv && (app.find('#canvas_brush li').bind('click', function(e){_this._setBrush(this, e);}));
    },
    _setBrush: function (_t, e) {
        var t = $(_t)[0];
        if (t.nodeName.toLowerCase() == "li") {
        	$(_t).parent().toggleClass('hide');
        	t = $(t).find('span')[0];
            if (t.className.indexOf("small-brush") >= 0) {
                this.confing.lineWidth = 1;
            } else if (t.className.indexOf("middle-brush") >= 0) {
                this.confing.lineWidth = 3;
            } else if (t.className.indexOf("big-brush") >= 0) {
                this.confing.lineWidth = 6;
            }
            $('.js-bg-color').removeClass('js-bg-color');
            $(t).parent().addClass('js-bg-color');
        }
    },
    destroy: function(){
    	$('.myapp:visible').find('#brush_btn').unbind('click');
    	$('.myapp:visible').find('#color_btn').unbind('click');
    },
    //判断是否已涂鸦,修改按钮状态
    _isDraw: function () {
        if (this.preDrawAry.length) {
            $('.return-control').addClass('js-return-control');
            $('.return-control').removeClass('return-control');
            $('.empty-control').addClass('js-empty-control');
            $('.empty-control').removeClass('empty-control');
        }else{
            return false;
        }
    },
    //点击上一步-改变涂鸦当前状态
    preClick: function () {
    	if(!!this.controlDiv){
	        var pre = this.controlDiv.getElementsByTagName("span")[1];
	        pre.onclick = this.bind(this, this._preClick);
	    }
    },
    _preClick: function () {
        if (this.preDrawAry.length > 0) {
            var popData = this.preDrawAry.pop();
            var midData = this.middleAry[this.preDrawAry.length + 1];
            this.nextDrawAry.push(midData);
            this.context.putImageData(popData, 0, 0);
        }
        if (this.preDrawAry.length <= 0) {
            $('.canvas-undo').addClass('no-data');
        }else{
        	$('.canvas-undo').removeClass('no-data');
        }
        if (this.nextDrawAry.length <= 0) {
            $('.canvas-redo').addClass('no-data');
        }else{
        	$('.canvas-redo').removeClass('no-data');
        }
    },
    //点击下一步-改变涂鸦当前状态
    nextClick: function () {
    	if(!!this.controlDiv){
	        var next = this.controlDiv.getElementsByTagName("span")[2];
	        next.onclick = this.bind(this, this._nextClick);
	    }
    },
    _nextClick: function () {
        if (this.nextDrawAry.length) {
            var popData = this.nextDrawAry.pop();
            var midData = this.middleAry[this.middleAry.length - this.nextDrawAry.length - 2];
            this.preDrawAry.push(midData);
            this.context.putImageData(popData, 0, 0);
        }
        if (this.preDrawAry.length <= 0) {
            $('.canvas-undo').addClass('no-data');
        }else{
        	$('.canvas-undo').removeClass('no-data');
        }
        if (this.nextDrawAry.length <= 0) {
            $('.canvas-redo').addClass('no-data');
        }else{
        	$('.canvas-redo').removeClass('no-data');
        }
    },
    //清空
    clearClick: function () {
    	if(!!this.controlDiv){
	        var clear = this.controlDiv.getElementsByTagName("span")[0];
	        clear.onclick = this.bind(this, this._clearClick);
	    }
    },
    _clearClick: function () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        var preData = this.context.getImageData(0, 0, this.rect.width, this.rect.height);
        this.preDrawAry = [];
        this.nextDrawAry = [];
        this.middleAry = [preData];
        $('.canvas-redo,.canvas-undo').addClass('no-data');
    },
    screenshot: function(){
    	if(!!this.controlDiv){
	        var btn = this.controlDiv.getElementsByTagName("span")[3];
	        btn.onclick = this.bind(this, this._screenshot);
	    }
    },
    _screenshot: function(){
    	var _this = this;
    	myRequire(['screen-shot'], function(){
    		var _t = _this;
    		_this.hide();
    		setTimeout(function(){
    			var _this = _t;
    			plugins.ScreenShot._screen_shot(_this.show);
    		}, 30);
    	});
    },
    complete: function(){
    	if(!!this.controlDiv){
	        var btn = this.controlDiv.getElementsByTagName("span")[4];
	        btn.onclick = this.bind(this, this._complete);
	    }
    },
    _complete: function(){
    	this._clearClick.call(this);
    	CanvasDraw.hide();
    },
    hide: function(){
    	$('#canvas_tool_group').hide();
    },
    show: function(){
    	$('#canvas_tool_group').show();
    },
    //生成图像
    drawImage: function () {
    	if(!!this.controlDiv){
	        var btn = this.controlDiv.getElementsByTagName("span")[5];
	        btn.onclick = this.bind(this, this._drawImage);
	    }
    },
    _drawImage: function () {
        var url = this.canvas.toDataURL('image/png'),
 		img = new Image();
        img.src = url;
        this.imgDiv.innerHTML = "";
        this.imgDiv.appendChild(img);
    },
    bind: function (obj, handler) {
        return function () {
            return handler.apply(obj, arguments);
        }
    }
}

