/*TMODJS:{"version":1,"md5":"62023a2e3e75e49925ed8d8c91a5b655"}*/
template('head',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,data=$data.data,$string=$utils.$string,$out='';$out+='<div class="head-group theme-bg-blue"> ';
if(data[0] == 1){
$out+='<a href=\'#\' class=\'head-left back\'><span class=\'glyphicon glyphicon-menu-left\'></span></a>';
}
$out+=' <div class=\'head-title\'>';
$out+=$string($helpers. formatHead(data[1] ));
$out+='</div> ';
if(data[2] != ''){
$out+='<div class=\'head-right\'>';
$out+=$string(data[2]);
$out+='</div>';
}
$out+=' </div>';
return new String($out);
});