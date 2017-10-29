/*TMODJS:{"version":1,"md5":"0ec0b56b93961a4c33bd3f8ec57d6a64"}*/
template('tip',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,tpl=$data.tpl,data=$data.data,$out='';$out+='<div id=\'tip\' class="mtip alert alert-';
$out+=$string(tpl);
$out+='" role="alert">';
$out+=$string(data);
$out+='</div>';
return new String($out);
});