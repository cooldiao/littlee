template.helper('dateFormat', function (date, format) {
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
});

template.helper('formatHead', function(str){
    if(str.indexOf('<') != -1) return str;
    if(str.length<=10) return str;
    return str.substr(0, 10) + '...';
});

template.helper('addslashes', function(str){
    return str.replace('\'', '&prime;').replace('"', '&Prime;');
});

template.helper('distance', function(value){
    var distance = parseInt(value);
    var temp = distance/1000;
    if(temp>1){
        temp = temp.toFixed(2);
        distance = ""+temp+'千米';
    }else{
        distance = ""+distance+'米';
    }
    return distance;
});

template.helper('parseLoc', function(latlng){
    latlng = latlng.split(',');
    return 'x: '+parseFloat(latlng[1])+', y: '+parseFloat(latlng[0]);
});

template.helper('formatText', function(data, len){
    data = data.replace(/<[^\>\/]*>/gi,'').replace(/<\/[^\>]*>/gi,'').replace(/<[^\/\>]*\/>/gi, '');
    var ret = data+'';
    (ret.length > len) && (ret = ret.substr(0, len) + '...');
    return ret;
});

template.helper('attr', function(attr, obj){
    var match = attr.match(/{-{([^}{]+[^(}})({{)]*)}-}/gi);
    var _m = '';
    for(var i in match){
        _m = match[i].replace('{-{', '').replace('}-}', '');
        attr = attr.replace('{-{'+_m+'}-}', obj[_m]);
    }
    return attr;
});

template.helper('swiper', function(data, swiper, attr, per){
    per = !!per?per:8;
    if(typeof per =='string') return template('swiper', {data: {data: data, swiper: swiper, attr: attr}, per: per});
    var tabs = data.length / per;
    var _data = [];
    for(var i in data){
        if(!_data[(i/per)|0]) _data.push([]);
        _data[(i/per)|0].push(data[i]);
    }
    return template('swiper', {data: {data: _data, swiper: swiper, attr: attr}, per: per});
});

template.helper('include', function(tpl, data){
    return template(tpl, data);
});

template.helper('default', function(data, value, v){
    if(!!v){
        if(data == v){
            if(!!value) return value;
            return '未填';
        }
    }else{
        if(data == '' || data == 0 || data == 'null' || data == null){
            if(!!value) return value;
            return '未填';
        }
    }
    return data;
});

template.helper('trimHtml', function(data){
    return data.replace(/<[^>]*>/ig, '').replace('\n','');
});

template.helper('url', function(data){
    return '/jt_wx_ftp/index.php?s=/Platform/'+data;
});

template.helper('multyPic', function(data){
    if(data == '' || data == null || data == 'null') return '';
    var html = '<div style="width:20px;height:1px;display:block;float:left;">&nbsp;</div>';
    data += '';
    var arr = data.split(',');
    for(var i in arr){
        if(i == 0 || i|0 > 0){
            html += '<img style="width:120px;display:block;float:left;border-right:20px solid rgba(0,0,0,0);" src="/jt_wx_ftp'+arr[i]+'"/>';
        }
    }
    html += '<div class="clearfix">&nbsp;</div>';
    return html;
});
