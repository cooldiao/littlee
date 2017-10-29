/*TMODJS:{"version":1,"md5":"4910767b358627c5968afdbe681cc0ab"}*/
template('danmu',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,window=$data.window,$out='';$out+='<div class=\'danmu-group\'> <div class=\'danmu-input-group hide\'> <input type=\'text\' class=\'danmu-input\' maxlength="50" placeholder="请输入弹幕内容" /> <a href=\'#\' doSth=\'false\' class=\'danmu-click\'>发送</a> </div> <div class=\'danmu-switch hide\'><div class=\'off-switch mui-switch ';
if(!window.background.Danmu._stop){
$out+='mui-active';
}
$out+='\'><div class="mui-switch-handle"></div></div></div> <div class=\'danmu-btn\'>弹</div> </div>';
return new String($out);
});