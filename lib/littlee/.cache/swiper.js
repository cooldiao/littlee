/*TMODJS:{"version":1,"md5":"f7c9976371c2714ae0c0f134b95e0eab"}*/
template('swiper',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,data=$data.data,$string=$utils.$string,per=$data.per,$each=$utils.$each,vo=$data.vo,$index=$data.$index,v1=$data.v1,$out='';$out+='<div class="swiper-container" ';
if(data){
$out+=$string(data.swiper);
}
$out+='> <div class="swiper-wrapper"> ';
if(data && data.data){
$out+=' ';
if(per == 3){
$out+=' ';
$each(data.data,function(vo,$index){
$out+=' <div class="swiper-slide"> ';
$each(vo,function(v1,$index){
$out+=' <a class=\'swiper-tab-item swiper-';
$out+=$string(per);
$out+='\' ';
$out+=$string($helpers. attr(data.attr , v1));
$out+='> <img class=\'swiper-tab-img swiper-img-';
$out+=$string(per);
$out+='\' src=\'';
$out+=$string(v1.cover);
$out+='\' /> <div class=\'swiper-tab-title swiper-content-';
$out+=$string(per);
$out+='\'>';
$out+=$string(v1.name);
$out+='</div> </a> ';
});
$out+=' </div> ';
});
$out+=' ';
}else if(per == '1_5'){
$out+=' ';
$each(data.data,function(vo,$index){
$out+=' <div class="swiper-slide"> <a class=\'swiper-tab-item swiper-';
$out+=$string(per);
$out+='\' ';
$out+=$string($helpers. attr(data.attr , vo));
$out+='> <img class=\'swiper-tab-img swiper-img-';
$out+=$string(per);
$out+='\' src=\'';
$out+=$string(vo.cover);
$out+='\' /> <div class=\'swiper-tab-title swiper-content-';
$out+=$string(per);
$out+='\'>';
$out+=$string(vo.name);
$out+='</div> </a> </div> ';
});
$out+=' ';
}else{
$out+=' ';
$each(data.data,function(vo,$index){
$out+=' <div class="swiper-slide"> ';
$each(vo,function(v1,$index){
$out+=' <a class=\'swiper-tab-item\' ';
$out+=$string($helpers. attr(data.attr , v1));
$out+='> <img class=\'swiper-tab-img\' src=\'';
$out+=$string(v1.cover);
$out+='\' /> <div class=\'swiper-tab-title swiper-tab-';
$out+=$string(per);
$out+='\'>';
$out+=$string(v1.name);
$out+='</div> </a> ';
});
$out+=' </div> ';
});
$out+=' ';
}
$out+=' ';
}
$out+=' </div>       </div>';
return new String($out);
});